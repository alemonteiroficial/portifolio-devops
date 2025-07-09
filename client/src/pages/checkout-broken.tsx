import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface CheckoutData {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    document: string; // CPF/CNPJ
    business: string;
  };
  billingAddress: {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: 'credit_card';
  creditCard?: {
    number?: string;
    holder?: string;
    expiry?: string;
    cvv?: string;
  };
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export default function Checkout() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      document: '',
      business: ''
    },
    billingAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    paymentMethod: 'credit_card',
    creditCard: {
      number: '',
      holder: '',
      expiry: '',
      cvv: ''
    }
  });

  // Plans data (matching digitalize-planos.tsx)
  const plans = [
    {
      id: 'test',
      name: 'Teste',
      price: 'R$ 5,00',
      period: '/mês',
      description: 'Plano para testes de pagamento',
      features: [
        'Plano apenas para testes',
        'Valor reduzido para sandbox',
        'Todas as funcionalidades do Start',
        'Teste de cartão de crédito',
        'Assinatura mensal recorrente'
      ]
    },
    {
      id: 'start',
      name: 'Start',
      price: 'R$ 48,90',
      period: '/mês',
      description: 'Ideal para começar sua presença digital',
      features: [
        'Mini-site responsivo básico',
        'Até 3 páginas',
        'Formulário de contato',
        'Integração WhatsApp',
        'SSL incluído',
        'Suporte por email'
      ]
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 'R$ 89,00',
      period: '/mês',
      description: 'Perfeito para empresas em crescimento',
      features: [
        'Mini-site responsivo avançado',
        'Até 6 páginas',
        'Formulário de contato inteligente',
        'Chatbot AI básico',
        'Integração WhatsApp Business',
        'Sistema de agendamento',
        'Analytics básico',
        'Suporte prioritário',
        'Backup automático'
      ]
    },
    {
      id: 'master',
      name: 'Master',
      price: 'R$ 247,80',
      period: '/mês',
      description: 'Solução completa para empresas estabelecidas',
      features: [
        'Site responsivo completo',
        'Páginas ilimitadas',
        'Chatbot AI avançado',
        'CRM AI integrado',
        'Automação de marketing',
        'Sistema de agendamento avançado',
        'Analytics completo',
        'Integração com redes sociais',
        'SEO otimizado',
        'Suporte 24/7',
        'Backup e segurança premium',
        'Consultoria mensal incluída'
      ]
    }
  ];

  useEffect(() => {
    // Get plan from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan');
    
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, []);

  const handleInputChange = (section: keyof CheckoutData, field: string, value: string) => {
    setCheckoutData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [field]: value
      }
    }));
  };

  const handleZipCodeChange = async (zipCode: string) => {
    handleInputChange('billingAddress', 'zipCode', zipCode);
    
    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setCheckoutData(prev => ({
            ...prev,
            billingAddress: {
              ...prev.billingAddress,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you'll integrate with your payment provider's API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          customer: checkoutData.customerInfo,
          billing: checkoutData.billingAddress,
          payment: {
            method: checkoutData.paymentMethod,
            creditCard: checkoutData.paymentMethod === 'credit_card' ? checkoutData.creditCard : undefined
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();
      
      if (result.success && result.status === 'ready_for_payment') {
        // Se é cartão de crédito, processar pagamento imediatamente
        if (checkoutData.paymentMethod === 'credit_card') {
          const paymentResponse = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerId: result.customerId,
              orderId: result.orderId,
              amount: result.amount,
              planName: result.planName,
              planDescription: result.planDescription,
              creditCard: {
                holderName: checkoutData.creditCard?.holder || '',
                number: checkoutData.creditCard?.number?.replace(/\s/g, '') || '',
                expiryMonth: checkoutData.creditCard?.expiry?.split('/')[0] || '',
                expiryYear: `20${checkoutData.creditCard?.expiry?.split('/')[1] || ''}`,
                ccv: checkoutData.creditCard?.cvv || '',
                email: checkoutData.customerInfo.email,
                cpfCnpj: checkoutData.customerInfo.document,
                phone: checkoutData.customerInfo.phone,
                postalCode: checkoutData.billingAddress.zipCode,
                address: checkoutData.billingAddress.street,
                addressNumber: checkoutData.billingAddress.number,
                complement: checkoutData.billingAddress.complement,
                neighborhood: checkoutData.billingAddress.neighborhood,
                city: checkoutData.billingAddress.city,
                state: checkoutData.billingAddress.state
              }
            }),
          });

          const paymentResult = await paymentResponse.json();

          if (paymentResult.success) {
            toast({
              title: "Pagamento Aprovado!",
              description: "Seu pagamento foi processado com sucesso.",
            });
            
            window.location.href = `/checkout/success?order=${result.orderId}`;
            return;
          } else {
            throw new Error(paymentResult.message || 'Falha no pagamento');
          }
        } else if (checkoutData.paymentMethod === 'pix') {
          // PIX gerado - exibir QR code na tela
          setPaymentData({
            customerId: result.customerId,
            paymentId: result.paymentId,
            amount: result.amount,
            planName: result.planName,
            planDescription: result.planDescription,
            pixCode: result.pixCode,
            qrCodeImage: result.qrCodeImage,
            expiryDate: result.expiryDate
          });
          
          setShowPixForm(true);
          
          toast({
            title: "PIX Gerado!",
            description: "Use o QR Code abaixo para fazer o pagamento.",
          });
          
          // Scroll to PIX section
          setTimeout(() => {
            const pixSection = document.getElementById('pix-payment');
            if (pixSection) {
              pixSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
          return;
        }
      } else if (result.success && result.redirectUrl) {
        // Checkout externo
        console.log('Redirecionando para:', result.redirectUrl);
        
        toast({
          title: "Redirecionando...",
          description: "Abrindo página de pagamento...",
        });
        
        window.location.href = result.redirectUrl;
      } else if (result.success) {
        toast({
          title: "Pagamento Processado!",
          description: "Seu plano foi ativado com sucesso. Você receberá um email com as instruções.",
        });
        
        // Redirect to success page
        window.location.href = '/checkout/success';
      } else {
        throw new Error(result.message || 'Payment failed');
      }

    } catch (error) {
      toast({
        title: "Erro no Pagamento",
        description: "Houve um problema ao processar seu pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Plano não encontrado</h1>
            <Button onClick={() => window.location.href = '/digitalize-planos'}>
              Voltar aos Planos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Finalizar Compra</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
                      <p className="text-muted-foreground text-sm">{selectedPlan.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      {selectedPlan.features.slice(0, 5).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                      {selectedPlan.features.length > 5 && (
                        <p className="text-xs text-muted-foreground">+ {selectedPlan.features.length - 5} recursos adicionais</p>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {selectedPlan.price}
                        <span className="text-sm font-normal">{selectedPlan.period}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          required
                          value={checkoutData.customerInfo.name}
                          onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={checkoutData.customerInfo.email}
                          onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          required
                          value={checkoutData.customerInfo.phone}
                          onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="document">CPF/CNPJ</Label>
                        <Input
                          id="document"
                          required
                          value={checkoutData.customerInfo.document}
                          onChange={(e) => handleInputChange('customerInfo', 'document', e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="business">Tipo de Negócio</Label>
                      <Input
                        id="business"
                        required
                        value={checkoutData.customerInfo.business}
                        onChange={(e) => handleInputChange('customerInfo', 'business', e.target.value)}
                        placeholder="Ex: Salão de Beleza, Consultório Médico..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Endereço de Cobrança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          required
                          value={checkoutData.billingAddress.zipCode}
                          onChange={(e) => handleZipCodeChange(e.target.value)}
                          placeholder="00000-000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Endereço</Label>
                        <Input
                          id="street"
                          required
                          value={checkoutData.billingAddress.street}
                          onChange={(e) => handleInputChange('billingAddress', 'street', e.target.value)}
                          placeholder="Rua, Avenida..."
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          required
                          value={checkoutData.billingAddress.number}
                          onChange={(e) => handleInputChange('billingAddress', 'number', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={checkoutData.billingAddress.complement}
                          onChange={(e) => handleInputChange('billingAddress', 'complement', e.target.value)}
                          placeholder="Apto, Sala..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          required
                          value={checkoutData.billingAddress.neighborhood}
                          onChange={(e) => handleInputChange('billingAddress', 'neighborhood', e.target.value)}
                          placeholder="Centro, Jardins..."
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          required
                          value={checkoutData.billingAddress.city}
                          onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          required
                          value={checkoutData.billingAddress.state}
                          onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                          placeholder="SP"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                        <i className="fas fa-credit-card text-lg"></i>
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Pagamento recorrente mensal</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-4">

                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            required
                            value={checkoutData.creditCard?.number || ''}
                            onChange={(e) => handleInputChange('creditCard', 'number', e.target.value)}
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardHolder">Nome no Cartão</Label>
                          <Input
                            id="cardHolder"
                            required
                            value={checkoutData.creditCard?.holder || ''}
                            onChange={(e) => handleInputChange('creditCard', 'holder', e.target.value)}
                            placeholder="NOME COMO NO CARTÃO"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input
                              id="cardExpiry"
                              required
                              value={checkoutData.creditCard?.expiry || ''}
                              onChange={(e) => handleInputChange('creditCard', 'expiry', e.target.value)}
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              required
                              value={checkoutData.creditCard?.cvv || ''}
                              onChange={(e) => handleInputChange('creditCard', 'cvv', e.target.value)}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </div>




                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock mr-2"></i>
                      Finalizar Compra - {selectedPlan.price}
                    </>
                  )}
                </Button>
              </form>

              {/* PIX Payment Display */}
              {showPixForm && paymentData && (
                <div id="pix-payment" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <i className="fas fa-qrcode text-primary"></i>
                        Pagamento PIX
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <p>Plano: {paymentData.planName}</p>
                        <p>Valor: R$ {paymentData.amount.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* QR Code Image */}
                      {paymentData.qrCodeImage && (
                        <div className="text-center">
                          <div className="inline-block p-4 bg-white rounded-lg border">
                            <img 
                              src={`data:image/png;base64,${paymentData.qrCodeImage}`}
                              alt="QR Code PIX"
                              className="w-48 h-48 mx-auto"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Escaneie o QR Code com seu app de banco
                          </p>
                        </div>
                      )}

                      {/* PIX Copy Code */}
                      {paymentData.pixCode && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Ou copie o código PIX:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={paymentData.pixCode}
                              readOnly
                              className="flex-1 p-3 border rounded-lg bg-muted text-sm"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText(paymentData.pixCode);
                                toast({
                                  title: "Código copiado!",
                                  description: "Cole no seu app de banco para pagar.",
                                });
                              }}
                            >
                              <i className="fas fa-copy"></i>
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Instructions */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          <i className="fas fa-info-circle mr-2"></i>
                          Como pagar:
                        </h4>
                        <ol className="text-sm text-blue-700 space-y-1">
                          <li>1. Abra o app do seu banco</li>
                          <li>2. Procure a opção "PIX" ou "Pagar com QR Code"</li>
                          <li>3. Escaneie o código ou cole o código PIX</li>
                          <li>4. Confirme o pagamento</li>
                          <li>5. O pagamento é processado instantaneamente!</li>
                        </ol>
                      </div>

                      {/* Timer */}
                      <div className="text-center text-sm text-muted-foreground">
                        <i className="fas fa-clock mr-1"></i>
                        Este PIX expira em 24 horas
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}