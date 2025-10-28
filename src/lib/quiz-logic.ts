import { QuizData, TransformacaoOutput, PlanoEnergetico } from "@/types/quiz";

export function generateTransformacaoOutput(data: QuizData): TransformacaoOutput {
  const headline = generateHeadline(data);
  const planoEnergetico = generatePlanoEnergetico(data);
  const perfilSaude = generatePerfilSaude(data);
  const qli = generateQLI(data);
  const roadmap = generateRoadmap(data);
  const mixEstrategias = generateMixEstrategias(data);
  const kpis = generateKPIs(data);
  const lifestyleWins = generateLifestyleWins(data);
  const alertaClinico = generateAlertaClinico(data);
  
  return {
    headline,
    planoEnergetico,
    perfilSaude,
    qli,
    roadmap,
    mixEstrategias,
    kpis,
    lifestyleWins,
    alertaClinico
  };
}

function generatePlanoEnergetico(data: QuizData): PlanoEnergetico {
  // 1) Meta em kg
  const metaKg = Math.round((data.peso * data.metaPeso) / 100);
  
  // 2) Energia necessária (1kg gordura ≈ 7700 kcal)
  const deficitTotal = metaKg * 7700;
  
  // 3) Horizonte de tempo (baseado na meta e no IMC - mais conservador para metas maiores)
  const semanasPlano = Math.max(
    12, // mínimo 12 semanas
    Math.round(metaKg / 0.75 * 1.0) // ~0.75kg/semana em média (conservador)
  );
  
  // 4) Déficit diário inicial
  const deficitDiarioCalculado = Math.round((deficitTotal / semanasPlano) / 7);
  
  // 5) BMR (Mifflin-St Jeor)
  const bmr = data.sexo === 'masculino'
    ? 10 * data.peso + 6.25 * data.altura - 5 * data.idade + 5
    : 10 * data.peso + 6.25 * data.altura - 5 * data.idade - 161;
  
  // 6) Fator de atividade (baseado no nível coletado)
  const fatorAtividade = 
    data.nivelAtividade === 'sedentaria' ? 1.2 :
    data.nivelAtividade === 'baixa' ? 1.375 :
    data.nivelAtividade === 'moderada' ? 1.55 :
    data.nivelAtividade === 'alta' ? 1.725 :
    1.375; // default leve
  
  // 7) TDEE
  const tdee = Math.round(bmr * fatorAtividade);
  
  // 8) Guard-rails de segurança
  const deficitMinimo = 300;
  const deficitMaximo = 1000;
  const deficitDiario = Math.max(deficitMinimo, Math.min(deficitMaximo, deficitDiarioCalculado));
  
  // 9) Kcal mínimas absolutas
  const kcalMinimo = data.sexo === 'masculino' ? 1600 : 1300;
  
  // 10) Calorias alvo por fase (com adaptação metabólica)
  const TDEE_F1 = tdee;
  const TDEE_F2 = Math.round(tdee * 0.95); // -5% após 8 semanas
  const TDEE_F3 = Math.round(tdee * 0.90); // -10% após 12 semanas
  
  const kcalF1 = Math.max(kcalMinimo, TDEE_F1 - deficitDiario);
  const kcalF2 = Math.max(kcalMinimo, TDEE_F2 - Math.round(deficitDiario * 0.9));
  const kcalF3 = Math.max(kcalMinimo, TDEE_F3 - Math.round(deficitDiario * 0.8));
  
  // 11) Fases
  const fases = [
    {
      fase: 1,
      semanas: "1-8",
      kcalAlvo: kcalF1,
      tdeeAjustado: TDEE_F1
    },
    {
      fase: 2,
      semanas: "9-12",
      kcalAlvo: kcalF2,
      tdeeAjustado: TDEE_F2
    },
    {
      fase: 3,
      semanas: "13+",
      kcalAlvo: kcalF3,
      tdeeAjustado: TDEE_F3
    }
  ];
  
  // 12) Proteína meta (1.8g/kg de peso meta para preservação de massa magra)
  const pesoMeta = data.peso - metaKg;
  const proteinaMeta = Math.round(1.8 * pesoMeta);
  
  // 13) Aviso de segurança se déficit ajustado for diferente do calculado
  let avisoSeguranca: string | undefined;
  if (deficitDiarioCalculado > deficitMaximo) {
    avisoSeguranca = "Para atingir essa meta nesse prazo, o déficit diário ultrapassa o limite seguro. Ajustaremos prazo e estratégias na sua avaliação para garantir resultados sustentáveis.";
  } else if (deficitDiarioCalculado < deficitMinimo) {
    avisoSeguranca = "Seu déficit calculado é muito baixo. Vamos otimizar a estratégia na avaliação para acelerar resultados de forma segura.";
  }
  
  // 14) Facilitadores (baseados no perfil)
  const facilitadores: string[] = [];
  
  // GLP-1/GIP se elegível
  if (data.imc >= 30 || (data.imc >= 27 && data.comorbidades.filter(c => c !== 'nenhuma').length >= 1)) {
    facilitadores.push("Saciedade assistida (GLP-1/GIP) quando indicado - reduz fome em 20-40%");
  }
  
  // Nutrição celular sempre
  facilitadores.push("Nutrição celular & regenerativa para energia estável");
  
  // Endoscopia se indicado
  if ((data.invasividade !== 'minima' && data.imc >= 30) || data.falhaPreviaClinica) {
    facilitadores.push("Endoscopia metabólica (balão/gastroplastia) quando elegível");
  }
  
  // Planejamento sempre
  facilitadores.push(`Planejamento de refeições com meta proteica (${proteinaMeta}g/dia)`);
  
  // Refeed se longo prazo
  if (semanasPlano >= 12) {
    facilitadores.push("Fases com refeed estratégico a cada 4-6 semanas");
  }
  
  // Treino se não faz força
  if (data.forcaResistencia === 'nao_faco' || data.forcaResistencia === '1x_sem') {
    facilitadores.push("Treino de força 2-3x/sem para preservar massa magra");
  }
  
  // Acompanhamento sempre
  facilitadores.push("Acompanhamento 360° com ajuste fino contínuo");
  
  return {
    metaKg,
    deficitDiario,
    semanasPlano,
    tdee,
    bmr,
    fases,
    proteinaMeta,
    avisoSeguranca,
    facilitadores
  };
}

function generatePerfilSaude(data: QuizData): TransformacaoOutput['perfilSaude'] {
  const baselineQLI = {
    energia: data.peso > 100 ? 3 : data.peso > 80 ? 4 : 5,
    sono: data.comorbidades.includes('apneia') ? 2 : 4,
    mobilidade: data.dorPrincipal === 'dores_articulares' || data.dorPrincipal === 'mobilidade' ? 3 : 5,
    humor: data.gatilhos.length > 3 ? 3 : data.gatilhos.length > 1 ? 4 : 6,
  };

  const metaQLI = {
    energia: Math.min(10, baselineQLI.energia + 3),
    sono: Math.min(10, baselineQLI.sono + 4),
    mobilidade: Math.min(10, baselineQLI.mobilidade + 4),
    humor: Math.min(10, baselineQLI.humor + 3),
  };

  // Mapear comorbidades
  const temDM2 = data.comorbidades.includes('dm2');
  const temRI = data.comorbidades.includes('ri');
  const temHAS = data.comorbidades.includes('has');
  const temDislipidemia = data.comorbidades.includes('dislipidemia');
  const temApneia = data.comorbidades.includes('apneia');
  const temSOP = data.comorbidades.includes('sop');

  // Inferir hábitos positivos
  const habForca = data.expectativas?.includes('autonomia_movimentos') || false;
  const habPlanejamento = data.tentativasAnteriores >= 3;
  const habAgua = true; // Assumir positivo por padrão
  const habPassos = !data.dorPrincipal || data.dorPrincipal !== 'mobilidade';

  // Calcular notas dos 8 eixos
  const calcularNota = (baseline: number, meta: number, comorbidade: boolean, habitoPositivo: boolean) => {
    let nota = Math.round((baseline / 10) * 60 + Math.max(0, meta - baseline) * 10);
    if (comorbidade) nota = Math.max(0, nota - 10);
    if (habitoPositivo) nota = Math.min(100, nota + 5);
    return Math.max(0, Math.min(100, nota));
  };

  // Eixo Fome & Compulsão (baseado em gatilhos)
  const baselineFome = data.dorPrincipal === 'compulsao' ? 2 : data.gatilhos.length > 2 ? 3 : 5;
  const metaFome = Math.min(10, baselineFome + 4);

  // Eixo Alimentação (baseado em tentativas anteriores)
  const baselineAlimentacao = data.tentativasAnteriores === 0 ? 3 : data.tentativasAnteriores < 3 ? 4 : 5;
  const metaAlimentacao = Math.min(10, baselineAlimentacao + 3);

  // Eixo Metabolismo (baseado em DM2/RI e IMC)
  const baselineMetabolismo = (temDM2 || temRI) ? 2 : data.imc > 35 ? 3 : 4;
  const metaMetabolismo = Math.min(10, baselineMetabolismo + 4);

  // Eixo Cardiovascular (baseado em HAS/dislipidemia)
  const baselineCardio = (temHAS && temDislipidemia) ? 2 : (temHAS || temDislipidemia) ? 3 : 5;
  const metaCardio = Math.min(10, baselineCardio + 3);

  const eixos = [
    {
      nome: 'Energia',
      nota: calcularNota(baselineQLI.energia, metaQLI.energia, false, habAgua),
      baseline: baselineQLI.energia,
      meta: metaQLI.energia,
    },
    {
      nome: 'Sono',
      nota: calcularNota(baselineQLI.sono, metaQLI.sono, temApneia, false),
      baseline: baselineQLI.sono,
      meta: metaQLI.sono,
    },
    {
      nome: 'Fome & Compulsão',
      nota: calcularNota(baselineFome, metaFome, false, habPlanejamento),
      baseline: baselineFome,
      meta: metaFome,
    },
    {
      nome: 'Mobilidade & Dor',
      nota: calcularNota(baselineQLI.mobilidade, metaQLI.mobilidade, false, habPassos),
      baseline: baselineQLI.mobilidade,
      meta: metaQLI.mobilidade,
    },
    {
      nome: 'Alimentação',
      nota: calcularNota(baselineAlimentacao, metaAlimentacao, false, habPlanejamento),
      baseline: baselineAlimentacao,
      meta: metaAlimentacao,
    },
    {
      nome: 'Metabolismo',
      nota: calcularNota(baselineMetabolismo, metaMetabolismo, temRI || temDM2, false),
      baseline: baselineMetabolismo,
      meta: metaMetabolismo,
    },
    {
      nome: 'Cardiovascular',
      nota: calcularNota(baselineCardio, metaCardio, temDislipidemia, habForca),
      baseline: baselineCardio,
      meta: metaCardio,
    },
    {
      nome: 'Bem-estar & Humor',
      nota: calcularNota(baselineQLI.humor, metaQLI.humor, false, false),
      baseline: baselineQLI.humor,
      meta: metaQLI.humor,
    },
  ];

  // Calcular nota global
  const notaGlobal = Math.round(eixos.reduce((sum, e) => sum + e.nota, 0) / eixos.length);

  // Determinar conceito e faixa
  let conceito: 'A' | 'B' | 'C' | 'D' | 'E';
  let faixa: 'verde' | 'ambar' | 'vermelho';

  if (notaGlobal >= 90) conceito = 'A';
  else if (notaGlobal >= 80) conceito = 'B';
  else if (notaGlobal >= 70) conceito = 'C';
  else if (notaGlobal >= 60) conceito = 'D';
  else conceito = 'E';

  if (notaGlobal >= 75) faixa = 'verde';
  else if (notaGlobal >= 50) faixa = 'ambar';
  else faixa = 'vermelho';

  // Identificar problemas detectados (nota < 50)
  const problemasDetectados = eixos
    .filter(e => e.nota < 50)
    .sort((a, b) => a.nota - b.nota)
    .slice(0, 3)
    .map(e => ({
      eixo: e.nome,
      nota: e.nota,
      mensagem: `${e.nome} abaixo do ideal`,
    }));

  // Gerar ganhos prováveis (top 3 eixos mais baixos)
  const ganhosMap: Record<string, string> = {
    'Energia': 'Energia estável ao longo do dia sem quedas à tarde',
    'Sono': 'Dormir 7h+ seguidas e acordar com mais disposição',
    'Fome & Compulsão': 'Fome sob controle, especialmente à noite',
    'Mobilidade & Dor': 'Menos dor ao caminhar, subir escadas e nas articulações',
    'Alimentação': 'Refeições simples com boa saciedade e sem culpa',
    'Metabolismo': 'Melhor sensibilidade à insulina e controle glicêmico',
    'Cardiovascular': 'Triglicérides e pressão arterial melhor controlados',
    'Bem-estar & Humor': 'Menos ansiedade em relação à comida e ao corpo',
  };

  const ganhosProv90dias = eixos
    .sort((a, b) => a.nota - b.nota)
    .slice(0, 3)
    .map(e => ganhosMap[e.nome] || `Melhora significativa em ${e.nome}`);

  return {
    notaGlobal,
    conceito,
    faixa,
    eixos,
    problemasDetectados,
    ganhosProv90dias,
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
  
  // Calcular baselines de mobilidade personalizado por atividade física
  const calcularBaselineMobilidade = () => {
    // Priorizar dor
    if (data.dorPrincipal === 'dores_articulares' || data.dorPrincipal === 'mobilidade') return 3;
    if (data.limitacaoDor === 'dor_importante') return 3;
    if (data.limitacaoDor === 'dor_moderada') return 4;
    
    // Considerar nível de atividade
    switch (data.nivelAtividade) {
      case 'sedentaria': return 3;
      case 'baixa': return 4;
      case 'moderada': return 6;
      case 'alta': return 7;
      default: return 5;
    }
  };
  
  const baselineMap: Record<string, number> = {
    energia: data.dorPrincipal === 'energia' ? 3 : 5,
    sono: data.comorbidades.includes('apneia') ? 3 : 5,
    humor: data.gatilhos.includes('ansiedade') || data.gatilhos.includes('estresse') ? 4 : 5,
    mobilidade: calcularBaselineMobilidade(),
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
  
  // Personalizar meta de passos por nível atual
  const metaPassosTexto = () => {
    if (!data.passosDia || data.passosDia === 'nao_sei') {
      return "Estabelecer baseline de passos diários";
    }
    switch (data.passosDia) {
      case '<4k': return "Meta inicial: 6k passos/dia";
      case '4-6k': return "Meta inicial: 8k passos/dia";
      case '6-8k': return "Meta inicial: 10k passos/dia";
      case '8k+': return "Meta inicial: manter e qualificar passos";
      default: return "Estabelecer baseline de passos diários";
    }
  };
  
  // Personalizar estratégia de movimento por nível atual
  const estrategiaMovimento = () => {
    if (!data.nivelAtividade) {
      return "Início de atividade física adaptada";
    }
    switch (data.nivelAtividade) {
      case 'sedentaria':
        return "Caminhada progressiva (10-20 min/dia, +2k passos/semana)";
      case 'baixa':
        return "Força 2x/sem (15-20 min) + caminhada diária";
      case 'moderada':
        return "Periodização leve com progressão de carga";
      case 'alta':
        return "Otimização de treino com foco em composição corporal";
      default:
        return "Início de atividade física adaptada";
    }
  };
  
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
        metaPassosTexto()
      ]
    },
    {
      fase: 2,
      titulo: "Reset & Ritmo",
      duracao: "8–12 semanas",
      objetivo: "Reduzir fome, inflamação e ganhar constância",
      entregas: [
        "Protocolo nutricional individualizado",
        estrategiaMovimento(),
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
  let alternativas: TransformacaoOutput['mixEstrategias']['alternativas'] = [];
  let microcopy: string | undefined = undefined;
  const comorbidadesQtd = data.comorbidades.filter(c => c !== 'nenhuma').length;
  const metaKg = (data.peso * data.metaPeso) / 100;
  
  // GUARD GLOBAL: RECUPERAÇÃO MÍNIMA
  if (data.tempoRecuperacao === 'minimo') {
    microcopy = 'Você sinalizou recuperação mínima. Priorizamos opções sem afastamento. Outras alternativas ficam listadas abaixo com o tempo estimado.';
    
    // 1) Canetas (GLP-1/GIP) - Zero downtime
    if (data.imc >= 30 || (data.imc >= 27 && comorbidadesQtd >= 1)) {
      intervencao = {
        tipo: 'injetaveis',
        nome: 'Terapia Injetável (GLP-1/GIP)',
        justificativa: 'Controle de apetite e melhora metabólica com zero downtime. Protocolos individualizados por exames.',
        badgeRecuperacao: '0 dias'
      };
    } else {
      // 2) Protocolo Clínico Intensivo (sempre disponível)
      intervencao = {
        tipo: 'protocolo_clinico_intensivo',
        nome: 'Protocolo Clínico Estruturado',
        justificativa: 'Nutrição celular + regenerativa + comportamento. Sem afastamento.',
        badgeRecuperacao: '0 dias'
      };
    }
    
    // 3) Alternativas com 1-3 dias (apenas informar, não priorizar)
    if (data.invasividade !== 'minima' && !data.cirurgiaGastricaPrevia) {
      // Balão 6m
      alternativas.push({
        tipo: 'balão_6m',
        nome: 'Balão Intragástrico (6 meses)',
        justificativa: 'Start estruturado com foco em constância.',
        badgeRecuperacao: '1-3 dias',
        nota: 'Requer 1-3 dias de adaptação'
      });
      
      // Balão 12m (se critérios)
      if (data.imc >= 30 && (metaKg >= 20 || comorbidadesQtd >= 2 || data.efeitoSanfona)) {
        alternativas.push({
          tipo: 'balão_12m',
          nome: 'Balão Intragástrico Ajustável (12 meses)',
          justificativa: 'Ajustável ao longo do ano para estabilidade.',
          badgeRecuperacao: '1-3 dias',
          nota: 'Requer 1-3 dias de adaptação'
        });
      }
      
      // Gastroplastia (se critérios)
      if (data.imc >= 30 && data.imc <= 40 && (metaKg >= 20 || comorbidadesQtd >= 2 || data.falhaPreviaClinica)) {
        alternativas.push({
          tipo: 'gastroplastia',
          nome: 'Gastroplastia Endoscópica',
          justificativa: 'Redução volumétrica sem cortes. Resultado robusto.',
          badgeRecuperacao: '1-3 dias',
          nota: 'Requer 1-3 dias de repouso'
        });
      }
    }
    
    return { pilares, intervencao, alternativas, microcopy };
  }
  
  // CONTINUAR LÓGICA PADRÃO se tempoRecuperacao != 'minimo'
  
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
      tipo: 'balão_12m',
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
      (data.imc >= 30)
    )
  ) {
    intervencao = {
      tipo: 'balão_6m',
      nome: 'Balão Intragástrico (6 meses)',
      justificativa: "Start estruturado com foco em constância; ideal quando há falhas clínicas prévias."
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
  
  return { pilares, intervencao, alternativas, microcopy };
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
  
  // Força personalizada por nível atual
  if (data.forcaResistencia === 'nao_faco') {
    wins.push({
      titulo: "Treino de força",
      frequencia: "2x/semana (início)",
      icon: "Dumbbell"
    });
  } else if (data.forcaResistencia === '1x_sem') {
    wins.push({
      titulo: "Treino de força",
      frequencia: "3x/semana (progressão)",
      icon: "Dumbbell"
    });
  } else if (data.tempoDisponivel !== '1-3h/sem') {
    wins.push({
      titulo: "Treino de força",
      frequencia: "3x/semana",
      icon: "Dumbbell"
    });
  }
  
  // Passos personalizados por nível atual
  if (data.passosDia && data.passosDia !== 'nao_sei') {
    const metaPassos = 
      data.passosDia === '<4k' ? "6k passos/dia" :
      data.passosDia === '4-6k' ? "8k passos/dia" :
      data.passosDia === '6-8k' ? "10k passos/dia" :
      "manter 8k+ passos";
    
    wins.push({
      titulo: `Atingir ${metaPassos}`,
      frequencia: "25/30 dias",
      icon: "Footprints"
    });
  }
  
  // Avaliação se dor importante
  if (data.limitacaoDor === 'dor_moderada' || data.limitacaoDor === 'dor_importante') {
    wins.push({
      titulo: "Avaliação com treino terapêutico",
      frequencia: "1ª consulta agendada",
      icon: "Stethoscope"
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
