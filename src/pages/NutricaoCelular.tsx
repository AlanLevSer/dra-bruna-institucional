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
import patientImage from "@/assets/patient-wellness-1.avif";
import { CONTACT } from "@/lib/constants";

const NutricaoCelular = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Gostaria de saber mais sobre Nutrição Celular.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Nutrição Celular",
    "description": "Reposição personalizada de nutrientes para otimizar energia, foco e metabolismo.",
  };

  return (
    <>
      <SEOHead data={pageSEO.nutricaoCelular} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />

      <div className="min-h-screen">
        <Navigation />
        <SubpageHero
          title="Nutrição Celular"
          subtitle="Terapia moderna para energia e longevidade"
          description="Reposição de vitaminas, minerais, antioxidantes e aminoácidos conforme exames e sintomas. Energia real, foco e melhor resposta ao tratamento."
          image={patientImage}
          onCtaClick={handleWhatsApp}
        />

        <TreatmentSection title="O que é Nutrição Celular?">
          <p className="mb-4">
            A <strong>Nutrição Celular</strong> é uma terapia médica com soros metabólicos intravenosos ou suplementação
            de precisão para repor nutrientes essenciais diretamente onde o corpo precisa.
          </p>
          <p>
            O objetivo é melhorar energia, foco, sono e metabolismo, além de potencializar os resultados de programas de
            perda de peso com segurança e acompanhamento.
          </p>
        </TreatmentSection>

        <IndicationList
          title="Para quem é indicada?"
          items={[
            'Em emagrecimento e precisa preservar energia e massa magra',
            'Fadiga persistente, baixa imunidade ou sono ruim',
            'Dificuldade de resposta mesmo com dieta e exercício',
            'Menopausa/climatério, pós-bariátrica ou exames alterados',
          ]}
        />

        <BenefitsList
          title="Benefícios esperados"
          benefits={[
            'Mais disposição e foco mental',
            'Redução de inflamação e melhor sensibilidade metabólica',
            'Preservação de massa magra durante a perda de peso',
            'Sono e humor mais estáveis; pele e cabelo cuidadosos',
          ]}
        />

        <CTASection
          title="Quer saber se é para você?"
          description="Converse com nossa equipe e descubra qual protocolo de Nutrição Celular combina com seu caso."
          onButtonClick={handleWhatsApp}
        />

        <Footer />
        <LeadChatWidget showFloatingButton origin="nutricao-celular" />
      </div>
    </>
  );
};

export default NutricaoCelular;
