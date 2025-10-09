import { Check } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface IndicationListProps {
  title: string;
  items: string[];
}

export const IndicationList = ({ title, items }: IndicationListProps) => {
  return (
    <section className="relative py-16 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.18} rotate={-30} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-card to-primary/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>
                <p className="text-foreground group-hover:text-primary transition-colors leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
