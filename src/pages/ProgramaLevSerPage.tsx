import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { ProgramaLevSer } from "@/components/ProgramaLevSer";
import { Diferenciais } from "@/components/Diferenciais";
import { Comunidade } from "@/components/Comunidade";
import { Nutricao } from "@/components/Nutricao";
import { RegeneracaoMetabolica } from "@/components/RegeneracaoMetabolica";
import { SegurancaEvidencias } from "@/components/SegurancaEvidencias";
import { InvestimentoPagamento } from "@/components/InvestimentoPagamento";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { generateStructuredData } from "@/lib/seo";
import { CONTACT } from "@/lib/constants";
import heroImage from "@/assets/transformation-success.jpg";

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
        canonical: "https://drabrunadurelli.com/programa-levser"
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
          
          <ProgramaLevSer />
          <Diferenciais />
          <Comunidade />
          <Nutricao />
          <RegeneracaoMetabolica />
          <SegurancaEvidencias />
          <InvestimentoPagamento />
          
          <CTASection
            title="Pronta para Começar Sua Transformação?"
            description="Agende sua avaliação e descubra como o Programa LevSer pode te ajudar a alcançar seus objetivos de forma sustentável."
            buttonText="Quero Começar Agora"
            onButtonClick={handleCTA}
          />
          
          <Footer />
        </main>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ProgramaLevSerPage;
