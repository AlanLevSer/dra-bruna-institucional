import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O balão intragástrico dói?",
    answer:
      "O procedimento é realizado sob sedação e não causa dor. Nos primeiros dias após a colocação, é normal sentir desconforto e náuseas leves. Nossa equipe fornece medicação e suporte completo nessa fase.",
  },
  {
    question: "Quanto tempo dura o procedimento?",
    answer:
      "A colocação do balão leva de 20 a 30 minutos. É feita por endoscopia, sem cortes ou cirurgia, e você recebe alta no mesmo dia após algumas horas de observação.",
  },
  {
    question: "Preciso ficar internada?",
    answer:
      "Não. O procedimento é ambulatorial. Você vai para casa no mesmo dia, mas recomendamos repouso nas primeiras 24-48 horas.",
  },
  {
    question: "Quanto peso vou perder?",
    answer:
      "A perda média varia de 10 a 35 kg em 6 meses, dependendo do seu perfil, comprometimento e resposta individual. O acompanhamento multidisciplinar potencializa os resultados.",
  },
  {
    question: "O peso volta depois de retirar o balão?",
    answer:
      "Não, se você seguir o programa completo. O balão é uma ferramenta; a transformação real vem da reeducação alimentar e da mudança de hábitos que trabalhamos durante e após o tratamento. Por isso oferecemos 6-12 meses de manutenção.",
  },
  {
    question: "Quais são os efeitos colaterais?",
    answer:
      "Nos primeiros 3-7 dias podem ocorrer náuseas, desconforto gástrico e adaptação. Os sintomas são temporários e manejados com medicação. Complicações graves são raras (<1%) e incluem migração ou desinsuflação do balão.",
  },
  {
    question: "Quanto custa o tratamento completo?",
    answer:
      "O investimento varia conforme o plano escolhido (Essencial, Completo ou Premium). Inclui balão, consultas, exames e acompanhamento multidisciplinar. Entre em contato para conhecer as condições especiais e o parcelamento.",
  },
  {
    question: "Como é o acompanhamento após o procedimento?",
    answer:
      "Você terá consultas regulares com médico, nutricionista e psicólogo (a frequência varia por plano), suporte via WhatsApp, app de acompanhamento, exames periódicos e ajustes no plano alimentar conforme sua evolução.",
  },
];

export const FAQVendas = () => {
  const handleWhatsApp = () => {
    try {
      trackWhatsAppClick("faq_vendas");
    } catch (e) { void e; }
    window.open(CONTACT.WHATSAPP_Balão_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre o balão intragástrico.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="bg-muted/30 rounded-lg px-6 shadow-sm border-none"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={handleWhatsApp}>
            Ainda tem dúvidas? Fale com uma especialista
          </Button>
        </div>
      </div>
    </section>
  );
};


