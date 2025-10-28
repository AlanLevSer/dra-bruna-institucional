import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Users, Smartphone, Heart, Target } from "lucide-react";

const differentials = [
  {
    icon: Users,
    title: "Equipe interdisciplinar",
    items: ["Médico endoscopista", "Nutricionista", "Psicólogo", "Educador físico"],
  },
  {
    icon: Smartphone,
    title: "Tecnologia de ponta",
    items: ["Balões de última geração", "App de acompanhamento", "Teleatendimento"],
  },
  {
    icon: Heart,
    title: "Atendimento humanizado",
    items: ["Suporte 24/7", "Consultas individualizadas", "Escuta ativa e empática"],
  },
  {
    icon: Target,
    title: "Resultados duradouros",
    items: ["Foco na manutenção", "Reeducação alimentar", "Mudança de hábitos"],
  },
];

export const DifferentialsVendas = () => {
  return (
    <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.12} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Por que fazer o balão intragástrico na LevSer?
          </h2>
          <p className="text-lg text-muted-foreground">
            Diferenciais que fazem toda a diferença na sua transformação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {differentials.map((differential) => {
            const Icon = differential.icon;
            return (
              <div
                key={differential.title}
                className="bg-card rounded-xl p-8 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-4">{differential.title}</h3>
                <ul className="space-y-2">
                  {differential.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary text-sm">•</span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Nosso compromisso é com a sua transformação sustentável
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não vendemos apenas o balão. Entregamos um programa completo de mudança de vida, com suporte integral
            antes, durante e depois do tratamento.
          </p>
        </div>
      </div>
    </section>
  );
};
