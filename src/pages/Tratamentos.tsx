import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { TratamentosGrid } from "@/components/TratamentosGrid";
import { ComparadorBaloes } from "@/components/ComparadorBaloes";
import { CTASection } from "@/components/CTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { CONTACT } from "@/lib/constants";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Activity, Syringe, Zap, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/patient-wellness-1.jpg";

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
        canonical: "https://drabrunadurelli.com/tratamentos"
      }} />
      
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
          
          {/* Terapias Endoscópicas */}
          <section id="endoscopicos" className="py-16 xl:py-20 bg-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} rotate={15} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Terapias Endoscópicas
                </h2>
                <p className="text-muted-foreground">
                  Procedimentos minimamente invasivos realizados por via endoscópica, sem cortes externos. 
                  Recuperação rápida e excelentes resultados.
                </p>
              </div>
              
              <TratamentosGrid category="endoscopico" />
            </div>
          </section>

          {/* Terapias Farmacológicas */}
          <section id="farmacologicos" className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
            <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.1} rotate={-15} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Syringe className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Terapias Farmacológicas
                </h2>
                <p className="text-muted-foreground">
                  Medicações modernas e eficazes para controle da fome e emagrecimento sustentável, 
                  sempre com prescrição e acompanhamento médico especializado.
                </p>
              </div>
              
              <TratamentosGrid category="farmacologico" />
            </div>
          </section>

          {/* Medicina Regenerativa */}
          <section id="regenerativos" className="py-16 xl:py-20 bg-background relative overflow-hidden">
            <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.1} rotate={25} color="gray" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
                  Medicina Regenerativa & Longevidade
                </h2>
                <p className="text-muted-foreground">
                  Abordagem avançada para otimização metabólica, hormonal e celular. 
                  Mais energia, menos inflamação, resultados duradouros.
                </p>
              </div>
              
              <TratamentosGrid category="regenerativo" />
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
