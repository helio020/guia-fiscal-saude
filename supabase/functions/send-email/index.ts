/// <reference types="./deno.d.ts" />
// @ts-ignore - Deno supports URL imports at runtime
import { Resend } from "https://esm.sh/resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
const EBOOK_DOWNLOAD_LINK =
  Deno.env.get("EBOOK_DOWNLOAD_LINK") || "https://exemplo.com/ebook.pdf";

function isLocalEnvironment(): boolean {
  if (Deno.env.get("ENVIRONMENT") === "local") return true;
  if (Deno.env.get("ENVIRONMENT") === "production") return false;

  return FROM_EMAIL.includes("onboarding@resend.dev");
}

interface EmailRequest {
  nome: string;
  email: string;
  linkDownload?: string;
}

interface EmailResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * Gera o HTML do email
 */
function getEmailHtmlBody(data: EmailRequest): string {
  const {
    nome,
    linkDownload = EBOOK_DOWNLOAD_LINK,
  } = data;

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
 * Gera o texto simples do email (fallback)
 */
function getEmailTextBody(data: EmailRequest): string {
  const {
    nome,
    linkDownload = EBOOK_DOWNLOAD_LINK,
  } = data;

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
 * Extrai e valida o token de autorização do header
 */
function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  // Remove o prefixo "Bearer " se presente
  const token = authHeader.replace(/^Bearer\s+/i, "");
  return token || null;
}

Deno.serve(async (req: Request) => {
  // Apenas aceita requisições POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Método não permitido" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Verifica o header de autorização
    const authToken = getAuthToken(req);
    const expectedToken = Deno.env.get("SUPABASE_ANON_KEY");

    if (!authToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing authorization header",
        } as EmailResponse),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (expectedToken && authToken !== expectedToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid authorization token",
        } as EmailResponse),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Lê o corpo da requisição
    const emailData: EmailRequest = await req.json();

    // Valida os dados obrigatórios
    if (!emailData.nome || !emailData.email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Nome e email são obrigatórios",
        } as EmailResponse),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Valida formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email inválido",
        } as EmailResponse),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verifica se a API key do Resend está configurada
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada");
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "RESEND_API_KEY não configurada. Configure a variável de ambiente RESEND_API_KEY com sua chave do Resend (https://resend.com/api-keys)",
        } as EmailResponse),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const subject = "Seu guia fiscal gratuito para profissionais da saúde";
    const htmlBody = getEmailHtmlBody(emailData);
    const textBody = getEmailTextBody(emailData);

    const resend = new Resend(RESEND_API_KEY);

    const isLocal = isLocalEnvironment();
    const fromEmail = isLocal ? "onboarding@resend.dev" : FROM_EMAIL;

    if (isLocal) {
      console.log(
        "🌐 Modo local detectado: usando domínio de teste onboarding@resend.dev"
      );
    }

    // Envia o email
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: emailData.email,
      subject: subject,
      html: htmlBody,
      text: textBody,
    });

    if (emailError) {
      console.error("Erro ao enviar email:", emailError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Erro ao enviar email: " + emailError.message,
        } as EmailResponse),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Retorna sucesso
    return new Response(
      JSON.stringify({
        success: true,
        messageId: emailResult?.id,
      } as EmailResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro inesperado na Edge Function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      } as EmailResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
