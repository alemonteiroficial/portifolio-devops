# Configuração do Supabase - Guia Completo

## 1. Acesso ao Painel do Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: **txtqnsldwdjrhkgewock**

## 2. Criar as Tabelas

### Passo 1: Abrir o SQL Editor
1. No painel do Supabase, clique em **SQL Editor** (no menu lateral)
2. Clique em **New Query** para criar uma nova consulta

### Passo 2: Executar o Script SQL
1. Copie todo o conteúdo do arquivo `supabase-schema.sql`
2. Cole no editor SQL
3. Clique em **Run** para executar

### Passo 3: Verificar as Tabelas
1. Vá em **Table Editor** (no menu lateral)
2. Você deve ver 4 tabelas criadas:
   - `users`
   - `contacts` 
   - `chat_messages`
   - `whatsapp_leads`

## 3. Configurar o Sistema para Usar o Supabase

### Opção A: Usar o Supabase como Banco Principal
```bash
# No terminal do Replit, execute:
# Isso mudará o sistema para usar o Supabase
```

### Opção B: Manter Neon como Principal (Recomendado)
O sistema atual está funcionando perfeitamente com Neon. O Supabase fica como backup.

## 4. Testar a Conexão

Após criar as tabelas, teste a conexão:

```bash
curl -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHFuc2xkd2RqcmhrZ2V3b2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjU2MTcsImV4cCI6MjA2NzY0MTYxN30.5lu6iEBe8vVVtCroP76fR-X2e61QQRZH1-u93835t9A" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHFuc2xkd2RqcmhrZ2V3b2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjU2MTcsImV4cCI6MjA2NzY0MTYxN30.5lu6iEBe8vVVtCroP76fR-X2e61QQRZH1-u93835t9A" \
  "https://txtqnsldwdjrhkgewock.supabase.co/rest/v1/contacts?select=*"
```

## 5. Migrar para o Supabase (Opcional)

Se quiser migrar do Neon para o Supabase:

1. Execute o script SQL no Supabase
2. Modifique o arquivo `server/storage.ts`:
   ```typescript
   import { SupabaseStorage } from "./supabase-storage";
   export const storage = new SupabaseStorage();
   ```
3. Reinicie o servidor

## 6. Vantagens do Supabase

- ✅ Interface visual amigável
- ✅ Backup automático
- ✅ Escalabilidade
- ✅ API REST automática
- ✅ Real-time subscriptions
- ✅ Autenticação integrada

## 7. Status Atual

**Sistema atual:** Funcionando com Neon PostgreSQL
**Supabase:** Configurado e pronto para uso
**Recomendação:** Manter Neon como principal, Supabase como backup

## Instruções Rápidas

Para migrar agora:
1. Execute o SQL no painel do Supabase
2. Me avise quando terminar
3. Eu faço a migração automática do código