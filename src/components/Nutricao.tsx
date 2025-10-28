import { Brain, Heart, Flame, Pill, Sparkles, HeartPulse, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { OptimizedImage } from "@/components/OptimizedImage";
import nutricaoImage from "@/assets/patient-happy.avif";
const pillars = [{
  icon: Brain,
  title: "Nutrição Comportamental",
  description: "Entenda sua relação com a comida e desenvolva uma alimentação consciente e prazerosa."
}, {
  icon: Heart,
  title: "Saúde Metabólica",
  description: "Tratamento focado em equilibrar hormônios, glicemia e marcadores inflamatórios."
}, {
  icon: Flame,
  title: "Metabolismo Otimizado",
  description: "Estratégias para acelerar seu metabolismo e maximizar a queima de gordura."
}];

const therapies = [
  {
    icon: Pill,
    title: "Canetas Emagrecedoras",
    description: "Medicações modernas e seguras para controle de peso, prescritas com acompanhamento rigoroso.",
    link: "/canetas-emagrecedoras",
    badge: "Mais procurada"
  },
  {
    icon: Sparkles,
    title: "Nutrição Celular",
    description: "Suplementação avançada para otimizar funções metabólicas e energia celular.",
    link: "/nutricao-celular",
  },
  {
    icon: HeartPulse,
    title: "Medicina Regenerativa",
    description: "Tratamentos que regeneram e revitalizam seu metabolismo de dentro para fora.",
    link: "/medicina-regenerativa",
  }
];

export const Nutricao = () => {
  const navigate = useNavigate();
  return <section id="nutricao" className="relative py-12 xl:py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="xl" opacity={0.18} rotate={-30} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Emagrecimento & Longevidade
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">A base científica que sustenta sua transformação. Meu programa de tratamento vai além das dietas tradicionais para entender e otimizar seu metabolismo.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => <div key={index} className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="text-primary" size={28} />
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>)}
        </div>

        {/* Terapias Disponíveis */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-2xl lg:text-3xl font-serif font-bold text-center text-foreground mb-8">
            Terapias Disponíveis
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapies.map((therapy, index) => (
              <div
                key={index}
                onClick={() => navigate(therapy.link)}
                className="group relative bg-card p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                {therapy.badge && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground shadow-md">
                    {therapy.badge}
                  </div>
                )}
                
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <therapy.icon className="text-primary" size={24} />
                </div>
                
                <h4 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {therapy.title}
                </h4>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {therapy.description}
                </p>
                
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Saiba mais
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-hover animate-fade-in max-w-2xl mx-auto" style={{
        animationDelay: "0.6s"
      }}>
          <OptimizedImage
            src={nutricaoImage}
            alt="Nutri��o e bem-estar - Paciente feliz e saud�vel"
            className="w-full h-auto object-cover"
            width={960}
            height={640}
            sizes="(max-width: 1280px) 90vw, 640px"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end">
            <div className="p-8 text-background">
              <p className="text-sm font-medium mb-2 opacity-90">Resultados baseados em ciência</p>
              <p className="text-2xl font-serif font-bold mb-4">
                Transformação que respeita sua individualidade
              </p>
              <Button onClick={() => navigate("/quiz")} className="bg-background text-foreground hover:bg-background/90 group">
                Descubra seu Programa Personalizado
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};





