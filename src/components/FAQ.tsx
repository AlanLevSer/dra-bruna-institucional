import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GrafismoDecor } from "@/components/GrafismoDecor";

const faqs = [
  {
    question: "Como funciona a primeira consulta?",
    answer: "Na primeira consulta, realizamos uma avaliação completa do seu histórico de saúde, exames anteriores, hábitos de vida e objetivos. A partir disso, traçamos um plano terapêutico personalizado que pode incluir mudanças alimentares, atividade física, medicações e/ou procedimentos.",
  },
  {
    question: "O tratamento é coberto por convênio?",
    answer: "Trabalhamos com alguns convênios médicos para consultas. Procedimentos específicos podem ter cobertura dependendo do seu plano. Nossa equipe pode auxiliar na verificação de cobertura e documentação necessária para reembolso.",
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
  {
    question: "Medicina regenerativa é segura?",
    answer: "Sim. Nossos programas regenerativos são baseados em evidências científicas e sempre personalizados por exames laboratoriais completos. Todo acompanhamento é feito pela equipe médica, com foco em segurança e resultados sustentáveis.",
  },
  {
    question: "Vou precisar de programas regenerativos para sempre?",
    answer: "Não. Usamos de forma estratégica por fases: mais intensivo no reset inicial, refinado na consolidação e pulsos de manutenção conforme sua evolução. O objetivo é que seu corpo recupere autonomia metabólica ao longo do programa.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="relative py-16 xl:py-20 bg-card overflow-hidden">
      <GrafismoDecor variant="background" position="top-left" size="lg" opacity={0.15} rotate={25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-serif font-bold text-foreground mb-5">
            Perguntas Frequentes
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Tire suas dúvidas sobre o tratamento, consultas e o Programa LevSer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
};
