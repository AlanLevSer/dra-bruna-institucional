import { Navigation } from "@/components/Navigation";
import { SubpageHero } from "@/components/SubpageHero";
import { TreatmentSection } from "@/components/TreatmentSection";
import { IndicationList } from "@/components/IndicationList";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { pageSEO, generateStructuredData } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import patientImage from "@/assets/patient-confident.jpg";

const TerapiasEndoscopicas = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Terapias Endoscópicas",
    "description": "Procedimentos endoscópicos minimamente invasivos para tratamento da obesidade"
  };

  return (
    <>
      <SEOHead data={pageSEO.terapiasEndoscopicas} />
      <StructuredData data={[generateStructuredData.organization, serviceSchema]} />
      
      <div className="min-h-screen">
        <Navigation />
      <SubpageHero
        title="Terapias Endoscópicas"
        subtitle="Menos invasivas, mais resultado"
        description="Alternativas eficazes à cirurgia bariátrica — com menos riscos e recuperação mais rápida. Procedimentos modernos, feitos por endoscopia, sem cortes."
        image={patientImage}
      />

      <TreatmentSection title="Por que escolher terapias endoscópicas?">
        <p className="mb-4">
          Se você busca uma alternativa eficaz à cirurgia bariátrica — com menos riscos e mais rapidez na recuperação, as terapias endoscópicas podem ser ideais para o seu momento.
        </p>
        <p>
          São procedimentos modernos, feitos por endoscopia, <strong>sem cortes, com sedação leve e retorno rápido às atividades</strong>. Na LevSer, você encontra toda a estrutura necessária para realizar o procedimento com segurança e iniciar um protocolo completo de acompanhamento.
        </p>
      </TreatmentSection>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
            Procedimentos disponíveis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-shadow">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Balão Gástrico Endoscópico
              </h3>
              <p className="text-muted-foreground mb-4">
                Um balão de silicone é inserido por endoscopia e inflado no estômago, promovendo saciedade. Disponível em versões de 6 ou 12 meses.
              </p>
              <p className="text-sm text-primary font-medium">
                Ideal para quem precisa perder peso com mais suporte e controle.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-shadow">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Balão Gástrico Ajustável
              </h3>
              <p className="text-muted-foreground mb-4">
                Possui volume modulável que pode ser ajustado ao longo do tratamento, otimizando resultados e diminuindo desconfortos.
              </p>
              <p className="text-sm text-primary font-medium">
                Duração de 12 meses com ajuste personalizado.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-shadow">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Gastroplastia Endoscópica
              </h3>
              <p className="text-muted-foreground mb-4">
                Técnica de sutura endoscópica que reduz o tamanho do estômago sem cortes. Solução mais duradoura, sem cirurgia.
              </p>
              <Link to="/gastroplastia-endoscopica">
                <Button variant="outline" className="mt-4 group">
                  Saiba mais
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="text-xl font-serif font-bold text-foreground mb-3">
              Balão Deglutível
            </h3>
            <p className="text-muted-foreground">
              Também oferecemos o <strong>balão deglutível (4 meses)</strong>, que não precisa de endoscopia nem sedação. É ingerido como uma cápsula e depois eliminado naturalmente.
            </p>
          </div>
        </div>
      </section>

      <IndicationList
        title="Para quem são indicadas?"
        items={[
          "Pessoas com IMC entre 30 e 40",
          "Pacientes que já tentaram emagrecer com dieta e medicação",
          "Quem não pode ou não quer realizar cirurgia bariátrica",
          "Pessoas que buscam uma alternativa com menor tempo de recuperação",
          "Quem precisa perder entre 10% e 25% do peso corporal",
        ]}
      />

      <TreatmentSection title="Por que associar a tratamento completo?" variant="muted">
        <p className="mb-4">
          Aqui na LevSer, o procedimento é apenas o começo. O verdadeiro diferencial está no <strong>plano completo de cuidado</strong>, que inclui:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Nutrição personalizada para resultados duradouros</li>
          <li>Suporte emocional para manter a constância</li>
          <li>Nutrição celular com soros para melhorar energia e metabolismo</li>
          <li>Acompanhamento médico regular para garantir sua segurança</li>
        </ul>
      </TreatmentSection>

      <CTASection
        title="Pronta para dar o próximo passo?"
        description="Converse com nossa equipe e descubra qual terapia endoscópica é ideal para você."
      />

      <Footer />
      </div>
    </>
  );
};

export default TerapiasEndoscopicas;
