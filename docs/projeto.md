# Documentação do Projeto - Landing Page de Captura de Leads

## Visão Geral

Este projeto é uma landing page desenvolvida em **Next.js** com foco em capturar leads interessados em um e-book/guia digital sobre organização fiscal e contábil para profissionais da saúde e prestadores de serviços.

### Objetivo Principal

1. **Criar um e-book/guia digital** em texto (que será posteriormente diagramado em PDF)
2. **Criar uma landing page** em Next.js para capturar leads interessados
3. **Armazenar os leads** no Supabase (PostgreSQL) para que a contabilidade possa entrar em contato depois

### Público-Alvo

- Profissionais da saúde (médicos, dentistas, fisioterapeutas, psicólogos, etc.)
- Prestadores de serviços em geral
- Profissionais em início de carreira ou recém-formados
- Profissionais que buscam entender os conceitos básicos de organização fiscal

---

## Arquitetura do Projeto

### Stack Tecnológica

- **Front-end**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Backend/Database**: Supabase (PostgreSQL)
- **Deploy**: Preparado para Vercel (ou outro serviço compatível)

### Estrutura de Pastas

```
guia-fiscal-saude/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── leads/
│   │       └── route.ts         # API route para salvar leads
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout raiz da aplicação
│   └── page.tsx                 # Landing page principal
├── components/                   # Componentes React reutilizáveis
│   └── LeadForm.tsx             # Componente do formulário de captura
├── content/                      # Conteúdo do projeto
│   └── ebook.md                 # Conteúdo completo do e-book
├── docs/                         # Documentação
│   └── projeto.md               # Esta documentação
├── lib/                          # Bibliotecas e utilitários
│   └── email/
│       └── template.ts          # Template de e-mail transacional
├── supabase/                     # Scripts e configurações do Supabase
│   └── schema.sql               # Schema SQL para criação da tabela de leads
├── types/                        # Definições de tipos TypeScript
│   └── lead.ts                  # Tipos relacionados aos leads
└── utils/                        # Utilitários
    └── supabase/                # Clientes do Supabase (server e client)
```

---

## Funcionalidades Implementadas

### 1. Landing Page Completa

A landing page (`app/page.tsx`) contém as seguintes seções:

- **Hero Section**: Headline principal, subtítulo e CTA para o formulário
- **Seção de Benefícios**: 4 cards explicando o que o profissional aprenderá
- **Seção "Para Quem É"**: Lista de profissionais que se beneficiam do guia
- **Seção Sobre a Contabilidade**: Texto apresentando a especialização da empresa
- **Formulário de Captura**: Componente completo com validação
- **Footer**: Rodapé simples com informações legais

### 2. Formulário de Captura de Leads

O componente `LeadForm.tsx` (`components/LeadForm.tsx`) oferece:

- **Campos do formulário**:

  - Nome completo (obrigatório, mínimo 3 caracteres)
  - E-mail (obrigatório, validação de formato)
  - Profissão (select: Médico, Dentista, Fisioterapeuta, Psicólogo, Outros)
  - Cidade (obrigatória)
  - Estado/UF (select com todos os estados do Brasil)
  - Estágio de carreira (select: Estudante último ano, Recém-formado, Profissional em atuação)

- **Funcionalidades**:
  - Validação em tempo real dos campos
  - Estados de loading durante o envio
  - Tratamento de erros (exibição de mensagens)
  - Mensagem de sucesso após cadastro
  - Limpeza automática do formulário após sucesso

### 3. API Route para Salvar Leads

A rota `app/api/leads/route.ts` implementa:

- **Validação completa** dos dados recebidos
- **Inserção no Supabase** na tabela `leads`
- **Tratamento de erros** específicos (ex: email duplicado)
- **Respostas JSON** padronizadas (sucesso/erro)
- **Preparação para envio de e-mail** (stub implementado)

### 4. Integração com Supabase

- **Cliente do Supabase** configurado para server-side (`utils/supabase/server.ts`)
- **Cliente do Supabase** configurado para client-side (`utils/supabase/client.ts`)
- **Schema SQL** pronto para criar a tabela de leads (`supabase/schema.sql`)

### 5. Conteúdo do E-book

O arquivo `content/ebook.md` contém o conteúdo completo do guia com:

- Introdução sobre profissionalização
- Seção PF x PJ com diferenças práticas
- Conceitos básicos (pró-labore, distribuição de lucros, impostos)
- Visão geral dos regimes tributários (Simples Nacional, Lucro Presumido, Lucro Real)
- Exemplos didáticos de economia de impostos
- Checklist para abrir uma empresa
- Conclusão com chamadas para ação

### 6. Envio de E-mail Automático ✅ IMPLEMENTADO

O sistema de envio de email foi implementado usando **Supabase Edge Functions** com **Resend**:

- **Edge Function** (`supabase/functions/send-email/`): Função serverless que envia emails
- **Template HTML** e texto: Templates responsivos e profissionais
- **Integração automática**: Email é enviado automaticamente após cadastro do lead
- **Configuração via variáveis de ambiente**: Links e configurações via env vars no Supabase

**Arquivos relacionados:**

- `supabase/functions/send-email/index.ts`: Código da Edge Function
- `app/api/leads/route.ts`: Chama a Edge Function após salvar lead
- `lib/email/template.ts`: Templates de email (mantido para referência)

### 7. Página do E-book ✅ IMPLEMENTADO

Uma página HTML do ebook foi criada em `/ebook` que pode ser salva como PDF:

- **Página do ebook** (`app/ebook/page.tsx`): Renderiza o conteúdo do ebook em HTML formatado
- **Estilos otimizados para impressão**: CSS específico para gerar PDFs de qualidade
- **Botão de impressão**: Permite salvar como PDF diretamente do navegador
- **Link configurável**: O link é configurado via variável de ambiente `EBOOK_DOWNLOAD_LINK`

**Como usar:**

1. Acesse `https://seudominio.com/ebook` para ver o ebook
2. Clique em "Imprimir / Salvar como PDF"
3. No diálogo de impressão, escolha "Salvar como PDF"
4. Configure `EBOOK_DOWNLOAD_LINK=https://seudominio.com/ebook` nas variáveis de ambiente do Supabase

---

## Configuração e Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Conta na Vercel ou outro serviço de deploy (opcional)

### Variáveis de Ambiente

#### Para o Next.js (`.env.local`)

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase
```

**Como obter essas variáveis:**

1. Acesse seu projeto no Supabase
2. Vá em Settings > API
3. Copie a "Project URL" e a "anon public" key
4. **Importante:** Copie também a "service_role" key (mantenha segura, nunca exponha no frontend)

**⚠️ Segurança:** A `SUPABASE_SERVICE_ROLE_KEY` deve ser usada APENAS em API routes server-side. Ela bypassa o RLS e tem permissões completas no banco de dados. Nunca exponha esta chave no código do frontend ou em variáveis `NEXT_PUBLIC_*`.

#### Para Edge Functions (no Dashboard do Supabase)

Para que o envio de email funcione, configure as seguintes variáveis de ambiente no Supabase:

1. Acesse o dashboard do Supabase
2. Vá em **Edge Functions** > **Settings**
3. Adicione as seguintes variáveis:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx          # API Key do Resend
FROM_EMAIL=noreply@seudominio.com        # Email remetente (deve estar verificado no Resend)
EBOOK_DOWNLOAD_LINK=https://seudominio.com/ebook  # Link para a página do ebook (pode ser salvo como PDF)
WHATSAPP_LINK=https://wa.me/5511999999999         # Link do WhatsApp para contato
```

**Como obter a API Key do Resend:**

1. Acesse [https://resend.com](https://resend.com) e crie uma conta (plano gratuito disponível)
2. Vá em **API Keys** e crie uma nova chave
3. Copie a chave e adicione como variável de ambiente no Supabase
4. No Resend, vá em **Domains** e adicione/verifique seu domínio para usar no `FROM_EMAIL`

### Instalação

1. Clone o repositório (ou navegue até a pasta do projeto)
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (`.env.local`)
4. Execute o schema SQL no Supabase:
   - Acesse o SQL Editor no Supabase
   - Copie e execute o conteúdo de `supabase/schema.sql`
   - **Se a tabela já foi criada antes**: Execute também `supabase/enable-rls.sql` para habilitar RLS
5. **Configure e faça deploy da Edge Function de email:**

   **Opção A: Usando npx (recomendado - sem instalação)**

   ```bash
   npx supabase@latest login
   npx supabase@latest link --project-ref seu-project-ref
   npx supabase@latest functions deploy send-email
   ```

   **Opção B: Instalar CLI via Scoop/Chocolatey**

   - Scoop: `scoop install supabase`
   - Chocolatey: `choco install supabase`
   - Depois: `supabase login`, `supabase link --project-ref seu-project-ref`, `supabase functions deploy send-email`

   **Opção C: Dashboard do Supabase (sem CLI)**

   - Acesse Edge Functions no dashboard
   - Crie nova função e cole o código de `supabase/functions/send-email/index.ts`
   - Configure as variáveis de ambiente no dashboard (veja seção acima)
   - Faça o deploy

   ⚠️ **Nota:** `npm install -g supabase` não funciona. Use uma das opções acima.

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
7. Acesse `http://localhost:3000` no navegador

---

## Banco de Dados (Supabase)

### Schema da Tabela `leads`

A tabela `leads` possui a seguinte estrutura:

| Coluna             | Tipo      | Descrição                                            |
| ------------------ | --------- | ---------------------------------------------------- |
| `id`               | UUID      | Primary key, gerado automaticamente                  |
| `created_at`       | TIMESTAMP | Data/hora de criação (UTC)                           |
| `nome`             | TEXT      | Nome completo do lead                                |
| `email`            | TEXT      | E-mail do lead (único)                               |
| `profissao`        | TEXT      | Profissão selecionada                                |
| `cidade`           | TEXT      | Cidade do lead                                       |
| `estado`           | TEXT      | Estado/UF (2 caracteres)                             |
| `estagio_carreira` | TEXT      | Estágio de carreira selecionado                      |
| `source`           | TEXT      | Origem do lead (default: "landing_primeiros_passos") |

### Índices Criados

- `idx_leads_email`: Para consultas rápidas por e-mail
- `idx_leads_created_at`: Para ordenação por data de criação
- `idx_leads_profissao`: Para filtros por profissão

### Como Criar a Tabela

1. Acesse o SQL Editor no painel do Supabase
2. Copie o conteúdo completo de `supabase/schema.sql`
3. Cole e execute o script
4. Verifique se a tabela foi criada corretamente na aba "Table Editor"

**Importante:** Se você já criou a tabela antes e recebeu um aviso sobre RLS não habilitado:

- Execute o script `supabase/enable-rls.sql` para habilitar RLS e criar as políticas de segurança

### Segurança: Row Level Security (RLS)

A tabela `leads` possui **Row Level Security (RLS)** habilitado para proteger os dados. As políticas configuradas são:

1. **Inserção via API Route (INSERT)**:

   - A API route (`/api/leads`) usa a `service_role` key para inserir leads
   - Isso bypassa o RLS e garante que a inserção funcione mesmo com RLS habilitado
   - A `service_role` key é usada apenas server-side, nunca exposta ao frontend

2. **Leitura Restrita (SELECT)**:

   - Apenas usuários autenticados ou service_role podem ler os leads
   - Isso protege os dados pessoais dos leads de acesso não autorizado

3. **Atualização/Exclusão (UPDATE/DELETE)**:
   - Bloqueado para usuários anônimos
   - Leads não devem ser editados ou deletados após criação
   - Para editar/deletar, use o dashboard do Supabase diretamente

**Por que usar service_role na API route?**

Em produção, quando o RLS está habilitado, usar a chave anônima em API routes server-side pode causar erros de permissão. A solução é usar a `service_role` key que:
- Bypassa o RLS completamente
- É segura porque roda apenas no servidor (nunca exposta ao cliente)
- É a prática recomendada para operações administrativas em API routes

### Como Visualizar os Leads no Supabase

Para acessar os leads cadastrados no dashboard do Supabase:

1. Acesse o dashboard do Supabase
2. Vá em **Table Editor** > **leads**
3. Você verá todos os leads cadastrados

O acesso via dashboard funciona porque o Supabase usa o `service_role` internamente, que tem permissões completas mesmo com RLS habilitado.

**Alternativa:** Se você quiser criar uma aplicação admin separada para visualizar leads:

- Use a `service_role` key (mantenha segura, nunca exponha no frontend)
- Ou crie usuários autenticados no Supabase Auth e conceda permissões específicas

---

## Fluxo do Sistema

### Fluxo de Captura de Lead

1. **Usuário acessa a landing page** (`/`)
2. **Navega pela página** e decide preencher o formulário
3. **Preenche o formulário** com seus dados
4. **Clica em "Quero receber o guia gratuito"**
5. **Frontend valida** os dados no cliente
6. **Envia POST** para `/api/leads` com os dados
7. **API valida** novamente os dados no servidor
8. **API insere** o lead no Supabase
9. **API chama Edge Function** para enviar email automaticamente
10. **Edge Function envia email** com link do ebook via Resend
11. **API retorna** resposta de sucesso/erro (mesmo se email falhar)
12. **Frontend exibe** mensagem de sucesso ou erro
13. **Formulário é limpo** em caso de sucesso
14. **Usuário recebe email** com link para download do guia

### Próximos Passos (Futuro)

- ✅ **Envio de e-mail automático** após cadastro do lead (IMPLEMENTADO)
- ✅ **Link para download** do e-book no e-mail (IMPLEMENTADO)
- **Integração com CRM** para gestão de leads
- **Dashboard administrativo** para visualizar leads cadastrados
- **Analytics** para rastrear conversões
- **Sistema de follow-up** automático por e-mail

---

## Geração de Valor

### Para a Contabilidade

1. **Geração de Leads Qualificados**:

   - Leads interessados em contabilidade e organização fiscal
   - Informações detalhadas sobre profissão, localização e estágio de carreira
   - Dados organizados em banco de dados estruturado

2. **Organização dos Dados**:

   - Todos os leads armazenados de forma centralizada no Supabase
   - Facilita segmentação por profissão, cidade, estágio de carreira
   - Histórico completo com timestamps

3. **Automação Futura**:
   - E-mail automático com link do e-book (a ser implementado)
   - Possibilidade de integração com CRM ou sistema de gestão
   - Preparado para escalar para múltiplas campanhas

### Para os Profissionais da Saúde/Serviços

1. **Acesso a Conteúdo Educativo**:

   - Guia completo e gratuito sobre organização fiscal
   - Explicações claras sobre PF x PJ, regimes tributários, impostos
   - Exemplos práticos e checklist para ações

2. **Base para Decisões Informadas**:

   - Compreensão dos conceitos básicos antes de contratar serviços
   - Capacidade de conversar de igual para igual com contadores
   - Redução de erros básicos que podem ser caros

3. **Primeiro Contato com a Contabilidade**:
   - Oportunidade de conhecer uma contabilidade especializada
   - Contato direto facilitado após download do guia
   - Relacionamento iniciado de forma educativa, não apenas comercial

---

## Próximas Implementações Sugeridas

### Fase 1: Finalização Básica

- [ ] Configurar variáveis de ambiente no ambiente de produção
- [ ] Fazer deploy na Vercel ou outro serviço
- [ ] Testar fluxo completo de captura de lead

### Fase 2: Envio de E-mail ✅ IMPLEMENTADO

- [x] Integrar serviço de e-mail (Resend via Edge Functions)
- [x] Configurar link de download do e-book (via variáveis de ambiente)
- [x] Implementar envio automático após cadastro
- [ ] Testar templates de e-mail em diferentes clientes

### Fase 3: Melhorias e Expansão

- [ ] Dashboard administrativo para visualizar leads
- [ ] Exportação de leads para CSV/Excel
- [ ] Integração com CRM ou sistema de gestão
- [ ] Analytics e métricas de conversão
- [ ] A/B testing de diferentes versões da landing page
- [ ] Integração com Google Analytics ou similar

### Fase 4: Automação e Escalabilidade

- [ ] Sistema de follow-up automático por e-mail
- [ ] Integração com WhatsApp Business API
- [ ] Múltiplas landing pages para diferentes campanhas
- [ ] Sistema de gestão de conteúdo do e-book

---

## Manutenção e Suporte

### Logs e Debugging

- Os erros da API são logados no console do servidor
- Verifique os logs do Supabase para erros de banco de dados
- Use as ferramentas de debug do navegador para problemas no frontend

### Atualizações

- Mantenha as dependências atualizadas: `npm update`
- Verifique atualizações do Supabase regularmente
- Monitore a documentação do Next.js para novas features

### Segurança

- **Não commite** o arquivo `.env.local` no Git
- **Use variáveis de ambiente** em produção
- **Configure RLS (Row Level Security)** no Supabase se necessário
- **Valide sempre** os dados no servidor (não confie apenas no frontend)

---

## Contribuição

Este é um projeto de extensão universitária. Para sugestões ou melhorias:

1. Documente claramente as mudanças
2. Mantenha o código organizado e comentado
3. Teste as funcionalidades antes de enviar

---

## Licença

Este projeto é parte de um projeto de extensão universitária e destina-se a fins educacionais e comerciais da contabilidade contratante.

---

**Última atualização**: Dezembro 2024
**Versão**: 1.0.0
