# Edge Functions do Supabase

Este diretório contém as Edge Functions do Supabase para funcionalidades serverless.

## Estrutura

```
supabase/functions/
├── send-email/          # Função para envio de emails transacionais
│   ├── index.ts        # Código da função
│   └── README.md       # Documentação específica
└── README.md           # Este arquivo
```

## Configuração Inicial

### 1. Instalar Supabase CLI

**⚠️ Nota:** A instalação global via `npm install -g` não é suportada. Use uma das opções abaixo:

#### Opção A: Usar npx (recomendado - sem instalação)

Você pode usar o Supabase CLI diretamente com `npx` sem instalar:

```bash
npx supabase@latest login
npx supabase@latest link --project-ref seu-project-ref
npx supabase@latest functions deploy send-email
```

#### Opção B: Instalar via Scoop (Windows)

Se você tem o [Scoop](https://scoop.sh) instalado:

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### Opção C: Instalar via Chocolatey (Windows)

Se você tem o [Chocolatey](https://chocolatey.org) instalado:

```bash
choco install supabase
```

#### Opção D: Baixar binário diretamente

1. Acesse [https://github.com/supabase/cli/releases](https://github.com/supabase/cli/releases)
2. Baixe o binário para Windows
3. Adicione ao PATH do sistema

#### Opção E: Usar apenas o Dashboard (sem CLI)

Você pode criar e fazer deploy da Edge Function diretamente no dashboard do Supabase:

1. Acesse o dashboard do Supabase
2. Vá em **Edge Functions**
3. Clique em **Create a new function**
4. Cole o código de `supabase/functions/send-email/index.ts`
5. Configure as variáveis de ambiente
6. Faça o deploy

### 2. Fazer Login

```bash
supabase login
```

### 3. Linkar ao Projeto

```bash
supabase link --project-ref seu-project-ref
```

O `project-ref` pode ser encontrado na URL do seu projeto Supabase:

- URL: `https://xxxxx.supabase.co`
- Project Ref: `xxxxx`

### 4. Deploy das Funções

```bash
# Deploy de uma função específica
supabase functions deploy send-email

# Deploy de todas as funções
supabase functions deploy
```

## Variáveis de Ambiente

Configure as variáveis de ambiente no dashboard do Supabase:

1. Acesse **Edge Functions** > **Settings**
2. Adicione as variáveis necessárias para cada função

### Variáveis para `send-email`

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@seudominio.com
EBOOK_DOWNLOAD_LINK=https://seudominio.com/ebook
```

## Desenvolvimento Local

### Iniciar Supabase Localmente

```bash
supabase start
```

### Executar Função Localmente

```bash
supabase functions serve send-email
```

A função estará disponível em: `http://localhost:54321/functions/v1/send-email`

### Testar Função Localmente

```bash
curl -X POST http://localhost:54321/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "nome": "Teste",
    "email": "teste@exemplo.com"
  }'
```

## Logs

Para ver os logs das Edge Functions:

```bash
# Logs em tempo real
supabase functions logs send-email

# Logs com filtro
supabase functions logs send-email --filter "error"
```

Ou acesse o dashboard do Supabase em **Edge Functions** > **Logs**.

## Troubleshooting

### Erro: "Function not found"

- Verifique se a função foi deployada: `supabase functions list`
- Confirme que o nome da função está correto
- Verifique se está usando o `project-ref` correto

### Erro: "Unauthorized"

- Verifique se está usando a `anon key` correta
- Confirme que o header `Authorization` está sendo enviado

### Erro: "Environment variable not found"

- Verifique se as variáveis de ambiente foram configuradas no dashboard
- Confirme que os nomes das variáveis estão corretos (case-sensitive)

## Referências

- [Documentação Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
