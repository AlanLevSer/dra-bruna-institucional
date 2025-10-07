import { Users, Phone, Calendar, Award, ClipboardList, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";

const pillars = [
  {
    icon: ClipboardList,
    title: "Coordenação 360°",
    description: "Cuidamos de agenda, exames, autorizações e toda logística clínica"
  },
  {
    icon: Phone,
    title: "Canal Direto",
    description: "Acesso facilitado à equipe médica para dúvidas e ajustes"
  },
  {
    icon: Calendar,
    title: "Atendimento Prioritário",
    description: "Agenda flexível que respeita seu tempo e compromissos"
  },
  {
    icon: Award,
    title: "Sala Premium",
    description: "Ambiente exclusivo e acolhedor para suas consultas"
  },
  {
    icon: Activity,
    title: "Monitoramento Contínuo",
    description: "Telemonitoramento e relatórios mensais personalizados"
  },
  {
    icon: Users,
    title: "Programa Sob Medida",
    description: "16, 24 ou 48 semanas conforme seu perfil metabólico e necessidades"
  }
];

export const ExperienciaConcierge = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerVar = rootStyles.getPropertyValue('--header-height').trim();
      const headerOffset = (parseInt(headerVar.replace('px','')) || 80) + 8;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="experiencia-concierge" className="relative py-12 xl:py-16 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.12} rotate={-20} color="gray" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">Atendimento Premium</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-6">
            Você no Centro do Cuidado
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Coordenação completa, tempo respeitado, resultados sustentáveis
          </p>
          
          <p className="text-sm md:text-base text-muted-foreground/90 italic">
            Menos fricção, mais ciência. Você cuida das decisões estratégicas; 
            nós cuidamos de toda a logística clínica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:shadow-sm animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                  <pillar.icon className="text-primary" size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            onClick={() => scrollToSection("#agendar")}
            className="bg-gradient-premium hover:opacity-90 transition-opacity shadow-elegant"
          >
            Quero Experiência Concierge
          </Button>
        </div>
      </div>
    </section>
  );
};
