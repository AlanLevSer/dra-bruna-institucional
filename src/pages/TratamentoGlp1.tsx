import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Glp1Hero } from "@/components/glp1/Glp1Hero";
import {
  Glp1Autoridade,
  Glp1CtaFinal,
  Glp1Disclaimer,
  Glp1Faq,
  Glp1Jornada,
  Glp1Metodo,
  Glp1Perfil,
  Glp1Problema,
} from "@/components/glp1/Glp1Sections";
import { Glp1StickyCta } from "@/components/glp1/Glp1StickyCta";
import { clearPageContext, setPageContext } from "@/lib/tracking";
import { trackEvent } from "@/lib/analytics";

const LeadChatWidget = lazy(() => import("@/components/LeadChatWidget"));

const ROUTE_INTENT = "GLP";
const LP_VARIANT = "GLP_C1_V1";

const seoData = {
  title: "Tratamento médico do emagrecimento em São Paulo | LevSer",
  description:
    "Avaliação médica estruturada e acompanhamento interdisciplinar para o tratamento do emagrecimento na LevSer, em São Paulo. Agende sua Avaliação Estratégica.",
  keywords:
    "tratamento do emagrecimento, clínica de emagrecimento São Paulo, avaliação médica, acompanhamento interdisciplinar, LevSer",
  canonical: "https://www.brunadurelli.com.br/tratamento-glp1-a",
  noindex: true,
} as const;

const TratamentoGlp1 = () => {
  const [showWidget, setShowWidget] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    // Page context precisa existir ANTES do lp_view e de qualquer abertura do LeadChat.
    const context = setPageContext({ route_intent: ROUTE_INTENT, lp_variant: LP_VARIANT });

    if (!viewedRef.current) {
      viewedRef.current = true;
      trackEvent("lp_view", { ...context, page_path: "/tratamento-glp1-a" });
    }

    const timeoutId = window.setTimeout(() => setShowWidget(true), 1200);

    return () => {
      window.clearTimeout(timeoutId);
      clearPageContext();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead data={seoData} />

      <main>
        <Glp1Hero />
        <Glp1Problema />
        <Glp1Metodo />
        <Glp1Jornada />
        <Glp1Perfil />
        <Glp1Autoridade />
        <Glp1Faq />
        <Glp1CtaFinal />
        <Glp1Disclaimer />
      </main>

      <Glp1StickyCta />

      {showWidget && (
        <Suspense fallback={null}>
          <LeadChatWidget />
        </Suspense>
      )}
    </div>
  );
};

export default TratamentoGlp1;
