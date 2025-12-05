# Guia Fiscal para Profissionais da Saúde - Landing Page

Landing page para captura de leads interessados em um guia gratuito sobre organização fiscal e contábil para profissionais da saúde e prestadores de serviços.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um projeto de extensão universitária para uma contabilidade especializada em profissionais da saúde. O objetivo é criar uma landing page moderna e funcional que:

- Apresenta um e-book/guia sobre primeiros passos fiscais
- Captura leads através de um formulário completo
- Armazena os dados no Supabase (PostgreSQL)
- Está preparada para envio automático de e-mail (a ser implementado)

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL + API)

## 📦 Instalação

### Pré-requisitos

- Node.js 18 ou superior
- Conta no Supabase (gratuita)

### Passos

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd guia-fiscal-saude
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` e preencha com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui
   ```
   
   **Como obter as credenciais:**
   - Acesse [Supabase](https://app.supabase.com)
   - Vá em Settings > API
   - Copie a "Project URL" e a "anon public" key
   - **Importante:** Copie também a "service_role" key (mantenha segura, nunca exponha no frontend)
   
   **⚠️ Segurança:** A `SUPABASE_SERVICE_ROLE_KEY` é usada apenas em API routes server-side para bypassar RLS. Nunca exponha esta chave no código do frontend.

4. Configure o banco de dados:
   - Acesse o SQL Editor no Supabase
   - Copie e execute o conteúdo do arquivo `supabase/schema.sql`
   - Isso criará a tabela `leads` necessária

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse [http://localhost:3000](http://localhost:3000) no navegador

## 📁 Estrutura do Projeto

```
guia-fiscal-saude/
├── app/                    # Next.js App Router
│   ├── api/leads/         # API route para salvar leads
│   ├── page.tsx           # Landing page principal
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
│   └── LeadForm.tsx       # Formulário de captura
├── content/               # Conteúdo
│   └── ebook.md          # Conteúdo do e-book
├── docs/                  # Documentação
│   └── projeto.md        # Documentação completa
├── lib/                   # Utilitários
│   └── email/            # Templates de e-mail
├── supabase/             # Scripts SQL
│   └── schema.sql        # Schema da tabela leads
└── types/                # Tipos TypeScript
    └── lead.ts           # Tipos dos leads
```

## 🎨 Funcionalidades

### Landing Page

- **Hero Section**: Apresentação principal com CTA
- **Benefícios**: O que o profissional aprenderá no guia
- **Para Quem É**: Lista de profissionais que se beneficiam
- **Sobre a Contabilidade**: Apresentação da empresa
- **Formulário de Captura**: Formulário completo e validado

### Formulário

- Validação em tempo real
- Estados de loading e erro
- Mensagem de sucesso
- Campos: Nome, E-mail, Profissão, Cidade, Estado, Estágio de carreira

### API

- Endpoint `/api/leads` para salvar leads
- Validação completa dos dados
- Tratamento de erros (incluindo email duplicado)
- Integração com Supabase

## 📚 Documentação

Para documentação completa do projeto, incluindo arquitetura, fluxos e próximos passos, consulte o arquivo [`docs/projeto.md`](./docs/projeto.md).

## 🗄️ Banco de Dados

A tabela `leads` armazena:

- ID (UUID)
- Data de criação
- Nome completo
- E-mail (único)
- Profissão
- Cidade
- Estado (UF)
- Estágio de carreira
- Origem (source)

Veja o schema completo em [`supabase/schema.sql`](./supabase/schema.sql).

## 📧 E-mail Transacional ✅ IMPLEMENTADO

O sistema de envio de email foi implementado usando **Supabase Edge Functions** com **Resend**.

**Como configurar:**

1. **Crie uma conta no Resend** (https://resend.com) - plano gratuito disponível
2. **Obtenha sua API Key** no Resend (API Keys)
3. **Verifique seu domínio** no Resend (Domains) para usar como remetente
4. **Configure as variáveis de ambiente no Supabase:**
   - Acesse Edge Functions > Settings no dashboard do Supabase
   - Adicione: `RESEND_API_KEY`, `FROM_EMAIL`, `EBOOK_DOWNLOAD_LINK`, `WHATSAPP_LINK`
5. **Faça deploy da Edge Function:**
   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref seu-project-ref
   supabase functions deploy send-email
   ```

Veja a documentação completa em [`supabase/functions/send-email/README.md`](./supabase/functions/send-email/README.md).

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para um repositório Git
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente no painel da Vercel
4. Faça o deploy

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 📝 Conteúdo do E-book

O conteúdo completo do e-book está disponível em [`content/ebook.md`](./content/ebook.md). Ele cobre:

- Introdução sobre profissionalização
- PF x PJ: diferenças práticas
- Conceitos básicos (pró-labore, distribuição de lucros, impostos)
- Regimes tributários (Simples Nacional, Lucro Presumido)
- Exemplos de economia de impostos
- Checklist para abrir empresa
- Conclusão e próximos passos

## 🤝 Contribuindo

Este é um projeto de extensão universitária. Para sugestões:

1. Documente claramente as mudanças
2. Mantenha o código organizado
3. Teste antes de enviar

## 📄 Licença

Este projeto é parte de um projeto de extensão universitária.

---

**Desenvolvido para fins educacionais e comerciais**
