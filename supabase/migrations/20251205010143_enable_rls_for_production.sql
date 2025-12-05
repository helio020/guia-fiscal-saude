-- Migration opcional para habilitar RLS em produção
-- Execute esta migration APENAS em produção, não em desenvolvimento local
-- 
-- Para aplicar em produção:
-- 1. Faça push desta migration: npx supabase db push
-- 2. Ou execute manualmente no SQL Editor do Supabase em produção

-- Habilita Row Level Security (RLS) na tabela
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON leads;
DROP POLICY IF EXISTS "Permitir leitura apenas para autenticados" ON leads;

-- Política 1: Permitir INSERT para usuários anônimos (público)
-- Isso permite que a landing page insira leads usando a chave anônima
CREATE POLICY "Permitir inserção pública de leads"
  ON leads
  FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

-- Política 2: Permitir SELECT apenas para usuários autenticados ou service_role
-- Isso protege os dados dos leads, permitindo apenas acesso autenticado
CREATE POLICY "Permitir leitura apenas para autenticados"
  ON leads
  FOR SELECT
  TO authenticated, service_role
  USING (true);

