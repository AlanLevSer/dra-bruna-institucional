import {
  ClipboardList,
  Compass,
  HeartPulse,
  Salad,
  Dumbbell,
  Brain,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Glp1Cta } from "./Glp1Cta";

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

export const Glp1Problema = () => (
  <Section id="problema" eyebrow="O ponto de partida" title="Emagrecer não é só uma questão de força de vontade">
    <p>
      Histórico de peso, alterações metabólicas, sono, rotina, uso prévio de medicamentos e recuperação
      de peso após dietas restritivas fazem parte do mesmo quadro clínico. Tratar isoladamente costuma
      gerar frustração.
    </p>
    <p>
      Por isso a LevSer começa por uma avaliação médica estruturada — para entender o que está
      acontecendo com você antes de definir qualquer conduta.
    </p>
  </Section>
);

const PILARES = [
  { icon: HeartPulse, title: "Avaliação clínica", text: "História, exames e condições associadas orientam a conduta médica individual." },
  { icon: Salad, title: "Nutrição", text: "Plano alimentar viável para a sua rotina, com foco em adesão e preservação muscular." },
  { icon: Dumbbell, title: "Movimento", text: "Estímulo físico progressivo, respeitando limitações e histórico de lesões." },
  { icon: Brain, title: "Comportamento", text: "Trabalho de hábitos, gatilhos alimentares e sustentação a longo prazo." },
];

export const Glp1Metodo = () => (
  <Section id="metodo" eyebrow="Como tratamos" title="Um cuidado interdisciplinar, com direção médica" muted>
    <p>
      A conduta é definida caso a caso pela equipe médica. As ferramentas terapêuticas — quando
      indicadas — entram dentro de um plano, nunca como solução isolada.
    </p>
    <ul className="grid gap-4 sm:grid-cols-2 pt-2">
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

const ETAPAS = [
  { icon: ClipboardList, title: "1. Contato inicial", text: "Você deixa seus dados e nossa equipe entra em contato pelo WhatsApp." },
  { icon: Compass, title: "2. Avaliação Estratégica", text: "Consulta médica para entender histórico, exames, objetivos e contexto de vida." },
  { icon: ShieldCheck, title: "3. Plano individual", text: "Definição da conduta e do acompanhamento interdisciplinar adequado ao seu caso." },
];

export const Glp1Jornada = () => (
  <Section id="jornada" eyebrow="Próximos passos" title="Como funciona o início do tratamento">
    <ol className="space-y-4">
      {ETAPAS.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4 rounded-xl border border-border p-5">
          <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-medium text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        </li>
      ))}
    </ol>
    <Glp1Cta ctaSource="jornada_mid" className="pt-4" />
  </Section>
);

const PERFIL = [
  "Já tentou emagrecer várias vezes e recuperou o peso",
  "Quer entender o que é adequado ao seu caso antes de iniciar qualquer conduta",
  "Busca acompanhamento médico contínuo, não uma solução pontual",
  "Convive com condições associadas ao peso e quer avaliação clínica",
];

export const Glp1Perfil = () => (
  <Section id="perfil" eyebrow="Para quem é" title="Este atendimento faz sentido se você" muted>
    <ul className="space-y-3">
      {PERFIL.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-sm">
      A indicação de qualquer tratamento depende de avaliação médica presencial. Resultados variam de
      pessoa para pessoa.
    </p>
  </Section>
);

export const Glp1Autoridade = () => (
  <Section id="autoridade" eyebrow="Quem conduz" title="Direção médica da LevSer">
    <p>
      A LevSer é uma clínica de tratamento do emagrecimento em São Paulo, com equipe médica e
      interdisciplinar dedicada ao acompanhamento de longo prazo. O atendimento é conduzido sob
      responsabilidade médica, com foco em segurança, individualização e continuidade do cuidado.
    </p>
    <p className="text-sm">Unidade: Jardim Paulista, São Paulo · Atendimento com hora marcada.</p>
  </Section>
);

const FAQ = [
  {
    q: "O que é a Avaliação Estratégica?",
    a: "É a consulta inicial em que a equipe médica analisa seu histórico, exames e objetivos para definir se há indicação de tratamento e qual conduta é adequada ao seu caso.",
  },
  {
    q: "Vocês prescrevem medicamentos para emagrecer?",
    a: "Qualquer conduta medicamentosa depende de avaliação médica individual, com indicação, contraindicações e acompanhamento definidos em consulta. Não há prescrição sem consulta.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "Não trabalhamos com promessa de resultado. A evolução depende do quadro clínico, da adesão ao plano e do acompanhamento contínuo.",
  },
  {
    q: "O atendimento é presencial?",
    a: "A avaliação médica é presencial na unidade do Jardim Paulista, em São Paulo. Etapas do acompanhamento podem ocorrer remotamente, conforme orientação da equipe.",
  },
  {
    q: "Como funciona o primeiro contato?",
    a: "Você deixa nome, telefone e e-mail. Nossa equipe entra em contato pelo WhatsApp para entender seu caso e organizar o agendamento.",
  },
];

export const Glp1Faq = () => (
  <Section id="faq" eyebrow="Dúvidas frequentes" title="Perguntas comuns antes da primeira consulta" muted>
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

export const Glp1CtaFinal = () => (
  <section id="cta-final" className="bg-background border-t border-border">
    <div className="mx-auto w-full max-w-3xl px-5 py-14 md:py-20">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
        Comece pela avaliação. O plano vem depois.
      </h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        Deixe seus dados e nossa equipe entra em contato para entender seu caso e organizar sua
        Avaliação Estratégica.
      </p>
      <Glp1Cta
        ctaSource="cta_final"
        className="mt-7"
        microcopy="Atendimento humano. Seus dados são usados apenas para contato da clínica."
        showWhatsApp
      />
    </div>
  </section>
);

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
