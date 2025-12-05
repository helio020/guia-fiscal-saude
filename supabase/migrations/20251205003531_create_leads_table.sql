-- Schema para tabela de leads
-- Migration para desenvolvimento local - RLS desabilitado
-- Para produção, execute também: 20251205010143_enable_rls_for_production.sql

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  profissao TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  estagio_carreira TEXT NOT NULL,
  source TEXT DEFAULT 'landing_primeiros_passos'
);

-- Índice para melhorar performance em consultas por email
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Índice para melhorar performance em consultas por data de criação
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Índice para melhorar performance em consultas por profissão
CREATE INDEX IF NOT EXISTS idx_leads_profissao ON leads(profissao);

-- Comentários nas colunas para documentação
COMMENT ON TABLE leads IS 'Tabela para armazenar leads capturados na landing page do guia fiscal';
COMMENT ON COLUMN leads.source IS 'Origem do lead, útil para tracking de campanhas';

-- Desabilita RLS para desenvolvimento local
-- Em produção, você pode reabilitar e criar políticas adequadas
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;


