�import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { TratamentosGrid } from "@/components/TratamentosGrid";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { generateStructuredData } from "@/lib/seo";
import { CONTACT } from "@/lib/constants";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Activity, Zap, CheckCircle2, Utensils, Dna, Dumbbell, Brain } from "lucide-react";
import heroImage from "@/assets/patient-wellness-1.avif";

const Tratamentos = () => {
  const handleCTA = () => {
    window.open(CONTACT.WHATSAPP_URL, '_blank');
  };

  return (
    <>
      <SEOHead data={{
        title: "Tratamentos para Obesidade - Endoscopia, Farmacologia, Regenerativa | LevSer",
        description: "Conheça todos os tratamentos disponíveis: balão gástrico, gastroplastia, canetas emagrecedoras, medicina regenerativa. Abordagem personalizada para cada caso.",
        keywords: "tratamentos obesidade, balão gástrico, gastroplastia, canetas emagrecedoras, medicina regenerativa, são paulo",
        canonical: "https://www.brunadurelli.com.br/tratamentos"
      }} />
      <StructuredData data={[generateStructuredData.organization]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Tratamentos Disponíveis"
            subtitle="Opções Personalizadas"
            description="Conheça todos os tratamentos disponíveis: terapias endoscópicas, farmacológicas e medicina regenerativa. Encontramos juntas a melhor solução para você."
            image={heroImage}
            ctaText="Agendar Avaliação"
            onCtaClick={handleCTA}
          />
          
          {/* Filosofia do Programa */}
          <section className="py-16 xl:py-20 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="center" size="xl" opacity={0.08} rotate={0} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Abordagem Integrativa
                  </span>
                  <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-6">
                    Nenhum tratamento funciona sozinho
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    A obesidade é uma <strong className="text-foreground">doença multifatorial</strong> � 
                    envolve metabolismo, hormônios, comportamento, sono, estresse e hábitos alimentares. 
                    <strong className="text-foreground"> E também impacta diretamente sua longevidade e qualidade de vida.</strong>
                  </p>
                </div>

                <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-elegant mb-8">
                  <p className="text-lg text-foreground mb-6">
                    Por isso, <strong>todos os tratamentos da LevSer são integrados ao Programa completo</strong>, 
                    que se baseia em <strong>4 pilares fundamentais:</strong>
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Utensils className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Nutrição Inteligente</h3>
                        <p className="text-sm text-muted-foreground">Reeducação alimentar personalizada e sustentável</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Dna className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Saúde Metabólica & Regenerativa</h3>
                        <p className="text-sm text-muted-foreground">Otimização hormonal, controle inflamatório e longevidade celular</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Corpo em Movimento</h3>
                        <p className="text-sm text-muted-foreground">Prescrição de atividade física orientada e individualizada</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Mente & Comportamento</h3>
                        <p className="text-sm text-muted-foreground">Suporte psicológico para gatilhos emocionais e hábitos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">O diferencial da Dra. Bruna Durelli:</strong> você não recebe apenas 
                    um procedimento ou medicação � você recebe um <strong>programa completo de transformação</strong>, 
                    com time interdisciplinar (médico + nutricionista + psicólogo + educador físico) trabalhando de forma integrada 
                    em cada fase da sua jornada, promovendo não só emagrecimento mas longevidade com qualidade.
                  </p>
                  <p className="mt-3">
                    <a href="/programa-levser" className="text-primary hover:underline font-medium">
                      Conheça o Programa LevSer completo � 
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Procedimentos Endoscópicos */}
          <section id="endoscopicos" className="py-16 xl:py-20 bg-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} rotate={15} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Procedimentos Endoscópicos
                </h2>
                <p className="text-muted-foreground">
                  Balão intragástrico, gastroplastia endoscópica e plasma de argônio. 
                  Procedimentos minimamente invasivos com recuperação rápida e resultados excelentes.
                </p>
              </div>
              
              <TratamentosGrid category="endoscopico" />
            </div>
          </section>

          {/* Emagrecimento & Longevidade */}
          <section id="emagrecimento-longevidade" className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
            <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.1} rotate={-20} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Emagrecimento & Longevidade
                </h2>
                <p className="text-muted-foreground">
                  Canetas emagrecedoras, medicina regenerativa e nutrição celular avançada. 
                  Abordagem integrada para resultados sustentáveis e qualidade de vida superior.
                </p>
              </div>
              
              <TratamentosGrid category="emagrecimento_longevidade" />
            </div>
          </section>

          {/* Como Escolher */}
          <section className="py-16 xl:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl xl:text-4xl font-serif font-bold text-center mb-12">
                  Como Escolher o Melhor Tratamento?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Avaliação Personalizada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Na primeira consulta, avalio seu histórico, objetivos, exames e estilo de vida 
                      para desenhar o plano mais adequado para você.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Abordagem Combinada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Muitas vezes, a melhor estratégia é combinar diferentes tratamentos. 
                      Por exemplo: balão + nutrição celular + suporte comportamental.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Decisão Compartilhada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Você não decide sozinha. Construímos o plano juntas, considerando suas 
                      expectativas, receios e realidade do dia a dia.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Acompanhamento Contínuo
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Seu tratamento evolui com você. Ajustamos estratégias conforme sua resposta, 
                      garantindo os melhores resultados possíveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparador */}
          <ComparadorBaloes />
          
          <CTASection
            title="Vamos Descobrir o Melhor Tratamento para Você?"
            description="Agende sua avaliação e receba um plano personalizado baseado no seu perfil e objetivos."
            buttonText="Agendar Avaliação"
            onButtonClick={handleCTA}
          />
          
          <Footer />
        </main>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Tratamentos;

