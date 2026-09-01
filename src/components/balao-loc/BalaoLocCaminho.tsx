import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ETAPAS = [
  {
    num: "01",
    title: "Avaliação Estratégica",
    body: "Entendemos seu caso e verificamos se a Rota com Balão é adequada para o seu momento.",
  },
  {
    num: "02",
    title: "Preparação",
    body: "Organizamos orientações e próximos passos necessários para iniciar a rota.",
  },
  {
    num: "03",
    title: "Implante e adaptação",
    body: "O balão entra como ferramenta temporária e começa a fase de adaptação.",
  },
  {
    num: "04",
    title: "Evolução",
    body: "Indicadores e pontos de cuidado orientam a evolução da estratégia ao longo da rota.",
  },
  {
    num: "05",
    title: "Retirada e continuidade",
    body: "A retirada é preparada antes de acontecer, junto com a definição dos próximos passos.",
  },
];

export const BalaoLocCaminho = () => (
  <section id="seu-caminho" className="bg-muted/40">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Seu caminho
        </p>
        <h2 className="font-kumbh text-2xl md:text-3xl font-normal text-foreground leading-snug">
          Do primeiro passo à continuidade
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8">
        <ol className="relative pl-8 border-l-2 border-border space-y-9">
          {ETAPAS.map(({ num, title, body }) => (
            <li key={num} className="relative">
              <span
                className="absolute -left-[calc(1rem+1px)] top-[0.3rem] flex h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-kumbh text-sm font-medium text-primary tabular-nums min-w-[1.75rem]">{num}</span>
                <h3 className="font-kumbh font-semibold text-foreground text-base leading-snug">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal delay={140} className="mt-7">
        <blockquote className="border-l-4 border-primary pl-5">
          <p className="text-base font-normal text-foreground leading-snug">
            O balão é temporário. A estratégia não termina com ele.
          </p>
        </blockquote>
      </ScrollReveal>
    </div>
  </section>
);
