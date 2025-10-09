import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { TransformacaoReal } from "@/components/TransformacaoReal";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import doctorImage from "@/assets/dra-bruna-elegant.jpg";
import { Heart, Activity, Smile, RefreshCw } from "lucide-react";

const PlasmaArgonio = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Plasma de Argônio",
    "description": "Técnica endoscópica para tratamento de reganho de peso e dilatação gástrica"
  };

  return (
    <>
      <SEOHead data={pageSEO.plasmaArgonio} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />
      
      <div className="min-h-screen">
        <Navigation />
      <SubpageHero
        title="Plasma de Argônio"
        subtitle="Tratamento avançado de reganho de peso"
        description="Técnica endoscópica minimamente invasiva para redução de dilatação gástrica e tratamento de reganho de peso pós-bariátrica, com resultados consistentes e recuperação rápida."
        image={doctorImage}
      />

      <TreatmentSection title="O que é o Plasma de Argônio?">
        <p className="mb-4">
          O Plasma de Argônio (APC - Argon Plasma Coagulation) é uma <strong>técnica endoscópica avançada</strong> que utiliza plasma de argônio para realizar cauterização térmica controlada da mucosa gástrica.
        </p>
        <p className="mb-4">
          O procedimento promove uma <strong>cicatrização controlada que reduz a capacidade gástrica</strong>, diminuindo o tamanho da comunicação entre o estômago e o intestino (anastomose) ou reduzindo áreas de dilatação.
        </p>
        <p>
          É uma solução moderna e segura para pacientes que apresentaram reganho de peso após cirurgia bariátrica ou que tiveram expansão gástrica após balão intragástrico.
        </p>
      </TreatmentSection>

      <IndicationList
        title="Para quem é indicado?"
        items={[
          "Reganho de peso após cirurgia bariátrica",
          "Dilatação da anastomose gastrojejunal (comunicação estômago-intestino)",
          "Expansão gástrica após retirada de balão intragástrico",
          "Pacientes que buscam alternativa menos invasiva à revisão cirúrgica",
          "Quem deseja retomar os resultados da cirurgia bariátrica sem novos cortes",
        ]}
      />

      <TreatmentSection title="O que o Plasma de Argônio resolve?" variant="muted">
        <p className="mb-4">
          A técnica atua diretamente nas áreas dilatadas do estômago, promovendo uma <strong>retração tecidual controlada</strong> através da cauterização superficial.
        </p>
        <p className="mb-4">
          <strong>Principais efeitos:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>Redução do tamanho da anastomose (abertura entre estômago e intestino)</li>
          <li>Diminuição da capacidade gástrica</li>
          <li>Retorno da sensação de saciedade precoce</li>
          <li>Controle do reganho de peso de forma progressiva</li>
        </ul>
        <p>
          Os resultados geralmente são observados em <strong>2 a 3 sessões</strong>, realizadas com intervalo de 4 a 6 semanas entre cada aplicação.
        </p>
      </TreatmentSection>

      <TreatmentSection title="Como funciona no Programa LevSer?">
        <p className="mb-4">
          Na LevSer, o tratamento com Plasma de Argônio é <strong>integrado ao nosso programa completo</strong> de reeducação alimentar, suporte nutricional e acompanhamento comportamental.
        </p>
        <p className="mb-4">
          O procedimento é realizado em <strong>ambiente ambulatorial com sedação</strong>, sem necessidade de internação prolongada. A alta ocorre no mesmo dia.
        </p>
        <p className="mb-4">
          <strong>Protocolo de tratamento:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li>Avaliação endoscópica inicial completa</li>
          <li>2 a 3 sessões de aplicação de plasma de argônio</li>
          <li>Acompanhamento nutricional e médico entre as sessões</li>
          <li>Controle endoscópico para avaliação de resultados</li>
          <li>Plano de manutenção de peso a longo prazo</li>
        </ul>
        <p>
          O diferencial da LevSer está no <strong>cuidado integral</strong>: não tratamos apenas a dilatação, mas trabalhamos os hábitos e comportamentos que podem levar ao reganho.
        </p>
      </TreatmentSection>

      <BenefitsList
        title="Benefícios do tratamento"
        benefits={[
          "Procedimento minimamente invasivo, sem cortes externos",
          "Recuperação rápida com alta no mesmo dia",
          "Retorno às atividades habituais em 1-2 dias",
          "Pode ser repetido conforme necessidade clínica",
          "Resultados progressivos em 2-3 sessões",
          "Menor risco comparado à revisão cirúrgica",
          "Retorno da sensação de saciedade",
          "Auxílio no controle do peso de forma sustentável",
        ]}
      />

      <TransformacaoReal
        items={[
          {
            icon: RefreshCw,
            title: "Resgate de Resultados",
            description: "Retoma o controle do peso sem precisar de nova cirurgia"
          },
          {
            icon: Heart,
            title: "Saciedade de Volta",
            description: "Recupera a sensação de saciedade que você tinha perdido"
          },
          {
            icon: Activity,
            title: "Energia Renovada",
            description: "Volta a ter disposição e qualidade de vida"
          },
          {
            icon: Smile,
            title: "Confiança Restaurada",
            description: "Sai da frustração do reganho e retoma o controle"
          }
        ]}
        testimonial={{
          text: "Fiz bariátrica há 5 anos e o peso voltou. Eu achava que era falha minha, que eu não tinha disciplina. O plasma me mostrou que não — era meu estômago que tinha dilatado. Hoje voltei a ter controle sem nova cirurgia.",
          author: "Paciente LevSer, 45 anos, tratamento pós-bariátrica"
        }}
      />

      <CTASection
        title="Retome o controle do seu peso"
        description="Se você passou por cirurgia bariátrica e está enfrentando reganho de peso, ou teve expansão gástrica após balão, o Plasma de Argônio pode ser a solução ideal. Agende uma avaliação com nossa equipe."
      />

      <Footer />
      </div>
    </>
  );
};

export default PlasmaArgonio;
