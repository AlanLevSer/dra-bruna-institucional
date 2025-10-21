import { QuizData, TransformacaoOutput } from "@/types/quiz";

export function generateTransformacaoOutput(data: QuizData): TransformacaoOutput {
  const headline = generateHeadline(data);
  const qli = generateQLI(data);
  const roadmap = generateRoadmap(data);
  const mixEstrategias = generateMixEstrategias(data);
  const kpis = generateKPIs(data);
  const lifestyleWins = generateLifestyleWins(data);
  const alertaClinico = generateAlertaClinico(data);
  
  return {
    headline,
    qli,
    roadmap,
    mixEstrategias,
    kpis,
    lifestyleWins,
    alertaClinico
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
      titulo: data.efeitoSanfona ? "Manutenção & Anti-Rebote" : "Manutenção & Estilo de Vida",
      duracao: "12+ meses",
      objetivo: data.efeitoSanfona
        ? "Consolidar resultados e quebrar o ciclo de recaída definitivamente"
        : "Sustentar resultados e prevenir recaídas",
      entregas: data.efeitoSanfona
        ? [
            "Plano de manutenção individualizado com gatilhos mapeados",
            "Check-ins quinzenais nos primeiros 3 meses pós-alta",
            "Programa de emergência para momentos de risco",
            "Comunidade de suporte e accountability"
          ]
        : [
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
      enfase: (data.efeitoSanfona || data.tentativasAnteriores >= 5 ? 'alta' : data.gatilhos.length > 2 ? 'alta' : 'media') as 'alta' | 'media' | 'baixa',
      descricao: data.efeitoSanfona 
        ? "Estratégias para quebrar o ciclo do efeito sanfona e construir sustentabilidade real"
        : "Estratégias para gatilhos emocionais e organização do ambiente"
    },
    {
      nome: "Saúde Regenerativa",
      enfase: (data.comorbidades.filter(c => c !== 'nenhuma').length > 1 ? 'alta' : 'baixa') as 'alta' | 'media' | 'baixa',
      descricao: "Redução de inflamação e otimização metabólica"
    }
  ];
  
  if (data.efeitoSanfona) {
    pilares.push({
      nome: "Prevenção de Recaída",
      enfase: 'alta' as const,
      descricao: "Protocolo estruturado para evitar o efeito rebote e manter resultados a longo prazo"
    });
  }
  
  let intervencao: TransformacaoOutput['mixEstrategias']['intervencao'] = undefined;
  const comorbidadesQtd = data.comorbidades.filter(c => c !== 'nenhuma').length;
  const metaKg = (data.peso * data.metaPeso) / 100;
  
  // 0) PLASMA DE ARGÔNIO - Exclusivo para reganho pós-BYPASS
  if (
    data.cirurgiaBariatricaPreviaTipo === 'bypass' &&
    data.reganhoPosBariatrica &&
    (data.invasividade === 'minima' || data.invasividade === 'moderada')
  ) {
    intervencao = {
      tipo: 'plasma_argonio',
      nome: 'Plasma de Argônio (APC) pós-Bypass',
      justificativa: "Procedimento endoscópico específico para tratamento de reganho após bypass gástrico. Necessária avaliação endoscópica prévia."
    };
  }
  
  // 1) GASTROPLASTIA ENDOSCÓPICA
  else if (
    data.imc >= 30 && data.imc <= 40 &&
    data.invasividade !== 'minima' &&
    (metaKg >= 20 || comorbidadesQtd >= 2 || data.falhaPreviaClinica)
  ) {
    intervencao = {
      tipo: 'gastroplastia',
      nome: 'Gastroplastia Endoscópica',
      justificativa: "Redução volumétrica do estômago sem cortes. Recuperação rápida e resultado mais robusto. A decisão é compartilhada na avaliação."
    };
  }
  // IMC > 40 e recusa cirurgia bariátrica
  else if (data.imc > 40 && data.invasividade !== 'minima') {
    intervencao = {
      tipo: 'gastroplastia',
      nome: 'Gastroplastia Endoscópica',
      justificativa: "Opção endoscópica robusta quando cirurgia bariátrica não é desejada. Sujeita à elegibilidade clínica."
    };
  }
  
  // 2) BALÃO 12 MESES (exclui se cirurgia gástrica prévia)
  else if (
    data.imc >= 30 &&
    data.invasividade !== 'minima' &&
    !data.cirurgiaGastricaPrevia &&
    (metaKg >= 20 || comorbidadesQtd >= 2 || data.efeitoSanfona)
  ) {
    intervencao = {
      tipo: 'balao_12m',
      nome: 'Balão Intragástrico Ajustável (12 meses)',
      justificativa: "Ajustável ao longo do ano para estabilidade e menor risco de reganho. Exclui-se quem já teve cirurgia gástrica."
    };
  }
  
  // 3) BALÃO 6 MESES (exclui se cirurgia gástrica prévia)
  else if (
    data.invasividade !== 'minima' &&
    !data.cirurgiaGastricaPrevia &&
    (
      // Caso especial: IMC 27-30 com falha clínica prévia
      (data.imc > 27 && data.imc < 30 && data.falhaPreviaClinica) ||
      // Fallback padrão IMC >= 30
      (data.imc >= 30) ||
      // Tempo de recuperação curto
      (data.tempoRecuperacao === 'minimo')
    )
  ) {
    intervencao = {
      tipo: 'balao_6m',
      nome: 'Balão Intragástrico (6 meses)',
      justificativa: "Start estruturado com foco em constância; ideal quando há falhas clínicas prévias ou tempo curto."
    };
  }
  
  // 4) CANETAS (priorizar se invasividade mínima)
  else if (
    (data.imc >= 30) || 
    (data.imc >= 27 && comorbidadesQtd >= 1)
  ) {
    intervencao = {
      tipo: 'injetaveis',
      nome: 'Terapia Injetável (GLP-1/GIP)',
      justificativa: "Controle de apetite e melhora metabólica com mínima invasividade. Protocolos individualizados por exames."
    };
  }
  
  return { pilares, intervencao };
}

function generateAlertaClinico(data: QuizData): string | undefined {
  const alertas: string[] = [];
  
  if (data.cirurgiaGastricaPrevia && !data.reganhoPosBariatrica) {
    alertas.push("Cirurgia gástrica prévia pode contraindicar alguns procedimentos (ex: balões)");
  }
  
  if (alertas.length > 0) {
    return `⚠️ Atenção: ${alertas.join(". ")}. Estas condições exigem avaliação médica. Seu plano será definido com segurança em consulta.`;
  }
  
  return undefined;
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
