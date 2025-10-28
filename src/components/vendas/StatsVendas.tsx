import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { Users, Heart, Scale, Calendar } from "lucide-react";

export const StatsVendas = () => {
  const stats = [
    {
      icon: Users,
      value: 3000,
      suffix: "+",
      label: "Vidas Transformadas",
    },
    {
      icon: Heart,
      value: 98,
      suffix: "%",
      label: "Taxa de Satisfação",
    },
    {
      icon: Scale,
      value: 35,
      prefix: "até ",
      suffix: " kg",
      label: "Perda de Peso Média",
    },
    {
      icon: Calendar,
      value: 12,
      suffix: " meses",
      label: "Acompanhamento",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.15} />
      
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-2xl xl:text-3xl font-bold text-foreground mb-2"
              />
              <p className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
