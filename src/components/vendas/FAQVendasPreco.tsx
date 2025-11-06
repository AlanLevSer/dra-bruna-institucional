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
    question: "O valor é fixo ou varia?",
    answer: "Varia conforme o tipo de balão (6, 12 meses ou ajustável) e o plano escolhido (Essencial, Completo ou Premium).",
  },
  {
    question: "O valor inclui o acompanhamento completo?",
    answer: "Sim. Todos os planos incluem consultas médicas, acompanhamento nutricional, suporte psicológico e acompanhamento via WhatsApp.",
  },
  {
    question: "Posso parcelar o tratamento?",
    answer: "Sim! Trabalhamos com condições flexíveis e parcelamento facilitado via cartão de crédito.",
  },
  {
    question: "Há custos extras?",
    answer: "Não. Tudo é definido na pré-consulta e formalizado em contrato, sem surpresas.",
  },
  {
    question: "Posso fazer uma simulação de valor?",
    answer: "Sim. Após preencher o formulário, nossa equipe envia uma estimativa personalizada conforme seu perfil clínico e objetivo.",
  },
  {
    question: "Vale a pena o investimento?",
    answer: "O balão intragástrico oferece resultados comprovados. Compare: quanto você já gastou em dietas, academias e remédios sem resultado duradouro?",
  },
  {
    question: "Quanto custa o tratamento completo?",
    answer: "O investimento varia de acordo com o protocolo escolhido. Entre em contato para uma avaliação personalizada e valores exatos.",
  },
  {
    question: "Como é o acompanhamento após o procedimento?",
    answer: "Você terá consultas regulares, suporte via WhatsApp, acompanhamento nutricional e psicológico incluídos no valor.",
  },
];

const FAQVendasPreco = () => {
  const handleWhatsApp = () => {
    openLeadChat('faq_preco', CONTACT.WHATSAPP_BALAO_VENDAS);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Antes de pensar em preço, pense no valor de viver bem.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-elegant hover:shadow-hover transition-all border-none"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center space-y-4">
            <p className="text-lg">
              Ainda tem dúvidas sobre valores e condições?
            </p>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base px-8 py-6 h-auto shadow-elegant hover:shadow-hover"
            >
              Consultar Valores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQVendasPreco;
