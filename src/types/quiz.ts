export interface QuizData {
  // Step 1: IMC + Meta
  peso: number;
  altura: number;
  imc: number;
  metaPeso: number; // % de perda: 5-10, 10-20, 20-30, 30+
  
  // Step 2: Comorbidades
  comorbidades: Array<'dm2' | 'ri' | 'has' | 'dislipidemia' | 'apneia' | 'sop' | 'nenhuma'>;
  
  // Step 3: Histórico
  tentativasAnteriores: number;
  efeitoSanfona: boolean;
  gatilhos: Array<'estresse' | 'ansiedade' | 'social' | 'emocional' | 'fome_noturna'>;
  
  // Step 4: Preferências
  invasividade: 'minima' | 'moderada' | 'nao_importa';
  tempoRecuperacao: 'minimo' | 'moderado' | 'nao_importa';
  tempoDisponivel: '1-3h/sem' | '3-5h/sem' | '5+h/sem';
  
  // Step 5: Dor Principal
  dorPrincipal: 'energia' | 'compulsao' | 'dores_articulares' | 'autoestima' | 'marcadores_alterados' | 'mobilidade';
  
  // Step 6: Expectativas de Vida
  expectativas: Array<
    'dormir_melhor' | 
    'ter_energia' | 
    'vestir_confianca' | 
    'melhorar_exames' | 
    'brincar_filhos' | 
    'performance_trabalho' |
    'autonomia_movimentos'
  >;
  
  // Step 7: Histórico Cirúrgico
  cirurgiaGastricaPrevia: boolean;
  cirurgiaBariatricaPreviaTipo: 'nenhuma' | 'bypass' | 'sleeve' | 'outras';
  reganhoPosBariatrica: boolean;
  falhaPreviaClinica: boolean;
}

export interface TransformacaoOutput {
  headline: string;
  alertaClinico?: string;
  perfilSaude: {
    notaGlobal: number;
    conceito: 'A' | 'B' | 'C' | 'D' | 'E';
    faixa: 'verde' | 'ambar' | 'vermelho';
    eixos: Array<{
      nome: string;
      nota: number;
      baseline: number;
      meta: number;
    }>;
    problemasDetectados: Array<{
      eixo: string;
      nota: number;
      mensagem: string;
    }>;
    ganhosProv90dias: string[];
  };
  qli: {
    energia: { baseline: number; meta: number };
    sono: { baseline: number; meta: number };
    humor: { baseline: number; meta: number };
    mobilidade: { baseline: number; meta: number };
    autoconfianca: { baseline: number; meta: number };
    metabolico: { baseline: number; meta: number };
  };
  roadmap: Array<{
    fase: number;
    titulo: string;
    duracao: string;
    objetivo: string;
    entregas: string[];
  }>;
  mixEstrategias: {
    pilares: Array<{
      nome: string;
      enfase: 'alta' | 'media' | 'baixa';
      descricao: string;
    }>;
    intervencao?: {
      tipo: 'balao_6m' | 'balao_12m' | 'gastroplastia' | 'injetaveis' | 'plasma_argonio';
      nome: string;
      justificativa: string;
    };
  };
  kpis: Array<{
    metrica: string;
    antes: string;
    meta: string;
  }>;
  lifestyleWins: Array<{
    titulo: string;
    frequencia: string;
    icon: string;
  }>;
}
