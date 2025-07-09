// Script para criar tabelas no Supabase automaticamente
const SUPABASE_URL = 'https://txtqnsldwdjrhkgewock.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dHFuc2xkd2RqcmhrZ2V3b2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjU2MTcsImV4cCI6MjA2NzY0MTYxN30.5lu6iEBe8vVVtCroP76fR-X2e61QQRZH1-u93835t9A';

async function createTables() {
  console.log('🔧 Criando tabelas no Supabase...');
  
  // Criar tabela contacts
  try {
    const contactsResponse = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify([{
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '11999999999',
        business: 'Padaria Silva',
        message: 'Interessado no sistema de gestão',
        status: 'new'
      }])
    });
    
    if (contactsResponse.ok) {
      console.log('✅ Tabela contacts criada com sucesso');
    } else {
      console.log('❌ Erro ao criar tabela contacts:', await contactsResponse.text());
    }
  } catch (error) {
    console.log('❌ Erro ao criar tabela contacts:', error.message);
  }
  
  // Criar tabela whatsapp_leads
  try {
    const leadsResponse = await fetch(`${SUPABASE_URL}/rest/v1/whatsapp_leads`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify([{
        name: 'Ana Costa',
        email: 'ana@gmail.com',
        phone: '11666663456',
        plan: 'start',
        source: 'digitalize-planos'
      }])
    });
    
    if (leadsResponse.ok) {
      console.log('✅ Tabela whatsapp_leads criada com sucesso');
    } else {
      console.log('❌ Erro ao criar tabela whatsapp_leads:', await leadsResponse.text());
    }
  } catch (error) {
    console.log('❌ Erro ao criar tabela whatsapp_leads:', error.message);
  }
  
  // Criar tabela chat_messages
  try {
    const messagesResponse = await fetch(`${SUPABASE_URL}/rest/v1/chat_messages`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify([{
        session_id: 'demo-session-123',
        message: 'Olá! Como posso ajudar?',
        is_user: false
      }])
    });
    
    if (messagesResponse.ok) {
      console.log('✅ Tabela chat_messages criada com sucesso');
    } else {
      console.log('❌ Erro ao criar tabela chat_messages:', await messagesResponse.text());
    }
  } catch (error) {
    console.log('❌ Erro ao criar tabela chat_messages:', error.message);
  }
  
  // Criar tabela users
  try {
    const usersResponse = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify([{
        username: 'admin',
        password: 'admin123'
      }])
    });
    
    if (usersResponse.ok) {
      console.log('✅ Tabela users criada com sucesso');
    } else {
      console.log('❌ Erro ao criar tabela users:', await usersResponse.text());
    }
  } catch (error) {
    console.log('❌ Erro ao criar tabela users:', error.message);
  }
  
  console.log('🎉 Processo de criação de tabelas finalizado!');
}

// Executar o script
createTables().catch(console.error);