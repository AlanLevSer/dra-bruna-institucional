import { Sparkles, Battery, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { useNavigate } from "react-router-dom";
import { CONTACT } from "@/lib/constants";

const beneficios = [
  {
    icon: Battery,
    title: "Mais Energia & Foco",
    descricao: "Repleção inteligente de nutrientes para performance diária"
  },
  {
    icon: Shield,
    title: "Controle Inflamatório",
    descricao: "Modulação do estresse oxidativo e inflamação crônica"
  },
  {
    icon: Zap,
    title: "Recuperação Acelerada",
    descricao: "Preservação de massa magra e elasticidade tecidual"
  },
  {
    icon: Sparkles,
    title: "Bem-Estar Integral",
    descricao: "Melhora de sono, humor e controle de apetite"
  }
];

export const RegeneracaoMetabolica = () => {
  const navigate = useNavigate();
  
  return (
    <section id="regeneracao" className="relative py-12 xl:py-16 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.15} rotate={-25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground mb-6">
            Regeneração Metabólica: além da balança, saúde que se sente
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Como especialista em Medicina Regenerativa, sei que sua transformação não depende só 
            de comer menos. Meu enfoque regenerativo melhora a qualidade celular, reduz inflamação, 
            preserva massa magra e sustenta energia no dia a dia.
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid md:grid-cols-2 gap-6 xl:gap-8 max-w-5xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {beneficios.map((beneficio, index) => {
            const IconComponent = beneficio.icon;
            return (
              <div 
                key={index} 
                className="bg-muted/30 p-6 xl:p-8 rounded-xl border border-border/50 hover:shadow-elegant transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {beneficio.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {beneficio.descricao}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* O que pode incluir */}
        <div className="max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4 text-center">
            O que pode incluir (conforme avaliação):
          </h3>
          <div className="bg-muted/30 p-6 xl:p-8 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Repleção inteligente de nutrientes</strong> (intravenosa ou via oral) para energia e foco
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Modulação inflamatória</strong> e do estresse oxidativo
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Estratégias de sono, humor</strong> e controle de apetite
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Suporte de pele, cabelo</strong> e elasticidade durante a perda de peso
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6 text-center italic">
            <strong className="not-italic">Resultados percebidos pelos pacientes:</strong> mais disposição, 
            recuperação mais rápida, menos compulsão, rotina mais estável.
          </p>
        </div>

        {/* Nota Clínica */}
        <div className="max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">⚠️ Nota clínica:</strong> Programas individualizados, 
              baseados em exames e evidência científica. Acompanhamento médico contínuo. Segurança em primeiro lugar.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button
            size="lg"
            onClick={() => {
              const message = "Olá, Dra. Bruna! Quero descobrir meu programa regenerativo personalizado.";
              window.open(`${CONTACT.WHATSAPP_URL.split('?')[0]}?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="bg-gradient-premium hover:opacity-90 transition-opacity group"
          >
            Descobrir meu programa regenerativo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/medicina-regenerativa')}
            className="group"
          >
            Saiba mais sobre Medicina Regenerativa
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
