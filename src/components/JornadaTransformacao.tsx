import { Heart, Sparkles, TrendingUp, Star } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { OptimizedImage } from "@/components/OptimizedImage";
import transformationBeginning from "@/assets/transformation-beginning.jpg";
import transformationSelfcare from "@/assets/transformation-selfcare.jpg";
import transformationJoy from "@/assets/transformation-joy.jpg";
import transformationConfidence from "@/assets/transformation-confidence.jpg";
const journeySteps = [{
  icon: Heart,
  title: "Autoaceitação",
  description: "O primeiro passo é acolher quem você é hoje. Sua jornada começa com respeito e amor próprio.",
  image: transformationBeginning
}, {
  icon: Sparkles,
  title: "Cuidado Pessoal",
  description: "Aprenda a priorizar seu bem-estar. Pequenos gestos diários que transformam sua relação com você mesma.",
  image: transformationSelfcare
}, {
  icon: TrendingUp,
  title: "Confiança Crescente",
  description: "À medida que você se cuida, sua confiança floresce. Sinta a alegria de se reconectar consigo mesma.",
  image: transformationJoy
}, {
  icon: Star,
  title: "Nova Versão de Si",
  description: "Não se trata apenas de mudança física. É sobre descobrir a melhor versão de você, plena e realizada.",
  image: transformationConfidence
}];
export const JornadaTransformacao = () => {
  return <section id="jornada" className="relative py-10 xl:py-12 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.12} rotate={-25} color="gray" />
      <GrafismoDecor variant="background" position="bottom-left" size="md" opacity={0.1} rotate={35} color="gray" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 xl:mb-10 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Sua Transformação</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-5">
            Sua Jornada de Transformação (E Estou com Você)
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">Vou te ajudar a transformar sua vida, não só seu peso. Cada etapa é feita para você se reconectar com seu bem-estar, autoestima e qualidade de vida.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 xl:gap-8 max-w-6xl mx-auto">
          {journeySteps.map((step, index) => {
          const Icon = step.icon;
          return <div key={index} className="group animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
                  <div className="relative h-48 xl:h-52 overflow-hidden">
                    <OptimizedImage 
                      src={step.image} 
                      alt={step.title} 
                      width={600} 
                      height={400} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 mb-3">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-5 xl:p-6">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>;
        })}
        </div>

        <div className="mt-8 xl:mt-10 text-center animate-fade-in max-w-4xl mx-auto" style={{
        animationDelay: "0.5s"
      }}>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 lg:p-10 border border-primary/10">
            <p className="text-base md:text-lg text-muted-foreground">
              <span className="font-serif font-bold text-foreground text-xl md:text-2xl xl:text-3xl block mb-3">
                Cada passo importa — e conte comigo em todos eles
              </span>
              Vou combinar medicina, nutrição, comportamento e movimento para criar mudanças reais e duradouras na sua vida. 
              Não é só perder peso — é ganhar autoestima, confiança e qualidade de vida. 
              Emagrecer pode ser mais leve, sim. Vamos juntos?
            </p>
          </div>
        </div>
      </div>
    </section>;
};