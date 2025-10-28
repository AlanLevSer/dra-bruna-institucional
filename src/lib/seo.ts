export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: "Dra. Bruna Durelli - Especialista em Obesidade | Programa LevSer SÃ£o Paulo",
  description:
    "Dra. Bruna Durelli, CRM 124809, especialista em obesidade com +10 anos de experiÃªncia. SÃ³cia-fundadora da LevSer. Programa personalizado, terapias endoscÃ³picas e medicina regenerativa no Jardim Paulista, SÃ£o Paulo.",
  keywords:
    "dra bruna durelli, obesidade sÃ£o paulo, levser, gastroplastia endoscÃ³pica, balÃ£o gÃ¡strico, medicina regenerativa, nutrologia sÃ£o paulo, jardim paulista, tratamento obesidade",
  canonical: "https://www.brunadurelli.com.br/",
};

export const pageSEO: Record<string, SEOData> = {
  home: {
    title:
      "Dra. Bruna Durelli - Especialista em Obesidade | Programa LevSer SÃ£o Paulo",
    description:
      "Dra. Bruna Durelli, CRM 124809, especialista em obesidade com +10 anos de experiÃªncia. SÃ³cia-fundadora da LevSer. Programa personalizado, terapias endoscÃ³picas e medicina regenerativa no Jardim Paulista, SÃ£o Paulo.",
    keywords:
      "dra bruna durelli, obesidade sÃ£o paulo, levser, gastroplastia endoscÃ³pica, balÃ£o gÃ¡strico, medicina regenerativa, nutrologia sÃ£o paulo, jardim paulista, tratamento obesidade",
    canonical: "https://www.brunadurelli.com.br/",
  },
  canetasEmagrecedoras: {
    title:
      "Canetas Emagrecedoras SP | Mounjaro, Ozempic, Wegovy - Dra. Bruna Durelli",
    description:
      "Tratamento com canetas emagrecedoras (Mounjaro, Ozempic, Wegovy, Saxenda) com prescriÃ§Ã£o e acompanhamento mÃ©dico especializado. Controle de fome e emagrecimento sustentÃ¡vel em SÃ£o Paulo.",
    keywords:
      "canetas emagrecedoras, canetas emagrecedoras sp, mounjaro, ozempic, wegovy, saxenda, tirzepatida, semaglutida, liraglutida, medicamentos obesidade, tratamento fome, emagrecimento mÃ©dico, endocrinologista obesidade sÃ£o paulo",
    canonical: "https://www.brunadurelli.com.br/canetas-emagrecedoras",
  },
  balaoIntragastrico: {
    title:
      "BalÃ£o IntragÃ¡strico | Emagrecimento sem Cirurgia - Dra. Bruna Durelli",
    description:
      "BalÃ£o gÃ¡strico endoscÃ³pico para perda de peso sustentÃ¡vel. Procedimento minimamente invasivo com acompanhamento completo. Resultados de 10 a 25% de perda de peso.",
    keywords:
      "balÃ£o intragÃ¡strico, balÃ£o gÃ¡strico, emagrecimento sem cirurgia, procedimento endoscÃ³pico, perda de peso, obesidade tratamento",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico",
  },
  terapiasEndoscopicas: {
    title:
      "BalÃ£o IntragÃ¡strico | Emagrecimento sem Cirurgia - Dra. Bruna Durelli",
    description:
      "BalÃ£o gÃ¡strico endoscÃ³pico para perda de peso sustentÃ¡vel. Procedimento minimamente invasivo com acompanhamento completo. Resultados de 10 a 25% de perda de peso.",
    keywords:
      "balÃ£o intragÃ¡strico, balÃ£o gÃ¡strico, emagrecimento sem cirurgia, procedimento endoscÃ³pico, perda de peso, obesidade tratamento",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico",
  },
  gastroplastiaEndoscopica: {
    title:
      "Gastroplastia EndoscÃ³pica | ReduÃ§Ã£o de EstÃ´mago sem Cirurgia",
    description:
      "Gastroplastia endoscÃ³pica: procedimento minimamente invasivo para reduÃ§Ã£o do estÃ´mago sem cortes. RecuperaÃ§Ã£o rÃ¡pida e resultados efetivos.",
    keywords:
      "gastroplastia endoscÃ³pica, reduÃ§Ã£o estÃ´mago, procedimento endoscÃ³pico, obesidade tratamento, cirurgia bariÃ¡trica alternativa",
    canonical: "https://www.brunadurelli.com.br/gastroplastia-endoscopica",
  },
  terapiasCirurgicas: {
    title:
      "Cirurgia BariÃ¡trica | Bypass GÃ¡strico e Sleeve - Dra. Bruna Durelli",
    description:
      "Cirurgias bariÃ¡tricas: Bypass GÃ¡strico e Sleeve GÃ¡strico com tÃ©cnica videolaparoscÃ³pica. Tratamento definitivo para obesidade grave.",
    keywords:
      "cirurgia bariÃ¡trica, bypass gÃ¡strico, sleeve gÃ¡strico, obesidade grave, videolaparoscopia, cirurgia obesidade sÃ£o paulo",
    canonical: "https://www.brunadurelli.com.br/terapias-cirurgicas",
  },
  nutricaoCelular: {
    title: "NutriÃ§Ã£o Celular | SuplementaÃ§Ã£o e Terapia Nutricional",
    description:
      "NutriÃ§Ã£o celular avanÃ§ada para otimizar resultados do tratamento. SuplementaÃ§Ã£o personalizada e terapia nutricional especializada.",
    keywords:
      "nutriÃ§Ã£o celular, suplementaÃ§Ã£o, terapia nutricional, vitaminas, minerais, tratamento nutricional obesidade",
    canonical: "https://www.brunadurelli.com.br/nutricao-celular",
  },
  medicinaRegenerativa: {
    title:
      "Medicina Regenerativa | SaÃºde MetabÃ³lica AvanÃ§ada - Dra. Bruna Durelli",
    description:
      "Abordagem avanÃ§ada para saÃºde metabÃ³lica: mais energia, menos inflamaÃ§Ã£o, preservaÃ§Ã£o muscular. Programas individualizados com base em exames.",
    keywords:
      "medicina regenerativa, saÃºde metabÃ³lica, nutriÃ§Ã£o celular, otimizaÃ§Ã£o hormonal, preservaÃ§Ã£o muscular, fadiga crÃ´nica, menopausa, pÃ³s-bariÃ¡trica, performance atlÃ©tica",
    canonical: "https://www.brunadurelli.com.br/medicina-regenerativa",
  },
  plasmaArgonio: {
    title: "Plasma de ArgÃ´nio - Tratamento de Reganho de Peso | LevSer",
    description:
      "TÃ©cnica endoscÃ³pica minimamente invasiva para tratamento de reganho de peso pÃ³s-cirurgia bariÃ¡trica e dilataÃ§Ã£o gÃ¡strica. RecuperaÃ§Ã£o rÃ¡pida e resultados consistentes.",
    keywords:
      "plasma de argÃ´nio, reganho de peso, pÃ³s-bariÃ¡trica, dilataÃ§Ã£o gÃ¡strica, endoscopia, anastomose dilatada, revisÃ£o bariÃ¡trica, APC",
    canonical: "https://www.brunadurelli.com.br/plasma-argonio",
  },
  sobre: {
    title: "Sobre a Dra. Bruna Durelli - Especialista em Obesidade | LevSer",
    description:
      "ConheÃ§a a trajetÃ³ria da Dra. Bruna Durelli, especialista em obesidade com +10 anos de experiÃªncia. FormaÃ§Ã£o no Einstein, Santa Casa, ABRAN. SÃ³cia-fundadora da LevSer.",
    keywords:
      "dra bruna durelli, especialista obesidade, endoscopia digestiva, nutrologia, medicina regenerativa, levser, sÃ£o paulo",
    canonical: "https://www.brunadurelli.com.br/sobre",
  },
  programaLevser: {
    title:
      "Programa LevSer - Tratamento Completo de Obesidade | Dra. Bruna Durelli",
    description:
      "Programa LevSer: tratamento integrado de obesidade com nutriÃ§Ã£o, medicina regenerativa, suporte psicolÃ³gico e procedimentos endoscÃ³picos. Abordagem personalizada e humanizada.",
    keywords:
      "programa levser, tratamento obesidade, emagrecimento saudÃ¡vel, acompanhamento multidisciplinar, sÃ£o paulo",
    canonical: "https://www.brunadurelli.com.br/programa-levser",
  },
  tratamentos: {
    title:
      "Tratamentos para Obesidade - Endoscopia, Farmacologia, Regenerativa | LevSer",
    description:
      "ConheÃ§a todos os tratamentos disponÃ­veis: balÃ£o gÃ¡strico, gastroplastia, canetas emagrecedoras, medicina regenerativa. Abordagem personalizada para cada caso.",
    keywords:
      "tratamentos obesidade, balÃ£o gÃ¡strico, gastroplastia, canetas emagrecedoras, medicina regenerativa, sÃ£o paulo",
    canonical: "https://www.brunadurelli.com.br/tratamentos",
  },
  recursos: {
    title:
      "Recursos Educativos - FAQ, Calculadoras, Guias | Dra. Bruna Durelli",
    description:
      "Acesse nossos recursos educativos: FAQ completo, calculadoras de IMC e ROI, guias de emagrecimento, vÃ­deos e artigos sobre tratamento de obesidade.",
    keywords:
      "faq obesidade, calculadora imc, guia emagrecimento, recursos educativos, dra bruna durelli",
    canonical: "https://www.brunadurelli.com.br/recursos",
  },
};

export const generateStructuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "LevSer - Dra. Bruna Durelli",
    "description":
      "ClÃ­nica especializada em tratamento de obesidade com abordagem personalizada, humanizada e baseada em evidÃªncias cientÃ­ficas",
    "url": "https://www.brunadurelli.com.br",
    "logo": "https://www.brunadurelli.com.br/logo.png",
    "medicalSpecialty": "Bariatric Medicine",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "SÃ£o Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR",
    },
    "telephone": "+55-11-99702-3024",
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
      "Regenerative Medicine",
    ],
    "description":
      "Especialista em Obesidade, Endoscopia Digestiva, Nutrologia e Medicina Regenerativa. SÃ³cia-fundadora da LevSer. Mais de 10 anos dedicados ao tratamento da obesidade com abordagem humanizada e baseada em evidÃªncias cientÃ­ficas.",
    "url": "https://www.brunadurelli.com.br",
    "alumniOf": ["Hospital Israelita Albert Einstein", "Santa Casa", "ABRAN"],
    "memberOf": ["SOBED", "ABESO"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "SÃ£o Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR",
    },
    "telephone": "+55-11-99702-3024",
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "LevSer - Dra. Bruna Durelli",
    "description":
      "ClÃ­nica especializada em tratamento de obesidade. Programa LevSer personalizado, terapias endoscÃ³picas, medicina regenerativa. Jardim Paulista, SÃ£o Paulo.",
    "url": "https://www.brunadurelli.com.br",
    "telephone": "+55-11-99702-3024",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Brasil, 173",
      "addressLocality": "SÃ£o Paulo",
      "addressRegion": "SP",
      "postalCode": "01431-000",
      "addressCountry": "BR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5680",
      "longitude": "-46.6553",
    },
    "openingHours": "Mo-Fr 08:00-18:00",
  },
};


