import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { SobreDraBruna } from "@/components/SobreDraBruna";
import { JornadaTransformacao } from "@/components/JornadaTransformacao";
import { ExperienciaConcierge } from "@/components/ExperienciaConcierge";
import { ReconhecimentoMidia } from "@/components/ReconhecimentoMidia";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import { CONTACT } from "@/lib/constants";
import heroImage from "@/assets/dra-bruna-hero.avif";

const Sobre = () => {
  const handleCTA = () => {
    window.open(CONTACT.WHATSAPP_URL, '_blank');
  };

  return (
    <>
      <SEOHead data={{
        title: "Sobre a Dra. Bruna Durelli - Especialista em Obesidade | LevSer",
        description: "ConheÃ§a a trajetÃ³ria da Dra. Bruna Durelli, especialista em obesidade com +10 anos de experiÃªncia. FormaÃ§Ã£o no Einstein, Santa Casa, ABRAN. SÃ³cia-fundadora da LevSer.",
        keywords: "dra bruna durelli, especialista obesidade, endoscopia digestiva, nutrologia, medicina regenerativa, levser, sÃ£o paulo",
        canonical: "https://www.brunadurelli.com.br/sobre"
      }} />
      <StructuredData data={[
        generateStructuredData.organization,
        generateStructuredData.physician
      ]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="ConheÃ§a a Dra. Bruna Durelli"
            subtitle="TrajetÃ³ria e FormaÃ§Ã£o"
            description="Mais de 10 anos dedicados a ajudar vocÃª a conquistar uma vida mais leve, saudÃ¡vel e plena. ConheÃ§a minha histÃ³ria, formaÃ§Ã£o e filosofia de atendimento."
            image={heroImage}
            ctaText="Agendar Consulta"
            onCtaClick={handleCTA}
          />
          
          <SobreDraBruna />
          <JornadaTransformacao />
          <ExperienciaConcierge />
          <ReconhecimentoMidia />
          
          <CTASection
            title="Vamos Conversar Sobre Sua TransformaÃ§Ã£o?"
            description="Agende sua consulta e conheÃ§a como posso te ajudar a alcanÃ§ar seus objetivos de saÃºde e bem-estar."
            buttonText="Agendar Consulta"
            onButtonClick={handleCTA}
          />
          
          <Footer />
        </main>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Sobre;

