import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { Footer } from "@/components/Footer";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import medicationsImage from "@/assets/medications-sacietogena.avif";
import { CONTACT } from "@/lib/constants";

const CanetasEmagrecedoras = () => {
  const handleWhatsApp = () => {
    const message = "Olá, Dra. Bruna! Gostaria de saber mais sobre Canetas Emagrecedoras.";
    window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Canetas Emagrecedoras (GLP-1 e Dupla Ação)",
    "description":
      "Tratamento médico com medicações injetáveis aprovadas pela ANVISA para obesidade (tirzepatida, semaglutida, liraglutida), com prescrição e acompanhamento especializado.",
    "medicineSystem": "https://schema.org/WesternConventional",
    "relevantSpecialty": "https://schema.org/Endocrinology",
    "availableService": {
      "@type": "MedicalProcedure",
      "name": "Prescrição de Canetas Emagrecedoras",
      "procedureType": "Therapeutic",
    },
    "warning": "Medicamentos sujeitos a prescrição médica. Venda proibida pela internet.",
  };

  return (
    <>
      <SEOHead data={pageSEO.canetasEmagrecedoras} />
      <StructuredData
        data={[generateStructuredData.organization, generateStructuredData.physician, serviceSchema]}
      />
      <Navigation />

      <SubpageHero
        title="Canetas Emagrecedoras"
        subtitle="Mounjaro, Ozempic, Wegovy e Saxenda com Acompanhamento Médico"
        description="Tratamento médico com canetas emagrecedoras (medicações injetáveis) que atuam nos hormônios da saciedade e do apetite. Utilizamos essas terapias modernas dentro de um programa médico completo, com prescrição individualizada e acompanhamento rigoroso."
        image={medicationsImage}
        onCtaClick={handleWhatsApp}
      />

      <TreatmentSection title="O que são Canetas Emagrecedoras?">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            As <strong>canetas emagrecedoras</strong> ajudam seu corpo e sua mente a trabalharem a favor do
            emagrecimento — reduzindo a fome física e elevando a saciedade de forma consistente.
          </p>

          <p>
            É um tratamento médico com <strong>canetas injetáveis</strong> que atuam diretamente nos centros de
            controle do apetite e da saciedade. Essas medicações imitam hormônios naturais que, por fatores como
            genética, histórico de dietas restritivas e resistência à insulina, podem estar desequilibrados.
          </p>

          <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-primary my-8">
            <p className="font-semibold text-foreground mb-2">O resultado?</p>
            <p className="text-muted-foreground">
              Menos fome, menos pensamentos obsessivos em comida e saciedade mais rápida e duradoura. Isso cria o
              ambiente metabólico e comportamental para que você faça escolhas conscientes — sem travar uma guerra com
              seu próprio corpo.
            </p>
          </div>

          <p>
            Importante: <strong>não é uma “solução mágica”</strong> e não funciona isoladamente. As canetas são
            ferramentas potentes <em>dentro de um programa médico completo</em>, com orientação nutricional, manejo
            comportamental, exames de controle e ajustes contínuos.
          </p>
        </div>
      </TreatmentSection>

      <IndicationList
        title="Para quem é indicado"
        items={[
          "IMC a partir de 27 com comorbidades ou ≥ 30",
          "Quem já tentou dietas e não teve resultado sustentável",
          "Pacientes com fome intensa ou compulsão alimentar",
          "Pessoas que buscam um apoio médico estruturado",
        ]}
      />

      <BenefitsList
        title="Benefícios do acompanhamento médico"
        benefits={[
          "Prescrição individualizada e ajustes de dose conforme resposta",
          "Manejo de efeitos colaterais e segurança do tratamento",
          "Plano nutricional e comportamental integrados ao uso da caneta",
          "Acompanhamento contínuo para resultados sustentáveis",
        ]}
      />

      <CTASection
        title="Pronta para começar?"
        description="Converse com nossa equipe e saiba se as canetas emagrecedoras são indicadas para o seu caso."
        onButtonClick={handleWhatsApp}
      />

      <Footer />
    </>
  );
};

export default CanetasEmagrecedoras;
