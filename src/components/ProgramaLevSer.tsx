import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import programImage from "@/assets/patient-wellness-1.jpg";

const benefits = [
  "Transformação integral: corpo, mente e autoestima",
  "Acompanhamento médico que respeita sua individualidade",
  "Estratégias nutricionais que cabem na sua rotina",
  "Suporte emocional para mudanças sustentáveis",
  "Recuperação da sua confiança e qualidade de vida",
  "Comunidade de apoio que celebra cada conquista",
];

export const ProgramaLevSer = () => {
  const navigate = useNavigate();

  return (
    <section id="programa" className="relative py-24 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.18} rotate={15} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <img
              src={programImage}
              alt="Programa LevSer - Transformação com acompanhamento médico"
              className="rounded-2xl shadow-elegant w-full h-auto object-cover"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Programa Premium</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Programa LevSer
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Muito mais que um programa de emagrecimento. O LevSer é uma jornada de 
              transformação integral que reconecta você com seu bem-estar, autoestima 
              e qualidade de vida. Resultados que vão além da balança.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <p className="text-foreground/90">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">
                  Duração mínima recomendada
                </p>
                <p className="text-2xl font-serif font-bold text-primary">
                  6 a 12 meses
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Para resultados consistentes e duradouros
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => navigate("/terapias-cirurgicas")}
                className="w-full sm:w-auto bg-gradient-premium hover:opacity-90 transition-opacity group"
              >
                Conheça mais sobre o programa
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
