import { Glp1Cta } from "@/components/glp1/Glp1Cta";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CTA_LABEL = "Quero avaliar se o balão faz sentido para mim";

const PERGUNTAS = [
  {
    num: "01",
    title: "Como é colocado?",
    body: "A colocação é endoscópica. Antes do procedimento, a avaliação médica confirma a indicação e organiza a preparação necessária.",
  },
  {
    num: "02",
    title: "Qual opção faz sentido para mim?",
    body: "Você não precisa escolher sozinho. Existem modalidades com diferentes características e tempos de permanência. A definição depende da avaliação do seu caso e da estratégia terapêutica indicada.",
  },
  {
    num: "03",
    title: "E depois que o balão é colocado?",
    body: "O procedimento é apenas uma etapa. Adaptação, alimentação, composição corporal, movimento, comportamento e preparação para a retirada também entram na condução da rota.",
  },
];

export const BalaoLocEntenda = () => (
  <section id="entenda-o-balao" className="bg-background">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Entenda o balão
        </p>
        <h2 className="font-kumbh text-2xl md:text-3xl font-normal text-foreground leading-snug">
          Está pensando em colocar um balão? Comece por estas três respostas.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8">
        <div className="border-t border-border">
          {PERGUNTAS.map(({ num, title, body }) => (
            <div key={num} className="py-6 border-b border-border">
              <span className="block text-sm font-medium text-primary mb-2 tabular-nums" aria-hidden="true">
                {num}
              </span>
              <h3 className="font-kumbh font-semibold text-foreground leading-snug mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150} className="mt-8">
        <Glp1Cta
          ctaSource="entenda_section"
          label={CTA_LABEL}
        />
      </ScrollReveal>
    </div>
  </section>
);
