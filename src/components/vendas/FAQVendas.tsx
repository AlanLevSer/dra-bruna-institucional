import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O bal�o intrag�strico d�i?",
    answer:
      "O procedimento � realizado sob seda��o e n�o causa dor. Nos primeiros dias ap�s a coloca��o, � normal sentir desconforto e n�useas leves. Nossa equipe fornece medica��o e suporte completo nessa fase.",
  },
  {
    question: "Quanto tempo dura o procedimento?",
    answer:
      "A coloca��o do bal�o leva de 20 a 30 minutos. � feita por endoscopia, sem cortes ou cirurgia, e voc� recebe alta no mesmo dia ap�s algumas horas de observa��o.",
  },
  {
    question: "Preciso ficar internada?",
    answer:
      "N�o. O procedimento � ambulatorial. Voc� vai para casa no mesmo dia, mas recomendamos repouso nas primeiras 24�48 horas.",
  },
  {
    question: "Quanto peso vou perder?",
    answer:
      "A perda m�dia varia de 10 a 35 kg em 6 meses, dependendo do seu perfil, comprometimento e resposta individual. O acompanhamento multidisciplinar potencializa os resultados.",
  },
  {
    question: "O peso volta depois de retirar o bal�o?",
    answer:
      "N�o, se voc� seguir o programa completo. O bal�o � uma ferramenta; a transforma��o real vem da reeduca��o alimentar e da mudan�a de h�bitos que trabalhamos durante e ap�s o tratamento. Por isso oferecemos 6�12 meses de manuten��o.",
  },
  {
    question: "Quais s�o os efeitos colaterais?",
    answer:
      "Nos primeiros 3�7 dias podem ocorrer n�useas, desconforto g�strico e adapta��o. Os sintomas s�o tempor�rios e manejados com medica��o. Complica��es graves s�o raras (<1%) e incluem migra��o ou desinsufla��o do bal�o.",
  },
  {
    question: "Quanto custa o tratamento completo?",
    answer:
      "O investimento varia conforme o plano escolhido (Essencial, Completo ou Premium). Inclui bal�o, consultas, exames e acompanhamento multidisciplinar. Entre em contato para conhecer as condi��es especiais e o parcelamento.",
  },
  {
    question: "Como � o acompanhamento ap�s o procedimento?",
    answer:
      "Voc� ter� consultas regulares com m�dico, nutricionista e psic�logo (a frequ�ncia varia por plano), suporte via WhatsApp, app de acompanhamento, exames peri�dicos e ajustes no plano alimentar conforme sua evolu��o.",
  },
];

export const FAQVendas = () => {
  const handleWhatsApp = () => {
    try {
      trackEvent("cta_whatsapp_click", {
        location: "faq_vendas",
        path: window.location.pathname,
      });
    } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas d�vidas sobre o bal�o intrag�strico.
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
            Ainda tem d�vidas? Fale com uma especialista
          </Button>
        </div>
      </div>
    </section>
  );
};
