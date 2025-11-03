import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";

const faqs = [
  {
    question: "O balão intragástrico dói?",
    answer: "O procedimento é realizado sob sedação e não causa dor. Nos primeiros dias após a colocação, é normal sentir desconforto, náuseas leves e adaptação. Nossa equipe fornece medicação e suporte completo nesta fase.",
  },
  {
    question: "Quanto tempo dura o procedimento?",
    answer: "A colocação do balão leva de 20 a 30 minutos. É feita por endoscopia, sem cortes ou cirurgia. Você recebe alta no mesmo dia após algumas horas de observação.",
  },
  {
    question: "Preciso ficar internada?",
    answer: "Não. O procedimento é ambulatorial. Você vai para casa no mesmo dia, mas recomendamos repouso nas primeiras 24-48 horas.",
  },
  {
    question: "Quanto peso vou perder?",
    answer: "A perda média é de 10 a 35kg em 6 meses, dependendo do seu perfil, comprometimento e resposta individual. O acompanhamento interdisciplinar potencializa os resultados.",
  },
  {
    question: "O peso volta depois de retirar o balão?",
    answer: "Não, se você seguir o programa completo. O balão é uma ferramenta, mas a transformação real vem da reeducação alimentar e mudança de hábitos que trabalhamos durante e após o tratamento. Por isso oferecemos 6-12 meses de manutenção.",
  },
  {
    question: "Quais são os efeitos colaterais?",
    answer: "Nos primeiros 3-7 dias: náuseas, desconforto gástrico e adaptação. Esses sintomas são temporários e manejados com medicação. Complicações graves são raras, menos de 1% e incluem migração ou desinflação do balão.",
  },
  {
    question: "Quanto custa o tratamento completo?",
    answer: "O investimento varia conforme o plano escolhido (Essencial, Completo ou Premium). Inclui balão, consultas, exames e acompanhamento interdisciplinar. Entre em contato para conhecer as condições especiais e parcelamento.",
  },
  {
    question: "Como é o acompanhamento após o procedimento?",
    answer: "Você terá consultas regulares com médico, nutricionista e psicólogo (frequência varia por plano). Suporte via WhatsApp, app de acompanhamento, exames periódicos e ajustes no plano alimentar conforme sua evolução.",
  },
];

const FAQVendasB = () => {
  const handleWhatsApp = () => {
    openLeadChat('faq_vendas_b', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre o tratamento com balão intragástrico
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant mb-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={index === faqs.length - 1 ? "border-b-0" : ""}
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Ainda tem dúvidas? Entre em contato com nossa equipe!
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQVendasB;
