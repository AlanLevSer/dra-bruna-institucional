import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const FAQS = [
  {
    q: "Como o balão intragástrico é colocado?",
    a: "O balão é posicionado no estômago por endoscopia — sem cortes ou incisões. O procedimento é realizado sob sedação. Antes de qualquer coisa, a avaliação médica confirma a indicação e organiza a preparação adequada.",
  },
  {
    q: "O balão é uma cirurgia?",
    a: "Não. A colocação do balão é um procedimento endoscópico, sem cortes. É diferente de cirurgias bariátricas como bypass gástrico ou sleeve.",
  },
  {
    q: "Quem realiza o procedimento?",
    a: "O procedimento é realizado por médico especialista. Na LevSer, a indicação e a condução são feitas pela Dra. Bruna Durelli, especialista em Endoscopia Digestiva e Obesidade.",
  },
  {
    q: "Quanto tempo o balão permanece?",
    a: "O tempo de permanência depende do tipo de balão indicado e da estratégia terapêutica definida para o seu caso. A definição é feita a partir da avaliação individual.",
  },
  {
    q: "Existem modalidades diferentes?",
    a: "Sim. Existem balões com diferentes características e tempos de permanência. A escolha depende da avaliação do seu caso e da estratégia indicada — não é uma decisão que você precisa tomar sozinho.",
  },
  {
    q: "Como são os primeiros dias?",
    a: "A fase de adaptação é esperada. Pode haver desconforto, náuseas e redução do apetite. A equipe orienta o manejo e o acompanhamento nessa fase, que faz parte da condução da rota.",
  },
  {
    q: "Quanto peso vou perder?",
    a: "Não é possível prever um número específico. A perda de peso varia conforme o quadro clínico individual, a estratégia terapêutica adotada e a evolução ao longo da rota. Resultados dependem de múltiplos fatores.",
  },
  {
    q: "O que acontece quando o balão é retirado?",
    a: "A preparação para a retirada começa antes de ela acontecer. O objetivo é que os próximos passos já estejam definidos antes do balão sair, para que a continuidade do cuidado não dependa apenas da presença do dispositivo.",
  },
  {
    q: "Quais são os riscos?",
    a: "Como todo procedimento médico, o balão tem riscos. Eles são avaliados individualmente na consulta. A equipe médica apresenta as informações necessárias para uma decisão informada durante a avaliação.",
  },
  {
    q: "Como saber se tenho indicação?",
    a: "A forma de saber é pela avaliação médica. Você não precisa chegar com a decisão tomada. O objetivo da Avaliação Estratégica é justamente entender se essa rota faz sentido para o seu momento.",
  },
];

export const BalaoLocFaq = () => (
  <section id="faq" className="bg-background">
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:py-16">
      <ScrollReveal>
        <p className="text-xs font-medium tracking-[0.08em] text-primary mb-3">
          Dúvidas frequentes
        </p>
        <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug mb-6">
          Perguntas comuns antes da avaliação
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-foreground">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollReveal>
    </div>
  </section>
);
