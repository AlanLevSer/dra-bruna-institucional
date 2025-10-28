export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: "Dra. Bruna Durelli - Especialista em Obesidade | Programa LevSer São Paulo",
  description:
    "Dra. Bruna Durelli, CRM 124809, especialista em obesidade com +10 anos de experiência. Sócia-fundadora da LevSer. Programa personalizado, terapias endoscópicas e medicina regenerativa no Jardim Paulista, São Paulo.",
  keywords:
    "dra bruna durelli, obesidade são paulo, levser, gastroplastia endoscópica, balão gástrico, medicina regenerativa, nutrologia são paulo, jardim paulista, tratamento obesidade",
  canonical: "https://www.brunadurelli.com.br/",
};

export const pageSEO: Record<string, SEOData> = {
  home: { ...defaultSEO },

  canetasEmagrecedoras: {
    title:
      "Canetas Emagrecedoras SP | Mounjaro, Ozempic, Wegovy - Dra. Bruna Durelli",
    description:
      "Tratamento com canetas emagrecedoras (Mounjaro, Ozempic, Wegovy, Saxenda) com prescrição e acompanhamento médico especializado. Controle de fome e emagrecimento sustentável em São Paulo.",
    keywords:
      "canetas emagrecedoras, canetas emagrecedoras sp, mounjaro, ozempic, wegovy, saxenda, tirzepatida, semaglutida, liraglutida, medicamentos obesidade, tratamento fome, emagrecimento médico, endocrinologista obesidade são paulo",
    canonical: "https://www.brunadurelli.com.br/canetas-emagrecedoras",
  },

  balaoIntragastrico: {
    title:
      "Balão Intragástrico | Emagrecimento sem Cirurgia - Dra. Bruna Durelli",
    description:
      "Balão gástrico endoscópico para perda de peso sustentável. Procedimento minimamente invasivo com acompanhamento completo. Resultados de 10 a 25% de perda de peso.",
    keywords:
      "balão intragástrico, balão gástrico, emagrecimento sem cirurgia, procedimento endoscópico, perda de peso, obesidade tratamento",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico",
  },

  gastroplastiaEndoscopica: {
    title:
      "Gastroplastia Endoscópica | Redução de Estômago sem Cirurgia",
    description:
      "Gastroplastia endoscópica: procedimento minimamente invasivo para redução do estômago sem cortes. Recuperação rápida e resultados efetivos.",
    keywords:
      "gastroplastia endoscópica, redução estômago, procedimento endoscópico, obesidade tratamento, cirurgia bariátrica alternativa",
    canonical: "https://www.brunadurelli.com.br/gastroplastia-endoscopica",
  },

  medicinaRegenerativa: {
    title:
      "Medicina Regenerativa | Saúde Metabólica Avançada - Dra. Bruna Durelli",
    description:
      "Abordagem avançada para saúde metabólica: mais energia, menos inflamação e preservação muscular. Programas individualizados com base em exames.",
    keywords:
      "medicina regenerativa, saúde metabólica, inflamação, otimização hormonal, longevidade, clínica São Paulo",
    canonical: "https://www.brunadurelli.com.br/medicina-regenerativa",
  },

  nutricaoCelular: {
    title: "Nutrição Celular | Suplementação e Terapia Nutricional",
    description:
      "Nutrição celular avançada para otimizar resultados do tratamento. Suplementação personalizada e terapia nutricional especializada.",
    keywords:
      "nutrição celular, suplementação, terapia nutricional, vitaminas, minerais, tratamento nutricional obesidade",
    canonical: "https://www.brunadurelli.com.br/nutricao-celular",
  },

  plasmaArgonio: {
    title: "Plasma de Argônio | Tratamento Endoscópico Avançado",
    description:
      "Terapia com plasma de argônio para tratamento endoscópico de condições do trato gastrointestinal. Procedimento seguro com recuperação rápida.",
    keywords:
      "plasma de argônio, endoscopia terapêutica, tratamento gastrointestinal, endoscopia avançada",
    canonical: "https://www.brunadurelli.com.br/plasma-argonio",
  },
};

export const generateStructuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "LevSer - Dra. Bruna Durelli",
    "description":
      "Clínica especializada em tratamento de obesidade com abordagem personalizada, humanizada e baseada em evidências científicas.",
    "url": "https://www.brunadurelli.com.br",
    "logo": "https://www.brunadurelli.com.br/logo.png",
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
    "medicalSpecialty": [
      "Obesity Medicine",
      "Bariatric Medicine",
      "Endoscopy",
      "Nutrology",
      "Regenerative Medicine"
    ],
    "description":
      "Especialista em Obesidade, Endoscopia Digestiva, Nutrologia e Medicina Regenerativa. Sócia-fundadora da LevSer. Mais de 10 anos dedicados ao tratamento da obesidade com abordagem humanizada e baseada em evidências científicas.",
    "url": "https://www.brunadurelli.com.br",
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
    "description":
      "Clínica especializada em tratamento de obesidade. Programa LevSer personalizado, terapias endoscópicas e medicina regenerativa. Jardim Paulista, São Paulo.",
    "url": "https://www.brunadurelli.com.br",
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
