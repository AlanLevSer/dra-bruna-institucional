import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import LeadChatWidget from "@/components/LeadChatWidget";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import doctorImage from "@/assets/dra-bruna-elegant.avif";
import { CONTACT } from "@/lib/constants";

const PlasmaArgonio = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Gostaria de saber mais sobre Plasma de Argônio.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Plasma de Argônio",
    "description": "Técnica endoscópica para tratar reganho de peso pós-bariátrica e dilatação gástrica.",
  };

  return (
    <>
      <SEOHead data={pageSEO.plasmaArgonio} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />

      <div className="min-h-screen">
        <Navigation />
        <SubpageHero
          title="Plasma de Argônio"
          subtitle="Tratamento endoscópico de reganho de peso"
          description="Técnica minimamente invasiva para reduzir dilatações e recuperar a sensação de saciedade, com recuperação rápida."
          image={doctorImage}
          onCtaClick={handleWhatsApp}
        />

        <TreatmentSection title="O que é o Plasma de Argônio?">
          <p className="mb-4">
            O Plasma de Argônio (APC) utiliza energia controlada para promover cicatrização da mucosa e reduzir
            dilatações gástricas, ajudando a restabelecer a saciedade e o controle do peso.
          </p>
          <p>
            É uma alternativa menos invasiva do que revisões cirúrgicas, indicada após avaliação endoscópica e clínica.
          </p>
        </TreatmentSection>

        <IndicationList
          title="Para quem é indicado?"
          items={[
            'Reganho de peso após cirurgia bariátrica',
            'Dilatação da anastomose gastrojejunal',
            'Expansão gástrica após retirada do balão',
            'Quem busca alternativa menos invasiva à revisão cirúrgica',
          ]}
        />

        <BenefitsList
          title="Benefícios do tratamento"
          benefits={[
            'Procedimento minimamente invasivo',
            'Alta no mesmo dia e retorno rápido às atividades',
            'Resultados progressivos conforme protocolo',
            'Auxílio no controle do peso de forma sustentável',
          ]}
        />

        <CTASection
          title="Quer avaliar seu caso?"
          description="Fale com nossa equipe e entenda se o Plasma de Argônio faz sentido para você."
          onButtonClick={handleWhatsApp}
        />

        <Footer />
        <LeadChatWidget showFloatingButton origin="plasma-argonio" />
      </div>
    </>
  );
};

export default PlasmaArgonio;
