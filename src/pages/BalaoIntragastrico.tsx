import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { ProblemasSolucoes } from "@/components/ProblemasSolucoes";
import { ComoFunciona } from "@/components/ComoFunciona";
import { TimelineBalao } from "@/components/TimelineBalao";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { IndicationList } from "@/components/IndicationList";
import { TreatmentSection } from "@/components/TreatmentSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import patientImage from "@/assets/patient-confident.avif";
import { CONTACT } from "@/lib/constants";

const BalãoIntragastrico = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Gostaria de saber mais sobre Balão Intragástrico.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Balão Intragástrico",
    "description": "Procedimento endoscópico minimamente invasivo para tratamento da obesidade com balão gástrico.",
  };

  return (
    <>
      <SEOHead data={pageSEO.balaoIntragastrico} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />

      <div className="min-h-screen">
        <Navigation />

        <SubpageHero
          title="Balão Intragástrico"
          subtitle="Controle da fome + Programa completo = Resultado que você pode manter"
          description="Procedimento endoscópico minimamente invasivo que te ajuda a emagrecer controlando a fome de verdade — sem cortes, sem internação."
          image={patientImage}
          onCtaClick={handleWhatsApp}
        />

        <ProblemasSolucoes />
        <ComoFunciona />

        <TreatmentSection title="O balão é só o começo do seu tratamento">
          <p className="text-lg mb-4">
            O <strong>balão intragástrico</strong> é um dispositivo de silicone que ocupa espaço no estômago, ajudando
            você a se sentir satisfeita com menos comida — sem esforço mental constante.
          </p>
          <p className="text-lg mb-4">
            Enquanto o balão controla a fome, você constrói novos hábitos alimentares com nossa equipe de nutrição e
            psicologia.
          </p>
          <p className="text-lg font-semibold text-primary">Quando ele sai, você já aprendeu a se alimentar diferente.</p>
        </TreatmentSection>

        <ComparadorBaloes />

        <IndicationList
          title="Para quem o balão é indicado?"
          items={[
            "IMC entre 30 e 40 (ou ≥ 27 com comorbidades)",
            "Quem já tentou dieta e medicação sem sucesso duradouro",
            "Quem não pode ou não deseja fazer cirurgia bariátrica",
            "Pacientes que buscam perda de 10% a 25% do peso corporal",
            "Quem precisa de suporte físico real para controlar a fome",
          ]}
        />

        <TimelineBalao />

        <CTASection
          title="Pronta para dar o próximo passo?"
          description="Converse com nossa equipe e descubra se o Balão Intragástrico é ideal para você."
          onButtonClick={handleWhatsApp}
        />

        <Footer />
      </div>
    </>
  );
};

export default BalãoIntragastrico;


