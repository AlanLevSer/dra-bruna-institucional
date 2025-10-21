import { Battery, Shield, Zap, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Battery,
    title: "Energia Celular",
    description: "Mitocôndrias otimizadas para disposição sustentada",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    icon: Shield,
    title: "Controle Inflamatório",
    description: "Redução de inflamação crônica e estresse oxidativo",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500"
  },
  {
    icon: Zap,
    title: "Preservação Muscular",
    description: "Massa magra e força preservadas durante emagrecimento",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500"
  },
  {
    icon: Sparkles,
    title: "Equilíbrio Hormonal",
    description: "Hormônios regulados para saciedade e metabolismo",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  }
];

export const MetabolicPillarsVisual = () => {
  return (
    <section className="py-16 xl:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl xl:text-4xl font-serif font-bold mb-4">
            4 Pilares da Medicina Regenerativa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada pilar trabalha de forma integrada para transformação profunda e longevidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="group relative animate-fade-in hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-elegant hover:shadow-hover transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Icon className={`w-8 h-8 ${pillar.iconColor}`} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pillar.description}
                  </p>

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection visualization */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <p className="text-sm font-medium text-foreground">
              Todos os pilares trabalham de forma <strong>integrada e simultânea</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
