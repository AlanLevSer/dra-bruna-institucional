import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Instagram } from "lucide-react";
import ctaImage from "@/assets/dra-bruna-elegant.jpg";

export const CTAFinal = () => {
  return (
    <section id="agendar" className="py-24 bg-gradient-premium text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src={ctaImage}
          alt="Dra. Bruna Durelli"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Pronto para começar sua transformação?
          </h2>
          
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
            Agende sua primeira consulta e descubra como podemos ajudá-lo 
            a alcançar uma vida mais leve, saudável e plena.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              variant="secondary"
              className="shadow-elegant hover:shadow-hover transition-all"
              onClick={() => window.open('https://wa.me/5511997023024?text=Olá! Gostaria de agendar uma avaliação.', '_blank')}
            >
              <Phone className="mr-2" size={20} />
              (11) 99702-3024
            </Button>
            
            <Button
              size="lg"
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant hover:shadow-hover transition-all"
              onClick={() => window.open('https://wa.me/5511997023024?text=Olá! Gostaria de agendar uma avaliação.', '_blank')}
            >
              <MessageCircle className="mr-2" size={20} />
              WhatsApp
            </Button>
          </div>

          <div className="pt-12 border-t border-primary-foreground/20 mt-12 space-y-12">
            {/* Informações de Contato */}
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="mb-2" size={24} />
                <p className="font-medium">Localização</p>
                <p className="text-sm opacity-80 text-center">
                  Consultório Premium<br />
                  Endereço da clínica
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Phone className="mb-2" size={24} />
                <p className="font-medium">Telefone</p>
                <a 
                  href="https://wa.me/5511997023024" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  (11) 99702-3024
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-center">
                Siga-nos nas Redes Sociais
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <a 
                  href="https://www.instagram.com/dra.brunadurelli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-elegant"
                >
                  <Instagram size={40} className="mb-1" />
                  <p className="font-semibold text-base">Instagram</p>
                  <p className="text-sm opacity-90">@dra.brunadurelli</p>
                </a>

                <a 
                  href="https://www.instagram.com/levsersaude/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-elegant"
                >
                  <Instagram size={40} className="mb-1" />
                  <p className="font-semibold text-base">Instagram LevSer</p>
                  <p className="text-sm opacity-90">@levsersaude</p>
                </a>

                <a 
                  href="https://www.linkedin.com/company/levser" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-elegant"
                >
                  <svg className="w-10 h-10 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <p className="font-semibold text-base">LinkedIn</p>
                  <p className="text-sm opacity-90">LevSer</p>
                </a>

                <a 
                  href="https://www.levser.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-elegant"
                >
                  <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <p className="font-semibold text-base">Site</p>
                  <p className="text-sm opacity-90">levser.com.br</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
