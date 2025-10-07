import { QuizData, TransformacaoOutput } from "@/types/quiz";

export function generateTransformacaoOutput(data: QuizData): TransformacaoOutput {
  const headline = generateHeadline(data);
  const qli = generateQLI(data);
  const roadmap = generateRoadmap(data);
  const mixEstrategias = generateMixEstrategias(data);
  const kpis = generateKPIs(data);
  const lifestyleWins = generateLifestyleWins(data);
  
  return {
    headline,
    qli,
    roadmap,
    mixEstrategias,
    kpis,
    lifestyleWins
  };
}

function generateHeadline(data: QuizData): string {
  const expectativasMap: Record<string, string> = {
    dormir_melhor: "dormir profundamente",
    ter_energia: "ter energia constante",
    vestir_confianca: "vestir-se com confiança",
    melhorar_exames: "normalizar seus exames",
    brincar_filhos: "brincar com seus filhos sem cansaço",
    performance_trabalho: "ter foco e clareza no trabalho",
    autonomia_movimentos: "mover-se com leveza"
  };
  
  const top3 = data.expectativas.slice(0, 3).map(e => expectativasMap[e]);
  
  if (top3.length === 0) {
    return "Nos próximos 6–12 meses você vai transformar sua saúde e voltar a confiar no seu corpo.";
  }
  
  return `Nos próximos 6–12 meses você vai ${top3.join(", ")} e voltar a confiar no seu corpo.`;
}

function generateQLI(data: QuizData) {
  const hasComorbidades = data.comorbidades.filter(c => c !== 'nenhuma').length > 1;
  
  const baselineMap: Record<string, number> = {
    energia: data.dorPrincipal === 'energia' ? 3 : 5,
    sono: data.comorbidades.includes('apneia') ? 3 : 5,
    humor: data.gatilhos.includes('ansiedade') || data.gatilhos.includes('estresse') ? 4 : 5,
    mobilidade: data.dorPrincipal === 'dores_articulares' || data.dorPrincipal === 'mobilidade' ? 3 : 6,
    autoconfianca: data.dorPrincipal === 'autoestima' ? 3 : 5,
    metabolico: hasComorbidades ? 3 : 6
  };
  
  const qli: TransformacaoOutput['qli'] = {
    energia: { baseline: baselineMap.energia, meta: Math.min(10, baselineMap.energia + 4) },
    sono: { baseline: baselineMap.sono, meta: Math.min(10, baselineMap.sono + 4) },
    humor: { baseline: baselineMap.humor, meta: Math.min(10, baselineMap.humor + 4) },
    mobilidade: { baseline: baselineMap.mobilidade, meta: Math.min(10, baselineMap.mobilidade + 4) },
    autoconfianca: { baseline: baselineMap.autoconfianca, meta: Math.min(10, baselineMap.autoconfianca + 5) },
    metabolico: { baseline: baselineMap.metabolico, meta: Math.min(10, baselineMap.metabolico + 4) }
  };
  
  return qli;
}

function generateRoadmap(data: QuizData) {
  const hasIntervencao = data.imc >= 30 && data.metaPeso >= 20;
  
  return [
    {
      fase: 1,
      titulo: "Mapeamento & Direção",
      duracao: "2–4 semanas",
      objetivo: "Entender seu ponto de partida e traçar metas realistas",
      entregas: [
        "Exames metabólicos completos",
        "Avaliação de composição corporal",
        "Definição de metas QLI personalizadas",
        "Plano inicial de 90 dias"
      ]
    },
    {
      fase: 2,
      titulo: "Reset & Ritmo",
      duracao: "8–12 semanas",
      objetivo: "Reduzir fome, inflamação e ganhar constância",
      entregas: [
        "Protocolo nutricional individualizado",
        "Início de atividade física adaptada",
        hasIntervencao ? "Intervenção para acelerar resultados" : "Estratégias comportamentais",
        "Checkpoints quinzenais"
      ]
    },
    {
      fase: 3,
      titulo: "Consolidação & Autonomia",
      duracao: "12–16 semanas",
      objetivo: "Preservar massa magra e consolidar hábitos",
      entregas: [
        "Evolução do plano de treino",
        "Refinamento de sono e humor",
        "Autonomia nas escolhas alimentares",
        "Preparação para manutenção"
      ]
    },
    {
      fase: 4,
      titulo: "Manutenção & Estilo de Vida",
      duracao: "12+ meses",
      objetivo: "Sustentar resultados e prevenir recaídas",
      entregas: [
        "Checkpoints trimestrais",
        "Pulsos regenerativos conforme necessário",
        "Plano de recaída estruturado",
        "Comunidade de suporte contínuo"
      ]
    }
  ];
}

function generateMixEstrategias(data: QuizData) {
  const pilares = [
    {
      nome: "Nutrição Inteligente",
      enfase: (data.dorPrincipal === 'compulsao' ? 'alta' : 'media') as 'alta' | 'media' | 'baixa',
      descricao: "Plano alimentar por fases, sem restrições extremas"
    },
    {
      nome: "Corpo em Movimento",
      enfase: (data.dorPrincipal === 'dores_articulares' || data.dorPrincipal === 'mobilidade' ? 'alta' : 'media') as 'alta' | 'media' | 'baixa',
      descricao: "Força + mobilidade adaptada ao seu momento"
    },
    {
      nome: "Mente & Comportamento",
      enfase: (data.gatilhos.length > 2 ? 'alta' : 'media') as 'alta' | 'media' | 'baixa',
      descricao: "Estratégias para gatilhos emocionais e organização do ambiente"
    },
    {
      nome: "Saúde Regenerativa",
      enfase: (data.comorbidades.filter(c => c !== 'nenhuma').length > 1 ? 'alta' : 'baixa') as 'alta' | 'media' | 'baixa',
      descricao: "Redução de inflamação e otimização metabólica"
    }
  ];
  
  let intervencao: TransformacaoOutput['mixEstrategias']['intervencao'] = undefined;
  
  if (data.imc >= 30 && data.metaPeso >= 20) {
    if (data.invasividade === 'minima' && data.tempoRecuperacao === 'minimo') {
      intervencao = {
        tipo: 'injetaveis',
        nome: 'Terapia Sacietogênica',
        justificativa: "Para acelerar resultados com mínima invasividade e sem tempo de recuperação"
      };
    } else if (data.invasividade === 'moderada' || data.invasividade === 'nao_importa') {
      if (data.metaPeso >= 30 || data.comorbidades.filter(c => c !== 'nenhuma').length >= 2) {
        intervencao = {
          tipo: 'balao_12m',
          nome: 'Balão Intragástrico Ajustável (12 meses)',
          justificativa: "Balão ajustável de 12 meses para maior sustentabilidade e acompanhamento estruturado"
        };
      } else {
        intervencao = {
          tipo: 'balao_6m',
          nome: 'Balão Intragástrico (6 meses)',
          justificativa: "Balão de 6 meses para acelerar reset metabólico com segurança"
        };
      }
    }
  } else if (data.imc >= 27 && data.metaPeso >= 10) {
    intervencao = {
      tipo: 'injetaveis',
      nome: 'Terapia Sacietogênica',
      justificativa: "Terapia sacietogênica para controle de fome e estabilização do peso"
    };
  }
  
  return { pilares, intervencao };
}

function generateKPIs(data: QuizData) {
  const pesoAtual = data.peso;
  const pesoMeta = pesoAtual - (pesoAtual * data.metaPeso / 100);
  const circunferenciaAtual = Math.round(85 + (data.imc - 25) * 2);
  const circunferenciaMeta = Math.round(circunferenciaAtual - (data.metaPeso * 0.8));
  
  const kpis = [
    {
      metrica: "Peso",
      antes: `${pesoAtual.toFixed(0)}kg`,
      meta: `${pesoMeta.toFixed(0)}kg (−${data.metaPeso}%)`
    },
    {
      metrica: "Circunferência Abdominal",
      antes: `${circunferenciaAtual}cm`,
      meta: `${circunferenciaMeta}cm`
    }
  ];
  
  if (data.comorbidades.includes('dm2') || data.comorbidades.includes('ri')) {
    kpis.push({
      metrica: "HbA1c",
      antes: "6,2%",
      meta: "5,5%"
    });
  }
  
  if (data.comorbidades.includes('dislipidemia')) {
    kpis.push({
      metrica: "Triglicerídeos",
      antes: "180 mg/dL",
      meta: "< 150 mg/dL"
    });
  }
  
  return kpis;
}

function generateLifestyleWins(data: QuizData) {
  const wins = [
    {
      titulo: "Dormir 7h por noite",
      frequencia: "21/30 dias",
      icon: "Moon"
    },
    {
      titulo: "Hidratação (2L+/dia)",
      frequencia: "25/30 dias",
      icon: "Droplet"
    }
  ];
  
  if (data.tempoDisponivel !== '1-3h/sem') {
    wins.push({
      titulo: "Treino de força",
      frequencia: "3x/semana",
      icon: "Dumbbell"
    });
  }
  
  if (data.gatilhos.includes('fome_noturna')) {
    wins.push({
      titulo: "Sem telas 60min antes de dormir",
      frequencia: "20/30 dias",
      icon: "Smartphone"
    });
  }
  
  wins.push({
    titulo: "Cozinhar em casa",
    frequencia: "1x/semana",
    icon: "ChefHat"
  });
  
  return wins;
}
