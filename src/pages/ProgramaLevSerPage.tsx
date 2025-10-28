import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { generateStructuredData } from "@/lib/seo";
import { CONTACT } from "@/lib/constants";
import heroImage from "@/assets/transformation-success.avif";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const ProgramaLevSer = lazy(() => import("@/components/ProgramaLevSer").then(m => ({ default: m.ProgramaLevSer })));
const Diferenciais = lazy(() => import("@/components/Diferenciais").then(m => ({ default: m.Diferenciais })));
const Comunidade = lazy(() => import("@/components/Comunidade").then(m => ({ default: m.Comunidade })));
const Nutricao = lazy(() => import("@/components/Nutricao").then(m => ({ default: m.Nutricao })));
const RegeneracaoMetabolica = lazy(() => import("@/components/RegeneracaoMetabolica").then(m => ({ default: m.RegeneracaoMetabolica })));
const SegurancaEvidencias = lazy(() => import("@/components/SegurancaEvidencias").then(m => ({ default: m.SegurancaEvidencias })));
const InvestimentoPagamento = lazy(() => import("@/components/InvestimentoPagamento").then(m => ({ default: m.InvestimentoPagamento })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

const ProgramaLevSerPage = () => {
  const handleCTA = () => {
    window.open(CONTACT.WHATSAPP_PROGRAMA_URL, '_blank');
  };

  const programSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Programa LevSer",
    "description": "Programa completo de tratamento da obesidade com acompanhamento interdisciplinar",
    "provider": {
      "@type": "Physician",
      "name": "Dra. Bruna Durelli"
    }
  };

  return (
    <>
      <SEOHead data={{
        title: "Programa LevSer - Tratamento Completo de Obesidade | Dra. Bruna Durelli",
        description: "Programa LevSer: tratamento integrado de obesidade com nutrição, medicina regenerativa, suporte psicológico e procedimentos endoscópicos. Abordagem personalizada e humanizada.",
        keywords: "programa levser, tratamento obesidade, emagrecimento saudável, acompanhamento multidisciplinar, são paulo",
        canonical: "https://www.brunadurelli.com.br/programa-levser"
      }} />
      <StructuredData data={[
        generateStructuredData.organization,
        programSchema
      ]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Programa LevSer"
            subtitle="Transformação Completa"
            description="Sua transformação completa: corpo, mente e metabolismo trabalhando juntos. Abordagem integrada com nutrição, procedimentos, medicina regenerativa e suporte contínuo."
            image={heroImage}
            ctaText="Quero Começar Agora"
            onCtaClick={handleCTA}
          />
          
          <Suspense fallback={<div className="min-h-[30vh]" />}>
            <ProgramaLevSer />
          </Suspense>

          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <Diferenciais />
          </Suspense>

          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <Comunidade />
          </Suspense>

          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <Nutricao />
            <RegeneracaoMetabolica />
            <SegurancaEvidencias />
          </Suspense>

          <Suspense fallback={<div className="min-h-[20vh]" />}>
            <InvestimentoPagamento />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[10vh]" />}>
            <CTASection
              title="Pronta para Começar Sua Transformação?"
              description="Agende sua avaliação e descubra como o Programa LevSer pode te ajudar a alcançar seus objetivos de forma sustentável."
              buttonText="Quero Começar Agora"
              onButtonClick={handleCTA}
            />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-[10vh]" />}>
            <Footer />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      </div>
    </>
  );
};

export default ProgramaLevSerPage;

