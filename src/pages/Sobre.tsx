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
        description: "Conheça a trajetória da Dra. Bruna Durelli, especialista em obesidade com +10 anos de experiência. Formação no Einstein, Santa Casa, ABRAN. Sócia-fundadora da LevSer.",
        keywords: "dra bruna durelli, especialista obesidade, endoscopia digestiva, nutrologia, medicina regenerativa, levser, são paulo",
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
            title="Conheça a Dra. Bruna Durelli"
            subtitle="Trajetória e Formação"
            description="Mais de 10 anos dedicados a ajudar você a conquistar uma vida mais leve, saudável e plena. Conheça minha história, formação e filosofia de atendimento."
            image={heroImage}
            ctaText="Agendar Consulta"
            onCtaClick={handleCTA}
          />
          
          <SobreDraBruna />
          <JornadaTransformacao />
          <ExperienciaConcierge />
          <ReconhecimentoMidia />
          
          <CTASection
            title="Vamos Conversar Sobre Sua Transformação?"
            description="Agende sua consulta e conheça como posso te ajudar a alcançar seus objetivos de saúde e bem-estar."
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

