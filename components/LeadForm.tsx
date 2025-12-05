"use client";

import { useState, FormEvent } from "react";
import { LeadFormData, Profissao, EstagioCarreira } from "@/types/lead";

interface FormErrors {
  nome?: string;
  email?: string;
  profissao?: string;
  cidade?: string;
  estado?: string;
  estagio_carreira?: string;
  general?: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: "",
    email: "",
    profissao: "Outros",
    cidade: "",
    estado: "",
    estagio_carreira: "Profissional em atuacao",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Estados do Brasil para o select
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const profissoes: { value: Profissao; label: string }[] = [
    { value: "Medico", label: "Médico" },
    { value: "Dentista", label: "Dentista" },
    { value: "Fisioterapeuta", label: "Fisioterapeuta" },
    { value: "Psicologo", label: "Psicólogo" },
    { value: "Outros", label: "Outros" },
  ];

  const estagios: { value: EstagioCarreira; label: string }[] = [
    { value: "Estudante ultimo ano", label: "Estudante último ano" },
    {
      value: "Recem formado (ate 2 anos)",
      label: "Recém-formado (até 2 anos)",
    },
    { value: "Profissional em atuacao", label: "Profissional em atuação" },
  ];

  // Validação do formulário no cliente
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome || formData.nome.trim().length < 3) {
      newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.cidade || formData.cidade.trim().length < 2) {
      newErrors.cidade = "Cidade é obrigatória";
    }

    if (!formData.estado || formData.estado.length !== 2) {
      newErrors.estado = "Selecione um estado";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          setErrors({ general: result.errors.join(", ") });
        } else {
          setErrors({
            general: "Erro ao enviar formulário. Por favor, tente novamente.",
          });
        }
        setIsLoading(false);
        return;
      }

      // Sucesso
      setIsSuccess(true);
      setFormData({
        nome: "",
        email: "",
        profissao: "Outros",
        cidade: "",
        estado: "",
        estagio_carreira: "Profissional em atuacao",
      });

      // Scroll suave até a mensagem de sucesso
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setErrors({
        general:
          "Erro de conexão. Por favor, verifique sua internet e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Obrigado pelo seu interesse!
        </h3>
        <p className="text-green-700 mb-4">
          Seus dados foram salvos com sucesso. Em breve você receberá por e-mail
          o link para baixar o guia completo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-semibold">Erro:</p>
          <p>{errors.general}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nome completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 placeholder:opacity-100 text-gray-900 bg-white ${
            errors.nome ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Seu nome completo"
          disabled={isLoading}
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 placeholder:opacity-100 text-gray-900 bg-white ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="seu@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="profissao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Profissão <span className="text-red-500">*</span>
          </label>
          <select
            id="profissao"
            name="profissao"
            value={formData.profissao}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            disabled={isLoading}
          >
            {profissoes.map((prof) => (
              <option key={prof.value} value={prof.value}>
                {prof.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="estagio_carreira"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estágio de carreira <span className="text-red-500">*</span>
          </label>
          <select
            id="estagio_carreira"
            name="estagio_carreira"
            value={formData.estagio_carreira}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            disabled={isLoading}
          >
            {estagios.map((estagio) => (
              <option key={estagio.value} value={estagio.value}>
                {estagio.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="cidade"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cidade <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 placeholder:opacity-100 text-gray-900 bg-white ${
              errors.cidade ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Sua cidade"
            disabled={isLoading}
          />
          {errors.cidade && (
            <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estado (UF) <span className="text-red-500">*</span>
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
              errors.estado ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          >
            <option value="">Selecione...</option>
            {estados.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 text-lg cursor-pointer"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </span>
        ) : (
          "Quero receber o guia gratuito"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Ao preencher este formulário, você concorda em receber comunicações da
        nossa equipe.
      </p>
    </form>
  );
}
