import type { Answers, ScoreResult } from './types';
import weights from '@/config/mapa-metabolico.weights.json';

const clamp01 = (x: number) => Math.max(0, Math.min(100, x));

export function calculateIMC(weight_kg: number, height_cm: number) {
  const h = height_cm / 100;
  return +(weight_kg / (h * h)).toFixed(1);
}

export function calculateScores(a: Answers): ScoreResult {
  const imc = calculateIMC(a.weight_kg, a.height_cm);

  // --- Penalidades base ---
  let penMetab = 0,
    penNutri = 0,
    penMov = 0,
    penMente = 0;

  // Metabólica: IMC + cintura/barriga + diagnósticos + sono
  if (imc >= weights.rules.imc.obese) penMetab += weights.rules.imc.penaltyObese;
  else if (imc >= weights.rules.imc.overweight) penMetab += weights.rules.imc.penaltyOver;

  if (a.waist_cm && a.waist_cm > 94) penMetab += weights.rules.waist.penaltyHigh;
  else if (a.abdominal_protrusion) penMetab += weights.rules.waist.penaltyAbdomenYes;

  (a.diagnoses || []).forEach((dx) => {
    const d = (weights.rules.diagnoses as Record<string, number>)[dx];
    if (d) penMetab += d;
  });

  // Sono/estresse
  if (a.sleep_hours_bucket === '<5' || a.sleep_hours_bucket === '5–6')
    penMetab += weights.rules.sleep.lt6h;
  else if (a.sleep_hours_bucket === '6–7') penMetab += weights.rules.sleep.sixToSeven;

  if (a.non_restorative_sleep) penMetab += weights.rules.sleep.nonRestorative;

  if (a.stress_0_10 >= 7) penMente += weights.rules.stress.gte7;
  else if (a.stress_0_10 >= 4) penMente += weights.rules.stress.fourToSix;

  // Movimento
  if (a.exercise_freq_bucket === '0') penMov += weights.rules.exercise.none;
  else if (a.exercise_freq_bucket === '1–2') penMov += weights.rules.exercise.oneToTwo;
  else if (a.exercise_freq_bucket === '3–4') penMov += weights.rules.exercise.threeToFour;

  // Nutrição
  if (a.ultra_processed_freq === 'daily') penNutri += weights.rules.ultraProcessed.daily;
  else if (a.ultra_processed_freq === '4–6w') penNutri += weights.rules.ultraProcessed.fourToSix;
  else if (a.ultra_processed_freq === '1–3w') penNutri += weights.rules.ultraProcessed.oneToThree;

  if (a.last_meal_after_21) penNutri += weights.rules.lateMeals.after21;
  if (a.midnight_eating) penNutri += weights.rules.lateMeals.midnight;

  // Álcool
  if (a.alcohol_freq === 'daily') penNutri += weights.rules.alcohol.daily;
  else if (a.alcohol_freq === 'weekly') penNutri += weights.rules.alcohol.weekly;

  // Sintomas
  const often = (v?: number) => v !== undefined && v >= 7;
  const sometimes = (v?: number) => v !== undefined && v > 0 && v < 7;

  if (often(a.fatigue)) penMetab += weights.rules.symptoms.often;
  else if (sometimes(a.fatigue)) penMetab += weights.rules.symptoms.sometimes;

  if (often(a.joint_pain_inflammation)) penMetab += weights.rules.symptoms.often;
  else if (sometimes(a.joint_pain_inflammation)) penMetab += weights.rules.symptoms.sometimes;

  if (often(a.bloating)) penNutri += weights.rules.symptoms.often;
  else if (sometimes(a.bloating)) penNutri += weights.rules.symptoms.sometimes;

  if (often(a.brain_fog)) penMente += weights.rules.symptoms.often;
  else if (sometimes(a.brain_fog)) penMente += weights.rules.symptoms.sometimes;

  // Histórico comportamental
  if (a.lost_5kg_regain_times === '1') penMente += weights.rules.yoYo.one;
  else if (a.lost_5kg_regain_times === '2–3') penMente += weights.rules.yoYo.twoToThree;
  else if (a.lost_5kg_regain_times === '>3') penMente += weights.rules.yoYo.gtThree;

  if (a.night_snacking === 'frequente') {
    penNutri += weights.rules.compulsion.frequent;
    penMente += 1;
  } else if (a.night_snacking === 'às vezes') {
    penNutri += weights.rules.compulsion.sometimes;
  }

  const negEmotions = (a.emotions_food || []).filter(
    (e) => e === 'culpa' || e === 'ansiedade' || e === 'vergonha'
  ).length;
  penMente += Math.min(negEmotions * weights.rules.emotions.eachNegative, weights.rules.emotions.max);

  // Labs (opcionais)
  if (a.triglycerides_mgdl && a.hdl_mgdl && a.hdl_mgdl > 0) {
    const ratio = a.triglycerides_mgdl / a.hdl_mgdl;
    if (ratio >= 3.5) penMetab += weights.rules.labs.tg_hdl_ratio_high;
  }
  if (a.fasting_glucose_mgdl && a.fasting_glucose_mgdl >= 100)
    penMetab += weights.rules.labs.glycemia_high;
  if (a.vitamin_d && a.vitamin_d < 30) penMetab += weights.rules.labs.vitd_low;

  // Subscores (100 - penalidades)
  const base = 100;
  const nutricao = clamp01(base - penNutri);
  const metabolica = clamp01(base - penMetab);
  const movimento = clamp01(base - penMov);
  const mente = clamp01(base - penMente);

  const total = clamp01(
    nutricao * weights.pillarWeights.nutricao +
      metabolica * weights.pillarWeights.metabolica_regenerativa +
      movimento * weights.pillarWeights.movimento +
      mente * weights.pillarWeights.mente_comportamento
  );

  const pillarStatus = {
    nutricao:
      nutricao >= weights.pillarStatusCutoffs.ok
        ? 'OK'
        : nutricao >= weights.pillarStatusCutoffs.atencao
          ? 'Atencao'
          : 'Critico',
    metabolica_regenerativa:
      metabolica >= weights.pillarStatusCutoffs.ok
        ? 'OK'
        : metabolica >= weights.pillarStatusCutoffs.atencao
          ? 'Atencao'
          : 'Critico',
    movimento:
      movimento >= weights.pillarStatusCutoffs.ok
        ? 'OK'
        : movimento >= weights.pillarStatusCutoffs.atencao
          ? 'Atencao'
          : 'Critico',
    mente_comportamento:
      mente >= weights.pillarStatusCutoffs.ok
        ? 'OK'
        : mente >= weights.pillarStatusCutoffs.atencao
          ? 'Atencao'
          : 'Critico',
  } as ScoreResult['pillarStatus'];

  // Insights a partir dos piores pilares
  const pairs: Array<[string, number]> = [
    ['Saúde Metabólica & Regenerativa', metabolica],
    ['Nutrição Inteligente', nutricao],
    ['Mente & Comportamento', mente],
    ['Corpo em Movimento', movimento],
  ];
  pairs.sort((a, b) => a[1] - b[1]);
  const priorityPillars = pairs.slice(0, 2).map((p) => p[0]);

  const insights: string[] = [];

  if (
    a.non_restorative_sleep ||
    a.sleep_hours_bucket === '<5' ||
    a.sleep_hours_bucket === '5–6' ||
    a.stress_0_10 >= 7
  ) {
    insights.push('Sono ruim e/ou estresse elevado costumam travar saciedade e aumentar fome emocional.');
  }
  if (a.ultra_processed_freq === 'daily' || a.last_meal_after_21 || a.midnight_eating) {
    insights.push(
      'Ultraprocessados e refeições tardias elevam picos glicêmicos; priorize refeições reais em janelas regulares.'
    );
  }
  if (
    (a.abdominal_protrusion || (a.waist_cm && a.waist_cm > 94)) &&
    a.triglycerides_mgdl &&
    a.hdl_mgdl &&
    a.triglycerides_mgdl / a.hdl_mgdl >= 3.5
  ) {
    insights.push('Há sinais compatíveis com resistência insulínica; vale investigar em consulta e exames.');
  }
  if (insights.length === 0) {
    insights.push('Pequenos ajustes coordenados geram grandes ganhos; foque primeiro nos dois pilares prioritários.');
  }

  const classification =
    total >= weights.classCutoffs.bom ? 'Bom' : total >= weights.classCutoffs.atencao ? 'Atencao' : 'Critico';

  return {
    total: Math.round(total),
    class: classification as ScoreResult['class'],
    pillars: {
      nutricao: Math.round(nutricao),
      metabolica_regenerativa: Math.round(metabolica),
      movimento: Math.round(movimento),
      mente_comportamento: Math.round(mente),
    },
    pillarStatus,
    insights: insights.slice(0, 3),
    priorityPillars,
    algo_version: 'v1.0.0',
  };
}
