import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Glp1Hero } from "@/components/glp1/Glp1Hero";
import {
  Glp1Autoridade,
  Glp1Avaliacao,
  Glp1CtaFinal,
  Glp1Disclaimer,
  Glp1Estrutura,
  Glp1Faq,
  Glp1Ferramenta,
  Glp1Metodo,
  Glp1Perfil,
  Glp1Pilares,
  Glp1Problema,
  Glp1Sintese,
} from "@/components/glp1/Glp1Sections";

import { Glp1Espaco } from "@/components/glp1/Glp1Espaco";
import { Glp1Midia } from "@/components/glp1/Glp1Midia";
import { Glp1StickyCta } from "@/components/glp1/Glp1StickyCta";
import { clearPageContext, setPageContext } from "@/lib/tracking";
import { trackEvent } from "@/lib/analytics";

const LeadChatWidget = lazy(() => import("@/components/LeadChatWidget"));
const Glp1Avaliacoes = lazy(() => import("@/components/glp1/Glp1Avaliacoes").then((m) => ({ default: m.Glp1Avaliacoes })));

const ROUTE_INTENT = "GLP";
const LP_VARIANT = "GLP_C1_V1";

const seoData = {
  title: "Tratamento médico do emagrecimento em São Paulo | LevSer",
  description:
    "Avaliação médica estruturada e acompanhamento interdisciplinar para o tratamento do emagrecimento na LevSer, em São Paulo. Agende sua Avaliação Estratégica.",
  keywords:
    "tratamento do emagrecimento, clínica de emagrecimento São Paulo, avaliação médica, acompanhamento interdisciplinar, LevSer",
  canonical: "https://www.brunadurelli.com.br/tratamento-glp1-a",
} as const;

const AvaliacoesSkeleton = () => (
  <section aria-hidden="true" className="py-16 px-5">
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="h-6 w-48 rounded bg-muted animate-pulse" />
      <div className="h-4 w-full rounded bg-muted animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
    </div>
  </section>
);

const LazyAvaliacoes = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={<AvaliacoesSkeleton />}>
          <Glp1Avaliacoes />
        </Suspense>
      ) : (
        <AvaliacoesSkeleton />
      )}
    </div>
  );
};

const TratamentoGlp1 = () => {
  const [showWidget, setShowWidget] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    const context = setPageContext({ route_intent: ROUTE_INTENT, lp_variant: LP_VARIANT });

    if (!viewedRef.current) {
      viewedRef.current = true;
      trackEvent("lp_view", { ...context, page_path: "/tratamento-glp1-a" });
    }

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow";

    const timeoutId = window.setTimeout(() => setShowWidget(true), 1200);

    return () => {
      window.clearTimeout(timeoutId);
      if (robots) robots.content = "index, follow";
      clearPageContext();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead data={seoData} />

      <main>
        <Glp1Hero />
        <Glp1Perfil />
        <Glp1Problema />
        <Glp1Metodo />
        <Glp1Pilares />
        <Glp1Ferramenta />
        <Glp1Sintese />
        <Glp1Avaliacao />
        <Glp1Autoridade />
        <Glp1Midia />
        <Glp1Estrutura />
        <Glp1Espaco />
        <LazyAvaliacoes />
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
