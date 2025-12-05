# Supabase - Configuração do Banco de Dados

Este diretório contém as migrations do banco de dados Supabase.

## 📁 Estrutura

```
supabase/
├── migrations/           # Migrations do banco de dados
│   ├── 20251205003531_create_leads_table.sql          # Cria tabela (dev local)
│   └── 20251205010143_enable_rls_for_production.sql   # Habilita RLS (produção)
└── functions/           # Edge Functions
```

## 🚀 Desenvolvimento Local

Para desenvolvimento local, o RLS está **desabilitado** para facilitar os testes.

A migration `20251205003531_create_leads_table.sql` cria a tabela `leads` e desabilita o RLS.

### Aplicar migrations localmente:

```bash
npx supabase@latest db reset
```

Isso aplica todas as migrations, incluindo a criação da tabela com RLS desabilitado.

## 🌐 Produção

Para produção, você **deve** habilitar o RLS para proteger os dados.

### Opção 1: Aplicar migration de produção (Recomendado)

A migration `20251205010143_enable_rls_for_production.sql` habilita RLS e cria políticas de segurança.

**Atenção:** Esta migration NÃO é aplicada automaticamente no ambiente local. Ela deve ser aplicada apenas em produção.

Para aplicar em produção:

```bash
# Fazer push das migrations para produção
npx supabase@latest db push
```

Ou execute manualmente no SQL Editor do Supabase em produção.

### Opção 2: Executar SQL manualmente em produção

Se preferir, você pode executar o SQL diretamente no SQL Editor do Supabase em produção:

1. Acesse o dashboard do Supabase
2. Vá em **SQL Editor**
3. Execute o conteúdo de `supabase/migrations/20251205010143_enable_rls_for_production.sql`

## 🔒 Políticas de Segurança (RLS)

### Em Desenvolvimento Local:
- RLS **desabilitado** - permite inserções sem autenticação

### Em Produção:
- RLS **habilitado** com as seguintes políticas:
  - **INSERT**: Permitido para `anon`, `authenticated` e `service_role`
  - **SELECT**: Permitido apenas para `authenticated` e `service_role`
  - **UPDATE/DELETE**: Bloqueado (leads não devem ser editados)

## 📊 Tabela `leads`

A tabela `leads` armazena os dados dos formulários da landing page:

- `id` (UUID) - Chave primária
- `created_at` (TIMESTAMP) - Data de criação
- `nome` (TEXT) - Nome do lead
- `email` (TEXT) - Email do lead (único)
- `profissao` (TEXT) - Profissão
- `cidade` (TEXT) - Cidade
- `estado` (TEXT) - Estado (UF)
- `estagio_carreira` (TEXT) - Estágio da carreira
- `source` (TEXT) - Origem do lead (padrão: 'landing_primeiros_passos')

## 🔧 Comandos Úteis

```bash
# Ver status do Supabase local
npx supabase@latest status

# Aplicar migrations localmente
npx supabase@latest db reset

# Ver migrations pendentes
npx supabase@latest migration list

# Criar nova migration
npx supabase@latest migration new nome_da_migration
```

## ⚠️ Importante

- **Nunca** execute a migration de produção (`enable_rls_for_production.sql`) no ambiente local
- Sempre teste as migrations localmente antes de aplicar em produção
- Em produção, sempre mantenha RLS habilitado para segurança

