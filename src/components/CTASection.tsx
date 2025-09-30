import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const CTASection = ({
  title,
  description,
  buttonText = "Agende sua Avaliação",
  onButtonClick,
}: CTASectionProps) => {
  const scrollToSection = () => {
    const element = document.querySelector("#agendar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative py-20 bg-gradient-premium overflow-hidden">
      <GrafismoDecor variant="floating" position="top-left" size="lg" opacity={0.25} rotate={-15} color="gray" />
      <GrafismoDecor variant="floating" position="bottom-right" size="md" opacity={0.2} rotate={45} color="gray" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
          {title}
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button
          size="lg"
          onClick={onButtonClick || scrollToSection}
          className="bg-card text-foreground hover:bg-card/90 transition-colors group"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
