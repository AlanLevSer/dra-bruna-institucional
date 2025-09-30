import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import doctorImage from "@/assets/dra-bruna-professional.jpg";

const TerapiasCirurgicas = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SubpageHero
        title="Terapias Cirúrgicas"
        subtitle="Bariátrica Bypass e Sleeve"
        description="Tratamento definitivo da obesidade grave com técnicas consolidadas e resultados comprovados pela ciência."
        image={doctorImage}
      />

      <TreatmentSection title="Bypass Gástrico">
        <p className="mb-4">
          A cirurgia bariátrica do tipo <strong>Bypass Gástrico</strong> é uma das técnicas mais consolidadas e eficazes no tratamento da obesidade grave e das comorbidades associadas.
        </p>
        <p className="mb-4">
          Com resultados comprovados e ampla literatura científica, é indicada para pacientes que precisam de uma intervenção definitiva, com perda de peso significativa e melhora metabólica global.
        </p>
        <h3 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">O que é o Bypass Gástrico?</h3>
        <p>
          É uma cirurgia que <strong>reduz o tamanho do estômago e redireciona parte do intestino delgado</strong>. Isso diminui a capacidade de ingestão de alimentos e reduz a absorção de calorias e nutrientes. O novo trajeto do alimento também provoca alterações hormonais benéficas, ajudando no controle da fome, da glicemia e da saciedade.
        </p>
      </TreatmentSection>

      <IndicationList
        title="Indicação do Bypass"
        items={[
          "IMC acima de 40 (obesidade grave)",
          "IMC acima de 35 com doenças associadas (diabetes tipo 2, apneia do sono, hipertensão ou dislipidemia)",
          "Obesidade resistente a tratamentos clínicos anteriores",
        ]}
      />

      <BenefitsList
        title="Benefícios do Bypass"
        benefits={[
          "Perda de 60% a 80% do excesso de peso",
          "Melhora ou remissão de diabetes tipo 2",
          "Controle de comorbidades cardiovasculares",
          "Redução do apetite e controle da compulsão alimentar",
          "Melhora da autoestima e da qualidade de vida",
        ]}
      />

      <TreatmentSection title="Bariátrica Sleeve" variant="muted">
        <p className="mb-4">
          A cirurgia bariátrica <strong>Sleeve</strong>, também conhecida como gastrectomia vertical, é uma das técnicas mais realizadas no mundo para o tratamento da obesidade.
        </p>
        <p className="mb-4">
          É indicada para quem busca uma solução eficaz e segura, com menos interferência no funcionamento intestinal e excelente resposta metabólica.
        </p>
        <h3 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">O que é a Bariátrica Sleeve?</h3>
        <p>
          Nesse procedimento, cerca de <strong>70% a 80% do estômago é removido cirurgicamente</strong>, transformando-o em um tubo estreito, em formato de manga. Isso reduz drasticamente a capacidade do estômago, promovendo saciedade precoce e diminuindo a produção do hormônio da fome (grelina).
        </p>
      </TreatmentSection>

      <IndicationList
        title="Indicação da Sleeve"
        items={[
          "IMC acima de 40",
          "IMC acima de 35 com doenças associadas (diabetes tipo 2, hipertensão, apneia do sono)",
          "Alternativa para quem não pode ou não deseja realizar o bypass",
          "Manutenção do trânsito intestinal natural",
        ]}
      />

      <BenefitsList
        title="Benefícios da Sleeve"
        benefits={[
          "Perda de 50% a 70% do excesso de peso",
          "Menor risco de carências nutricionais em relação ao bypass",
          "Redução significativa da fome",
          "Melhora de condições metabólicas e cardiovasculares",
          "Procedimento irreversível com grandes taxas de sucesso",
        ]}
      />

      <TreatmentSection title="Como funciona o tratamento?">
        <p className="mb-4">
          Tanto o Bypass quanto a Sleeve são realizados por <strong>videolaparoscopia</strong> (mínima invasão) com internação média de 2 a 3 dias.
        </p>
        <p className="mb-4">
          Após o procedimento, o paciente passa por uma <strong>dieta progressiva</strong>, com acompanhamento clínico, nutricional e psicológico contínuo.
        </p>
        <p>
          O processo de perda de peso ocorre principalmente nos primeiros 12 a 18 meses, mas o acompanhamento deve ser mantido a longo prazo para garantir resultados sustentáveis.
        </p>
      </TreatmentSection>

      <CTASection
        title="Por que escolher a LevSer?"
        description="A LevSer oferece acompanhamento completo em todas as fases do processo — do pré-operatório à manutenção dos resultados. Com equipe experiente e abordagem acolhedora, garantimos suporte real para que cada paciente conquiste sua melhor versão."
      />

      <Footer />
    </div>
  );
};

export default TerapiasCirurgicas;
