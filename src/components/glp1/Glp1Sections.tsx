import {
  ClipboardList,
  Compass,
  HeartPulse,
  Salad,
  Dumbbell,
  Brain,
  Activity,
  SlidersHorizontal,
  Gauge,
  Anchor,
  Search,
  MapPin,
  Clock,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT } from "@/lib/constants";
import { Glp1Cta } from "./Glp1Cta";
import draBrunaFoto from "@/assets/dra-bruna-professional.avif";

const Section = ({
  id,
  title,
  eyebrow,
  children,
  muted = false,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  muted?: boolean;
}) => (
  <section id={id} className={muted ? "bg-muted/40" : "bg-background"}>
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  </section>
);

/* 2. PARA QUEM É */

const PERFIL = [
  "Já tentou emagrecer outras vezes e recuperou peso",
  "Quer compreender o que pode estar dificultando sua evolução",
  "Busca tratamento médico acompanhado, e não apenas uma intervenção",
  "Quer avaliar se medicação ou outras ferramentas fazem sentido no seu caso",
  "Deseja acompanhar evolução para ajustar a estratégia ao longo do tempo",
  "Convive com condições associadas ao peso e quer uma avaliação clínica",
];

export const Glp1Perfil = () => (
  <Section
    id="perfil"
    eyebrow="Para quem é"
    title="Este tratamento faz sentido para quem busca mais do que uma solução pontual."
    muted
  >
    <ul className="grid gap-3 sm:grid-cols-2">
      {PERFIL.map((item) => (
        <li key={item} className="flex gap-3 rounded-xl border border-border bg-background p-4">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </Section>
);

/* 3. PROBLEMA */

export const Glp1Problema = () => (
  <Section
    id="problema"
    eyebrow="O ponto de partida"
    title="Emagrecer não é só uma questão de força de vontade."
  >
    <p>
      Histórico de peso, alterações metabólicas, sono, rotina, tentativas anteriores, uso prévio de
      medicamentos e recuperação de peso fazem parte da mesma história.
    </p>
    <p>
      É por isso que olhar apenas para dieta, balança ou medicação pode ser insuficiente.
    </p>
    <p className="text-foreground font-medium">
      A LevSer conecta essas dimensões dentro de uma única estratégia de tratamento.
    </p>
  </Section>
);

/* 4. MÉTODO LEVSER */

const METODO = [
  {
    icon: Search,
    title: "Entender",
    text: "Histórico, contexto, tentativas anteriores, composição corporal e objetivos.",
  },
  {
    icon: Compass,
    title: "Definir direção",
    text: "A equipe médica estabelece a estratégia e as ferramentas que podem fazer sentido para aquele momento.",
  },
  {
    icon: Activity,
    title: "Acompanhar",
    text: "Nutrição, saúde metabólica, movimento e comportamento são conduzidos dentro da mesma jornada.",
  },
  {
    icon: Gauge,
    title: "Medir",
    text: "A evolução é acompanhada por indicadores e composição corporal — não apenas pelo peso na balança.",
    emphasis: true,
  },
  {
    icon: SlidersHorizontal,
    title: "Ajustar",
    text: "A estratégia pode ser revista conforme resposta, adesão, evolução e necessidades.",
    emphasis: true,
  },
  {
    icon: Anchor,
    title: "Consolidar",
    text: "O objetivo é construir continuidade e autonomia, não depender apenas de uma intervenção isolada.",
  },
];

export const Glp1Metodo = () => (
  <Section
    id="metodo"
    eyebrow="O método LevSer"
    title="Não é apenas acompanhamento. É acompanhamento com direção e ajuste."
    muted
  >
    <ol className="relative space-y-3 border-l border-border pl-6">
      {METODO.map(({ icon: Icon, title, text, emphasis }, index) => (
        <li
          key={title}
          className={`relative rounded-xl border p-5 ${
            emphasis
              ? "border-primary/50 bg-primary/5 shadow-sm"
              : "border-border bg-background"
          }`}
        >
          <span
            className={`absolute -left-[35px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
              emphasis ? "border-primary bg-primary" : "border-border bg-background"
            }`}
            aria-hidden="true"
          />
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3
                className={`font-medium text-foreground ${
                  emphasis ? "text-lg" : ""
                }`}
              >
                {index + 1}. {title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>

    <Glp1Cta
      ctaSource="journey_section"
      label="Quero entender meu próximo passo"
      className="pt-4"
    />
  </Section>
);

/* 5. QUATRO PILARES */

const PILARES = [
  {
    icon: Salad,
    title: "Nutrição Inteligente",
    text: "Estratégia alimentar aplicável à rotina, acompanhada e ajustada ao longo da jornada.",
  },
  {
    icon: HeartPulse,
    title: "Saúde Metabólica & Regenerativa",
    text: "Direção médica e acompanhamento dos fatores metabólicos relacionados à evolução do tratamento.",
  },
  {
    icon: Dumbbell,
    title: "Corpo em Movimento",
    text: "Movimento progressivo e possível dentro da realidade, limitações e objetivos de cada pessoa.",
  },
  {
    icon: Brain,
    title: "Mente & Comportamento",
    text: "Hábitos, gatilhos, relação com a alimentação e sustentação das mudanças.",
  },
];

export const Glp1Pilares = () => (
  <Section
    id="pilares"
    eyebrow="Arquitetura LevSer"
    title="Quatro pilares dentro da mesma jornada de tratamento"
  >
    <ul className="grid gap-4 sm:grid-cols-2">
      {PILARES.map(({ icon: Icon, title, text }) => (
        <li key={title} className="rounded-xl border border-border bg-background p-5">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="mt-3 font-medium text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
        </li>
      ))}
    </ul>
  </Section>
);

/* 6. GLP-1/GIP */

export const Glp1Ferramenta = () => (
  <Section
    id="glp1"
    eyebrow="Ferramentas do tratamento"
    title="E se eu estiver buscando tratamento com GLP-1/GIP?"
    muted
  >
    <p>
      Tratamentos que envolvem GLP-1/GIP podem fazer parte da jornada quando houver indicação
      médica.
    </p>
    <p>
      Na LevSer, a decisão não começa pela escolha de uma medicação. Primeiro entendemos seu
      histórico, composição corporal, saúde metabólica, alimentação, comportamento e objetivos.
    </p>
    <p>
      A partir daí, a equipe define quais ferramentas podem fazer sentido e como acompanhar sua
      evolução ao longo do tratamento.
    </p>
    <p className="rounded-xl border border-primary/40 bg-primary/5 px-5 py-4 font-serif text-lg font-semibold text-foreground">
      Ferramenta ≠ tratamento completo.
    </p>
  </Section>
);

/* 7. FRASE-SÍNTESE */

export const Glp1Sintese = () => (
  <section id="sintese" className="bg-foreground text-background">
    <div className="mx-auto w-full max-w-3xl px-5 py-14 md:py-20">
      <p className="font-serif text-2xl md:text-3xl font-bold leading-snug">
        Na LevSer, você não entra para receber uma ferramenta. Entra em uma jornada que avalia,
        acompanha, mede e ajusta o tratamento ao longo da sua evolução.
      </p>
      <p className="mt-6 text-base md:text-lg opacity-80">
        A intervenção é ferramenta.
        <br />
        A jornada é o tratamento.
      </p>
    </div>
  </section>
);

/* 8. AVALIAÇÃO ESTRATÉGICA */

const AVALIACAO_PASSOS = [
  "Você chega com dúvidas",
  "Mapeamos seu momento",
  "Definimos uma direção",
  "Você entende os próximos passos",
];

export const Glp1Avaliacao = () => (
  <Section
    id="avaliacao"
    eyebrow="Avaliação Estratégica"
    title="O primeiro passo é entender sua direção."
  >
    <p>
      A Avaliação Estratégica é o primeiro ponto de decisão da jornada LevSer. É quando a Dra. Bruna
      começa a compreender seu histórico, suas tentativas anteriores, seus objetivos, seu contexto e
      as informações clínicas relevantes para definir quais caminhos precisam ser considerados.
    </p>
    <p>
      Você não precisa chegar sabendo qual ferramenta escolher. O objetivo da Avaliação é entender
      seu momento e orientar os próximos passos.
    </p>

    <ol className="grid gap-3 sm:grid-cols-2 pt-2">
      {AVALIACAO_PASSOS.map((passo, index) => (
        <li
          key={passo}
          className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <span className="text-sm text-foreground/90">{passo}</span>
          {index < AVALIACAO_PASSOS.length - 1 && (
            <ArrowRight className="ml-auto h-4 w-4 text-primary/60 shrink-0" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>

    <Glp1Cta
      ctaSource="evaluation_section"
      label="Quero iniciar minha Avaliação Estratégica"
      className="pt-4"
    />
  </Section>
);

/* 9. AUTORIDADE */

const ATUACAO_PRINCIPAL = [
  "Tratamento clínico da obesidade",
  "Nutrologia",
  "Direção clínica da LevSer",
];

const CREDENCIAIS_SECUNDARIAS = ["Medicina Regenerativa", "Endoscopia Digestiva"];

export const Glp1Autoridade = () => (
  <Section id="autoridade" eyebrow="Quem conduz" title="Direção médica com Dra. Bruna Durelli" muted>
    <div className="grid gap-6 sm:grid-cols-[180px_1fr] sm:items-start">
      <img
        src={draBrunaFoto}
        alt="Dra. Bruna Durelli, responsável pela direção médica da LevSer"
        loading="lazy"
        className="w-full max-w-[180px] rounded-2xl object-cover aspect-[4/5] border border-border"
      />
      <div className="space-y-4">
        <p className="text-foreground">
          A Dra. Bruna conduz a Avaliação Estratégica e a definição da direção clínica, integrada ao
          acompanhamento interdisciplinar da LevSer.
        </p>
        <ul className="flex flex-wrap gap-2">
          {ATUACAO_PRINCIPAL.map((item) => (
            <li
              key={item}
              className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-sm font-medium text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Também atua em {CREDENCIAIS_SECUNDARIAS.join(" e ")}.
        </p>
        <p className="text-sm text-muted-foreground">CRM 124809 · RQE 57361</p>
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background p-5">
      <h3 className="font-medium text-foreground">Equipe interdisciplinar LevSer</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Direção médica, nutrição, movimento e comportamento fazem parte da mesma jornada: as
        condutas são compartilhadas entre a equipe, para que a estratégia definida na avaliação seja
        acompanhada, medida e ajustada ao longo do tratamento.
      </p>
    </div>
  </Section>
);

/* 10. ESTRUTURA */

const ESTRUTURA_ITENS = [
  {
    icon: MapPin,
    title: "Unidade Jardim Paulista",
    text: `${CONTACT.ADDRESS.street} · ${CONTACT.ADDRESS.neighborhood}, ${CONTACT.ADDRESS.city} - ${CONTACT.ADDRESS.state}`,
  },
  {
    icon: Clock,
    title: "Atendimento com hora marcada",
    text: `${CONTACT.HORARIO.weekdays} · ${CONTACT.HORARIO.saturday}`,
  },
  {
    icon: Stethoscope,
    title: "Avaliação presencial",
    text: "A avaliação médica é presencial na unidade; etapas do acompanhamento podem ocorrer remotamente, conforme orientação da equipe.",
  },
];

export const Glp1Estrutura = () => (
  <Section id="estrutura" eyebrow="Onde acontece" title="Estrutura e atendimento em São Paulo">
    <ul className="grid gap-4 sm:grid-cols-3">
      {ESTRUTURA_ITENS.map(({ icon: Icon, title, text }) => (
        <li key={title} className="rounded-xl border border-border bg-background p-5">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="mt-3 font-medium text-foreground text-sm">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
        </li>
      ))}
    </ul>
  </Section>
);

/* 11. FAQ */

const FAQ = [
  {
    q: "Preciso já saber qual tratamento quero?",
    a: "Não. A Avaliação Estratégica existe justamente para compreender seu momento e definir quais caminhos precisam ser considerados.",
  },
  {
    q: "O tratamento sempre envolve medicação?",
    a: "Não. As ferramentas dependem da avaliação e da indicação clínica. A LevSer trabalha com uma jornada interdisciplinar, e nenhuma ferramenta isolada representa o tratamento completo.",
  },
  {
    q: "GLP-1/GIP podem fazer parte do tratamento?",
    a: "Podem, quando houver indicação médica. Na LevSer, essas ferramentas fazem parte de uma estratégia mais ampla de acompanhamento.",
  },
  {
    q: "Já uso ou já utilizei medicação para emagrecer. Posso fazer a Avaliação?",
    a: "Sim. O histórico de tentativas e tratamentos anteriores faz parte da avaliação do seu momento atual.",
  },
  {
    q: "Já tentei emagrecer várias vezes. A LevSer atende esse perfil?",
    a: "Sim. Compreender tentativas anteriores, dificuldade de manutenção e recuperação de peso ajuda a equipe a construir uma nova direção.",
  },
  {
    q: "Em quanto tempo terei resultado?",
    a: "Não existe um prazo igual para todas as pessoas. A evolução depende do quadro clínico, da estratégia definida e da adesão ao acompanhamento.",
  },
  {
    q: "O atendimento é presencial?",
    a: "A avaliação médica é presencial na unidade do Jardim Paulista, em São Paulo. Etapas do acompanhamento podem ocorrer remotamente, conforme orientação da equipe.",
  },
  {
    q: "Onde fica a LevSer?",
    a: `${CONTACT.ADDRESS.full}. Atendimento com hora marcada.`,
  },
  {
    q: "Como funciona o primeiro contato?",
    a: "Você deixa seus dados no LeadChat. A conversa continua pelo WhatsApp e a equipe orienta os próximos passos.",
  },
];

export const Glp1Faq = () => (
  <Section id="faq" eyebrow="Dúvidas frequentes" title="Perguntas comuns antes da Avaliação" muted>
    <Accordion type="single" collapsible className="w-full">
      {FAQ.map(({ q, a }) => (
        <AccordionItem key={q} value={q}>
          <AccordionTrigger className="text-left text-foreground">{q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);

/* 12. CTA FINAL */

export const Glp1CtaFinal = () => (
  <section id="cta-final" className="bg-background border-t border-border">
    <div className="mx-auto w-full max-w-3xl px-5 py-14 md:py-20">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Você não precisa decidir sozinho qual ferramenta usar.
      </h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        Comece entendendo seu momento. Nossa equipe continua a conversa pelo WhatsApp e orienta como
        funciona a Avaliação Estratégica.
      </p>
      <Glp1Cta
        ctaSource="final_cta"
        label="Quero conversar sobre meu tratamento"
        className="mt-7"
        microcopy="Atendimento humano. Seus dados são utilizados para continuidade do contato com a LevSer."
        showWhatsApp
      />
    </div>
  </section>
);

/* 13. DISCLAIMER */

export const Glp1Disclaimer = () => (
  <section className="bg-muted/40 border-t border-border">
    <div className="mx-auto w-full max-w-3xl px-5 py-8">
      <p className="text-xs text-muted-foreground leading-relaxed">
        Conteúdo de caráter informativo, sem finalidade promocional de medicamentos. Nenhum
        tratamento é indicado sem avaliação médica individual. Resultados variam conforme o quadro
        clínico e a adesão ao acompanhamento. Em caso de dúvida, consulte seu médico.
      </p>
    </div>
  </section>
);

/* Compatibilidade: seção de jornada substituída pelo Método LevSer */
export const Glp1Jornada = Glp1Metodo;
export const ClipboardListIconRef = ClipboardList;
