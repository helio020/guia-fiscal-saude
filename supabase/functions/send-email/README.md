# Edge Function: send-email

Esta Edge Function do Supabase é responsável por enviar emails transacionais aos leads após o cadastro.

## Funcionalidade

- Recebe dados do lead (nome, email, links opcionais)
- Valida os dados recebidos
- Envia email usando Resend com template HTML e texto
- Retorna status de sucesso ou erro

## Configuração

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Supabase:

1. Acesse o dashboard do Supabase
2. Vá em **Edge Functions** > **Settings**
3. Adicione as seguintes variáveis:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx  # Sua API key do Resend
FROM_EMAIL=noreply@seudominio.com  # Email remetente (deve estar verificado no Resend)
EBOOK_DOWNLOAD_LINK=https://seudominio.com/ebook  # Link para a página do ebook (pode ser salvo como PDF)
```

### Como obter a API Key do Resend

1. Acesse [https://resend.com](https://resend.com)
2. Crie uma conta (plano gratuito disponível)
3. Vá em **API Keys** e crie uma nova chave
4. Copie a chave e adicione como variável de ambiente no Supabase

### Verificar domínio no Resend

1. No Resend, vá em **Domains**
2. Adicione seu domínio ou use o domínio de teste fornecido
3. Configure os registros DNS conforme instruções
4. Use o email verificado no campo `FROM_EMAIL`

## Deploy

### Usando Supabase CLI

**⚠️ Nota:** A instalação global via `npm install -g` não é suportada. Use `npx` ou outro método:

```bash
# Usando npx (sem instalar)
npx supabase@latest login

# Linkar ao projeto
npx supabase@latest link --project-ref seu-project-ref

# Fazer deploy da função
npx supabase@latest functions deploy send-email
```

**Alternativas de instalação:**

- **Scoop (Windows):** `scoop install supabase`
- **Chocolatey (Windows):** `choco install supabase`
- **Binário direto:** [GitHub Releases](https://github.com/supabase/cli/releases)

Veja mais opções em [`../README.md`](../README.md#1-instalar-supabase-cli).

### Usando Dashboard do Supabase

1. Acesse o dashboard do Supabase
2. Vá em **Edge Functions**
3. Clique em **Create a new function**
4. Cole o código de `index.ts`
5. Configure as variáveis de ambiente
6. Faça o deploy

## Uso

A função é chamada via HTTP POST:

```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify({
    nome: "João Silva",
    email: "joao@exemplo.com",
    linkDownload: "https://exemplo.com/ebook.pdf", // opcional
  }),
});

const result = await response.json();
```

## Resposta

### Sucesso (200)

```json
{
  "success": true,
  "messageId": "abc123"
}
```

### Erro (400/500)

```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

## Testes Locais

### Como Enviar Emails Localmente

A função **sempre envia emails reais** quando você configura a `RESEND_API_KEY`. Em desenvolvimento local, ela usa automaticamente o domínio de teste do Resend (`onboarding@resend.dev`) que **não precisa de verificação de domínio**.

**Passos:**

1. **Crie uma conta no Resend** (gratuito): [https://resend.com](https://resend.com)
2. **Obtenha sua API Key**: Vá em **API Keys** e crie uma nova chave

### Opção 1: Usar Arquivo .env (Recomendado)

1. **Copie o arquivo de exemplo:**

   ```bash
   # Na raiz do projeto
   cp supabase/functions/send-email/.env.example supabase/functions/send-email/.env
   ```

2. **Edite o arquivo `.env`** e preencha com suas credenciais:

   ```env
   RESEND_API_KEY=re_sua_chave_aqui
   FROM_EMAIL=onboarding@resend.dev
   EBOOK_DOWNLOAD_LINK=https://exemplo.com/ebook
   ```

3. **Execute a função:**

   ```bash
   # Iniciar Supabase localmente
   npx supabase@latest start

   # Executar a função com o arquivo .env
   npx supabase@latest functions serve send-email --env-file supabase/functions/send-email/.env
   ```

**Importante:**

- O arquivo `.env` já está no `.gitignore` (não será commitado)
- O `.env.local` na raiz é apenas para o Next.js, não funciona para Edge Functions
- Você precisa criar um `.env` específico na pasta `send-email/` ou usar a opção 2 abaixo

### Opção 2: Variáveis de Ambiente na Linha de Comando

```bash
# Iniciar Supabase localmente
npx supabase@latest start

# Executar a função com variáveis inline (Linux/Mac/Git Bash)
RESEND_API_KEY=re_sua_chave_aqui npx supabase@latest functions serve send-email

# Windows PowerShell
$env:RESEND_API_KEY="re_sua_chave_aqui"; npx supabase@latest functions serve send-email

# Windows CMD
set RESEND_API_KEY=re_sua_chave_aqui && npx supabase@latest functions serve send-email
```

**Nota:** O arquivo `.env.local` na raiz do projeto é apenas para o Next.js, não funciona para Edge Functions. Use um arquivo `.env` na pasta da função ou passe as variáveis na linha de comando.

4. **Teste a função** (em outro terminal):

```bash
# Obtenha a ANON_KEY com: npx supabase@latest status --output json
curl -X POST http://localhost:54321/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "nome": "Teste",
    "email": "seu-email@exemplo.com"
  }'
```

**Importante:**

- A função detecta automaticamente que está em desenvolvimento local
- Em local, usa `onboarding@resend.dev` como remetente (não precisa verificar domínio)
- Em produção, usa o `FROM_EMAIL` configurado (precisa verificar domínio no Resend)
- **Sem `RESEND_API_KEY`, a função retornará erro** - você precisa configurar a chave para enviar emails
