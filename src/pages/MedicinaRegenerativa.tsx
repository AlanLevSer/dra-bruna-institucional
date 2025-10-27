import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import patientImage from "@/assets/patient-confident.avif";
import { CONTACT } from "@/lib/constants";

const MedicinaRegenerativa = () => {
  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de saber mais sobre Medicina Regenerativa.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Medicina Regenerativa Metabólica",
    "description": "Abordagem avançada para otimização metabólica, energia celular e saúde integral.",
    "provider": {
      "@type": "Physician",
      "name": "Dra. Bruna Durelli",
    },
  };

  return (
    <>
      <SEOHead data={pageSEO.medicinaRegenerativa} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />

      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Medicina Regenerativa & Longevidade"
            subtitle="Saúde metabólica para viver mais e melhor"
            description="Transforme não apenas o peso, mas a qualidade de cada célula do seu corpo: mais energia, menos inflamação e resultados sustentáveis."
            image={patientImage}
            ctaText="Descobrir meu programa regenerativo"
            onCtaClick={handleWhatsApp}
          />

          <TreatmentSection title="O que é Medicina Regenerativa?" variant="muted">
            <p className="mb-4">
              Uma abordagem médica baseada em evidências que vai além do “comer menos e se mover mais”. O foco é
              recuperar a eficiência celular e o equilíbrio metabólico para resultados sustentáveis e saúde integral.
            </p>
            <p>
              Protocolos individualizados a partir de exames laboratoriais completos e acompanhamento próximo, para
              restaurar energia, melhorar composição corporal e longevidade com qualidade.
            </p>
          </TreatmentSection>

          <IndicationList
            title="Para quem é indicado"
            items={[
              'Emagrecimento com preservação de massa magra e energia',
              'Fadiga crônica ou “metabolismo travado”',
              'Menopausa/climatério e pós-bariátrica',
              'Histórico de dietas restritivas e efeito rebote',
            ]}
          />

          <BenefitsList
            title="Benefícios esperados"
            benefits={[
              'Mais disposição e foco sustentados',
              'Redução de inflamação e melhor resposta metabólica',
              'Sono, humor e apetite mais estáveis',
              'Resultados duradouros com menos efeito rebote',
            ]}
          />

          <CTASection
            title="Quer entender se é para você?"
            description="Converse com nossa equipe e conheça o protocolo regenerativo ideal para o seu caso."
            onButtonClick={handleWhatsApp}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MedicinaRegenerativa;
