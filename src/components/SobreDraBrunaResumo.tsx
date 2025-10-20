import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useNavigate } from "react-router-dom";
import draImage from "@/assets/dra-bruna-professional.jpg";

export const SobreDraBrunaResumo = () => {
  const navigate = useNavigate();

  return (
    <section id="sobre" className="py-16 xl:py-20 bg-muted/30 relative overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.15} rotate={-20} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Coluna 1: Foto Profissional */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-[280px] mx-auto lg:mx-0">
              <OptimizedImage 
                src={draImage} 
                alt="Dra. Bruna Durelli - Especialista em Obesidade" 
                className="w-full h-auto object-cover"
                width={280}
                height={420}
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-primary p-4 lg:p-5 rounded-xl shadow-elegant max-w-[260px]">
              <p className="text-[11px] font-medium text-primary-foreground mb-1">
                Experiência
              </p>
              <p className="text-lg font-serif font-bold text-primary-foreground">
                +3.000 pacientes transformados
              </p>
            </div>
          </div>

          {/* Coluna 2: Conteúdo Resumido */}
          <div className="space-y-5 lg:space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-[11px] font-medium text-primary">Quem sou eu</span>
            </div>

            <h2 className="text-xl md:text-2xl xl:text-3xl font-serif font-bold text-foreground">
              Dra. Bruna Durelli
            </h2>

            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              Há mais de 10 anos, escolhi dedicar minha carreira a te ajudar a conquistar uma vida mais leve e saudável. 
              Acredito que você merece um cuidado que respeita sua história, seus desafios e seu tempo — com ciência, sim, 
              mas também com empatia de verdade.
            </p>

            {/* Credenciais (top 3) */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Especialista em Obesidade</p>
                  <p className="text-xs text-muted-foreground">Formação completa em tratamento interdisciplinar</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Nutrologia e Medicina Regenerativa</p>
                  <p className="text-xs text-muted-foreground">Abordagem integrativa para saúde celular e metabólica</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-sm text-foreground">Endoscopia Digestiva</p>
                  <p className="text-xs text-muted-foreground">Procedimentos minimamente invasivos com segurança</p>
                </div>
              </div>
            </div>

            {/* Botão Leia Mais */}
            <Button 
              variant="outline" 
              onClick={() => navigate("/sobre")}
              className="group"
            >
              Conheça minha trajetória completa
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
