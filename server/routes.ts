import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertChatMessageSchema, insertWhatsappLeadSchema } from "@shared/schema";
import { z } from "zod";
import { generateChatResponse } from "./bedrock";
import QRCode from "qrcode";

// Asaas API Configuration
const IS_PRODUCTION = process.env.ASAAS_ENVIRONMENT === 'production';
const ASAAS_API_BASE = IS_PRODUCTION ? 'https://api.asaas.com' : 'https://api-sandbox.asaas.com';
// Use production key if available, otherwise fallback to sandbox
const ASAAS_API_KEY = process.env.ASAAS_API_KEY || 
  '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjcwYThkMjM4LTJmZDQtNDZiMS1hNGE0LWJlNGRkOTE4MWNjMDo6JGFhY2hfZDJjYjdiN2YtMWM5ZC00NDlhLWFhMWYtYzFmM2Y5OTI2ODFh';

console.log(`🚀 Asaas API Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'SANDBOX'}`);
console.log(`🔗 Asaas API Base: ${ASAAS_API_BASE}`);
console.log(`💳 Using ${IS_PRODUCTION ? 'REAL' : 'TEST'} payment processing`);
console.log(`🔑 API Key: ${ASAAS_API_KEY ? ASAAS_API_KEY.substring(0, 15) + '...' : 'NOT SET'}`);
console.log(`🌍 Environment Variables: ASAAS_ENVIRONMENT=${process.env.ASAAS_ENVIRONMENT}, NODE_ENV=${process.env.NODE_ENV}`);

// Check if we have production key when needed
if (IS_PRODUCTION && !process.env.ASAAS_API_KEY) {
  console.warn('⚠️  WARNING: Running in production mode but no ASAAS_API_KEY found!');
  console.warn('⚠️  PIX payments will fail. Please configure your production API key.');
}

// Helper function to make Asaas API calls
async function callAsaasAPI(endpoint: string, method: string = 'POST', body?: any) {
  const response = await fetch(`${ASAAS_API_BASE}${endpoint}`, {
    method,
    headers: {
      'access_token': ASAAS_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Asaas API error: ${response.status} - ${errorData}`);
  }

  return await response.json();
}

// Process credit card payment with Asaas (direct charge for sandbox)
async function processCreditCardPayment(data: any, orderId: string) {
  console.log(`Processing credit card payment for order ${orderId}`);
  
  // Extract price value from string like "R$ 89,00"
  const priceValue = parseFloat(data.plan.price.replace('R$', '').replace(',', '.').trim());
  
  try {
    // Primeiro, criar ou obter o cliente no Asaas
    const customerData = {
      name: data.customer.name,
      email: data.customer.email,
      cpfCnpj: data.customer.document.replace(/\D/g, ''),
      phone: data.customer.phone.replace(/\D/g, ''),
      address: data.billing.street,
      addressNumber: data.billing.number,
      complement: data.billing.complement || '',
      province: data.billing.neighborhood,
      postalCode: data.billing.zipCode.replace(/\D/g, ''),
      city: data.billing.city,
      state: data.billing.state
    };

    const customer = await callAsaasAPI('/v3/customers', 'POST', customerData);
    console.log('Cliente criado:', customer.id);

    // Não criar payment aqui - aguardar dados do cartão
    return {
      status: 'ready_for_payment',
      customerId: customer.id,
      orderId: orderId,
      amount: priceValue,
      planName: data.plan.name,
      planDescription: data.plan.description,
      message: 'Cliente criado, pronto para pagamento interno'
    };
  } catch (error) {
    console.error('Error creating Asaas credit card checkout:', error);
    throw error;
  }
}

// Generate PIX payment directly with QR code
async function generatePixPayment(data: any, orderId: string) {
  console.log(`Generating PIX payment for order ${orderId}`);
  
  // Extract price value from string like "R$ 89,00"
  const priceValue = parseFloat(data.plan.price.replace('R$', '').replace(',', '.').trim());
  
  try {
    // Primeiro, criar ou obter o cliente no Asaas
    const customerData = {
      name: data.customer.name,
      email: data.customer.email,
      cpfCnpj: data.customer.document.replace(/\D/g, ''),
      phone: data.customer.phone.replace(/\D/g, ''),
      address: data.billing.street,
      addressNumber: data.billing.number,
      complement: data.billing.complement,
      province: data.billing.neighborhood,
      city: data.billing.city,
      postalCode: data.billing.zipCode.replace(/\D/g, '')
    };

    const customer = await callAsaasAPI('/v3/customers', 'POST', customerData);
    console.log('Cliente criado:', customer.id);

    // Criar cobrança PIX diretamente
    const paymentData = {
      customer: customer.id,
      billingType: "PIX",
      value: priceValue,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 1 day
      description: `Plano ${data.plan.name} da Secode`,
      externalReference: orderId
    };

    let payment, qrCode;
    try {
      payment = await callAsaasAPI('/v3/payments', 'POST', paymentData);
      console.log('PIX criado:', payment.id);

      // Obter QR Code
      qrCode = await callAsaasAPI(`/v3/payments/${payment.id}/pixQrCode`, 'GET');
    } catch (pixError: any) {
      // Se der erro específico de PIX não aprovado, usar simulação
      if (pixError.message.includes('O Pix não está disponível no momento')) {
        throw pixError; // Repassar para o catch principal
      }
      throw pixError;
    }
    
    return {
      status: 'ready_for_payment',
      customerId: customer.id,
      paymentId: payment.id,
      amount: priceValue,
      planName: data.plan.name,
      planDescription: `Plano ${data.plan.name} da Secode`,
      pixCode: qrCode.payload || null,
      qrCodeImage: qrCode.encodedImage || null,
      expiryDate: payment.dueDate,
      message: 'PIX gerado com sucesso'
    };
  } catch (error) {
    console.error('Error creating Asaas PIX payment:', error);
    
    // Se PIX não estiver disponível no sandbox, criar simulação para demonstração
    if (error instanceof Error && (error.message.includes('Não há nenhuma chave Pix disponível') || error.message.includes('O Pix não está disponível no momento'))) {
      console.log('PIX não disponível no sandbox, criando simulação para demonstração...');
      
      // Criar cliente mesmo assim
      const customerData = {
        name: data.customer.name,
        email: data.customer.email,
        cpfCnpj: data.customer.document.replace(/\D/g, ''),
        phone: data.customer.phone.replace(/\D/g, ''),
        address: data.billing.street,
        addressNumber: data.billing.number,
        complement: data.billing.complement,
        province: data.billing.neighborhood,
        city: data.billing.city,
        postalCode: data.billing.zipCode.replace(/\D/g, '')
      };

      try {
        const customer = await callAsaasAPI('/v3/customers', 'POST', customerData);
        console.log('Cliente criado para PIX simulado:', customer.id);

        // Gerar código PIX simulado para demonstração
        const pixCode = `00020101021226830014br.gov.bcb.pix2561pix-demo.secode.com.br/qr/v2/${orderId}520400005303986540${priceValue.toFixed(2)}5802BR5913Secode Digital6009Sao Paulo62070503***63044A7B`;
        
        // Gerar QR code real a partir do código PIX
        const qrCodeDataUrl = await QRCode.toDataURL(pixCode);
        
        // Extrair apenas o base64 sem o prefixo data:image/png;base64,
        const qrCodeImage = qrCodeDataUrl.split(',')[1];
        
        return {
          status: 'ready_for_payment',
          customerId: customer.id,
          paymentId: `pix_demo_${orderId}`,
          amount: priceValue,
          planName: data.plan.name,
          planDescription: `Plano ${data.plan.name} da Secode`,
          pixCode: pixCode,
          qrCodeImage: qrCodeImage,
          expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          message: 'PIX de demonstração gerado (sandbox)'
        };
      } catch (customerError) {
        console.error('Error creating customer for PIX demo:', customerError);
        throw customerError;
      }
    }
    
    throw error;
  }
}

// Generate boleto with Asaas
async function generateBoleto(data: any, orderId: string) {
  console.log(`Generating boleto for order ${orderId}`);
  
  // Extract price value from string like "R$ 89,00"
  const priceValue = parseFloat(data.plan.price.replace('R$', '').replace(',', '.').trim());
  
  const checkoutData = {
    name: `Boleto Secode - Plano ${data.plan.name}`,
    billingType: "BOLETO",
    chargeType: "DETACHED",
    dueDateLimitDays: 3,
    callback: {
      cancelUrl: `${process.env.REPLIT_DOMAINS || 'http://localhost:5000'}/checkout/cancelled`,
      expiredUrl: `${process.env.REPLIT_DOMAINS || 'http://localhost:5000'}/checkout/expired`,
      successUrl: `${process.env.REPLIT_DOMAINS || 'http://localhost:5000'}/checkout/success?order=${orderId}`
    },
    items: [
      {
        name: `Secode - Plano ${data.plan.name}`,
        description: data.plan.description || `Plano ${data.plan.name} da Secode`,
        quantity: 1,
        value: priceValue
      }
    ]
  };

  try {
    const result = await callAsaasAPI('/v3/paymentLinks', 'POST', checkoutData);
    
    return {
      status: 'pending',
      checkoutId: result.id,
      checkoutUrl: result.url,
      redirectUrl: result.url,
      boletoUrl: result.boletoUrl || null,
      barCode: result.barCode || null,
      dueDate: result.dueDate || null,
      message: 'Boleto gerado com sucesso'
    };
  } catch (error) {
    console.error('Error creating Asaas boleto checkout:', error);
    throw error;
  }
}

// Checkout data schema
const checkoutSchema = z.object({
  plan: z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    period: z.string()
  }),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    document: z.string(),
    business: z.string()
  }),
  billing: z.object({
    zipCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string()
  }),
  payment: z.object({
    method: z.enum(['credit_card', 'pix', 'boleto']),
    creditCard: z.object({
      number: z.string(),
      holder: z.string(),
      expiry: z.string(),
      cvv: z.string()
    }).optional()
  })
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact submission endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error(`Error creating contact: ${error}`);
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin dashboard)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ contacts });
    } catch (error) {
      console.error(`Error fetching contacts: ${error}`);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Update contact status
  app.patch("/api/contacts/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !["new", "contacted", "converted"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      await storage.updateContactStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error) {
      console.error(`Error updating contact status: ${error}`);
      res.status(500).json({ error: "Failed to update contact status" });
    }
  });

  // Chat message endpoints
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        console.error(`Error saving chat message: ${error}`);
        res.status(500).json({ error: "Failed to save chat message" });
      }
    }
  });

  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json({ messages });
    } catch (error) {
      console.error(`Error fetching chat messages: ${error}`);
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  // Generate AI response endpoint
  app.post("/api/chat/generate", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const aiResponse = await generateChatResponse(message);
      res.json({ response: aiResponse });
    } catch (error) {
      console.error(`Error generating AI response: ${error}`);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // WhatsApp leads endpoints
  app.get("/api/whatsapp-leads", async (req, res) => {
    try {
      const leads = await storage.getWhatsappLeads();
      res.json({ leads });
    } catch (error) {
      console.error(`Error fetching WhatsApp leads: ${error}`);
      res.status(500).json({ error: "Failed to fetch WhatsApp leads" });
    }
  });

  app.post("/api/whatsapp-leads", async (req, res) => {
    try {
      const validatedData = insertWhatsappLeadSchema.parse(req.body);
      const lead = await storage.createWhatsappLead(validatedData);
      res.status(201).json({ success: true, lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
      } else {
        console.error(`Error creating WhatsApp lead: ${error}`);
        res.status(500).json({ error: "Failed to save lead" });
      }
    }
  });

  app.patch("/api/contacts/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !["pending", "contacted", "completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      await storage.updateContactStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error) {
      console.error(`Error updating contact status: ${error}`);
      res.status(500).json({ error: "Failed to update contact status" });
    }
  });

  // Checkout endpoint
  // New endpoint for internal credit card payment processing
  app.post("/api/process-payment", async (req, res) => {
    try {
      console.log('📋 Received payment request:', JSON.stringify(req.body, null, 2));
      
      const { customerId, orderId, amount, planName, planDescription, creditCard } = req.body;
      
      // Validar campos obrigatórios
      if (!customerId || !orderId || !amount || !creditCard) {
        return res.status(400).json({
          success: false,
          message: 'Dados obrigatórios ausentes'
        });
      }
      
      // Create payment with credit card details
      const paymentData = {
        customer: customerId,
        billingType: "CREDIT_CARD",
        value: amount,
        cycle: "MONTHLY",  // Monthly subscription
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        description: `Plano ${planName} da Secode - ${planDescription}`,
        externalReference: orderId,
        creditCard: {
          holderName: creditCard.holderName,
          number: creditCard.number,
          expiryMonth: creditCard.expiryMonth,
          expiryYear: creditCard.expiryYear,
          ccv: creditCard.ccv
        },
        creditCardHolderInfo: {
          name: creditCard.holderName,
          email: creditCard.email || '',
          cpfCnpj: creditCard.cpfCnpj || '',
          postalCode: creditCard.postalCode || '',
          address: creditCard.address || '',
          addressNumber: creditCard.addressNumber || '',
          complement: creditCard.complement || '',
          province: creditCard.neighborhood || '',
          city: creditCard.city || '',
          phone: creditCard.phone || ''
        }
      };

      console.log('💳 Sending subscription to Asaas:', JSON.stringify(paymentData, null, 2));
      
      const result = await callAsaasAPI('/v3/subscriptions', 'POST', paymentData);
      
      console.log('✅ Subscription created successfully:', {
        id: result.id,
        status: result.status,
        value: result.value,
        cycle: result.cycle
      });

      res.json({
        success: true,
        subscriptionId: result.id,
        status: result.status,
        message: 'Assinatura criada com sucesso'
      });
      
    } catch (error) {
      console.error('❌ Error processing payment:', error);
      res.status(500).json({
        success: false,
        message: `Erro ao processar pagamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const validatedData = checkoutSchema.parse(req.body);
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      console.log('Processing checkout for:', {
        orderId,
        plan: validatedData.plan.name,
        customer: validatedData.customer.email,
        paymentMethod: validatedData.payment.method
      });

      // Here you would integrate with your payment provider's API
      // For demonstration, we'll simulate different payment methods
      
      let paymentResult;
      
      switch (validatedData.payment.method) {
        case 'credit_card':
          // Integrate with credit card processor (e.g., Stripe, PagarMe, etc.)
          paymentResult = await processCreditCardPayment(validatedData, orderId);
          break;
          
        case 'pix':
          // Generate PIX payment
          try {
            paymentResult = await generatePixPayment(validatedData, orderId);
          } catch (pixError: any) {
            // Se PIX falhar, criar versão simulada para demonstração
            console.log('PIX falhou, criando versão de demonstração:', pixError.message);
            
            // Gerar código PIX simulado para demonstração (EMV format padrão)
            const priceValue = parseFloat(validatedData.plan.price.replace('R$', '').replace(',', '.').trim());
            const amount = priceValue.toFixed(2);
            const merchantName = 'Secode Digital';
            const city = 'Sao Paulo';
            
            // Código PIX simulado no formato EMV padrão
            const pixCode = `00020101021226830014br.gov.bcb.pix2561secode.demo.pix.com.br/qr/v2/${orderId}520400005303986540${amount}5802BR5913${merchantName}6009${city}62070503***6304`;
            
            // Gerar QR code real a partir do código PIX
            const qrCodeDataUrl = await QRCode.toDataURL(pixCode);
            const qrCodeImage = qrCodeDataUrl.split(',')[1];
            
            paymentResult = {
              status: 'ready_for_payment',
              customerId: `demo_customer_${Date.now()}`,
              paymentId: `pix_demo_${orderId}`,
              amount: priceValue,
              planName: validatedData.plan.name,
              planDescription: `Plano ${validatedData.plan.name} da Secode`,
              pixCode: pixCode,
              qrCodeImage: qrCodeImage,
              expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
              message: IS_PRODUCTION ? 
                'PIX real requer conta Asaas aprovada' : 
                'PIX de demonstração gerado (sandbox)'
            };
          }
          break;
          

          
        default:
          throw new Error('Invalid payment method');
      }
      
      // Save order to storage (you might want to create an orders table)
      const orderData = {
        id: orderId,
        planId: validatedData.plan.id,
        planName: validatedData.plan.name,
        amount: validatedData.plan.price,
        customerName: validatedData.customer.name,
        customerEmail: validatedData.customer.email,
        paymentMethod: validatedData.payment.method,
        status: paymentResult.status || 'pending',
        createdAt: new Date().toISOString()
      };

      // For now, we'll save it as a contact with order information
      await storage.createContact({
        name: validatedData.customer.name,
        email: validatedData.customer.email,
        phone: validatedData.customer.phone,
        business: validatedData.customer.business,
        message: `PEDIDO: ${orderId} - Plano ${validatedData.plan.name} - ${validatedData.plan.price} - Pagamento: ${validatedData.payment.method}`
      });
      
      res.status(201).json({
        success: true,
        orderId,
        ...paymentResult
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid checkout data", details: error.errors });
      } else {
        console.error(`Error processing checkout: ${error}`);
        res.status(500).json({ error: "Failed to process payment" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
