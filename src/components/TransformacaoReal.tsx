import { Heart, Activity, Smile, Moon, LucideIcon } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface TransformacaoItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TransformacaoRealProps {
  items: TransformacaoItem[];
  testimonial?: {
    text: string;
    author: string;
  };
}

export const TransformacaoReal = ({ items, testimonial }: TransformacaoRealProps) => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      <GrafismoDecor 
        variant="background" 
        position="center" 
        size="xl" 
        opacity={0.08} 
        rotate={15}
        color="gray"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            O que realmente muda na sua vida?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nossos pacientes não relatam apenas perda de peso — relatam transformação completa de saúde, energia e autoestima
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {testimonial && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-elegant">
              <blockquote className="text-lg text-foreground/90 italic leading-relaxed mb-4">
                "{testimonial.text}"
              </blockquote>
              <p className="text-sm text-muted-foreground font-medium">
                — {testimonial.author}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
