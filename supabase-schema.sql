-- Script SQL para criar tabelas no Supabase
-- Execute este script no painel SQL do Supabase (Dashboard > SQL Editor)

-- Habilitar RLS (Row Level Security) por padrão
-- SET row_security = on;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Criar tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    business TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Criar tabela de mensagens de chat
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    message TEXT NOT NULL,
    is_user BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Criar tabela de leads do WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_leads (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    plan TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Inserir dados de teste
INSERT INTO users (username, password) VALUES 
('admin', 'admin123');

INSERT INTO contacts (name, email, phone, business, message, status) VALUES 
('João Silva', 'joao@exemplo.com', '11999999999', 'Padaria Silva', 'Interessado no sistema de gestão', 'new'),
('Maria Santos', 'maria@gmail.com', '11888888888', 'Loja da Maria', 'Gostaria de saber mais sobre automação', 'contacted'),
('Pedro Oliveira', 'pedro@hotmail.com', '11777777777', 'Oficina do Pedro', 'Preciso de ajuda com vendas online', 'new');

INSERT INTO whatsapp_leads (name, email, phone, plan, source) VALUES 
('Ana Costa', 'ana@gmail.com', '11666663456', 'start', 'digitalize-planos'),
('Carlos Lima', 'carlos@yahoo.com', '11555554321', 'plus', 'plano-detalhes'),
('Fernanda Rocha', 'fernanda@gmail.com', '11444445678', 'master', 'digitalize-comparacao');

INSERT INTO chat_messages (session_id, message, is_user) VALUES 
('demo-session-123', 'Olá! Como posso ajudar?', false),
('demo-session-123', 'Preciso de informações sobre os planos', true),
('demo-session-123', 'Claro! Temos 3 planos disponíveis: Start, Plus e Master. Qual seu interesse?', false);

-- Habilitar acesso público (desabilitar RLS para teste)
-- IMPORTANTE: Em produção, configure RLS adequadamente
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir acesso público (apenas para desenvolvimento)
CREATE POLICY "Allow public access" ON users FOR ALL USING (true);
CREATE POLICY "Allow public access" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow public access" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Allow public access" ON whatsapp_leads FOR ALL USING (true);

-- Confirmação
SELECT 'Tabelas criadas com sucesso!' as status;