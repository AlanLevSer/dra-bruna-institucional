import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { PlanoTransformacao } from "@/components/PlanoTransformacao";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroImage from "@/assets/dra-bruna-hero.avif";

export const Hero = () => {
  // Preload LCP image programmatically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }, []);
  const [quizOpen, setQuizOpen] = useState(false);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerVar = rootStyles.getPropertyValue('--header-height').trim();
      const headerOffset = (parseInt(headerVar.replace('px', '')) || 80) + 8;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return <section id="inicio" className="relative min-h-[65vh] xl:min-h-[60vh] flex items-center pt-20 pb-12 overflow-hidden">
      <GrafismoDecor variant="hero" position="top-right" size="xl" opacity={0.2} rotate={-15} color="gray" />
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.15} rotate={45} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-10 items-center max-w-7xl mx-auto">
          <div className="space-y-5 animate-fade-in">
            <div className="inline-block px-3.5 py-1.5 bg-accent/10 rounded-full">
              <span className="text-xs font-medium text-black">Especialista em Redução da Obesidade</span>
            </div>
            
            <h1 className="display-xl text-foreground">
              Olá, sou a Dra. Bruna Durelli
            </h1>
            
            <p className="subtitle-elegant text-muted-foreground">Especialista em Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva. Há mais de 10 anos, dedico minha carreira a ajudar pessoas como você a transformarem sua relação com o peso. Vou estar ao seu lado em cada etapa, com um cuidado médico que respeita quem você é, sem julgamentos — só ciência e acolhimento.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Button size="default" onClick={() => setQuizOpen(true)} className="bg-gradient-premium hover:opacity-90 transition-all shadow-elegant hover:shadow-hover group text-sm">
                Descubra seu caminho (sem compromisso)
                <Sparkles className="ml-2 group-hover:scale-110 transition-transform" size={18} />
              </Button>
              
              <Button size="default" variant="outline" onClick={() => scrollToSection("#agendar")} className="border-2 hover:bg-primary hover:text-primary-foreground transition-all text-sm">
                Agendar Consulta
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
            
            <PlanoTransformacao open={quizOpen} onOpenChange={setQuizOpen} />
            
            <p className="text-xs text-muted-foreground/80 italic pt-2">Estou ao seu lado. Vamos juntos.</p>
          </div>

          <div className="relative animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            <div className="relative rounded-2xl overflow-hidden shadow-hover max-w-[280px] xl:max-w-[320px] mx-auto lg:mx-0">
              <OptimizedImage 
                src={heroImage} 
                alt="Dra. Bruna Durelli - Especialista em Obesidade" 
                className="w-full h-auto object-cover" 
                width={320} 
                height={480}
                priority={true}
              />
            </div>
            
            {/* CARD DESKTOP (Horizontal) */}
            <div className="absolute -bottom-5 -left-5 bg-card p-5 rounded-xl shadow-elegant max-w-sm hidden lg:block animate-scale-in">
              <p className="text-xs font-medium text-muted-foreground mb-2.5">
                Vidas transformadas
              </p>
              
              <div className="flex items-start gap-5">
                {/* Métrica 1: Pacientes */}
                <div className="flex-1">
                  <AnimatedCounter end={3000} prefix="+" suffix=" pacientes" className="text-xl font-serif font-bold text-primary block" />
                </div>
                
                {/* Divisor Vertical */}
                <div className="w-px h-10 bg-border/50"></div>
                
                {/* Métrica 2: Kg Eliminados */}
                <div className="flex-1">
                  <AnimatedCounter end={60000} prefix="+" suffix=" kg" className="text-xl font-serif font-bold text-primary block" />
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                    E já se foram mais 15kg hoje! Você pode ser a próxima.
                  </p>
                </div>
              </div>
            </div>
            
            {/* CARD MOBILE (Vertical) */}
            <div className="mt-5 mx-auto max-w-xs bg-card p-4 rounded-xl shadow-elegant block lg:hidden animate-scale-in">
              <p className="text-xs font-medium text-muted-foreground mb-2.5 text-center">
                Vidas transformadas
              </p>
              
              {/* Métrica 1: Pacientes */}
              <div className="text-center mb-2.5">
                <AnimatedCounter end={3000} prefix="+" suffix=" pacientes" className="text-xl font-serif font-bold text-primary block" />
              </div>
              
              {/* Divisor Horizontal */}
              <div className="h-px w-full bg-border/50 my-2.5"></div>
              
              {/* Métrica 2: Kg Eliminados */}
              <div className="text-center">
                <AnimatedCounter end={60000} prefix="+" suffix=" kg" className="text-xl font-serif font-bold text-primary block" />
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  E já se foram mais 15kg hoje! Você pode ser a próxima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};