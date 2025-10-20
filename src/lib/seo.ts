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
  canetasEmagrecedoras: {
    title: "Canetas Emagrecedoras SP | Mounjaro, Ozempic, Wegovy - Dra. Bruna Durelli",
    description: "Tratamento com canetas emagrecedoras (Mounjaro, Ozempic, Wegovy, Saxenda) com prescrição e acompanhamento médico especializado. Controle de fome e emagrecimento sustentável em São Paulo.",
    keywords: "canetas emagrecedoras, canetas emagrecedoras sp, mounjaro, ozempic, wegovy, saxenda, tirzepatida, semaglutida, liraglutida, medicamentos obesidade, tratamento fome, emagrecimento médico, endocrinologista obesidade são paulo",
    canonical: "https://drabrunadurelli.com/canetas-emagrecedoras"
  },
  balaoIntragastrico: {
    title: "Balão Intragástrico | Emagrecimento sem Cirurgia - Dra. Bruna Durelli",
    description: "Balão gástrico endoscópico para perda de peso sustentável. Procedimento minimamente invasivo com acompanhamento completo. Resultados de 10 a 25% de perda de peso.",
    keywords: "balão intragástrico, balão gástrico, emagrecimento sem cirurgia, procedimento endoscópico, perda de peso, obesidade tratamento",
    canonical: "https://drabrunadurelli.com/balao-intragastrico"
  },
  terapiasEndoscopicas: {
    title: "Balão Intragástrico | Emagrecimento sem Cirurgia - Dra. Bruna Durelli",
    description: "Balão gástrico endoscópico para perda de peso sustentável. Procedimento minimamente invasivo com acompanhamento completo. Resultados de 10 a 25% de perda de peso.",
    keywords: "balão intragástrico, balão gástrico, emagrecimento sem cirurgia, procedimento endoscópico, perda de peso, obesidade tratamento",
    canonical: "https://drabrunadurelli.com/balao-intragastrico"
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
    description: "Abordagem avançada para saúde metabólica: mais energia, menos inflamação, preservação muscular. Programas individualizados com base em exames.",
    keywords: "medicina regenerativa, saúde metabólica, nutrição celular, otimização hormonal, preservação muscular, fadiga crônica, menopausa, pós-bariátrica, performance atlética",
    canonical: "https://drabrunadurelli.com/medicina-regenerativa"
  },
  plasmaArgonio: {
    title: "Plasma de Argônio - Tratamento de Reganho de Peso | LevSer",
    description: "Técnica endoscópica minimamente invasiva para tratamento de reganho de peso pós-cirurgia bariátrica e dilatação gástrica. Recuperação rápida e resultados consistentes.",
    keywords: "plasma de argônio, reganho de peso, pós-bariátrica, dilatação gástrica, endoscopia, anastomose dilatada, revisão bariátrica, APC",
    canonical: "https://drabrunadurelli.com/plasma-argonio"
  },
  sobre: {
    title: "Sobre a Dra. Bruna Durelli - Especialista em Obesidade | LevSer",
    description: "Conheça a trajetória da Dra. Bruna Durelli, especialista em obesidade com +10 anos de experiência. Formação no Einstein, Santa Casa, ABRAN. Sócia-fundadora da LevSer.",
    keywords: "dra bruna durelli, especialista obesidade, endoscopia digestiva, nutrologia, medicina regenerativa, levser, são paulo",
    canonical: "https://drabrunadurelli.com/sobre"
  },
  programaLevser: {
    title: "Programa LevSer - Tratamento Completo de Obesidade | Dra. Bruna Durelli",
    description: "Programa LevSer: tratamento integrado de obesidade com nutrição, medicina regenerativa, suporte psicológico e procedimentos endoscópicos. Abordagem personalizada e humanizada.",
    keywords: "programa levser, tratamento obesidade, emagrecimento saudável, acompanhamento multidisciplinar, são paulo",
    canonical: "https://drabrunadurelli.com/programa-levser"
  },
  tratamentos: {
    title: "Tratamentos para Obesidade - Endoscopia, Farmacologia, Regenerativa | LevSer",
    description: "Conheça todos os tratamentos disponíveis: balão gástrico, gastroplastia, canetas emagrecedoras, medicina regenerativa. Abordagem personalizada para cada caso.",
    keywords: "tratamentos obesidade, balão gástrico, gastroplastia, canetas emagrecedoras, medicina regenerativa, são paulo",
    canonical: "https://drabrunadurelli.com/tratamentos"
  },
  recursos: {
    title: "Recursos Educativos - FAQ, Calculadoras, Guias | Dra. Bruna Durelli",
    description: "Acesse nossos recursos educativos: FAQ completo, calculadoras de IMC e ROI, guias de emagrecimento, vídeos e artigos sobre tratamento de obesidade.",
    keywords: "faq obesidade, calculadora imc, guia emagrecimento, recursos educativos, dra bruna durelli",
    canonical: "https://drabrunadurelli.com/recursos"
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
