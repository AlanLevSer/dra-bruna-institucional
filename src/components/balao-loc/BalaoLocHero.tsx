import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocHero = () => (
  <header className="relative overflow-hidden bg-background border-b border-border/60 min-h-[580px] md:min-h-[660px] flex items-center">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      <img
        src={draBrunaHero}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[70%_top] md:object-[75%_top] opacity-50 md:opacity-35 saturate-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/65 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/90 md:to-background/30" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-14 pb-12 md:pt-22 md:pb-18">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-5">
        Balão Intragástrico · São Paulo
      </p>

      <h1 className="font-serif text-3xl md:text-5xl font-bold leading-[1.15] text-foreground">
        Balão intragástrico em São Paulo com uma estratégia que vai além do procedimento
      </h1>

      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        Se você está considerando colocar um balão, o primeiro passo é entender se essa ferramenta
        faz sentido para o seu momento. Na LevSer, a indicação é individual e, quando essa rota é
        adequada, o balão faz parte de uma estratégia que organiza o antes, o durante e o depois.
      </p>

      <div className="mt-8 flex flex-col items-start gap-3">
        <Button
          size="lg"
          onClick={() => void openLeadChat("hero_primary")}
          data-cta-source="hero_primary"
          className="w-full sm:w-auto h-auto min-h-14 py-4 px-7 text-base font-semibold rounded-full whitespace-normal bg-[hsl(var(--primary-strong))] text-primary-foreground shadow-lg transition-all hover:bg-[hsl(var(--primary-stronger))] hover:shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary-strong))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-left">{CTA_LABEL}</span>
          <ArrowRight className="ml-2 h-5 w-5 shrink-0" aria-hidden="true" />
        </Button>
        <p className="text-sm text-muted-foreground">
          A indicação depende de avaliação médica individual.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-border/60">
        <p className="text-sm font-medium text-foreground">Dra. Bruna Durelli</p>
        <p className="text-sm text-muted-foreground">Direção médica LevSer · Jardim Paulista, São Paulo</p>
      </div>
    </div>
  </header>
);
