import { Sparkles } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface BenefitsListProps {
  title: string;
  benefits: string[];
}

export const BenefitsList = ({ title, benefits }: BenefitsListProps) => {
  return (
    <section className="relative py-16 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="center" size="xl" opacity={0.12} rotate={0} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all duration-500">
                {/* Icon circle with gradient */}
                <div className="flex-shrink-0 relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-md animate-glow-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed flex-1">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
