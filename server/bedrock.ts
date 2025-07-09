import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

// Respostas inteligentes baseadas em palavras-chave com formatação markdown
function getSmartResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('secode') || message.includes('empresa') || message.includes('sobre')) {
    return `### Sobre a Secode

**A Secode** é especializada em soluções de **IA para transformação digital** de negócios. 

**Nossos principais produtos:**
- **Digitalize Fácil**: Presença digital completa
- **CRM AI**: Gestão inteligente de clientes  
- **Gestão Inteligente**: Automação de processos

Automatizamos processos e aceleramos resultados para pequenos empreendedores.`;
  }
  
  if (message.includes('digitalize') || message.includes('site') || message.includes('presença digital')) {
    return `### Digitalize Fácil

O **Digitalize Fácil** é nossa solução completa de presença digital com IA integrada.

**Inclui:**
- Mini-site responsivo e profissional
- Atendimento inteligente 24/7
- Sistema de agendamento automatizado
- Integração com redes sociais
- Analytics e relatórios automatizados

Transforme sua presença digital rapidamente!`;
  }
  
  if (message.includes('crm') || message.includes('cliente') || message.includes('relacionamento')) {
    return `### CRM AI

Nosso **CRM AI** oferece gestão inteligente de clientes com tecnologia avançada.

**Funcionalidades principais:**
- **Automação de follow-up**
- **Análise comportamental** de clientes
- **Comunicação personalizada**
- **Previsão de vendas** baseada em IA
- **Segmentação inteligente** de leads

Maximize seu relacionamento com clientes!`;
  }
  
  if (message.includes('preço') || message.includes('valor') || message.includes('custo')) {
    return `### Orçamento Personalizado

Oferecemos **soluções personalizadas** para cada tipo de negócio.

**Como solicitar:**
- Formulário no site
- WhatsApp: **(11) 5197-1617**
- Email: **contato@secode.com.br**

Receba uma proposta adequada às suas necessidades específicas!`;
  }
  
  if (message.includes('contato') || message.includes('falar') || message.includes('conversar')) {
    return `### Fale Conosco

**Canais de atendimento:**

- **WhatsApp**: (11) 5197-1617
- **Email**: contato@secode.com.br  
- **Formulário**: Disponível em nosso site

Estamos prontos para ajudar você a crescer!`;
  }
  
  if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || message.includes('boa tarde')) {
    return `### Olá! 👋

Sou o **SecodIA**, assistente virtual da Secode.

**Como posso ajudar você hoje?**
- Falar sobre nossas soluções de IA
- Apresentar nossos produtos
- Esclarecer dúvidas sobre transformação digital
- Conectar você com nossa equipe

Estou aqui para ajudar no seu crescimento digital!`;
  }
  
  return `### Soluções de IA e Transformação Digital

A **Secode** oferece produtos inovadores para pequenos empreendedores:

**Nossos produtos:**
- **Digitalize Fácil**: Presença digital completa
- **CRM AI**: Gestão inteligente de clientes
- **Gestão Inteligente**: Automação empresarial

Que tipo de solução você gostaria de conhecer melhor?`;
}

export async function generateChatResponse(userMessage: string): Promise<string> {
  // Primeiro, tenta usar Amazon Bedrock
  try {
    const systemMessage = `Você é o SecodIA, assistente virtual da Secode. A Secode oferece soluções de IA para pequenos empreendedores brasileiros.

**PRODUTOS PRINCIPAIS:**
- **Digitalize Fácil**: Presença digital completa com IA integrada
- **CRM AI**: Gestão inteligente de relacionamento com clientes  
- **Gestão Inteligente**: Automação de processos empresariais

**INSTRUÇÕES DE FORMATAÇÃO:**
- Use **negrito** para destacar títulos e conceitos importantes
- Use ### para criar subtítulos organizados
- Organize informações em listas quando apropriado
- Adicione espaçamento adequado entre seções
- Seja detalhado mas mantenha formato profissional
- Sempre responda em português brasileiro de forma amigável e prestativa

Formate suas respostas usando markdown para melhor legibilidade.`;
    
    const command = new InvokeModelCommand({
      modelId: "amazon.nova-micro-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inferenceConfig: {
          max_new_tokens: 1200
        },
        messages: [
          {
            role: "user",
            content: [
              {
                text: `${systemMessage}\n\nUsuário: ${userMessage}`
              }
            ]
          }
        ]
      })
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    return responseBody.output?.message?.content?.[0]?.text || getSmartResponse(userMessage);
  } catch (error) {
    console.log("Amazon Bedrock não disponível, usando respostas inteligentes locais");
    return getSmartResponse(userMessage);
  }
}