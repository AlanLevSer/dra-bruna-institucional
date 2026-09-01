import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BLOCOS = [
  {
    title: "Direção antes da ferramenta",
    body: "Você pode chegar procurando o balão. A decisão sobre a rota começa pela avaliação do seu caso.",
  },
  {
    title: "Método durante a rota",
    body: "Quando indicado, o balão é integrado a uma estratégia que conecta os pilares LevSer, indicadores e pontos de cuidado.",
  },
  {
    title: "Continuidade antes da retirada",
    body: "O próximo passo começa a ser construído antes de o balão sair, preservando a história e a evolução ao longo da rota.",
  },
];

export const BalaoLocPorQue = () => (
  <section id="por-que-levser" className="bg-background">
    <div className="mx-auto w-full max-w-5xl px-5 py-12 md:py-16 lg:px-10">
      <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-14 md:items-start">

        {/* Left column — anchor: heading */}
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
            Por que LevSer
          </p>
          <h2 className="font-kumbh text-2xl md:text-3xl font-normal text-foreground leading-snug">
            O diferencial está em como organizamos o que acontece antes, durante e depois da ferramenta
          </h2>
        </ScrollReveal>

        {/* Right column — 3 blocks */}
        <ScrollReveal delay={100} className="mt-8 md:mt-0 border-t border-border">
          {BLOCOS.map(({ title, body }) => (
            <div key={title} className="py-6 border-b border-border">
              <h3 className="font-kumbh font-semibold text-foreground leading-snug mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </ScrollReveal>

      </div>
    </div>
  </section>
);
