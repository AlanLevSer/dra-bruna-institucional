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
              className="flex items-start gap-3 p-6 bg-card rounded-xl shadow-elegant hover:shadow-hover transition-shadow"
            >
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
