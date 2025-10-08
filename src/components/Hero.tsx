import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { PlanoTransformacao } from "@/components/PlanoTransformacao";
import heroImage from "@/assets/dra-bruna-professional.jpg";
export const Hero = () => {
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
  return <section id="inicio" className="relative min-h-[75vh] xl:min-h-[70vh] flex items-center pt-24 pb-10 overflow-hidden">
      <GrafismoDecor variant="hero" position="top-right" size="xl" opacity={0.2} rotate={-15} color="gray" />
      <GrafismoDecor variant="background" position="bottom-left" size="lg" opacity={0.15} rotate={45} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-sm font-medium text-black">Especialista em Redução da Obesidade</span>
            </div>
            
            <h1 className="display-xl text-foreground">
              Olá, sou a Dra. Bruna Durelli
            </h1>
            
            <p className="subtitle-elegant text-muted-foreground">Especialista em Obesidade, Nutrologia, Medicina Regenerativa e Endoscopia Digestiva. Com mais de 10 anos dedicados ao tratamento da obesidade, vou te ajudar a transformar sua relação com o peso através de um cuidado médico personalizado, humanizado e baseado em ciência.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => setQuizOpen(true)} className="bg-gradient-premium hover:opacity-90 transition-all shadow-elegant hover:shadow-hover group">
                Descobrir Meu Plano de Transformação
                <Sparkles className="ml-2 group-hover:scale-110 transition-transform" size={20} />
              </Button>
              
              <Button size="lg" variant="outline" onClick={() => scrollToSection("#agendar")} className="border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                Agendar Consulta
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            
            <PlanoTransformacao open={quizOpen} onOpenChange={setQuizOpen} />
            
            <p className="text-xs text-muted-foreground/80 italic pt-2">Decisão compartilhada, método exclusivo</p>
          </div>

          <div className="relative animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            <div className="relative rounded-2xl overflow-hidden shadow-hover max-w-xs xl:max-w-sm mx-auto lg:mx-0">
              <img src={heroImage} alt="Dra. Bruna Durelli - Especialista em Obesidade" className="w-full h-auto object-cover" />
            </div>
            
            {/* CARD DESKTOP (Horizontal) */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant max-w-md hidden lg:block animate-scale-in">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Vidas transformadas
              </p>
              
              <div className="flex items-start gap-6">
                {/* Métrica 1: Pacientes */}
                <div className="flex-1">
                  <AnimatedCounter end={3000} prefix="+" suffix=" pacientes" className="text-2xl font-serif font-bold text-primary block" />
                </div>
                
                {/* Divisor Vertical */}
                <div className="w-px h-12 bg-border/50"></div>
                
                {/* Métrica 2: Kg Eliminados */}
                <div className="flex-1">
                  <AnimatedCounter end={60000} prefix="+" suffix=" kg" className="text-2xl font-serif font-bold text-primary block" />
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    Eliminados de forma sustentável
                  </p>
                </div>
              </div>
            </div>
            
            {/* CARD MOBILE (Vertical) */}
            <div className="mt-6 mx-auto max-w-xs bg-card p-5 rounded-xl shadow-elegant block lg:hidden animate-scale-in">
              <p className="text-sm font-medium text-muted-foreground mb-3 text-center">
                Vidas transformadas
              </p>
              
              {/* Métrica 1: Pacientes */}
              <div className="text-center mb-3">
                <AnimatedCounter end={3000} prefix="+" suffix=" pacientes" className="text-2xl font-serif font-bold text-primary block" />
              </div>
              
              {/* Divisor Horizontal */}
              <div className="h-px w-full bg-border/50 my-3"></div>
              
              {/* Métrica 2: Kg Eliminados */}
              <div className="text-center">
                <AnimatedCounter end={60000} prefix="+" suffix=" kg" className="text-2xl font-serif font-bold text-primary block" />
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  Eliminados de forma sustentável
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};