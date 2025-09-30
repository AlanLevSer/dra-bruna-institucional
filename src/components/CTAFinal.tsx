import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
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
            >
              <Phone className="mr-2" size={20} />
              (XX) XXXXX-XXXX
            </Button>
            
            <Button
              size="lg"
              className="bg-card text-foreground hover:bg-card/90 shadow-elegant hover:shadow-hover transition-all"
            >
              <Mail className="mr-2" size={20} />
              Enviar mensagem
            </Button>
          </div>

          <div className="pt-12 border-t border-primary-foreground/20 mt-12">
            <div className="grid md:grid-cols-3 gap-8">
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
                <p className="text-sm opacity-80">
                  (XX) XXXXX-XXXX
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Instagram className="mb-2" size={24} />
                <p className="font-medium">Instagram</p>
                <p className="text-sm opacity-80">
                  @dra.brunadurelli
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
