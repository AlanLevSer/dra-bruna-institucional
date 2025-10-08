export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: "Dra. Bruna Durelli - Especialista em Obesidade | Programa LevSer São Paulo",
  description: "Dra. Bruna Durelli, CRM 124809, especialista em obesidade com +10 anos de experiência. Sócia-fundadora da LevSer. Programa personalizado, terapias endoscópicas e medicina regenerativa no Jardim Paulista, São Paulo.",
  keywords: "dra bruna durelli, obesidade são paulo, levser, gastroplastia endoscópica, balão gástrico, medicina regenerativa, nutrologia são paulo, jardim paulista, tratamento obesidade",
  canonical: "https://drabrunadurelli.com/"
};

export const pageSEO: Record<string, SEOData> = {
  home: {
    title: "Dra. Bruna Durelli - Especialista em Obesidade | Programa LevSer São Paulo",
    description: "Dra. Bruna Durelli, CRM 124809, especialista em obesidade com +10 anos de experiência. Sócia-fundadora da LevSer. Programa personalizado, terapias endoscópicas e medicina regenerativa no Jardim Paulista, São Paulo.",
    keywords: "dra bruna durelli, obesidade são paulo, levser, gastroplastia endoscópica, balão gástrico, medicina regenerativa, nutrologia são paulo, jardim paulista, tratamento obesidade",
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
    "name": "LevSer - Dra. Bruna Durelli",
    "description": "Clínica especializada em tratamento de obesidade com abordagem personalizada, humanizada e baseada em evidências científicas",
    "url": "https://drabrunadurelli.com",
    "logo": "https://drabrunadurelli.com/logo.png",
    "medicalSpecialty": "Bariatric Medicine",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR"
    },
    "telephone": "+55-11-99702-3024"
  },
  
  physician: {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dra. Bruna Durelli",
    "honorificPrefix": "Dra.",
    "givenName": "Bruna",
    "familyName": "Durelli",
    "medicalSpecialty": ["Obesity Medicine", "Bariatric Medicine", "Endoscopy", "Nutrology", "Regenerative Medicine"],
    "description": "Especialista em Obesidade, Endoscopia Digestiva, Nutrologia e Medicina Regenerativa. Sócia-fundadora da LevSer. Mais de 10 anos dedicados ao tratamento da obesidade com abordagem humanizada e baseada em evidências científicas.",
    "url": "https://drabrunadurelli.com",
    "alumniOf": ["Hospital Israelita Albert Einstein", "Santa Casa", "ABRAN"],
    "memberOf": ["SOBED", "ABESO"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR"
    },
    "telephone": "+55-11-99702-3024"
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "LevSer - Dra. Bruna Durelli",
    "description": "Clínica especializada em tratamento de obesidade. Programa LevSer personalizado, terapias endoscópicas, medicina regenerativa. Jardim Paulista, São Paulo.",
    "url": "https://drabrunadurelli.com",
    "telephone": "+55-11-99702-3024",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5680",
      "longitude": "-46.6553"
    },
    "openingHours": "Mo-Fr 08:00-18:00"
  }
};
