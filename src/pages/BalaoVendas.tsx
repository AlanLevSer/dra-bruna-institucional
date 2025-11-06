import { lazy, Suspense, useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { HeroVendas } from "@/components/vendas/HeroVendas";
import { StatsVendas } from "@/components/vendas/StatsVendas";

// Lazy load below-the-fold components for better FCP
const TransformacoesReaisVendas = lazy(() => import("@/components/vendas/TransformacoesReaisVendas").then(m => ({ default: m.TransformacoesReaisVendas })));
const TargetAudienceVendas = lazy(() => import("@/components/vendas/TargetAudienceVendas").then(m => ({ default: m.TargetAudienceVendas })));
const ProgramaLevSerVendas = lazy(() => import("@/components/vendas/ProgramaLevSerVendas").then(m => ({ default: m.ProgramaLevSerVendas })));
const PilaresMetodoVendas = lazy(() => import("@/components/vendas/PilaresMetodoVendas").then(m => ({ default: m.PilaresMetodoVendas })));
const JornadaFasesVendas = lazy(() => import("@/components/vendas/JornadaFasesVendas").then(m => ({ default: m.JornadaFasesVendas })));
const ProgramasTratamento = lazy(() => import("@/components/vendas/ProgramasTratamento").then(m => ({ default: m.ProgramasTratamento })));
const ResultsVendas = lazy(() => import("@/components/vendas/ResultsVendas").then(m => ({ default: m.ResultsVendas })));
const TestimonialsVendas = lazy(() => import("@/components/vendas/TestimonialsVendas").then(m => ({ default: m.TestimonialsVendas })));
const CredentialsVendas = lazy(() => import("@/components/vendas/CredentialsVendas").then(m => ({ default: m.CredentialsVendas })));
const DifferentialsVendas = lazy(() => import("@/components/vendas/DifferentialsVendas").then(m => ({ default: m.DifferentialsVendas })));
const MediaRecognitionVendas = lazy(() => import("@/components/vendas/MediaRecognitionVendas").then(m => ({ default: m.MediaRecognitionVendas })));
const FAQVendas = lazy(() => import("@/components/vendas/FAQVendas").then(m => ({ default: m.FAQVendas })));
const FinalCTAVendas = lazy(() => import("@/components/vendas/FinalCTAVendas").then(m => ({ default: m.FinalCTAVendas })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const LeadChatWidget = lazy(() => import("@/components/LeadChatWidget").then(m => ({ default: m.default })));

type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: IdleCallback, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const BalaoVendas = () => {
  const [showWidget, setShowWidget] = useState(false);
  
  const seoData = {
    title: "Balão Intragástrico - Perca até 35 kg em até 12 meses | Dra. Bruna Durelli",
    description:
      "Tratamento completo com balão intragástrico, acompanhamento interdisciplinar e resultados duradouros. Pré-consulta personalizada. Agende agora!",
    keywords:
      "balão intragástrico, emagrecimento, perda de peso, obesidade, Dra. Bruna Durelli, LevSer, São Paulo",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico-a",
  } as const;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const enableWidget = () => setShowWidget(true);
    const win = window as WindowWithIdleCallback;

    let idleCallbackId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof win.requestIdleCallback === "function") {
      idleCallbackId = win.requestIdleCallback(() => enableWidget(), { timeout: 4000 });
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
      <link 
        rel="preload" 
        as="image" 
        href="/assets/dra-bruna-hero-BaJOBgnO.avif"
        type="image/avif"
      />
      <HeroVendas />
      <StatsVendas />
      
      {/* Lazy loaded below-the-fold sections for better FCP */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <TransformacoesReaisVendas />
        <TargetAudienceVendas />
        <ProgramaLevSerVendas />
        <PilaresMetodoVendas />
        <JornadaFasesVendas />
        <ProgramasTratamento />
        <ResultsVendas />
        <TestimonialsVendas />
        <CredentialsVendas />
        <DifferentialsVendas />
        <MediaRecognitionVendas />
        <FAQVendas />
        <FinalCTAVendas />
        <Footer />
        {showWidget && <LeadChatWidget showFloatingButton={false} origin="balao-vendas" />}
      </Suspense>
    </>
  );
};

export default BalaoVendas;
