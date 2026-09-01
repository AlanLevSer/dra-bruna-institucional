import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocCtaFinal = () => (
  <section id="cta-final" className="bg-muted/40 border-t border-border relative overflow-hidden">
    <img
      src="/levser-grafismo.avif"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute bottom-0 right-0 w-48 md:w-64 opacity-[0.06] pointer-events-none select-none"
    />
    <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-14 md:py-20">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-4">
          Seu próximo passo
        </p>
        <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
          Se você está considerando o balão, o próximo passo é avaliar o seu caso.
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          A Avaliação Estratégica permite entender se a Rota com Balão faz sentido para você e
          qual direção terapêutica deve ser considerada.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8 flex flex-col items-start gap-3">
        <Button
          size="lg"
          onClick={() => void openLeadChat("final_cta")}
          data-cta-source="final_cta"
          className="w-full sm:w-auto h-auto min-h-14 py-4 px-7 text-base font-semibold rounded-full whitespace-normal bg-[hsl(var(--primary-strong))] text-primary-foreground shadow-lg transition-all hover:bg-[hsl(var(--primary-stronger))] hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary-strong))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-left">{CTA_LABEL}</span>
          <ArrowRight className="ml-2 h-5 w-5 shrink-0" aria-hidden="true" />
        </Button>
        <p className="text-sm text-muted-foreground">
          A indicação depende de avaliação médica individual.
        </p>
      </ScrollReveal>

      <p className="mt-10 text-sm text-muted-foreground">
        LevSer · Jardim Paulista · São Paulo
      </p>
    </div>
  </section>
);
