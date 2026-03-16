import type { QuizData, TransformacaoOutput } from "@/types/quiz";
import type { Answers, ScoreResult } from "@/lib/mapa-metabolico/types";

/**
 * Formata o resultado do Quiz em um resumo legível para WhatsApp
 */
export const formatQuizResultadoWhatsApp = (
  quizData: QuizData,
  output: TransformacaoOutput
): string => {
  const linhas: string[] = [
    "🎯 *Seu Diagnóstico Personalizado*",
    "",
    `📊 IMC: ${quizData.imc.toFixed(1)} kg/m²`,
    `⚖️ Peso Atual: ${quizData.peso}kg → Meta: ${quizData.metaPeso}kg`,
    `📉 Perda Esperada: ${(quizData.peso - quizData.metaPeso)}kg`,
    `👤 Idade: ${quizData.idade} anos | Sexo: ${quizData.sexo === 'masculino' ? 'Masculino' : 'Feminino'}`,
  ];

  if (quizData.comorbidades && quizData.comorbidades.length > 0) {
    linhas.push(`⚠️ Comorbidades: ${quizData.comorbidades.join(", ")}`);
  }

  if (quizData.expectativas && quizData.expectativas.length > 0) {
    linhas.push(`🎯 Expectativas: ${quizData.expectativas.join(", ")}`);
  }

  if (quizData.tentativasAnteriores) {
    linhas.push(`📈 Tentativas Anteriores: ${quizData.tentativasAnteriores}`);
  }

  if (quizData.efeitoSanfona) {
    linhas.push(`🔄 Efeito Sanfona: Sim`);
  }

  if (quizData.cirurgiaGastricaPrevia) {
    linhas.push(`🏥 Cirurgia Gástrica Prévia: Sim`);
    if (quizData.cirurgiaBariatricaPreviaTipo) {
      linhas.push(`   Tipo: ${quizData.cirurgiaBariatricaPreviaTipo}`);
    }
    if (quizData.reganhoPosBariatrica) {
      linhas.push(`   Reganho Pós-Bariátrica: Sim`);
    }
  }

  if (quizData.falhaPreviaClinica) {
    linhas.push(`❌ Falha Prévia Clínica: Sim`);
  }

  if (output.mixEstrategias.intervencao) {
    linhas.push(`💡 Tratamento Recomendado: ${output.mixEstrategias.intervencao.nome}`);
    linhas.push(`   Justificativa: ${output.mixEstrategias.intervencao.justificativa}`);
    if (output.mixEstrategias.intervencao.badgeRecuperacao) {
      linhas.push(`   Recuperação: ${output.mixEstrategias.intervencao.badgeRecuperacao}`);
    }
  }

  if (output.planoEnergetico) {
    linhas.push(`⚡ Déficit Diário: ${output.planoEnergetico.deficitDiario} kcal`);
    linhas.push(`📅 Timeline: ${output.planoEnergetico.semanasPlano} semanas`);
  }

  if (output.perfilSaude) {
    linhas.push(`🏥 Perfil Saúde: ${output.perfilSaude.conceito} (${output.perfilSaude.notaGlobal} pontos)`);
  }

  linhas.push("", "Gostaria de conversar sobre meu diagnóstico!");

  return linhas.join("\n");
};

/**
 * Formata o resultado do Mapa Metabólico em um resumo legível para WhatsApp
 */
export const formatMapaMetabolicoWhatsApp = (
  answers: Partial<Answers>,
  scoring: ScoreResult
): string => {
  const linhas: string[] = [
    "🧬 *Meu Mapa Metabólico*",
    "",
    `📊 Score Total: ${scoring.total}`,
    `🏆 Classificação: ${scoring.class}`,
    "",
    "📋 *Pilares Prioritários:*",
  ];

  scoring.priorityPillars.forEach((pilar) => {
    const emoji = getPilarEmoji(pilar);
    linhas.push(`${emoji} ${pilar}`);
  });

  linhas.push("");
  linhas.push("Dados Coletados:");

  if (answers.age) linhas.push(`👤 Idade: ${answers.age} anos`);
  if (answers.weight_kg && answers.height_cm) {
    const imc = (answers.weight_kg / ((answers.height_cm / 100) ** 2)).toFixed(1);
    linhas.push(`📊 IMC: ${imc} kg/m²`);
  }
  if (answers.diagnoses && answers.diagnoses.length > 0) {
    linhas.push(`🏥 Diagnósticos: ${answers.diagnoses.join(", ")}`);
  }

  linhas.push("", "Quero entender melhor meu mapa e ver opções de tratamento!");

  return linhas.join("\n");
};

/**
 * Retorna o emoji correspondente ao pilar
 */
const getPilarEmoji = (pilar: string): string => {
  const emojiMap: Record<string, string> = {
    "nutricao": "🥗",
    "metabolica_regenerativa": "🧬",
    "movimento": "🏃",
    "mente_comportamento": "🧠",
  };
  return emojiMap[pilar] || "📌";
};

/**
 * Cria objeto estruturado com dados do Quiz para webhook
 */
export const createQuizWebhookData = (
  quizData: QuizData,
  output: TransformacaoOutput,
  leadInfo: { nome: string; whatsapp: string; email: string }
) => {
  return {
    // Dados de contato
    nome: leadInfo.nome,
    whatsapp: leadInfo.whatsapp,
    email: leadInfo.email,

    // Dados do Quiz
    imc: quizData.imc,
    peso_atual_kg: quizData.peso,
    meta_peso_kg: quizData.metaPeso,
    perda_esperada_kg: quizData.peso - quizData.metaPeso,
    idade: quizData.idade,
    sexo: quizData.sexo,
    comorbidades: quizData.comorbidades?.join(", ") || "",

    // Resultados
    tratamento_recomendado: output.tratamentoRecomendado || "",
    timeline_meses: output.timelineMeses || "",
    resumo_resultado: output.resumo || "",

    // Origem
    origem: "quiz",
    timestamp: new Date().toISOString(),
  };
};

/**
 * Cria objeto estruturado com dados do Mapa Metabólico para webhook
 */
export const createMapaWebhookData = (
  answers: Partial<Answers>,
  scoring: ScoreResult,
  leadInfo: { nome: string; whatsapp: string; email: string }
) => {
  return {
    // Dados de contato
    nome: leadInfo.nome,
    whatsapp: leadInfo.whatsapp,
    email: leadInfo.email,

    // Dados coletados
    idade: answers.age,
    peso_kg: answers.weight_kg,
    altura_cm: answers.height_cm,
    circunferencia_abdominal_cm: answers.waist_cm,
    diagnosticos: (answers.diagnoses || []).join(", "),
    horas_sono: answers.sleep_hours_bucket,
    nivel_estresse: answers.stress_0_10,
    frequencia_exercicio: answers.exercise_freq_bucket,
    frequencia_ultra_processados: answers.ultra_processed_freq,

    // Scoring
    score_total: scoring.total,
    classificacao: scoring.class,
    pilar_nutricao: scoring.pillars.nutricao,
    pilar_metabolica_regenerativa: scoring.pillars.metabolica_regenerativa,
    pilar_movimento: scoring.pillars.movimento,
    pilar_mente_comportamento: scoring.pillars.mente_comportamento,
    pilares_prioritarios: scoring.priorityPillars.join(", "),
    insights: scoring.insights.join(" | "),

    // Origem
    origem: "mapa_metabolico",
    timestamp: new Date().toISOString(),
  };
};
