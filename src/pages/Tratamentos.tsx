import { Navigation } from "@/components/Navigation";
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
        description: "ConheÃ§a todos os tratamentos disponÃ­veis: balÃ£o gÃ¡strico, gastroplastia, canetas emagrecedoras, medicina regenerativa. Abordagem personalizada para cada caso.",
        keywords: "tratamentos obesidade, balÃ£o gÃ¡strico, gastroplastia, canetas emagrecedoras, medicina regenerativa, sÃ£o paulo",
        canonical: "https://www.brunadurelli.com.br/tratamentos"
      }} />
      <StructuredData data={[generateStructuredData.organization]} />
      
      <div className="min-h-screen">
        <Navigation />
        <main>
          <SubpageHero
            title="Tratamentos DisponÃ­veis"
            subtitle="OpÃ§Ãµes Personalizadas"
            description="ConheÃ§a todos os tratamentos disponÃ­veis: terapias endoscÃ³picas, farmacolÃ³gicas e medicina regenerativa. Encontramos juntas a melhor soluÃ§Ã£o para vocÃª."
            image={heroImage}
            ctaText="Agendar AvaliaÃ§Ã£o"
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
                    A obesidade Ã© uma <strong className="text-foreground">doenÃ§a multifatorial</strong> â€” 
                    envolve metabolismo, hormÃ´nios, comportamento, sono, estresse e hÃ¡bitos alimentares. 
                    <strong className="text-foreground"> E tambÃ©m impacta diretamente sua longevidade e qualidade de vida.</strong>
                  </p>
                </div>

                <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-elegant mb-8">
                  <p className="text-lg text-foreground mb-6">
                    Por isso, <strong>todos os tratamentos da LevSer sÃ£o integrados ao Programa completo</strong>, 
                    que se baseia em <strong>4 pilares fundamentais:</strong>
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Utensils className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">NutriÃ§Ã£o Inteligente</h3>
                        <p className="text-sm text-muted-foreground">ReeducaÃ§Ã£o alimentar personalizada e sustentÃ¡vel</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Dna className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">SaÃºde MetabÃ³lica & Regenerativa</h3>
                        <p className="text-sm text-muted-foreground">OtimizaÃ§Ã£o hormonal, controle inflamatÃ³rio e longevidade celular</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Corpo em Movimento</h3>
                        <p className="text-sm text-muted-foreground">PrescriÃ§Ã£o de atividade fÃ­sica orientada e individualizada</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-1">Mente & Comportamento</h3>
                        <p className="text-sm text-muted-foreground">Suporte psicolÃ³gico para gatilhos emocionais e hÃ¡bitos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">O diferencial da Dra. Bruna Durelli:</strong> vocÃª nÃ£o recebe apenas 
                    um procedimento ou medicaÃ§Ã£o â€” vocÃª recebe um <strong>programa completo de transformaÃ§Ã£o</strong>, 
                    com time interdisciplinar (mÃ©dico + nutricionista + psicÃ³logo + educador fÃ­sico) trabalhando de forma integrada 
                    em cada fase da sua jornada, promovendo nÃ£o sÃ³ emagrecimento mas longevidade com qualidade.
                  </p>
                  <p className="mt-3">
                    <a href="/programa-levser" className="text-primary hover:underline font-medium">
                      ConheÃ§a o Programa LevSer completo â†’
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Procedimentos EndoscÃ³picos */}
          <section id="endoscopicos" className="py-16 xl:py-20 bg-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} rotate={15} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Procedimentos EndoscÃ³picos
                </h2>
                <p className="text-muted-foreground">
                  BalÃ£o intragÃ¡strico, gastroplastia endoscÃ³pica e plasma de argÃ´nio. 
                  Procedimentos minimamente invasivos com recuperaÃ§Ã£o rÃ¡pida e resultados excelentes.
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
                  Canetas emagrecedoras, medicina regenerativa e nutriÃ§Ã£o celular avanÃ§ada. 
                  Abordagem integrada para resultados sustentÃ¡veis e qualidade de vida superior.
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
                      AvaliaÃ§Ã£o Personalizada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Na primeira consulta, avalio seu histÃ³rico, objetivos, exames e estilo de vida 
                      para desenhar o plano mais adequado para vocÃª.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Abordagem Combinada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Muitas vezes, a melhor estratÃ©gia Ã© combinar diferentes tratamentos. 
                      Por exemplo: balÃ£o + nutriÃ§Ã£o celular + suporte comportamental.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      DecisÃ£o Compartilhada
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      VocÃª nÃ£o decide sozinha. ConstruÃ­mos o plano juntas, considerando suas 
                      expectativas, receios e realidade do dia a dia.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={20} />
                      Acompanhamento ContÃ­nuo
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Seu tratamento evolui com vocÃª. Ajustamos estratÃ©gias conforme sua resposta, 
                      garantindo os melhores resultados possÃ­veis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparador */}
          <ComparadorBaloes />
          
          <CTASection
            title="Vamos Descobrir o Melhor Tratamento para VocÃª?"
            description="Agende sua avaliaÃ§Ã£o e receba um plano personalizado baseado no seu perfil e objetivos."
            buttonText="Agendar AvaliaÃ§Ã£o"
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

