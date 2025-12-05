import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { LeadFormData, Profissao, EstagioCarreira } from "@/types/lead";

/**
 * Chama a Edge Function do Supabase para enviar email
 */
async function sendEmailViaEdgeFunction(data: {
  nome: string;
  email: string;
  linkDownload?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Variáveis de ambiente do Supabase não configuradas");
      return { success: false, error: "Configuração não encontrada" };
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        linkDownload: data.linkDownload,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Erro ao enviar email via Edge Function:", result.error);
      return { success: false, error: result.error || "Erro desconhecido" };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao chamar Edge Function:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Valida os dados do formulário de lead
 */
function validateLeadData(data: Partial<LeadFormData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.nome || data.nome.trim().length < 3) {
    errors.push("Nome deve ter pelo menos 3 caracteres");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email inválido");
  }

  const validProfissoes: Profissao[] = [
    "Medico",
    "Dentista",
    "Fisioterapeuta",
    "Psicologo",
    "Outros",
  ];
  if (!data.profissao || !validProfissoes.includes(data.profissao)) {
    errors.push("Profissão inválida");
  }

  if (!data.cidade || data.cidade.trim().length < 2) {
    errors.push("Cidade é obrigatória");
  }

  if (!data.estado || data.estado.length !== 2) {
    errors.push("Estado (UF) deve ter 2 caracteres");
  }

  const validEstagios: EstagioCarreira[] = [
    "Estudante ultimo ano",
    "Recem formado (ate 2 anos)",
    "Profissional em atuacao",
  ];
  if (
    !data.estagio_carreira ||
    !validEstagios.includes(data.estagio_carreira)
  ) {
    errors.push("Estágio de carreira inválido");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * POST /api/leads
 * Cria um novo lead no banco de dados
 */
export async function POST(request: NextRequest) {
  try {
    const body: Partial<LeadFormData> = await request.json();

    // Validação dos dados
    const validation = validateLeadData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Cria o cliente do Supabase
    const supabase = await createClient();

    // Prepara os dados para inserção
    const leadData = {
      nome: body.nome!.trim(),
      email: body.email!.trim().toLowerCase(),
      profissao: body.profissao!,
      cidade: body.cidade!.trim(),
      estado: body.estado!.trim().toUpperCase(),
      estagio_carreira: body.estagio_carreira!,
      source: "landing_primeiros_passos",
    };

    // Insere o lead no banco
    const { data, error } = await supabase
      .from("leads")
      .insert([leadData])
      .select()
      .single();

    if (error) {
      console.error("Erro ao inserir lead no Supabase:", error);

      // Verifica se é erro de duplicação (email já cadastrado)
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            errors: [
              "Este email já está cadastrado. Por favor, use outro email ou aguarde nosso contato.",
            ],
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          errors: ["Erro ao salvar seus dados. Por favor, tente novamente."],
        },
        { status: 500 }
      );
    }

    // Envia email via Edge Function (não bloqueia a resposta se falhar)
    // Os links podem ser configurados via variáveis de ambiente na Edge Function
    const emailResult = await sendEmailViaEdgeFunction({
      nome: leadData.nome,
      email: leadData.email,
      // Links opcionais - se não fornecidos, a Edge Function usa os valores padrão das variáveis de ambiente
    });

    // Log do resultado do email (não expõe erro ao usuário para não prejudicar UX)
    if (!emailResult.success) {
      console.warn(
        "Email não foi enviado, mas lead foi salvo:",
        emailResult.error
      );
    } else {
      console.log("Email enviado com sucesso para:", leadData.email);
    }

    // Retorna sucesso mesmo se o email falhar (lead foi salvo com sucesso)
    return NextResponse.json(
      {
        success: true,
        data: {
          id: data.id,
          message: "Seus dados foram salvos com sucesso!",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro inesperado ao processar lead:", error);
    return NextResponse.json(
      {
        success: false,
        errors: [
          "Erro inesperado ao processar sua solicitação. Por favor, tente novamente.",
        ],
      },
      { status: 500 }
    );
  }
}
