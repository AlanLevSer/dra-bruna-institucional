import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";
import draBrunaImage from "@/assets/dra-bruna-hero.avif";
import QuizModal from "@/components/QuizModal";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleWhatsAppClick = () => {
    trackEvent('balão_vendas_hero_cta', { button: 'transformacao', timestamp: new Date().toISOString() });
    window.open(CONTACT.WHATSAPP_Balão_VENDAS, "_blank");
  };

  const handleQuizClick = () => {
    trackEvent('balão_vendas_hero_cta', { button: 'quiz', timestamp: new Date().toISOString() });
    setShowQuiz(true);
  };

  return (
    <section className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-12 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4">
              <div className="bg-red-500 text-white px-3 py-2 md:px-4 rounded-full text-xs md:text-sm font-medium w-fit mx-auto lg:mx-0 animate-pulse">
                🔥 APENAS 10 VAGAS DISPONÍVEIS ESTE MÊS
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                Pare de se sentir{" "}
                <span className="text-wellness-warm">culpada</span>{" "}
                toda vez que se olha no espelho
              </h1>
              <h2 className="text-base md:text-lg lg:text-xl text-wellness-warm font-medium">
                Metodologia eficaz para perda de até 30% do seu peso em até 48 semanas
              </h2>
            </div>
            
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Programa científico validado que já transformou{" "}
              <strong className="text-wellness-warm">mais de 3.000 vidas</strong>. 
              Primeira consulta por <strong className="text-green-600">apenas R$ 97</strong> (valor normal R$ 700).
            </p>
            
            <div className="flex flex-col gap-3 md:gap-4 justify-center lg:justify-start max-w-lg mx-auto lg:mx-0">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleWhatsAppClick} 
                className="w-full relative text-base md:text-lg font-semibold py-4 px-6 min-h-[56px] touch-manipulation"
              >
                🚀 COMECE SUA TRANSFORMAÇÃO AGORA
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  R$ 97
                </span>
              </Button>
              <Button 
                variant="soft" 
                size="xl" 
                className="w-full text-base md:text-lg font-medium py-3 px-6 min-h-[48px] touch-manipulation" 
                onClick={handleQuizClick}
              >
                🧬 Descobrir Meu Perfil
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>Sem dietas restritivas</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>Resultados sustentáveis</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>Abordagem humanizada</span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-warm rounded-3xl opacity-20 blur-xl"></div>
              <OptimizedImage 
                src={draBrunaImage} 
                alt="Dra. Bruna Durelli - Especialista em tratamento interdisciplinar da obesidade" 
                width={800}
                height={1067}
                className="relative w-full rounded-3xl shadow-warm object-cover aspect-[3/4]"
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-soft">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-wellness-warm">+3.000</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Vidas transformadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <QuizModal open={showQuiz} onOpenChange={setShowQuiz} />
      </div>
    </section>
  );
};

export default HeroSection;

