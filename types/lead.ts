export type Profissao = 
  | 'Medico'
  | 'Dentista'
  | 'Fisioterapeuta'
  | 'Psicologo'
  | 'Outros';

export type EstagioCarreira = 
  | 'Estudante ultimo ano'
  | 'Recem formado (ate 2 anos)'
  | 'Profissional em atuacao';

export interface LeadFormData {
  nome: string;
  email: string;
  profissao: Profissao;
  cidade: string;
  estado: string;
  estagio_carreira: EstagioCarreira;
}

export interface Lead extends LeadFormData {
  id: string;
  created_at: string;
  source: string;
}


