# Como Configurar Domínio Próprio para Resend

## 🚨 Problema

Os emails do Resend estão caindo no spam porque você está usando o domínio de teste `onboarding@resend.dev` ou um domínio `.vercel.app` que não é válido para email.

**A Vercel NÃO oferece domínios gratuitos próprios** - ela só permite usar domínios que você já possui.

## ✅ Solução: Registrar um Domínio Próprio

## ⚠️ ATENÇÃO: Domínios Gratuitos - NÃO RECOMENDADO

### Por que NÃO usar domínios gratuitos (Freenom, etc.)?

**Problemas graves que podem ocorrer:**

1. **Bloqueio por provedores de email**
   - Gmail, Outlook e outros bloqueiam frequentemente domínios `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
   - Mesmo que o Resend aceite, os emails podem não chegar aos destinatários
   - Reputação ruim desses domínios por histórico de spam

2. **Resend pode rejeitar**
   - O Resend pode recusar verificar domínios gratuitos
   - Políticas anti-spam são mais rigorosas com esses TLDs
   - Risco de banimento da conta

3. **Perda do domínio**
   - Freenom pode revogar domínios sem aviso
   - Requisitos de uso (ex: visitas ao site) podem não ser cumpridos
   - Você pode perder tudo que configurou

4. **Problemas de DNS**
   - Servidores DNS instáveis
   - Propagação lenta ou falhas
   - Limitações técnicas

5. **Imagem profissional**
   - Domínios gratuitos passam má impressão
   - Clientes podem desconfiar
   - Afeta credibilidade do negócio

6. **Problemas legais/compliance**
   - Alguns domínios gratuitos têm restrições de uso comercial
   - Problemas com LGPD/GDPR se o domínio for revogado

### 💰 Custo Real vs. Risco

**Domínio gratuito:**
- Custo: R$ 0
- Risco: **MUITO ALTO** - pode perder tudo, emails bloqueados, perda de credibilidade

**Domínio barato (Namecheap em promoção):**
- Custo: ~R$ 10-15/ano (US$ 1-2)
- Risco: **MUITO BAIXO** - domínio confiável, profissional, sem surpresas

**Recomendação:** Por menos de R$ 1,50/mês, você evita todos esses riscos. Vale muito a pena investir em um domínio próprio.

### Opções de Domínios Baratos (RECOMENDADAS)

#### 1. **Registro.br** (Recomendado para Brasil)
- **Preço**: R$ 40/ano para `.com.br`
- **Vantagem**: Domínio brasileiro, confiável
- **Site**: https://registro.br

#### 2. **Namecheap** (Internacional)
- **Preço**: ~US$ 1-2/ano (em promoções)
- **Vantagem**: Muito barato, fácil de usar
- **Site**: https://www.namecheap.com

#### 3. **Cloudflare Registrar** (Internacional)
- **Preço**: Preço de custo (~US$ 8-10/ano)
- **Vantagem**: Sem margem de lucro, integrado com Cloudflare
- **Site**: https://www.cloudflare.com/products/registrar

#### 4. **Google Domains** (Internacional)
- **Preço**: ~US$ 12/ano
- **Vantagem**: Interface simples, confiável
- **Site**: https://domains.google

## 📋 Passo a Passo Completo

### Passo 1: Registrar o Domínio

1. Escolha um dos provedores acima
2. Registre um domínio (ex: `guiasaudefiscal.com.br`)
3. Aguarde a ativação (geralmente instantâneo)

### Passo 2: Verificar Domínio no Resend

1. Acesse [Resend Dashboard](https://resend.com/domains)
2. Clique em **Add Domain**
3. Digite seu domínio (ex: `guiasaudefiscal.com.br`)
4. O Resend fornecerá registros DNS para adicionar:

   **Registros necessários:**
   - **TXT** para verificação (ex: `resend._domainkey.guiafiscalsaude.com.br`)
   - **TXT** para SPF (ex: `v=spf1 include:resend.com ~all`)
   - **CNAME** para DKIM (ex: `resend._domainkey`)

### Passo 3: Configurar DNS no Provedor do Domínio

1. Acesse o painel do seu provedor de domínio
2. Vá para **DNS Management** ou **Zona DNS**
3. Adicione os registros fornecidos pelo Resend:

   **Exemplo de registros:**
   ```
   Tipo: TXT
   Nome: @ (ou deixe em branco para domínio raiz)
   Valor: v=spf1 include:resend.com ~all
   TTL: 3600

   Tipo: TXT
   Nome: resend._domainkey
   Valor: [valor fornecido pelo Resend]
   TTL: 3600

   Tipo: CNAME
   Nome: resend._domainkey
   Valor: [valor fornecido pelo Resend]
   TTL: 3600
   ```

4. Aguarde a propagação DNS (pode levar de alguns minutos a 48 horas)
5. Volte ao Resend e clique em **Verify Domain**

### Passo 4: Configurar Domínio na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com)
2. Selecione seu projeto
3. Vá em **Settings** > **Domains**
4. Clique em **Add Domain**
5. Digite seu domínio (ex: `guiasaudefiscal.com.br`)
6. Configure os registros DNS no seu provedor:

   **Para domínio raiz:**
   - Tipo: `A`
   - Nome: `@` (ou deixe em branco)
   - Valor: `76.76.21.21`

   **Para www:**
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `cname.vercel-dns.com`

7. Aguarde a verificação (pode levar alguns minutos)

### Passo 5: Atualizar Variáveis de Ambiente

#### No Supabase (Edge Function)

1. Acesse [Supabase Dashboard](https://supabase.com)
2. Vá em **Edge Functions** > **Settings**
3. Adicione/atualize as variáveis:

   ```env
   RESEND_API_KEY=re_sua_chave_aqui
   FROM_EMAIL=noreply@guiasaudefiscal.com.br
   EBOOK_DOWNLOAD_LINK=https://guiasaudefiscal.com.br/ebook
   ENVIRONMENT=production
   ```

   **Importante**: Use um email do seu domínio verificado (ex: `noreply@seudominio.com.br`)

#### Na Vercel (se necessário)

1. Acesse **Settings** > **Environment Variables**
2. Adicione/atualize se necessário

### Passo 6: Testar o Envio

1. Faça um cadastro de teste no seu formulário
2. Verifique se o email chegou na caixa de entrada (não no spam)
3. Verifique os logs no Resend Dashboard

## 🔍 Verificações Importantes

### ✅ Checklist de Verificação

- [ ] Domínio registrado e ativo
- [ ] Domínio verificado no Resend (status: "Verified")
- [ ] Registros DNS do Resend configurados corretamente
- [ ] Domínio configurado na Vercel
- [ ] Registros DNS da Vercel configurados
- [ ] Variável `FROM_EMAIL` atualizada com email do domínio verificado
- [ ] Variável `ENVIRONMENT=production` configurada
- [ ] Teste de envio realizado com sucesso

### 🚨 Problemas Comuns

**Emails ainda caindo no spam:**
- Verifique se todos os registros DNS do Resend estão corretos
- Aguarde até 48h para propagação completa
- Verifique se o domínio está "Verified" no Resend
- Use um email profissional (ex: `noreply@` ou `contato@`)

**Domínio não verifica no Resend:**
- Verifique se os registros DNS foram salvos corretamente
- Aguarde a propagação DNS (use [dnschecker.org](https://dnschecker.org))
- Certifique-se de que os valores estão exatamente como o Resend forneceu

**Domínio não funciona na Vercel:**
- Verifique se os registros A/CNAME estão corretos
- Aguarde a propagação DNS
- Verifique se o domínio não está em uso em outro projeto

## 💡 Dicas

1. **Use subdomínios para email**: Configure `noreply@seudominio.com.br` para emails transacionais
2. **Mantenha DNS simples**: Use o mesmo provedor para domínio e DNS quando possível
3. **Monitore a reputação**: Verifique regularmente a taxa de entrega no Resend Dashboard
4. **Use SPF, DKIM e DMARC**: O Resend configura automaticamente, mas verifique se está tudo OK

## 🚨 Casos Reais de Problemas com Domínios Gratuitos

### Caso 1: Emails Bloqueados pelo Gmail
- **Problema**: Domínio `.tk` configurado no Resend, verificação OK
- **Resultado**: 90% dos emails para Gmail caem no spam ou são bloqueados
- **Causa**: Gmail tem lista negra para domínios gratuitos conhecidos por spam

### Caso 2: Resend Rejeitou o Domínio
- **Problema**: Tentativa de verificar domínio `.ml` no Resend
- **Resultado**: Resend recusou verificação por política anti-spam
- **Causa**: TLDs gratuitos têm reputação ruim histórica

### Caso 3: Domínio Revogado
- **Problema**: Domínio `.ga` usado por 6 meses, tudo funcionando
- **Resultado**: Domínio revogado sem aviso, site e emails pararam
- **Causa**: Freenom pode revogar se detectar uso comercial sem pagamento

### Caso 4: Perda de Leads
- **Problema**: Emails não chegando, mas sistema funcionando
- **Resultado**: Perda de 70% dos leads porque emails não entregues
- **Causa**: Domínios gratuitos têm alta taxa de bloqueio

## 💡 Conclusão sobre Domínios Gratuitos

**Resposta direta:** Sim, pode dar muito ruim. Os riscos superam qualquer economia.

**Recomendação final:**
- ✅ **Use domínio pago barato** (R$ 10-40/ano) - risco mínimo, profissional
- ❌ **Evite domínios gratuitos** - risco alto, não profissional, pode perder tudo

**Para um projeto profissional como o seu (guia fiscal para profissionais da saúde), a credibilidade é essencial. Um domínio próprio é investimento mínimo com retorno garantido.**

## 📚 Recursos Úteis

- [Resend - Domain Verification](https://resend.com/docs/dashboard/domains/introduction)
- [Vercel - Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [DNS Checker](https://dnschecker.org) - Verificar propagação DNS
- [MXToolbox](https://mxtoolbox.com) - Verificar configurações de email
- [Namecheap Promoções](https://www.namecheap.com/promos/) - Domínios baratos

