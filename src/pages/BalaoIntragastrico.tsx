import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { ProblemasSolucoes } from "@/components/ProblemasSolucoes";
import { ComoFunciona } from "@/components/ComoFunciona";
import { TimelineBalao } from "@/components/TimelineBalao";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { IndicationList } from "@/components/IndicationList";
import { TreatmentSection } from "@/components/TreatmentSection";
import { TransformacaoReal } from "@/components/TransformacaoReal";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import { Heart, Activity, Smile, Moon } from "lucide-react";
import patientImage from "@/assets/patient-confident.jpg";

const BalaoIntragastrico = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Balão Intragástrico",
    "description": "Procedimento endoscópico minimamente invasivo para tratamento da obesidade com balão gástrico"
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
        />

        <ProblemasSolucoes />

        <ComoFunciona />

        <TreatmentSection title="O balão é só o começo do seu tratamento">
          <p className="text-lg mb-4">
            O Balão Intragástrico é um <strong>dispositivo de silicone que ocupa espaço no seu estômago</strong>, 
            fazendo você se sentir satisfeita com menos comida — sem esforço mental constante.
          </p>
          <p className="text-lg mb-4">
            Enquanto o balão controla a fome, você tem tempo para construir novos hábitos alimentares 
            com nossa equipe de nutrição e psicologia.
          </p>
          <p className="text-lg font-semibold text-primary">
            Quando ele sai, você já aprendeu a se alimentar diferente.
          </p>
        </TreatmentSection>

        <TimelineBalao />

        <ComparadorBaloes />

        <IndicationList
          title="Para quem o Balão é indicado?"
          items={[
            "IMC entre 30 e 40 (ou acima de 27 com comorbidades)",
            "Pessoas que já tentaram dieta e medicação sem sucesso duradouro",
            "Quem não pode ou não quer fazer cirurgia bariátrica",
            "Pacientes que buscam perda de 10% a 25% do peso corporal",
            "Quem precisa de suporte físico real para controlar a fome",
          ]}
        />

        <TreatmentSection title="Por que fazer o Balão na LevSer?" variant="muted">
          <p className="text-xl font-semibold text-foreground mb-6">
            Aqui você não recebe só o balão — recebe um programa completo
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">
                <strong>Preparação nutricional pré-procedimento</strong> para otimizar resultados
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">
                <strong>Acompanhamento semanal</strong> (não só mensal) com equipe multidisciplinar
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">
                <strong>Equipe integrada:</strong> médico + nutricionista + psicólogo trabalhando juntos
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">
                <strong>Programa de manutenção pós-balão</strong> para o peso não voltar
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">
                <strong>Acesso a nutrição celular</strong> com soros para energia e metabolismo
              </span>
            </li>
          </ul>
          <p className="text-lg font-semibold text-primary mt-6">
            Resultado: você não está sozinha depois — está acompanhada em cada fase
          </p>
        </TreatmentSection>

        <TransformacaoReal
          items={[
            {
              icon: Heart,
              title: "Saúde Metabólica",
              description: "Redução ou suspensão de medicações para diabetes, pressão alta e colesterol"
            },
            {
              icon: Activity,
              title: "Energia e Disposição",
              description: "Volta a fazer atividades do dia a dia sem cansaço excessivo"
            },
            {
              icon: Smile,
              title: "Autoestima",
              description: "Recupera a confiança e o prazer de se olhar no espelho"
            },
            {
              icon: Moon,
              title: "Qualidade do Sono",
              description: "Melhora do sono, redução de ronco e apneia"
            }
          ]}
          testimonial={{
            text: "Eu achava que nunca mais ia conseguir subir escadas sem cansar. Hoje subo correndo e levo as compras. Isso não tem preço.",
            author: "Paciente LevSer, 52 anos, -28kg em 10 meses"
          }}
        />

        <CTASection
          title="Pronta para dar o próximo passo?"
          description="Converse com nossa equipe e descubra se o Balão Intragástrico é ideal para você."
        />

        <Footer />
      </div>
    </>
  );
};

export default BalaoIntragastrico;
