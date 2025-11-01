import { lazy, Suspense } from "react";
import { SEOHead } from "@/components/SEOHead";
import { HeroVendas } from "@/components/vendas/HeroVendas";
import { StatsVendas } from "@/components/vendas/StatsVendas";
import { TransformacoesReaisVendas } from "@/components/vendas/TransformacoesReaisVendas";
import { TargetAudienceVendas } from "@/components/vendas/TargetAudienceVendas";
import { ProgramaLevSerVendas } from "@/components/vendas/ProgramaLevSerVendas";

// Lazy load below-the-fold components for better FCP
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
import LeadChatWidget from "@/components/LeadChatWidget";

const BalãoVendas = () => {
  const seoData = {
    title: "Balão Intragástrico - Perca até 35 kg em até 12 meses | Dra. Bruna Durelli",
    description:
      "Tratamento completo com balão intragástrico, acompanhamento interdisciplinar e resultados duradouros. Consulta de avaliação com desconto. Agende agora!",
    keywords:
      "balão intragástrico, emagrecimento, perda de peso, obesidade, Dra. Bruna Durelli, LevSer, São Paulo",
    canonical: "https://www.brunadurelli.com.br/balao-intragastrico-a",
  } as const;

  return (
    <>
      <SEOHead data={seoData} />
      <HeroVendas />
      <StatsVendas />
      <TransformacoesReaisVendas />
      <TargetAudienceVendas />
      <ProgramaLevSerVendas />
      
      {/* Lazy loaded below-the-fold sections for better FCP */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
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
      </Suspense>
      
      <LeadChatWidget showFloatingButton={false} origin="balao-vendas" />
    </>
  );
};

export default BalãoVendas;
