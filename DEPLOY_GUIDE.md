# Guia de Deploy - Secode Website

## Opção 1: Deploy no Netlify (Recomendado)

### Passos:
1. **Conecte ao GitHub:**
   - Faça push deste código para um repositório GitHub
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub

2. **Configurações de Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Variáveis de Ambiente:**
   - Vá em Site settings > Environment variables
   - Adicione: `OPENAI_API_KEY` = sua chave da OpenAI

4. **Deploy:**
   - O Netlify fará o deploy automaticamente
   - As funções serverless em `netlify/functions/` serão deployadas automaticamente

## Opção 2: Deploy no AWS Amplify

### Para funcionar no Amplify, você precisa configurar API Gateway + Lambda:

1. **Criar funções Lambda:**
   - Criar Lambda function `chatApi` usando código em `amplify/backend/function/chatApi/src/index.js`
   - Criar Lambda function `contactApi` usando código em `amplify/backend/function/contactApi/src/index.js`
   - Configurar variável de ambiente `OPENAI_API_KEY` em ambas as funções

2. **Configurar API Gateway:**
   - Criar API REST no API Gateway
   - Criar recursos `/api/chat/generate` (POST) → chatApi Lambda
   - Criar recursos `/api/contacts` (POST) → contactApi Lambda
   - Habilitar CORS para todos os recursos

3. **Deploy no Amplify:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Configurar `OPENAI_API_KEY` nas variáveis de ambiente

### Detecção Automática:
O código detecta automaticamente se está rodando no Amplify (domínios *.amplifyapp.com) e usa os endpoints corretos.

### URLs das Funções:
- Chat: `/.netlify/functions/chat` (Netlify) ou sua URL da Lambda (Amplify)
- Contato: `/.netlify/functions/contact` (Netlify) ou sua URL da Lambda (Amplify)

## Arquivos Criados para Deploy:

### Para Netlify:
- `netlify/functions/chat.js` - Função do chat com OpenAI
- `netlify/functions/contact.js` - Função do formulário de contato
- `netlify.toml` - Configuração do Netlify

### Para Amplify:
- `amplify/backend/function/chatApi/` - Função Lambda do chat
- `amplify/backend/function/contactApi/` - Função Lambda do contato
- `amplify.yml` - Configuração do Amplify

## Funcionalidades:
- ✅ Chat com IA integrado à OpenAI
- ✅ Formulário de contato funcional
- ✅ Site responsivo e profissional
- ✅ Auto-abertura do chat na primeira visita
- ✅ Todas as informações da Secode atualizadas

## Importante:
- Lembre-se de configurar a variável `OPENAI_API_KEY` na plataforma escolhida
- O chat só funcionará após a configuração da chave da OpenAI