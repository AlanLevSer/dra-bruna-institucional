import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { SobreDraBruna } from "@/components/SobreDraBruna";
import { ProgramaLevSer } from "@/components/ProgramaLevSer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileCTA } from "@/components/MobileCTA";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { defaultSEO, generateStructuredData } from "@/lib/seo";

// Lazy load components below the fold for better performance
const ExperienciaConcierge = lazy(() => import("@/components/ExperienciaConcierge").then(m => ({ default: m.ExperienciaConcierge })));
const JornadaTransformacao = lazy(() => import("@/components/JornadaTransformacao").then(m => ({ default: m.JornadaTransformacao })));
const Procedimentos = lazy(() => import("@/components/Procedimentos").then(m => ({ default: m.Procedimentos })));
const Nutricao = lazy(() => import("@/components/Nutricao").then(m => ({ default: m.Nutricao })));
const RegeneracaoMetabolica = lazy(() => import("@/components/RegeneracaoMetabolica").then(m => ({ default: m.RegeneracaoMetabolica })));
const Diferenciais = lazy(() => import("@/components/Diferenciais").then(m => ({ default: m.Diferenciais })));
const InvestimentoPagamento = lazy(() => import("@/components/InvestimentoPagamento").then(m => ({ default: m.InvestimentoPagamento })));
const ReconhecimentoMidia = lazy(() => import("@/components/ReconhecimentoMidia").then(m => ({ default: m.ReconhecimentoMidia })));
const Depoimentos = lazy(() => import("@/components/Depoimentos").then(m => ({ default: m.Depoimentos })));
const SegurancaEvidencias = lazy(() => import("@/components/SegurancaEvidencias").then(m => ({ default: m.SegurancaEvidencias })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const CTAFinal = lazy(() => import("@/components/CTAFinal").then(m => ({ default: m.CTAFinal })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  return (
    <>
      <SEOHead data={defaultSEO} />
      <StructuredData data={[
        generateStructuredData.organization,
        generateStructuredData.physician,
        generateStructuredData.localBusiness
      ]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <SobreDraBruna />
          <ProgramaLevSer />
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <ExperienciaConcierge />
            <JornadaTransformacao />
            <Procedimentos />
            <Nutricao />
            <RegeneracaoMetabolica />
            <Diferenciais />
            <InvestimentoPagamento />
            <ReconhecimentoMidia />
            <Depoimentos />
            <SegurancaEvidencias />
            <FAQ />
            <CTAFinal />
            <Footer />
          </Suspense>
        </main>
        <WhatsAppButton />
        <MobileCTA />
      </div>
    </>
  );
};

export default Index;
