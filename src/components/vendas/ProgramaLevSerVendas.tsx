import { CheckCircle2 } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import programImage from "@/assets/patient-wellness-1.avif";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const benefits = [
  "Vou te ajudar a transformar corpo, mente e autoestima.",
  "Acompanhamento que respeita seu ritmo e sua história.",
  "Nutrição leve, estratégica e que cabe na sua vida real.",
  "Apoio comportamental para mudanças que se sustentam.",
  "Você vai recuperar sua confiança e qualidade de vida.",
  "Comunidade acolhedora que celebra cada vitória sua.",
];

export const ProgramaLevSerVendas = () => {
  return (
    <section id="programa-levser" className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.18} rotate={15} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant max-w-sm xl:max-w-md mx-auto lg:mx-0">
              <img
                src={programImage}
                alt="Programa LevSer - Transformação com acompanhamento médico"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Programa Premium</span>
            </div>

            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-foreground">
              Programa LevSer
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              <strong>Criei o Programa LevSer</strong> porque acredito que você merece mais do que dietas restritivas e promessas vazias.
              Este é um programa de transformação integral que vai te reconectar com seu bem-estar, autoestima e qualidade de vida.
              Vamos juntas, passo a passo, construir resultados que duram — não apenas números na balança.
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
                  Programas personalizados
                </p>
                <p className="text-2xl font-serif font-bold text-primary">
                  16, 24 ou 48 semanas
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  As mesmas fases de transformação, com duração ajustada conforme sua necessidade de otimização.
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Para quem é este programa?
                </h3>
                <div className="space-y-3 mb-4">
                  {[
                    "IMC e perfil metabólico avaliados individualmente.",
                    "Comprometimento com mudança sustentável.",
                    "Disponibilidade para acompanhamento contínuo.",
                    "Decisão compartilhada médico-paciente.",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground/80 italic border-t border-accent/20 pt-4">
                  Este programa não é para todos. Nossa avaliação inicial define o melhor caminho —
                  que pode incluir acompanhamento clínico, terapias endoscópicas ou cirúrgicas.
                </p>
              </div>

              <button
                onClick={() => {
                  try {
                    trackEvent("cta_whatsapp_click", { location: "programa_levser_vendas", path: window.location.pathname });
                  } catch {}
                  const message = "Olá! Quero conhecer o Programa LevSer e descobrir meu plano personalizado.";
                  window.open(`${CONTACT.WHATSAPP_URL.split("?")[0]}?text=${encodeURIComponent(message)}`, "_blank");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-premium px-6 py-3 text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition-all"
              >
                Quero meu plano personalizado
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

