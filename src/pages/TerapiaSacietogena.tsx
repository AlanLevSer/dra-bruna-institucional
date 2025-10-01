import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import patientImage from "@/assets/patient-happy.jpg";
import terapiaImage from "@/assets/Design-sem-nome-5-1.png";

const TerapiaSacietogena = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Terapia Sacietogênica",
    "description": "Tratamento com medicações injetáveis que atuam nos hormônios da saciedade e do apetite",
    "availableService": {
      "@type": "MedicalProcedure",
      "name": "Terapia Sacietogênica"
    }
  };

  return (
    <>
      <SEOHead data={pageSEO.terapiaSacietogena} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />
      
      <div className="min-h-screen">
        <Navigation />
      <SubpageHero
        title="Terapia Sacietógena"
        subtitle="Controle da fome com segurança"
        description="Tratamento médico com medicações injetáveis que atuam nos hormônios da saciedade e do apetite. Acompanhamento completo para resultados sustentáveis."
        image={patientImage}
      />

      <TreatmentSection title="O que é Terapia Sacietógena?">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Você sente que sua fome não tem fim, mesmo fazendo dieta? Tem dificuldade de controlar a vontade de comer, principalmente à noite? Ou já tentou de tudo e sente que o metabolismo não colabora?
            </p>
            <p className="mb-4">
              A <strong>terapia sacietógena</strong> pode ser a peça que faltava para fazer seu corpo e sua mente caminharem na mesma direção.
            </p>
            <p>
              É um tratamento médico com <strong>medicações injetáveis</strong> que atuam diretamente nos hormônios da saciedade e do apetite. As substâncias mais utilizadas são:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
              <li><strong>Mounjaro</strong> (tirzepatida)</li>
              <li><strong>Ozempic</strong> (semaglutida)</li>
              <li><strong>Saxenda</strong> (liraglutida)</li>
            </ul>
            <p className="mt-4">
              Essas medicações regulam a fome, melhoram a glicemia e facilitam a adesão a uma nova rotina alimentar.
            </p>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-premium opacity-20 blur-3xl rounded-full"></div>
            <img
              src={terapiaImage}
              alt="Terapia Sacietógena - imagem ilustrativa do tratamento"
              className="relative rounded-2xl shadow-elegant w-full h-auto object-cover"
            />
          </div>
        </div>
      </TreatmentSection>

      <TreatmentSection title="Como funciona no corpo?" variant="muted">
        <p className="mb-4">
          Esses medicamentos agem nos <strong>centros de saciedade do cérebro e no intestino</strong>, ajudando a:
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted-foreground">
          <li>Reduzir o apetite e o desejo por alimentos calóricos</li>
          <li>Prolongar a sensação de saciedade após as refeições</li>
          <li>Melhorar a resistência à insulina</li>
          <li>Controlar os picos de glicose</li>
          <li>Reduzir a compulsão alimentar</li>
        </ul>
      </TreatmentSection>

      <IndicationList
        title="Para quem é indicada?"
        items={[
          "IMC acima de 27",
          "Sobrepeso com comorbidades (resistência à insulina, pré-diabetes, SOP)",
          "Obesidade grau I, II ou III",
          "Histórico de compulsão alimentar ou falha em dietas tradicionais",
          "Dificuldade de manter constância nas refeições",
        ]}
      />

      <section className="py-10 xl:py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-accent/10 border-l-4 border-accent p-8 rounded-lg">
            <h3 className="text-xl font-serif font-bold text-foreground mb-3">
              ⚠️ Importante
            </h3>
            <p className="text-muted-foreground">
              A prescrição só é feita após <strong>avaliação médica criteriosa</strong>. Cada paciente recebe um protocolo personalizado baseado em suas necessidades, histórico clínico e exames.
            </p>
          </div>
        </div>
      </section>

      <TreatmentSection title="Resultados reais, com acompanhamento" variant="muted">
        <p className="mb-4">
          Aqui na LevSer, você não será apenas "mais um paciente com injeção semanal". Nossa equipe faz um <strong>plano interdisciplinar</strong> que inclui:
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted-foreground">
          <li><strong>Avaliação médica e de exames</strong> para prescrição adequada</li>
          <li><strong>Nutrição personalizada</strong> para potencializar resultados</li>
          <li><strong>Apoio comportamental</strong> para manter constância</li>
          <li><strong>Ajuste gradual da dose</strong> para minimizar efeitos colaterais</li>
          <li><strong>Combinação com nutrição celular</strong> para mais energia e equilíbrio hormonal</li>
        </ul>
      </TreatmentSection>

      <BenefitsList
        title="Benefícios esperados"
        benefits={[
          "Redução significativa do apetite",
          "Controle da compulsão alimentar",
          "Melhora da glicemia e resistência à insulina",
          "Perda de peso progressiva e sustentável",
          "Maior facilidade de manter uma alimentação equilibrada",
          "Melhora da relação com a comida",
        ]}
      />

      <TreatmentSection title="Combinação com outros tratamentos">
        <p className="mb-4">
          A terapia sacietógena pode ser combinada com:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Nutrição Celular</strong> para otimizar energia e metabolismo</li>
          <li><strong>Terapias endoscópicas</strong> para resultados mais expressivos</li>
          <li><strong>Acompanhamento nutricional</strong> para reeducação alimentar</li>
          <li><strong>Suporte psicológico</strong> para mudança de comportamento</li>
        </ul>
        <p className="mt-4">
          O protocolo é individualizado e ajustado conforme a resposta de cada paciente.
        </p>
      </TreatmentSection>

      <CTASection
        title="Quer retomar o controle sobre sua fome?"
        description="Agende uma avaliação e descubra como a terapia sacietógena pode transformar sua relação com a comida."
      />

      <Footer />
      </div>
    </>
  );
};

export default TerapiaSacietogena;
