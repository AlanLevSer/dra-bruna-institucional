import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PILARES = [
  "Saúde Metabólica & Regenerativa",
  "Nutrição Inteligente",
  "Corpo em Movimento",
  "Mente & Comportamento",
];

export const BalaoLocMetodo = () => (
  <section id="metodo-levser" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Método LevSer
        </p>
        <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
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

      <ScrollReveal delay={120} className="mt-7">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
          {PILARES.map((pilar) => (
            <li key={pilar} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {pilar}
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-7">
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
