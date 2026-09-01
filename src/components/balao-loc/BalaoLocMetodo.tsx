import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PILARES = [
  { num: "01", name: "Saúde Metabólica & Regenerativa" },
  { num: "02", name: "Nutrição Inteligente" },
  { num: "03", name: "Corpo em Movimento" },
  { num: "04", name: "Mente & Comportamento" },
];

export const BalaoLocMetodo = () => (
  <section id="metodo-levser" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Método LevSer
        </p>
        <h2 className="font-kumbh text-2xl md:text-3xl font-normal text-foreground leading-snug">
          Mais do que colocar um balão
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80} className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
        <p>
          Na LevSer, o balão é uma ferramenta dentro do tratamento — não o tratamento inteiro.
        </p>
        <p>
          Quando essa rota é indicada, a intervenção é integrada ao Método LevSer, conectando
          direção clínica e indicadores aos quatro pilares do cuidado.
        </p>
      </ScrollReveal>

      {/* 2×2 grid — large number as visual anchor */}
      <ScrollReveal delay={120} className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8">
        {PILARES.map(({ num, name }) => (
          <div key={num}>
            <span className="font-kumbh text-5xl font-light text-primary tabular-nums leading-none">
              {num}
            </span>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="font-kumbh font-semibold text-sm text-foreground leading-snug">
                {name}
              </span>
            </div>
          </div>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-8">
        <blockquote className="border-l-4 border-primary pl-5">
          <p className="text-lg font-normal text-foreground leading-snug">
            A intervenção é ferramenta. A jornada é o tratamento.
          </p>
        </blockquote>
      </ScrollReveal>

      <ScrollReveal delay={180} className="mt-5">
        <p className="text-base text-muted-foreground leading-relaxed">
          O objetivo não é apenas chegar ao implante. É usar essa fase de forma estruturada e
          preparar o que vem depois.
        </p>
      </ScrollReveal>
    </div>
  </section>
);
