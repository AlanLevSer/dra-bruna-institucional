import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Scale, Heart, Zap, Calendar } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const ResultsVendasPlasma = () => {
  const results = [
    {
      icon: Scale,
      value: "15-20",
      suffix: "%",
      label: "Perda de Peso Média",
      description: "Redução do peso atual com procedimento seguro e eficaz",
    },
    {
      icon: Heart,
      value: 98,
      suffix: "%",
      label: "Satisfação dos Pacientes",
      description: "Alta taxa de satisfação com o tratamento e resultados",
    },
    {
      icon: Zap,
      value: "<1",
      suffix: "%",
      label: "Complicações",
      description: "Procedimento minimamente invasivo com baixíssimo risco",
    },
    {
      icon: Calendar,
      value: "24-48",
      suffix: "h",
      label: "Retorno às Atividades",
      description: "Recuperação rápida sem necessidade de internação",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Resultados Comprovados
          </h2>
          <p className="text-lg text-muted-foreground">
            Tratamento endoscópico com resultados efetivos e segurança comprovada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <result.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {typeof result.value === 'number' ? (
                  <AnimatedCounter end={result.value} suffix={result.suffix} />
                ) : (
                  <span>{result.value}{result.suffix}</span>
                )}
              </div>
              <div className="text-sm font-semibold text-foreground mb-2">{result.label}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
