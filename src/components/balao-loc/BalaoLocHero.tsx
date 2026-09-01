import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLeadChat } from "@/lib/leadChat";
import draBrunaHero from "@/assets/dra-bruna-hero.avif";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocHero = () => (
  <header className="bg-background border-b border-border/60">
    <div className="mx-auto w-full max-w-5xl px-5 pt-14 pb-12 md:pt-20 md:pb-16 lg:px-10">

      {/* Mobile: flex-col (H1 → photo → body+CTA)
          Desktop: grid ~55/45 proportion */}
      <div className="flex flex-col md:grid md:grid-cols-[55fr_45fr] md:gap-12 md:items-start">

        {/* Row 1 col 1 — label + H1 */}
        <div className="order-1">
          <p className="text-xs font-medium tracking-[0.08em] text-primary mb-5">
            Balão Intragástrico · São Paulo
          </p>
          <h1 className="font-kumbh font-light text-[clamp(2.5rem,1.5rem+4.5vw,5rem)] leading-[1.0] text-foreground">
            Balão intragástrico em São Paulo com uma estratégia que vai{" "}
            <span className="font-medium text-primary">além do procedimento</span>
          </h1>
        </div>

        {/* Col 2 desktop (rows 1–2) / between H1 and body on mobile */}
        <div className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 mt-8 md:mt-0 relative">
          <img
            src="/levser-grafismo.avif"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute -bottom-6 -right-6 w-44 md:w-56 opacity-[0.11] pointer-events-none select-none"
          />
          <img
            src={draBrunaHero}
            alt="Dra. Bruna Durelli, médica especialista em saúde metabólica"
            loading="eager"
            fetchPriority="high"
            className="w-full rounded-xl object-cover object-[70%_top] aspect-[4/3] md:aspect-[4/5]"
          />
        </div>

        {/* Row 2 col 1 — body + CTA + credentials */}
        <div className="order-3 md:col-start-1 md:row-start-2 mt-6 md:mt-5">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
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

      </div>
    </div>
  </header>
);
