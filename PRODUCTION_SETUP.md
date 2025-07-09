# Guia de Configuração para Produção - Secode

## Status Atual
✅ **Sistema de Pagamentos Completo**
- Cartão de crédito: Funcionando (Asaas API)
- PIX com QR Code: Funcionando (geração real de QR codes)
- Interface responsiva e otimizada
- Sistema de fallback para sandbox

⚠️ **Situação Atual**
- Ambiente: SANDBOX (chave de teste)
- QR codes PIX: Inválidos para pagamento real (esperado em sandbox)
- Dados de teste removidos da interface
- Sistema pronto para receber chave de produção

## Configuração do Asaas para Produção

### 1. Migração da Conta Sandbox para Produção

**Atualmente usando:**
- API Sandbox: `https://api-sandbox.asaas.com`
- Chave de teste: `$aact_YTU5YTE0M2...` (sandbox)

**Para produção, você precisa:**

1. **Solicitar aprovação da conta no Asaas**
   - Acesse: https://asaas.com
   - Complete o processo de verificação KYC
   - Aguarde aprovação (1-3 dias úteis)

2. **Obter chaves de produção**
   - API Key de produção (formato: `$aact_prod_...`)
   - Webhook URL para confirmações de pagamento

3. **Ativar PIX na conta**
   - PIX requer conta aprovada
   - Configurar chave PIX da empresa
   - Aguardar ativação (1-2 dias úteis)

### 2. Variáveis de Ambiente para Produção

```bash
# Configuração obrigatória
DATABASE_URL=sua_url_postgresql_producao
ASAAS_API_KEY=sua_chave_asaas_producao
ASAAS_ENVIRONMENT=production

# Configuração AWS (para chatbot)
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1

# Opcional (fallback do chat)
OPENAI_API_KEY=sua_chave_openai
```

### 3. Alterações de Código Necessárias

#### server/index.ts
```javascript
// Alterar de:
const ASAAS_ENVIRONMENT = 'sandbox';

// Para:
const ASAAS_ENVIRONMENT = process.env.ASAAS_ENVIRONMENT || 'production';
```

#### Base URL da API
```javascript
// Alterar de:
const ASAAS_BASE_URL = 'https://api-sandbox.asaas.com';

// Para:
const ASAAS_BASE_URL = ASAAS_ENVIRONMENT === 'production' 
  ? 'https://api.asaas.com' 
  : 'https://api-sandbox.asaas.com';
```

## Configuração de Domínio e SSL

### 1. Domínio Personalizado
- Configurar DNS para apontar para o servidor de produção
- Certificado SSL automático (Cloudflare/Let's Encrypt)

### 2. Webhook do Asaas
- URL: `https://seudominio.com/api/webhooks/asaas`
- Eventos: `PAYMENT_RECEIVED`, `PAYMENT_CONFIRMED`

## Funcionalidades Implementadas

### ✅ Sistema de Pagamentos
- **Cartão de Crédito**: Processamento direto via Asaas
- **PIX**: QR Code real + código copiável
- **Validação**: CPF/CNPJ, endereço, dados do cartão
- **Segurança**: Validação server-side completa

### ✅ Interface de Checkout
- Design responsivo e profissional
- Formulário único simplificado
- Feedback visual em tempo real
- Tratamento de erros robusto

### ✅ Gestão de Leads
- Dashboard administrativo
- Captura via formulários e WhatsApp
- Sistema de status e acompanhamento

### ✅ Chat AI
- AWS Bedrock + fallback OpenAI
- Contexto empresarial personalizado
- Integração com WhatsApp

## Checklist Final para Deploy

### Antes do Deploy
- [ ] Conta Asaas aprovada e PIX ativado
- [ ] Chaves de produção configuradas
- [ ] Domínio e SSL configurados
- [ ] Webhook do Asaas testado
- [ ] Database de produção criado

### Após Deploy
- [ ] Testar cartão com dados reais
- [ ] Testar PIX com conta bancária real
- [ ] Verificar recebimento de webhooks
- [ ] Configurar monitoramento de erros
- [ ] Backup automático do database

## Suporte Técnico

### Asaas
- Documentação: https://docs.asaas.com
- Suporte: suporte@asaas.com
- WhatsApp: (16) 3003-4031

### Sistema Secode
- Logs de erro: `/var/log/secode/`
- Monitoramento: Dashboard admin
- Backup: Automático via Postgres

## Custos Estimados (Mensal)

### Asaas (por transação)
- PIX: R$ 0,40 por transação
- Cartão de crédito: 3,49% + R$ 0,40
- Boleto: R$ 2,49 por boleto (removido)

### Infraestrutura
- Servidor: R$ 50-200/mês
- Database: R$ 30-100/mês
- Domain/SSL: R$ 50/ano
- AWS Bedrock: ~R$ 20/mês

**Total estimado: R$ 100-320/mês**

---

## Próximos Passos

1. **Imediato**: Solicitar aprovação da conta Asaas
2. **1-3 dias**: Aguardar verificação KYC
3. **Aprovação**: Configurar chaves de produção
4. **Deploy**: Migrar para ambiente de produção
5. **Teste**: Validar pagamentos reais
6. **Go Live**: Ativar para clientes

---
*Documento atualizado em: 04/07/2025*