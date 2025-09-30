import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import patientImage from "@/assets/patient-wellness-1.jpg";

const NutricaoCelular = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SubpageHero
        title="Nutrição Celular"
        subtitle="Terapia Moderna"
        description="Energia, equilíbrio e mais resultados no seu tratamento. Reposição de nutrientes diretamente na corrente sanguínea, com absorção 100% e efeito imediato."
        image={patientImage}
      />

      <TreatmentSection title="O que é Nutrição Celular?">
        <p className="mb-4">
          Você já tentou de tudo para emagrecer, mas ainda sente cansaço, fome fora de hora ou dificuldade de resposta ao tratamento?
        </p>
        <p className="mb-4">
          Pode ser que o seu corpo esteja precisando de <strong>nutrição celular</strong>: uma terapia moderna, segura e eficaz que repõe os nutrientes certos diretamente na corrente sanguínea, sem passar pelo intestino.
        </p>
        <p>
          A Nutrição Celular é feita com <strong>soros metabólicos intravenosos</strong>, que contêm combinações personalizadas de vitaminas, minerais, antioxidantes e aminoácidos. Esses ativos são absorvidos 100% pelo organismo e atuam de forma imediata nas células, promovendo energia, equilíbrio e melhora metabólica.
        </p>
      </TreatmentSection>

      <IndicationList
        title="Para quem é indicada?"
        items={[
          "Está em processo de emagrecimento",
          "Sofre com cansaço crônico ou queda de imunidade",
          "Tem dificuldade de perder peso mesmo com dieta",
          "Está na menopausa, climatério ou pós-bariátrica",
          "Busca melhorar sono, foco e desempenho físico",
          "Está com exames alterados (ferro, vitaminas, etc.)",
        ]}
      />

      <TreatmentSection title="Como funciona?" variant="muted">
        <p className="mb-4">
          As aplicações são feitas na clínica LevSer, em um <strong>ambiente acolhedor e supervisionado</strong>. Cada soro é formulado com base em exames e sintomas individuais.
        </p>
        <p className="mb-4">
          As sessões duram entre <strong>30 e 60 minutos</strong> e o protocolo pode variar de acordo com a necessidade de cada paciente.
        </p>
        <p>
          Todo o processo é acompanhado por profissionais especializados que garantem segurança e conforto durante toda a terapia.
        </p>
      </TreatmentSection>

      <BenefitsList
        title="Benefícios esperados"
        benefits={[
          "Aumento da disposição e da clareza mental",
          "Melhora na recuperação muscular e imunidade",
          "Redução de compulsão alimentar e inflamação",
          "Aceleração do metabolismo",
          "Mais energia e bem-estar no dia a dia",
          "Otimização dos resultados do tratamento de emagrecimento",
        ]}
      />

      <TreatmentSection title="Resultados potencializados">
        <p>
          Ao combinar a Nutrição Celular com outros pilares do tratamento LevSer, como <strong>alimentação personalizada, terapias endoscópicas e suporte hormonal</strong>, o resultado é muito mais potente e sustentável.
        </p>
        <p className="mt-4">
          A nutrição celular não substitui uma alimentação equilibrada, mas atua como um complemento poderoso para quem busca resultados mais rápidos e consistentes.
        </p>
      </TreatmentSection>

      <CTASection
        title="Pronta para dar um upgrade no seu tratamento?"
        description="Agende uma avaliação e descubra como a Nutrição Celular pode transformar seus resultados."
      />

      <Footer />
    </div>
  );
};

export default NutricaoCelular;
