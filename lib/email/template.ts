/**
 * Template de e-mail para entrega do e-book
 * 
 * Este arquivo contém o texto do e-mail transacional que será enviado
 * aos leads após o cadastro. A integração real de envio de e-mail
 * pode ser feita usando:
 * 
 * - Resend (https://resend.com)
 * - SendGrid (https://sendgrid.com)
 * - Supabase Edge Function com serviço de e-mail
 * - Servidor SMTP próprio
 */

export interface EmailData {
  nome: string;
  email: string;
  linkDownload?: string; // Link para download do e-book (será configurado depois)
}

/**
 * Assunto do e-mail
 */
export function getEmailSubject(): string {
  return 'Seu guia fiscal gratuito para profissionais da saúde';
}

/**
 * Corpo do e-mail em HTML
 */
export function getEmailHtmlBody(data: EmailData): string {
  const { nome, linkDownload = '#' } = data;
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu guia fiscal gratuito</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2563eb; margin: 0;">Olá, ${nome}!</h1>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Obrigado pelo seu interesse em nosso guia sobre <strong>Primeiros Passos Fiscais para Profissionais da Saúde</strong>!
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Ficamos felizes em saber que você está buscando conhecimento para organizar melhor sua vida fiscal e contábil. 
      Este guia foi preparado especialmente para profissionais como você que estão começando ou querendo profissionalizar 
      sua carreira.
    </p>

    <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 30px 0;">
      <p style="margin: 0; font-size: 16px; color: #1e40af;">
        <strong>📥 Baixe agora o seu guia completo:</strong>
      </p>
      <a href="${linkDownload}" 
         style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Baixar Guia Gratuito
      </a>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      No guia, você encontrará:
    </p>
    <ul style="font-size: 16px; margin-bottom: 30px; padding-left: 20px;">
      <li>Diferenças práticas entre PF e PJ</li>
      <li>Conceitos básicos: pró-labore, distribuição de lucros e impostos</li>
      <li>Visão geral dos regimes tributários (Simples Nacional, Lucro Presumido)</li>
      <li>Exemplos didáticos de economia de impostos</li>
      <li>Checklist para abrir uma empresa</li>
    </ul>

    <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      Este guia foi elaborado para fins educacionais e não substitui o aconselhamento profissional personalizado. 
      Cada situação é única e requer análise específica de um contador qualificado.
    </p>

    <p style="font-size: 14px; color: #6b7280; margin-top: 15px;">
      Atenciosamente,<br>
      <strong>Equipe de Contabilidade Especializada em Profissionais da Saúde</strong>
    </p>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Corpo do e-mail em texto simples (fallback)
 */
export function getEmailTextBody(data: EmailData): string {
  const { nome, linkDownload = '#' } = data;
  
  return `
Olá, ${nome}!

Obrigado pelo seu interesse em nosso guia sobre Primeiros Passos Fiscais para Profissionais da Saúde!

Ficamos felizes em saber que você está buscando conhecimento para organizar melhor sua vida fiscal e contábil. 
Este guia foi preparado especialmente para profissionais como você que estão começando ou querendo profissionalizar 
sua carreira.

📥 Baixe agora o seu guia completo:
${linkDownload}

No guia, você encontrará:
- Diferenças práticas entre PF e PJ
- Conceitos básicos: pró-labore, distribuição de lucros e impostos
- Visão geral dos regimes tributários (Simples Nacional, Lucro Presumido)
- Exemplos didáticos de economia de impostos
- Checklist para abrir uma empresa

---

Este guia foi elaborado para fins educacionais e não substitui o aconselhamento profissional personalizado. 
Cada situação é única e requer análise específica de um contador qualificado.

Atenciosamente,
Equipe de Contabilidade Especializada em Profissionais da Saúde
  `.trim();
}

/**
 * TODO: Implementar função de envio de e-mail
 * 
 * Esta função será implementada futuramente usando um serviço de e-mail.
 * Exemplos de integrações possíveis:
 * 
 * 1. Resend:
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    await resend.emails.send({
 *      from: 'contato@exemplo.com',
 *      to: data.email,
 *      subject: getEmailSubject(),
 *      html: getEmailHtmlBody(data),
 *    });
 * 
 * 2. Supabase Edge Function com Resend ou outro serviço
 * 
 * 3. API route do Next.js chamando serviço de e-mail externo
 */
export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  // STUB: Por enquanto, apenas loga os dados do e-mail
  console.log('Email would be sent to:', data.email);
  console.log('Subject:', getEmailSubject());
  console.log('Body preview:', getEmailTextBody(data).substring(0, 200) + '...');
  
  // TODO: Implementar envio real de e-mail
  // return { success: true };
  
  // Por enquanto, retorna sucesso simulado
  return { success: true };
}


