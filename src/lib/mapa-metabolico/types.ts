export type Answers = {
  age: number;
  sex: 'F' | 'M' | 'ND';
  weight_kg: number;
  height_cm: number;
  waist_cm?: number;
  abdominal_protrusion?: boolean;
  diagnoses: string[];
  fatigue?: number;
  brain_fog?: number;
  non_restorative_sleep?: boolean;
  joint_pain_inflammation?: number;
  bloating?: number;
  sleep_hours_bucket: '<5' | '5–6' | '6–7' | '7–8' | '>8';
  stress_0_10: number;
  exercise_freq_bucket: '0' | '1–2' | '3–4' | '5+';
  sitting_time_bucket?: '<3h' | '3–6h' | '6–9h' | '>9h';
  ultra_processed_freq: 'rare' | '1–3w' | '4–6w' | 'daily';
  alcohol_freq: 'never' | 'social' | 'weekly' | 'daily';
  last_meal_after_21?: boolean;
  midnight_eating?: boolean;
  lost_5kg_regain_times: '0' | '1' | '2–3' | '>3';
  yo_yo_weight: 'nunca' | 'às vezes' | 'sim';
  night_snacking: 'nunca' | 'às vezes' | 'frequente';
  emotions_food?: string[];
  fasting_glucose_mgdl?: number;
  hba1c_perc?: number;
  triglycerides_mgdl?: number;
  hdl_mgdl?: number;
  tsh?: number;
  vitamin_d?: number;
  full_name?: string;
  whatsapp_phone?: string;
  email?: string;
  lgpd_consent?: boolean;
};

export type ScoreResult = {
  total: number;
  class: 'Critico' | 'Atencao' | 'Bom';
  pillars: {
    nutricao: number;
    metabolica_regenerativa: number;
    movimento: number;
    mente_comportamento: number;
  };
  pillarStatus: Record<
    'nutricao' | 'metabolica_regenerativa' | 'movimento' | 'mente_comportamento',
    'OK' | 'Atencao' | 'Critico'
  >;
  insights: string[];
  priorityPillars: string[];
  algo_version: string;
};

export type MapaProgress = {
  currentStep: number;
  answers: Partial<Answers>;
  lastUpdated: string;
};
