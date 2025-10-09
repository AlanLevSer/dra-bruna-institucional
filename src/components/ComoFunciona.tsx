import { Clock, Droplet, SmilePlus, ArrowRight } from "lucide-react";

interface StepItem {
  number: string;
  icon: typeof Clock;
  title: string;
  description: string;
  detail: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    icon: Clock,
    title: "Inserção por Endoscopia",
    description: "Procedimento rápido e indolor",
    detail: "15-20 minutos com sedação leve, sem cortes, sem internação"
  },
  {
    number: "02",
    icon: Droplet,
    title: "Balão Inflado no Estômago",
    description: "Ocupa espaço e reduz capacidade",
    detail: "Você se sente satisfeita comendo menos, sem esforço mental"
  },
  {
    number: "03",
    icon: SmilePlus,
    title: "Saciedade Precoce Natural",
    description: "Controle da fome automático",
    detail: "Seu cérebro recebe o sinal de saciedade mais rápido"
  }
];

export const ComoFunciona = () => {
  return (
    <section className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Entenda o Procedimento
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Como o Balão funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um dispositivo simples que muda completamente sua relação com a comida
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Setas conectoras (apenas desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/6 -translate-y-1/2 -translate-x-1/2 z-0">
              <ArrowRight className="w-full h-8 text-primary/30 animate-pulse" />
            </div>
            <div className="hidden md:block absolute top-1/2 left-2/3 w-1/6 -translate-y-1/2 -translate-x-1/2 z-0">
              <ArrowRight className="w-full h-8 text-primary/30 animate-pulse" />
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 bg-card p-8 rounded-2xl shadow-elegant hover:shadow-hover transition-all duration-300 hover-lift animate-fade-in opacity-0 border border-primary/10"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "forwards"
                }}
              >
                {/* Número grande no fundo */}
                <div className="absolute top-4 right-4 text-7xl font-bold text-primary/5">
                  {step.number}
                </div>

                {/* Ícone animado */}
                <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse-soft">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Explicação final */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <p className="text-lg text-foreground text-center leading-relaxed">
              <strong className="text-primary">Enquanto o balão controla a fome</strong>, você tem tempo para construir novos hábitos alimentares 
              com nossa equipe de nutrição e psicologia. <br className="hidden md:block" />
              Quando ele sai, <span className="font-semibold">você já aprendeu a se alimentar diferente</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
