import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroImage from "@/assets/dra-bruna-hero.avif";
import { QuizModal } from "./QuizModal";

export const HeroVendas = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-wellness-cream to-wellness-soft/30 overflow-hidden">
        {/* Badge de Urgência */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-destructive text-white px-6 py-2 rounded-full animate-pulse shadow-lg">
            <span className="font-bold text-sm md:text-base">
              ⏰ 10 VAGAS DISPONÍVEIS ESTE MÊS
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Método Científico Comprovado
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Perca de <span className="text-primary">10 a 25kg</span> em 6 Meses com o Balão Intragástrico
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Tratamento completo com acompanhamento multidisciplinar. 
                Transforme sua vida sem cirurgia, com resultados duradouros e suporte integral da equipe LevSer.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleWhatsApp}
                  className="group"
                >
                  🚀 QUERO COMEÇAR MINHA TRANSFORMAÇÃO
                </Button>
                <Button
                  variant="soft"
                  size="xl"
                  onClick={() => setIsQuizOpen(true)}
                >
                  🧬 Descobrir Meu Perfil Metabólico
                </Button>
              </div>

              {/* Badge de Autoridade */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  <span className="text-primary font-bold">+500 vidas</span> transformadas
                </p>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={heroImage}
                  alt="Dra. Bruna Durelli - Especialista em Balão Intragástrico"
                  width={800}
                  height={1000}
                  className="w-full h-auto"
                  priority
                />
                
                {/* Badge de Sucesso */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold text-center">
                    <span className="text-primary text-2xl">98%</span><br />
                    <span className="text-muted-foreground">Satisfação</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};
