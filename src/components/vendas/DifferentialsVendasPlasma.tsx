import { Shield, Zap, Target, Users } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const DifferentialsVendasPlasma = () => {
  const differentials = [
    {
      icon: Shield,
      title: "Alternativa à Revisão Cirúrgica",
      description: "Evita nova cirurgia bariátrica, que é mais invasiva e arriscada.",
    },
    {
      icon: Zap,
      title: "Procedimento Rápido",
      description: "30-45 minutos de procedimento sob sedação. Alta no mesmo dia.",
    },
    {
      icon: Target,
      title: "Técnica de Precisão",
      description: "Aplicação controlada de plasma diretamente na área dilatada da anastomose.",
    },
    {
      icon: Users,
      title: "Acompanhamento Especializado",
      description: "Equipe experiente em casos de reganho pós-bariátrica.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Diferenciais do Tratamento
          </h2>
          <p className="text-lg text-muted-foreground">
            Por que escolher o Plasma de Argônio para tratar o reganho de peso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <diff.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{diff.title}</h3>
                  <p className="text-sm text-muted-foreground">{diff.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-muted rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Compromisso com a Transformação Sustentável
          </h3>
          <p className="text-lg text-muted-foreground">
            Não fazemos apenas um procedimento. Acompanhamos você em toda a jornada de recuperação do controle do peso, com suporte nutricional, psicológico e médico especializado.
          </p>
        </div>
      </div>
    </section>
  );
};
