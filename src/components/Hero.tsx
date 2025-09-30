import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/dra-bruna-professional.jpg";

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-sm font-medium text-accent-foreground">
                Especialista em Obesidade
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Transforme sua relação com o peso
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Um cuidado médico personalizado, humanizado e baseado em ciência. 
              Descubra o caminho para uma vida mais leve, saudável e plena.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("#agendar")}
                className="bg-gradient-premium hover:opacity-90 transition-all shadow-elegant hover:shadow-hover group"
              >
                Agende sua Avaliação
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#programa")}
                className="border-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Conheça o Programa LevSer
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img
                src={heroImage}
                alt="Dra. Bruna Durelli - Especialista em Obesidade"
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant max-w-xs hidden lg:block">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Transformações reais
              </p>
              <p className="text-2xl font-serif font-bold text-primary">
                +500 pacientes atendidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
