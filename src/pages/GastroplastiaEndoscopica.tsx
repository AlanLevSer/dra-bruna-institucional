import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { BenefitsList } from "@/components/BenefitsList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import doctorImage from "@/assets/dra-bruna-elegant.jpg";

const GastroplastiaEndoscopica = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SubpageHero
        title="Gastroplastia Endoscópica"
        subtitle="Redução gástrica sem cirurgia"
        description="Uma alternativa moderna e minimamente invasiva à cirurgia bariátrica. Resultados expressivos sem cortes, internações longas ou longos períodos de recuperação."
        image={doctorImage}
      />

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

      <IndicationList
        title="Para quem é indicada?"
        items={[
          "Pessoas com IMC entre 30 e 40",
          "Quem não deseja ou não pode se submeter a cirurgias invasivas",
          "Pacientes que buscam uma solução definitiva, porém reversível",
          "Quem busca menor risco e recuperação acelerada",
        ]}
      />

      <TreatmentSection title="Como funciona o tratamento?" variant="muted">
        <p className="mb-4">
          O procedimento é realizado em <strong>centro cirúrgico, com sedação</strong> e acompanhamento da equipe médica especializada.
        </p>
        <p className="mb-4">
          <strong>Não há cortes nem cicatrizes externas.</strong> A alta hospitalar ocorre geralmente no mesmo dia ou no dia seguinte.
        </p>
        <p className="mb-4">
          Durante o procedimento, são realizadas suturas internas no estômago, criando pregas que reduzem significativamente seu volume.
        </p>
        <p>
          O acompanhamento multidisciplinar é fundamental para manter os resultados ao longo do tempo, incluindo nutrição, atividade física e suporte comportamental.
        </p>
      </TreatmentSection>

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

      <TreatmentSection title="Gastroplastia vs Cirurgia Bariátrica">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-4 px-6 font-serif text-lg">Característica</th>
                <th className="py-4 px-6 font-serif text-lg">Gastroplastia</th>
                <th className="py-4 px-6 font-serif text-lg">Cirurgia Bariátrica</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-4 px-6">Invasividade</td>
                <td className="py-4 px-6">Sem cortes externos</td>
                <td className="py-4 px-6">Com cortes cirúrgicos</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-6">Tempo de recuperação</td>
                <td className="py-4 px-6">1-2 dias</td>
                <td className="py-4 px-6">2-4 semanas</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-6">Reversibilidade</td>
                <td className="py-4 px-6">Reversível</td>
                <td className="py-4 px-6">Irreversível</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-6">Perda de peso esperada</td>
                <td className="py-4 px-6">Até 20%</td>
                <td className="py-4 px-6">50-80%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-4 px-6">Indicação IMC</td>
                <td className="py-4 px-6">30-40</td>
                <td className="py-4 px-6">35-40+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TreatmentSection>

      <CTASection
        title="Por que escolher a LevSer?"
        description="Na LevSer, realizamos a gastroplastia endoscópica com tecnologia de ponta e uma equipe altamente qualificada. Nosso acompanhamento contínuo e plano de reeducação alimentar garantem que o procedimento seja apenas o primeiro passo para uma vida mais saudável."
      />

      <Footer />
    </div>
  );
};

export default GastroplastiaEndoscopica;
