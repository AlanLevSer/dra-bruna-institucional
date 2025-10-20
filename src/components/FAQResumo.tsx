import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const topFaqs = [
  {
    question: "Como funciona a primeira consulta?",
    answer: "Na primeira consulta, realizamos uma avaliação completa do seu histórico de saúde, exames anteriores, hábitos de vida e objetivos. A partir disso, traçamos um plano terapêutico personalizado que pode incluir mudanças alimentares, atividade física, medicações e/ou procedimentos.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Os primeiros resultados podem aparecer já nas primeiras semanas, mas a transformação sustentável acontece ao longo de meses. O Programa LevSer é desenhado para 6-12 meses, garantindo que você não apenas perca peso, mas aprenda a mantê-lo de forma saudável.",
  },
  {
    question: "Preciso fazer cirurgia bariátrica?",
    answer: "Não necessariamente. Temos diversas opções de tratamento que vão desde mudanças no estilo de vida, medicações modernas, até procedimentos endoscópicos menos invasivos. A cirurgia bariátrica é indicada apenas em casos específicos e sempre será uma decisão compartilhada.",
  },
  {
    question: "O acompanhamento é presencial ou online?",
    answer: "Oferecemos ambas as modalidades. As consultas iniciais preferencialmente são presenciais, mas o acompanhamento pode ser híbrido de acordo com sua necessidade e localização. Garantimos o mesmo padrão de qualidade em ambos os formatos.",
  },
  {
    question: "Qual a diferença do seu tratamento para uma dieta comum?",
    answer: "Nosso tratamento é médico, personalizado e baseado em ciência. Não trabalhamos com dietas restritivas ou fórmulas prontas. Investigamos as causas metabólicas, hormonais e comportamentais que dificultam sua perda de peso e tratamos cada uma delas de forma integrada.",
  },
];

export const FAQResumo = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {topFaqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-muted/30 rounded-lg px-5 lg:px-6 border-none"
        >
          <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
