import { lazy, Suspense, useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { generateStructuredData } from "@/lib/seo";
import { BalaoLocHero } from "@/components/balao-loc/BalaoLocHero";
import { BalaoLocTrustStrip } from "@/components/balao-loc/BalaoLocTrustStrip";
import { BalaoLocEntenda } from "@/components/balao-loc/BalaoLocEntenda";
import { BalaoLocMetodo } from "@/components/balao-loc/BalaoLocMetodo";
import { BalaoLocCaminho } from "@/components/balao-loc/BalaoLocCaminho";
import { BalaoLocPorQue } from "@/components/balao-loc/BalaoLocPorQue";
import { BalaoLocIndicacao } from "@/components/balao-loc/BalaoLocIndicacao";
import { BalaoLocDraBruna } from "@/components/balao-loc/BalaoLocDraBruna";
import { BalaoLocFaq } from "@/components/balao-loc/BalaoLocFaq";
import { BalaoLocCtaFinal } from "@/components/balao-loc/BalaoLocCtaFinal";
import { BalaoLocStickyCta } from "@/components/balao-loc/BalaoLocStickyCta";

const BalaoLocEspaco = lazy(() =>
  import("@/components/balao-loc/BalaoLocEspaco").then((m) => ({ default: m.BalaoLocEspaco }))
);
const BalaoLocAvaliacoes = lazy(() =>
  import("@/components/balao-loc/BalaoLocAvaliacoes").then((m) => ({ default: m.BalaoLocAvaliacoes }))
);
const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);
const LeadChatWidget = lazy(() =>
  import("@/components/LeadChatWidget").then((m) => ({ default: m.default }))
);

type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;
type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: IdleCallback, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const seoData = {
  title: "Balão Intragástrico em São Paulo | LevSer",
  description:
    "Entenda se o balão intragástrico faz sentido para o seu momento. Avaliação médica, Método LevSer e uma estratégia que vai além do procedimento.",
  keywords:
    "balão intragástrico são paulo, colocar balão gástrico, balão gástrico endoscopia, médico balão intragástrico, clínica balão gástrico, Dra. Bruna Durelli, LevSer",
  canonical: "https://www.brunadurelli.com.br/balao-intragastrico-a",
} as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Balão Intragástrico",
  description:
    "Procedimento endoscópico para tratamento da obesidade integrado ao Método LevSer de acompanhamento clínico.",
  performedBy: {
    "@type": "Physician",
    name: "Dra. Bruna Durelli",
    medicalSpecialty: ["Obesity Medicine", "Endoscopy"],
  },
};

const BalaoVendas = () => {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enableWidget = () => setShowWidget(true);
    const win = window as WindowWithIdleCallback;

    let idleCallbackId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof win.requestIdleCallback === "function") {
      idleCallbackId = win.requestIdleCallback(enableWidget, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(enableWidget, 3000);
    }

    return () => {
      if (idleCallbackId !== undefined && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      <SEOHead data={seoData} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />
      <link
        rel="preload"
        as="image"
        href="/assets/dra-bruna-hero-BaJOBgnO.avif"
        type="image/avif"
      />

      <div className="min-h-screen overflow-x-hidden">
        {/* S1 — Hero */}
        <BalaoLocHero />

        {/* S2 — Trust Strip */}
        <BalaoLocTrustStrip />

        {/* S3 — Entenda o Balão */}
        <BalaoLocEntenda />

        {/* S4 — Método LevSer */}
        <BalaoLocMetodo />

        {/* S5 — Estrutura (lazy — vídeo) */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <BalaoLocEspaco />
        </Suspense>

        {/* S6 — Seu Caminho */}
        <BalaoLocCaminho />

        {/* S7 — Por que LevSer */}
        <BalaoLocPorQue />

        {/* S8 — Indicação Individual */}
        <BalaoLocIndicacao />

        {/* S9 — Google Reviews (lazy) */}
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <BalaoLocAvaliacoes />
        </Suspense>

        {/* S10 — Dra. Bruna */}
        <BalaoLocDraBruna />

        {/* S11 — FAQ */}
        <BalaoLocFaq />

        {/* S12 — CTA Final + Footer */}
        <BalaoLocCtaFinal />

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        {/* LeadChat (deferido) */}
        <Suspense fallback={null}>
          {showWidget && <LeadChatWidget showFloatingButton={false} origin="balao-loc-v2" />}
        </Suspense>

        {/* Sticky CTA mobile */}
        <BalaoLocStickyCta />
      </div>
    </>
  );
};

export default BalaoVendas;
