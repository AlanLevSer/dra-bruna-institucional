import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Users, Heart, Scale, Calendar } from "lucide-react";

export const StatsVendas = () => {
  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Vidas Transformadas",
      color: "text-primary",
    },
    {
      icon: Heart,
      value: 98,
      suffix: "%",
      label: "Taxa de Satisfação",
      color: "text-primary",
    },
    {
      icon: Scale,
      value: 25,
      prefix: "até ",
      suffix: "kg",
      label: "Perda de Peso Média",
      color: "text-primary",
    },
    {
      icon: Calendar,
      value: 12,
      suffix: " meses",
      label: "Acompanhamento",
      color: "text-primary",
    },
  ];

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-background to-wellness-cream">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center hover-lift shadow-lg"
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-4xl font-bold text-foreground mb-2"
              />
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Badge de Garantia */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            ✅ <span className="text-primary">Equipe Médica Especializada</span> • Acompanhamento Completo • Resultados Garantidos
          </p>
        </div>

        {/* CTA Central */}
        <div className="text-center">
          <Button
            variant="hero"
            size="xl"
            onClick={handleWhatsApp}
            className="group"
          >
            ⚡ SIM! QUERO MINHA TRANSFORMAÇÃO AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};
