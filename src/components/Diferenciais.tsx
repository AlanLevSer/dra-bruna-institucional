import { Award, Users, Clock, Shield } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import draImage from "@/assets/dra-bruna-profile.jpg";

const differentials = [
  {
    icon: Award,
    title: "Excelência Médica Comprovada",
    description: "Mais de 3.000 pacientes transformados + formação nas melhores instituições do país. Segurança e credibilidade são minhas prioridades.",
  },
  {
    icon: Users,
    title: "Atendimento Humanizado",
    description: "Vou respeitar seu ritmo, sempre. Cada pessoa é única, e aqui você não será julgada — só acolhida.",
  },
  {
    icon: Clock,
    title: "Disponibilidade Premium",
    description: "Consultas sem pressa. Posso ajudar? Canal direto comigo para dúvidas sempre que precisar.",
  },
  {
    icon: Shield,
    title: "Compromisso com Resultados",
    description: "Vou acompanhar você de perto, fazendo ajustes sempre que necessário. Sua jornada é minha prioridade.",
  },
];

export const Diferenciais = () => {
  return (
    <section id="diferenciais" className="relative py-12 xl:py-16 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-left" size="xl" opacity={0.18} rotate={20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                <span className="text-sm font-medium text-foreground">Por que escolher</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                Por Que Você Pode Confiar em Mim
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Meu cuidado vai além do consultório. Comigo, você encontra 
                ciência de verdade + o acolhimento que você sempre mereceu. Vou te ajudar a emagrecer sem sofrimento.
              </p>
            </div>

            <div className="space-y-6">
              {differentials.map((diff, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 animate-fade-in group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <diff.icon className="text-primary" size={24} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img
                src={draImage}
                alt="Dra. Bruna Durelli - Compromisso com excelência"
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant max-w-xs">
              <p className="text-sm font-medium mb-2">
                Especialização
              </p>
              <p className="text-2xl font-serif font-bold">
                +10 anos dedicados à obesidade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
