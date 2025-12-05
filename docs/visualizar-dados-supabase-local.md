# Como Visualizar Dados do Supabase Local

Este guia explica as diferentes formas de visualizar os dados do banco de dados Supabase quando ele está rodando localmente.

## 📋 Pré-requisitos

Certifique-se de que o Supabase está rodando localmente:

```bash
npx supabase@latest start
```

Para verificar o status:

```bash
npx supabase@latest status
```

## 🎯 Método 1: Supabase Studio (Recomendado - Interface Web)

O Supabase Studio é a interface web mais fácil e completa para visualizar dados.

### Passos:

1. **Acesse o Supabase Studio:**
   - Abra seu navegador e vá para: `http://127.0.0.1:54323`
   - Ou use: `http://localhost:54323`

2. **Visualizar dados na tabela:**
   - No menu lateral esquerdo, clique em **Table Editor**
   - Selecione a tabela `leads` (ou qualquer outra tabela)
   - Você verá todos os registros em formato de tabela
   - Pode filtrar, ordenar e editar diretamente na interface

3. **Usar o SQL Editor:**
   - No menu lateral, clique em **SQL Editor**
   - Digite suas consultas SQL, por exemplo:
   ```sql
   -- Ver todos os leads
   SELECT * FROM leads ORDER BY created_at DESC;
   
   -- Contar leads por profissão
   SELECT profissao, COUNT(*) as total 
   FROM leads 
   GROUP BY profissao 
   ORDER BY total DESC;
   
   -- Ver leads de uma cidade específica
   SELECT * FROM leads WHERE cidade = 'São Paulo';
   ```
   - Clique em **Run** ou pressione `Ctrl+Enter` para executar

## 🔧 Método 2: Via Linha de Comando (psql)

Se você tem o PostgreSQL client instalado, pode usar o `psql` diretamente.

### Conectar ao banco:

```bash
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### Consultas úteis:

```sql
-- Listar todas as tabelas
\dt

-- Ver estrutura da tabela leads
\d leads

-- Ver todos os leads
SELECT * FROM leads;

-- Contar total de leads
SELECT COUNT(*) FROM leads;

-- Ver leads mais recentes
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- Sair do psql
\q
```

## 📊 Método 3: Ferramentas Externas (pgAdmin, DBeaver, etc.)

Você pode usar qualquer cliente PostgreSQL para conectar ao banco local.

### Dados de conexão:

- **Host:** `127.0.0.1` ou `localhost`
- **Porta:** `54322`
- **Database:** `postgres`
- **Usuário:** `postgres`
- **Senha:** `postgres`

### Exemplo com DBeaver:

1. Abra o DBeaver
2. Crie uma nova conexão PostgreSQL
3. Preencha os dados acima
4. Teste a conexão e conecte
5. Navegue até `postgres` > `Schemas` > `public` > `Tables` > `leads`

## 🔍 Método 4: Via API REST (para scripts)

Você pode usar a API REST do Supabase local para consultar dados programaticamente.

### URL base:
```
http://127.0.0.1:54321/rest/v1
```

### Exemplo com curl:

```bash
# Ver todos os leads (requer autenticação)
curl -X GET "http://127.0.0.1:54321/rest/v1/leads" \
  -H "apikey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH" \
  -H "Authorization: Bearer sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"
```

**Nota:** A chave de API pode variar. Execute `npx supabase@latest status` para ver a chave atual.

## 📝 Consultas SQL Úteis

Aqui estão algumas consultas úteis que você pode executar no SQL Editor:

```sql
-- Ver todos os leads com informações completas
SELECT 
  id,
  nome,
  email,
  profissao,
  cidade,
  estado,
  estagio_carreira,
  created_at,
  source
FROM leads
ORDER BY created_at DESC;

-- Estatísticas gerais
SELECT 
  COUNT(*) as total_leads,
  COUNT(DISTINCT email) as emails_unicos,
  COUNT(DISTINCT cidade) as cidades_diferentes,
  MIN(created_at) as primeiro_lead,
  MAX(created_at) as ultimo_lead
FROM leads;

-- Leads por profissão
SELECT 
  profissao,
  COUNT(*) as quantidade
FROM leads
GROUP BY profissao
ORDER BY quantidade DESC;

-- Leads por estado
SELECT 
  estado,
  COUNT(*) as quantidade
FROM leads
GROUP BY estado
ORDER BY quantidade DESC;

-- Leads por cidade
SELECT 
  cidade,
  estado,
  COUNT(*) as quantidade
FROM leads
GROUP BY cidade, estado
ORDER BY quantidade DESC;

-- Leads por estágio de carreira
SELECT 
  estagio_carreira,
  COUNT(*) as quantidade
FROM leads
GROUP BY estagio_carreira
ORDER BY quantidade DESC;

-- Leads criados hoje
SELECT * FROM leads 
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- Leads criados na última semana
SELECT * FROM leads 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🛠️ Comandos Úteis do Supabase CLI

```bash
# Ver status e informações de conexão
npx supabase@latest status

# Parar o Supabase local
npx supabase@latest stop

# Reiniciar o Supabase local
npx supabase@latest restart

# Ver logs do banco de dados
npx supabase@latest db logs

# Resetar o banco de dados (CUIDADO: apaga todos os dados!)
npx supabase@latest db reset
```

## ⚠️ Observações Importantes

1. **Row Level Security (RLS):** A tabela `leads` tem RLS habilitado. No ambiente local, você pode precisar ajustar as políticas se tiver problemas de acesso.

2. **Dados locais:** Os dados no Supabase local são armazenados em volumes Docker e persistem entre reinicializações, mas são apagados se você executar `supabase db reset`.

3. **Chaves de API:** As chaves de API locais são diferentes das chaves do projeto em produção. Use as chaves mostradas em `supabase status`.

4. **Porta do Studio:** Se a porta 54323 estiver ocupada, o Supabase tentará usar outra porta. Verifique o output de `supabase status` para a porta correta.

## 🆘 Troubleshooting

### Studio não abre:
- Verifique se o Supabase está rodando: `npx supabase@latest status`
- Tente acessar `http://localhost:54323` ou `http://127.0.0.1:54323`
- Verifique se há algum firewall bloqueando a porta

### Não consigo ver dados:
- Verifique se a tabela existe: `SELECT * FROM information_schema.tables WHERE table_name = 'leads';`
- Verifique se há dados: `SELECT COUNT(*) FROM leads;`
- Se a tabela não existir, execute o schema: `supabase/schema.sql`

### Erro de permissão:
- No ambiente local, você pode temporariamente desabilitar RLS para testes:
  ```sql
  ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
  ```
  (Lembre-se de reabilitar depois: `ALTER TABLE leads ENABLE ROW LEVEL SECURITY;`)

