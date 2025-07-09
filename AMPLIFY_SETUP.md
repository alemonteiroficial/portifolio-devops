# Configuração AWS Amplify - Guia Completo

## Passo 1: Criar Funções Lambda

### 1.1 Função para Chat (Lambda)
1. Acesse AWS Lambda Console
2. Criar nova função: `secode-chat-api`
3. Runtime: Node.js 18.x
4. Copie o código abaixo na seção "Código das Funções Lambda"
5. Configurar variável de ambiente: `OPENAI_API_KEY`
6. Adicionar layer do OpenAI ou fazer upload com node_modules

### 1.2 Função para Contato (Lambda)
1. Criar nova função: `secode-contact-api`
2. Runtime: Node.js 18.x
3. Copie o código abaixo na seção "Código das Funções Lambda"

## Passo 2: Configurar API Gateway

### 2.1 Criar API REST
1. Acesse API Gateway Console
2. Criar nova "REST API"
3. Nome: `secode-api`

### 2.2 Configurar recursos
1. Criar recurso `/chat`
   - Método POST → Integrar com `secode-chat-api`
   - Habilitar CORS
2. Criar recurso `/contact`
   - Método POST → Integrar com `secode-contact-api`
   - Habilitar CORS

### 2.3 Deploy da API
1. Deploy para stage "prod"
2. Anote a URL base: `https://xxxxxxxxxx.execute-api.region.amazonaws.com/prod`

## Passo 3: Obter Chave da OpenAI

### 3.1 Criar Conta e Obter API Key
1. Acesse https://platform.openai.com
2. Crie uma conta (se não tiver uma)
3. Faça login e vá para "API keys" no menu
4. Clique em "Create new secret key"
5. Dê um nome para a chave (ex: "secode-chatbot")
6. Copie a chave gerada (ela começa com "sk-")
7. **IMPORTANTE:** Guarde essa chave em local seguro, ela não será exibida novamente

### 3.2 Configurar Chave na Função Lambda
1. No AWS Lambda Console, abra a função `secode-chat-api`
2. Vá na aba "Configuration" → "Environment variables"
3. Clique em "Edit"
4. Adicione nova variável:
   - Key: `OPENAI_API_KEY`
   - Value: sua chave da OpenAI (sk-...)
5. Salve as alterações

## Passo 4: Configurar Amplify

### 4.1 Variáveis de Ambiente no Amplify
No console do Amplify, adicione estas variáveis:
- `VITE_CHAT_API_URL`: `https://sua-api.execute-api.region.amazonaws.com/prod/chat`
- `VITE_CONTACT_API_URL`: `https://sua-api.execute-api.region.amazonaws.com/prod/contact`

### 4.2 Build Settings
O arquivo `amplify.yml` já está configurado:
- Build command: `npx vite build`
- Output: `dist/public`

## Código das Funções Lambda

### Chat Function (secode-chat-api)

**IMPORTANTE: Configure timeout para 30 segundos**
1. Lambda → Configuration → General configuration → Edit → Timeout: 30 segundos
2. Chamadas para OpenAI podem demorar 5-10 segundos, timeout padrão de 3s causa erro 502

```javascript
export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
  };

  if (event.httpMethod === 'OPTIONS') {
    return { 
      statusCode: 200, 
      headers,
      body: JSON.stringify({})
    };
  }

  try {
    if (!event.body) {
      throw new Error('Request body is missing');
    }
    
    const { message } = JSON.parse(event.body);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o", // Use gpt-4o, gpt-4-turbo, ou gpt-4 (NÃO use 4.1)
        messages: [{
          role: "system",
          content: "Você é o SecodIA, assistente virtual da Secode. A Secode oferece soluções de IA para pequenos empreendedores brasileiros, incluindo presença digital, automação e consultoria tecnológica. Seja prestativo e responda em português."
        }, {
          role: "user",
          content: message
        }],
        max_tokens: 150, // Reduzido para evitar timeouts
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response: data.choices[0].message.content 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Erro interno do servidor",
        details: error.message
      })
    };
  }
};
```

### Contact Function (secode-contact-api)
```javascript
exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { name, email, phone, business, message } = JSON.parse(event.body);
    
    console.log('Contato recebido:', { name, email, phone, business, message });
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Contato enviado com sucesso!' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Erro interno do servidor" 
      })
    };
  }
};
```

## Passo 5: Deploy Final

### 5.1 Verificar Configurações
Confirme se você configurou:
- ✅ Chave OpenAI na função Lambda `secode-chat-api`
- ✅ URLs das APIs nas variáveis do Amplify
- ✅ CORS habilitado no API Gateway

### 5.2 Testar o Deploy
1. Faça um novo deploy no Amplify (ou aguarde o automático)
2. Acesse seu site em produção
3. Teste o chatbot - ele deve abrir automaticamente na primeira visita
4. Teste o formulário de contato

### 5.3 Solução de Problemas
Se o chatbot não funcionar:
- Verifique se a chave OpenAI está correta na função Lambda
- Verifique se as URLs estão corretas no Amplify
- Verifique os logs da função Lambda no CloudWatch

## Resultado Final
- Site funcionando no Amplify
- Chat com IA usando OpenAI
- Formulário de contato funcional
- URLs configuráveis via variáveis de ambiente
- Documentação completa para manutenção