import { Pill, Stethoscope, TrendingDown, Home } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const ComoFuncionaGastro = () => {
  const steps = [
    {
      number: "01",
      icon: Pill,
      title: "Sedação leve",
      description: "Procedimento confortável com anestesia, sem dor",
    },
    {
      number: "02",
      icon: Stethoscope,
      title: "Sutura endoscópica",
      description: "Costuras internas por endoscopia, sem cortes externos",
    },
    {
      number: "03",
      icon: TrendingDown,
      title: "Redução de 70%",
      description: "Volume do estômago reduzido significativamente",
    },
    {
      number: "04",
      icon: Home,
      title: "Alta rápida",
      description: "Retorno para casa no mesmo dia ou dia seguinte",
    },
  ];

  return (
    <section className="relative py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.1} rotate={25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Como funciona o procedimento?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um processo seguro e minimamente invasivo, realizado por endoscopia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Número grande no fundo */}
              <div className="absolute top-4 right-4 text-7xl font-bold bg-gradient-to-br from-primary/10 to-secondary/10 bg-clip-text text-transparent select-none pointer-events-none">
                {step.number}
              </div>

              {/* Card */}
              <div className="relative z-10 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 shadow-elegant hover:shadow-hover hover:-translate-y-2 transition-all duration-500">
                {/* Icon */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                  <div className="relative w-full h-full bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Seta conectora (apenas entre cards, não no último) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0">
                  <div className="absolute right-0 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
