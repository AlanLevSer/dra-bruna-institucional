import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface SubpageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const SubpageHero = ({
  title,
  subtitle,
  description,
  image,
  ctaText = "Agende sua Avaliação",
  onCtaClick,
}: SubpageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <GrafismoDecor variant="hero" position="top-right" size="xl" opacity={0.25} rotate={-20} color="gray" />
      <GrafismoDecor variant="background" position="bottom-left" size="md" opacity={0.2} rotate={30} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm text-primary rounded-full text-sm font-medium border border-primary/20">
              {subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-gradient-premium hover:opacity-90 transition-opacity group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-premium opacity-20 blur-3xl rounded-full"></div>
            <img
              src={image}
              alt={title}
              className="relative rounded-2xl shadow-elegant w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
