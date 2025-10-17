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
import { TransformacaoReal } from "@/components/TransformacaoReal";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import doctorImage from "@/assets/dra-bruna-elegant.jpg";
import { Heart, Activity, Smile, TrendingDown } from "lucide-react";

const GastroplastiaEndoscopica = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Gastroplastia Endoscópica",
    "description": "Procedimento minimamente invasivo para redução do estômago sem cortes"
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
        description="Reduza seu estômago por endoscopia, sem cortes externos. Recuperação rápida, resultados duradouros, risco mínimo."
        image={doctorImage}
      />

      <ProblemasSolucoesGastro />

      <TreatmentSection title="O que é a Gastroplastia Endoscópica?">
        <p className="mb-4">
          Também conhecida como <strong>sutura endoscópica</strong>, a gastroplastia endoscópica é um procedimento realizado por via endoscópica, no qual o estômago é costurado internamente, reduzindo seu volume em até 70%.
        </p>
        <p className="mb-4">
          Isso promove <strong>saciedade precoce</strong> e ajuda o paciente a comer menos, sem interferir no trânsito intestinal.
        </p>
        <p>
          É uma alternativa moderna para quem deseja resultados expressivos na perda de peso sem passar por cortes, internações longas ou longos períodos de recuperação.
        </p>
      </TreatmentSection>

      <ComoFuncionaGastro />

      <TimelineGastro />

      <IndicationList
        title="Para quem é indicada?"
        items={[
          "Pessoas com IMC entre 30 e 40",
          "Quem não deseja ou não pode se submeter a cirurgias invasivas",
          "Pacientes que buscam uma solução definitiva, porém reversível",
          "Quem busca menor risco e recuperação acelerada",
        ]}
      />

      <BenefitsList
        title="Benefícios esperados"
        benefits={[
          "Perda de até 20% do peso corporal",
          "Procedimento seguro, com baixo risco de complicações",
          "Recuperação rápida, com retorno às atividades em poucos dias",
          "Sem cortes, sem cicatrizes, sem internação prolongada",
          "Auxílio no controle de doenças como diabetes tipo 2 e hipertensão",
          "Solução reversível, caso necessário",
        ]}
      />

      <ComparadorGastroVsBariatrica />

      <TransformacaoReal
        items={[
          {
            icon: TrendingDown,
            title: "Perda de Peso Sustentável",
            description: "Até 20% do peso corporal com acompanhamento integral"
          },
          {
            icon: Heart,
            title: "Controle de Doenças",
            description: "Melhora significativa de diabetes tipo 2 e hipertensão"
          },
          {
            icon: Activity,
            title: "Mais Disposição",
            description: "Retorno às atividades físicas sem limitações"
          },
          {
            icon: Smile,
            title: "Autoconfiança",
            description: "Recupera a relação saudável com o corpo e a comida"
          }
        ]}
        testimonial={{
          text: "Eu tinha medo de cirurgia, mas queria resultados reais. A gastroplastia me deu isso: perdi 18kg sem cortes, sem internação longa. E o melhor: me sinto segura porque sei que tenho o suporte da equipe.",
          author: "Paciente LevSer, 38 anos, -18kg em 8 meses"
        }}
      />

      <CTASection
        title="Por que fazer sua Gastroplastia na LevSer?"
        description="Equipe especializada com + de 500 procedimentos realizados • Tecnologia de ponta com suturas absorvíveis • Acompanhamento integral: nutrição, psicologia e atividade física • Programa exclusivo de manutenção pós-procedimento • Taxa de complicação < 1% (uma das menores do Brasil)"
      />

      <Footer />
      </div>
    </>
  );
};

export default GastroplastiaEndoscopica;
