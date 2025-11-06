import { Button } from "@/components/ui/button";
import { Activity, Heart, Smartphone, ClipboardCheck, TrendingUp } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { openLeadChat } from "@/lib/leadChat";
import { trackPricingCTAClick } from "@/lib/analytics";

const includedItems = [
  {
    icon: Activity,
    title: "Procedimento Completo",
    description: "Procedimento endoscópico com segurança e sedação leve",
  },
  {
    icon: Heart,
    title: "Equipe Multidisciplinar",
    description: "Acompanhamento médico, nutricional e psicológico",
  },
  {
    icon: Smartphone,
    title: "Monitoramento Contínuo",
    description: "Acompanhamento via WhatsApp e app exclusivo",
  },
  {
    icon: ClipboardCheck,
    title: "Exames e Revisões",
    description: "Exames, ajustes e revisões regulares",
  },
  {
    icon: TrendingUp,
    title: "Programa de Manutenção",
    description: "Acompanhamento após retirada do balão",
  },
];

const WhatsIncludedSection = () => {
  const handleWhatsApp = () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    trackPricingCTAClick({
      source: 'whats_included_preco',
      section: 'whats_included',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
    
    openLeadChat('whats_included_preco', CONTACT.WHATSAPP_BALAO_VENDAS, {
      section: 'whats_included',
      position: 'middle',
      scroll_depth: scrollDepth,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              O que está incluso no valor do tratamento
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Você não paga por um balão. Você investe em uma estrutura médica completa.
            </p>
          </div>

          {/* Grid de itens inclusos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover hover:-translate-y-1 transition-all"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Badge de destaque */}
          <div className="text-center space-y-6">
            <div className="inline-block bg-primary/10 text-primary rounded-full px-6 py-3 font-medium">
              Clínica premium no Jardim Paulista - Mais de 3.000 pacientes transformados
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo isso dentro de uma clínica premium no Jardim Paulista, referência em emagrecimento e longevidade em São Paulo.
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

export default WhatsIncludedSection;
