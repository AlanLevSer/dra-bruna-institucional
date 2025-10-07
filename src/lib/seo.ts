export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: "Dra. Bruna Durelli - Especialista em Obesidade | Tratamento Personalizado",
  description: "Transforme sua relação com o peso através de tratamento médico personalizado e humanizado. Programa LevSer, terapias endoscópicas e cirúrgicas em Brasília.",
  keywords: "obesidade, emagrecimento, bariátrica, gastroplastia endoscópica, bypass gástrico, sleeve, tratamento obesidade brasília, médico obesidade, programa levser",
  canonical: "https://drabrunadurelli.com/"
};

export const pageSEO: Record<string, SEOData> = {
  home: {
    title: "Dra. Bruna Durelli - Especialista em Obesidade | Tratamento Personalizado",
    description: "Transforme sua relação com o peso através de tratamento médico personalizado e humanizado. Programa LevSer, terapias endoscópicas e cirúrgicas em Brasília.",
    keywords: "obesidade, emagrecimento, bariátrica, gastroplastia endoscópica, bypass gástrico, sleeve, tratamento obesidade brasília, médico obesidade, programa levser",
    canonical: "https://drabrunadurelli.com/"
  },
  terapiaSacietogena: {
    title: "Terapia Sacietogênica | Medicamentos para Obesidade - Dra. Bruna Durelli",
    description: "Tratamento com medicações sacietogênicas de última geração para controle da fome e perda de peso sustentável. Acompanhamento médico especializado.",
    keywords: "terapia sacietogênica, medicamentos obesidade, ozempic, wegovy, saxenda, mounjaro, tratamento fome, perda de peso medicamentos",
    canonical: "https://drabrunadurelli.com/terapia-sacietogena"
  },
  terapiasEndoscopicas: {
    title: "Terapias Endoscópicas para Obesidade | Balão Gástrico - Dra. Bruna Durelli",
    description: "Procedimentos endoscópicos minimamente invasivos para tratamento da obesidade. Balão gástrico, gastroplastia endoscópica sem cirurgia.",
    keywords: "terapias endoscópicas, balão gástrico, gastroplastia endoscópica, procedimentos obesidade, tratamento sem cirurgia",
    canonical: "https://drabrunadurelli.com/terapias-endoscopicas"
  },
  gastroplastiaEndoscopica: {
    title: "Gastroplastia Endoscópica | Redução de Estômago sem Cirurgia",
    description: "Gastroplastia endoscópica: procedimento minimamente invasivo para redução do estômago sem cortes. Recuperação rápida e resultados efetivos.",
    keywords: "gastroplastia endoscópica, redução estômago, procedimento endoscópico, obesidade tratamento, cirurgia bariátrica alternativa",
    canonical: "https://drabrunadurelli.com/gastroplastia-endoscopica"
  },
  terapiasCirurgicas: {
    title: "Cirurgia Bariátrica | Bypass Gástrico e Sleeve - Dra. Bruna Durelli",
    description: "Cirurgias bariátricas: Bypass Gástrico e Sleeve Gástrico com técnica videolaparoscópica. Tratamento definitivo para obesidade grave.",
    keywords: "cirurgia bariátrica, bypass gástrico, sleeve gástrico, obesidade grave, videolaparoscopia, cirurgia obesidade brasília",
    canonical: "https://drabrunadurelli.com/terapias-cirurgicas"
  },
  nutricaoCelular: {
    title: "Nutrição Celular | Suplementação e Terapia Nutricional",
    description: "Nutrição celular avançada para otimizar resultados do tratamento. Suplementação personalizada e terapia nutricional especializada.",
    keywords: "nutrição celular, suplementação, terapia nutricional, vitaminas, minerais, tratamento nutricional obesidade",
    canonical: "https://drabrunadurelli.com/nutricao-celular"
  },
  medicinaRegenerativa: {
    title: "Medicina Regenerativa | Saúde Metabólica Avançada - Dra. Bruna Durelli",
    description: "Abordagem avançada para saúde metabólica: mais energia, menos inflamação, preservação muscular. Protocolos individualizados com base em exames.",
    keywords: "medicina regenerativa, saúde metabólica, nutrição celular, otimização hormonal, preservação muscular, fadiga crônica, menopausa, pós-bariátrica, performance atlética",
    canonical: "https://drabrunadurelli.com/medicina-regenerativa"
  }
};

export const generateStructuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Dra. Bruna Durelli - Clínica de Obesidade",
    "description": "Clínica especializada em tratamento de obesidade com abordagem personalizada e humanizada",
    "url": "https://drabrunadurelli.com",
    "logo": "https://drabrunadurelli.com/logo.png",
    "medicalSpecialty": "Bariatric Medicine",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasília",
      "addressRegion": "DF",
      "addressCountry": "BR"
    }
  },
  
  physician: {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dra. Bruna Durelli",
    "medicalSpecialty": ["Obesity Medicine", "Bariatric Medicine"],
    "description": "Especialista em Obesidade e Metabolismo com abordagem humanizada e baseada em evidências científicas",
    "url": "https://drabrunadurelli.com"
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dra. Bruna Durelli - Obesidade",
    "description": "Tratamento especializado em obesidade com Programa LevSer",
    "url": "https://drabrunadurelli.com",
    "telephone": "+55-61-XXXXX-XXXX",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasília",
      "addressRegion": "DF",
      "addressCountry": "BR"
    }
  }
};
