import { lazy, Suspense } from "react";
import { SEOHead } from "@/components/SEOHead";
import { HeroVendasPlasma } from "@/components/vendas/HeroVendasPlasma";
import { StatsVendasPlasma } from "@/components/vendas/StatsVendasPlasma";
import { TransformacoesReaisVendas } from "@/components/vendas/TransformacoesReaisVendas";
import { TargetAudienceVendasPlasma } from "@/components/vendas/TargetAudienceVendasPlasma";
import { ProgramaLevSerVendas } from "@/components/vendas/ProgramaLevSerVendas";
import LeadChatWidget from "@/components/LeadChatWidget";

const PilaresMetodoVendasPlasma = lazy(() => import("@/components/vendas/PilaresMetodoVendasPlasma").then(m => ({ default: m.PilaresMetodoVendasPlasma })));
const JornadaFasesVendasPlasma = lazy(() => import("@/components/vendas/JornadaFasesVendasPlasma").then(m => ({ default: m.JornadaFasesVendasPlasma })));
const ProgramasTratamentoPlasma = lazy(() => import("@/components/vendas/ProgramasTratamentoPlasma").then(m => ({ default: m.ProgramasTratamentoPlasma })));
const ResultsVendasPlasma = lazy(() => import("@/components/vendas/ResultsVendasPlasma").then(m => ({ default: m.ResultsVendasPlasma })));
const TestimonialsVendas = lazy(() => import("@/components/vendas/TestimonialsVendas").then(m => ({ default: m.TestimonialsVendas })));
const CredentialsVendas = lazy(() => import("@/components/vendas/CredentialsVendas").then(m => ({ default: m.CredentialsVendas })));
const DifferentialsVendasPlasma = lazy(() => import("@/components/vendas/DifferentialsVendasPlasma").then(m => ({ default: m.DifferentialsVendasPlasma })));
const MediaRecognitionVendas = lazy(() => import("@/components/vendas/MediaRecognitionVendas").then(m => ({ default: m.MediaRecognitionVendas })));
const FAQVendasPlasma = lazy(() => import("@/components/vendas/FAQVendasPlasma").then(m => ({ default: m.FAQVendasPlasma })));
const FinalCTAVendasPlasma = lazy(() => import("@/components/vendas/FinalCTAVendasPlasma").then(m => ({ default: m.FinalCTAVendasPlasma })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const PlasmaArgonioVendas = () => {
  const seoData = {
    title: "Plasma de Argônio - Tratamento de Reganho Pós-Bariátrica | Dra. Bruna Durelli",
    description: "Tratamento endoscópico com Plasma de Argônio para reganho de peso após bypass gástrico. Procedimento minimamente invasivo com resultados efetivos e acompanhamento especializado.",
    keywords: "plasma de argônio, reganho de peso, pós-bariátrica, bypass gástrico, tratamento endoscópico, Dra. Bruna Durelli, LevSer, São Paulo",
    canonical: "https://www.brunadurelli.com.br/plasma-de-argonio-a",
  } as const;

  return (
    <>
      <SEOHead data={seoData} />
      <HeroVendasPlasma />
      <StatsVendasPlasma />
      <TransformacoesReaisVendas />
      <TargetAudienceVendasPlasma />
      <ProgramaLevSerVendas />
      
      <Suspense fallback={<div className="min-h-[400px] w-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" /></div>}>
        <PilaresMetodoVendasPlasma />
        <JornadaFasesVendasPlasma />
        <ProgramasTratamentoPlasma />
        <ResultsVendasPlasma />
        <TestimonialsVendas />
        <CredentialsVendas />
        <DifferentialsVendasPlasma />
        <MediaRecognitionVendas />
        <FAQVendasPlasma />
        <FinalCTAVendasPlasma />
        <Footer />
      </Suspense>
      
      <LeadChatWidget showFloatingButton={false} origin="plasma-vendas" />
    </>
  );
};

export default PlasmaArgonioVendas;
