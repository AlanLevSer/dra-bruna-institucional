import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const FAQSection = () => {
  const faqs = [
    {
      question: "O balão intragástrico oferece riscos?",
      answer: "O balão intragástrico é um procedimento seguro quando realizado por profissionais experientes. Os riscos são mínimos e incluem náuseas temporárias nos primeiros dias. Nossa equipe faz acompanhamento rigoroso e está preparada para qualquer eventualidade. Realizamos todos os exames pré-procedimento necessários para garantir sua segurança."
    },
    {
      question: "Qual a diferença para a cirurgia bariátrica?",
      answer: "O balão intragástrico é um procedimento reversível, menos invasivo e sem cortes. Não há alteração anatômica permanente do estômago. É ideal para quem precisa perder peso mas não se enquadra nos critérios para cirurgia, ou prefere uma abordagem menos invasiva. O tratamento é temporário (6-12 meses) e foca na reeducação alimentar."
    },
    {
      question: "Em quanto tempo verei resultados?",
      answer: "Os resultados começam a aparecer já nas primeiras semanas. A perda de peso mais significativa ocorre nos primeiros 3-4 meses. Em média, nossos pacientes perdem de 15 a 25% do peso corporal em 6 meses. O importante é que trabalhamos para resultados sustentáveis, não apenas perda rápida de peso."
    },
    {
      question: "Como funciona a manutenção após o tratamento?",
      answer: "A fase de manutenção é fundamental para o sucesso a longo prazo. Oferecemos acompanhamento nutricional e psicológico por 12 meses após a retirada do balão. Você terá acesso ao nosso app de monitoramento, consultas de acompanhamento e grupo de apoio. Ensinamos ferramentas práticas para manter o peso perdido."
    },
    {
      question: "Qual o investimento e formas de pagamento?",
      answer: "O investimento varia de acordo com o plano escolhido e duração do tratamento. Oferecemos opções de parcelamento em até 24x e facilitamos o processo para que o valor não seja um impedimento para sua transformação. Agende uma consulta para receber um orçamento personalizado e conhecer nossas condições especiais."
    },
    {
      question: "O tratamento é coberto por planos de saúde?",
      answer: "Alguns planos de saúde cobrem o procedimento quando há indicação médica específica. Nossa equipe ajuda com toda a documentação necessária para solicitação junto ao seu plano. Mesmo quando não coberto, oferecemos condições facilitadas para tornar o tratamento acessível."
    }
  ];

  const handleSpecialistClick = () => {
    trackEvent('balão_vendas_faq_cta', { timestamp: new Date().toISOString() });
    window.open(CONTACT.WHATSAPP_Balão_VENDAS, "_blank");
  };

  return (
    <section className="py-20 bg-wellness-soft/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Esclarecemos suas principais dúvidas sobre o tratamento
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-wellness-soft rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-wellness-warm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <div className="bg-wellness-warm/5 p-8 rounded-2xl border border-wellness-warm/20">
              <h3 className="text-xl font-bold text-wellness-warm mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nossa equipe está pronta para esclarecer todas as suas questões em uma consulta personalizada.
              </p>
              <Button 
                variant="default"
                onClick={handleSpecialistClick}
                className="bg-wellness-warm hover:bg-wellness-warm/90 text-white px-8 py-3 rounded-full font-semibold"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
