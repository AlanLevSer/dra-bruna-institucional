import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GrafismoDecor } from "@/components/GrafismoDecor";

export const FAQVendasPlasma = () => {
  const faqs = [
    {
      question: "O que é o Plasma de Argônio?",
      answer: "É um procedimento endoscópico que utiliza energia controlada (plasma) para promover cicatrização e redução da dilatação da anastomose gastrojejunal, recuperando a sensação de saciedade."
    },
    {
      question: "Como funciona o procedimento?",
      answer: "Durante a endoscopia, o gás argônio é ionizado, criando plasma que é aplicado na área dilatada. Isso promove retração do tecido e redução do diâmetro da anastomose, diminuindo a capacidade gástrica."
    },
    {
      question: "O procedimento dói?",
      answer: "Não. É feito sob sedação e você não sente dor. Após o procedimento, pode haver leve desconforto que é controlado com medicação."
    },
    {
      question: "Preciso ficar internada?",
      answer: "Não. É um procedimento ambulatorial. Você recebe alta no mesmo dia após algumas horas de observação."
    },
    {
      question: "Quantas sessões são necessárias?",
      answer: "Varia conforme o caso. Geralmente são de 1 a 3 sessões, espaçadas de 4-8 semanas. A avaliação endoscópica define o protocolo ideal."
    },
    {
      question: "Quanto peso vou perder?",
      answer: "A perda média é de 15-20% do peso atual, mas varia conforme o grau de dilatação, comprometimento com o programa e resposta individual."
    },
    {
      question: "Quais são os riscos?",
      answer: "É muito seguro. Complicações graves são raras (<1%) e podem incluir sangramento leve ou perfuração (extremamente raro). Nossa equipe é altamente treinada para minimizar riscos."
    },
    {
      question: "Posso fazer se tive bypass há muitos anos?",
      answer: "Sim! O Plasma de Argônio pode ser realizado mesmo anos após a cirurgia bariátrica. O importante é ter dilatação da anastomose confirmada por endoscopia."
    },
    {
      question: "Quanto tempo de recuperação?",
      answer: "A recuperação é rápida. Você retorna às atividades normais em 24-48h. Dieta líquida nos primeiros 3 dias, progredindo conforme orientação."
    },
    {
      question: "O resultado é permanente?",
      answer: "Os resultados são duradouros quando associados à mudança de hábitos. Por isso nosso programa inclui acompanhamento nutricional e de nutrologia para garantir manutenção do peso a longo prazo."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Respostas para as principais questões sobre o tratamento com Plasma de Argônio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 border-border/50 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
