import { Brain, Heart, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import nutricaoImage from "@/assets/patient-happy.jpg";

const pillars = [
  {
    icon: Brain,
    title: "Nutrição Comportamental",
    description: "Entenda sua relação com a comida e desenvolva uma alimentação consciente e prazerosa.",
  },
  {
    icon: Heart,
    title: "Saúde Metabólica",
    description: "Tratamento focado em equilibrar hormônios, glicemia e marcadores inflamatórios.",
  },
  {
    icon: Flame,
    title: "Metabolismo Otimizado",
    description: "Estratégias para acelerar seu metabolismo e maximizar a queima de gordura.",
  },
];

export const Nutricao = () => {
  const navigate = useNavigate();

  return (
    <section id="nutricao" className="relative py-12 xl:py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="xl" opacity={0.18} rotate={-30} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Nutrição & Metabolismo
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            A base científica que sustenta sua transformação. Vamos além das dietas 
            tradicionais para entender e otimizar seu metabolismo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="text-primary" size={28} />
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-hover animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.3s" }}>
          <img
            src={nutricaoImage}
            alt="Nutrição e bem-estar - Paciente feliz e saudável"
            className="w-full h-auto object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end">
            <div className="p-8 text-background">
              <p className="text-sm font-medium mb-2 opacity-90">Resultados baseados em ciência</p>
              <p className="text-2xl font-serif font-bold mb-4">
                Transformação que respeita sua individualidade
              </p>
              <Button
                onClick={() => navigate("/nutricao-celular")}
                className="bg-background text-foreground hover:bg-background/90 group"
              >
                Conheça a Nutrição Celular
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
