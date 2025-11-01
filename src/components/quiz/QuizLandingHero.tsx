import { Sparkles, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const QuizLandingHero = () => {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium mb-6 animate-fade-in">
            <Sparkles size={14} />
            <span>Avaliação Gratuita Personalizada</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Descubra o Programa que Funciona para SEU Corpo
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Responda 7 perguntas e receba seu programa personalizado em 3 minutos
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Resultados imediatos</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>100% gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Sem compromisso</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">+300 pessoas</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Já descobriram seu programa personalizado e estão transformando suas vidas
            </p>
          </div>

          {/* Progress hint */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Comece agora respondendo à primeira pergunta ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
