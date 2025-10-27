import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { ProblemasSolucoesGastro } from "@/components/ProblemasSolucoesGastro";
import { TreatmentSection } from "@/components/TreatmentSection";
import { ComoFuncionaGastro } from "@/components/ComoFuncionaGastro";
import { TimelineGastro } from "@/components/TimelineGastro";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { ComparadorGastroVsBariatrica } from "@/components/ComparadorGastroVsBariatrica";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import doctorImage from "@/assets/dra-bruna-elegant.avif";
import { CONTACT } from "@/lib/constants";

const GastroplastiaEndoscopica = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Gostaria de saber mais sobre Gastroplastia Endoscópica.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Gastroplastia Endoscópica",
    "description": "Procedimento minimamente invasivo para redução do estômago sem cortes",
  };

  return (
    <>
      <SEOHead data={pageSEO.gastroplastiaEndoscopica} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />

      <div className="min-h-screen">
        <Navigation />

        <SubpageHero
          title="Gastroplastia Endoscópica"
          subtitle="Emagreça até 20% sem cirurgia invasiva"
          description="Reduza seu estômago por endoscopia, sem cortes externos. Recuperação rápida, resultados duradouros e baixo risco."
          image={doctorImage}
          onCtaClick={handleWhatsApp}
        />

        <ProblemasSolucoesGastro />

        <TreatmentSection title="O que é a Gastroplastia Endoscópica?">
          <p className="mb-4">
            Também conhecida como <strong>sutura endoscópica</strong>, a gastroplastia endoscópica é um procedimento
            realizado por via endoscópica no qual o estômago é costurado internamente, reduzindo seu volume em até 70%.
          </p>
          <p>
            Isso promove <strong>saciedade precoce</strong> e ajuda a comer menos, sem alterar o trânsito intestinal.
            É uma alternativa moderna para quem deseja resultados expressivos na perda de peso sem cortes ou internações longas.
          </p>
        </TreatmentSection>

        <ComoFuncionaGastro />
        <TimelineGastro />

        <IndicationList
          title="Para quem é indicada?"
          items={[
            'Pessoas com IMC entre 30 e 40',
            'Quem não deseja ou não pode se submeter a cirurgias invasivas',
            'Busca menor risco e recuperação acelerada',
            'Deseja uma alternativa reversível com acompanhamento clínico',
          ]}
        />

        <BenefitsList
          title="Benefícios esperados"
          benefits={[
            'Perda de até 20% do peso corporal',
            'Baixo risco de complicações',
            'Recuperação rápida e retorno às atividades em poucos dias',
            'Sem cortes e sem cicatrizes',
            'Apoio clínico para resultados sustentáveis',
          ]}
        />

        <ComparadorGastroVsBariatrica />

        <CTASection
          title="Quer saber se é para você?"
          description="Converse com nossa equipe e descubra se a gastroplastia endoscópica é indicada para o seu caso."
          onButtonClick={handleWhatsApp}
        />

        <Footer />
      </div>
    </>
  );
};

export default GastroplastiaEndoscopica;
