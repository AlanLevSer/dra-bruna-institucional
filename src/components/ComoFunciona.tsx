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
            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <div
                  className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(202,124,95,0.12)] hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0 border border-primary/20 group"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationFillMode: "forwards"
                  }}
                >
                  {/* Número grande no fundo com gradiente */}
                  <div className="absolute top-4 right-4 text-7xl font-bold bg-gradient-to-br from-primary/10 to-secondary/10 bg-clip-text text-transparent">
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    {/* Ícone com gradiente duplo e glow */}
                    <div className="relative w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                      <div className="relative w-full h-full bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-elegant">
                        <step.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80 italic">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Seta conectora premium */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary/30 -translate-y-1/2 z-0">
                    <div className="absolute right-0 w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
                  </div>
                )}
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
