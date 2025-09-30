import { Check } from "lucide-react";

interface IndicationListProps {
  title: string;
  items: string[];
}

export const IndicationList = ({ title, items }: IndicationListProps) => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:shadow-elegant transition-shadow"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
