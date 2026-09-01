import { Glp1Cta } from "@/components/glp1/Glp1Cta";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

export const BalaoLocIndicacao = () => (
  <section id="indicacao" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Indicação individual
        </p>
        <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
          O balão pode ser uma rota possível. A avaliação mostra se é a rota adequada para você.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80} className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
        <p>
          Pessoas chegam à LevSer em momentos diferentes. Algumas estão considerando o balão pela
          primeira vez; outras já passaram por diferentes estratégias e estão procurando um novo
          caminho.
        </p>
        <p>
          Por isso, a intenção de colocar um balão é o ponto de partida — não a indicação final.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={120} className="mt-7">
        <blockquote className="border-l-4 border-primary pl-5">
          <p className="font-semibold text-foreground leading-snug">
            A Rota com Balão não é automática para todo mundo.
          </p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A avaliação existe justamente para entender se essa ferramenta faz sentido para o seu
            momento ou se outra estratégia deve ser considerada.
          </p>
        </blockquote>
      </ScrollReveal>

      <ScrollReveal delay={140} className="mt-8">
        <Glp1Cta
          ctaSource="indicacao_section"
          label={CTA_LABEL}
        />
      </ScrollReveal>
    </div>
  </section>
);
