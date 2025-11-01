import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";
import { trackEvent } from "@/lib/analytics";
import { openLeadChat } from "@/lib/leadChat";
import { CONTACT } from "@/lib/constants";

interface ProgramaItem {
  titulo: string;
  descricao: string;
}

interface Programa {
  titulo: string;
  duracao: string;
  destaque?: boolean;
  itens: ProgramaItem[];
}

export const ProgramasTratamentoPlasma = () => {
  const programas: Programa[] = [
    {
      titulo: "Sessão Única",
      duracao: "Programa Básico",
      destaque: false,
      itens: [
        { titulo: "Plasma", descricao: "1 sessão de plasma" },
        { titulo: "Consulta com nutrólogo", descricao: "1 consulta com Dra. Bruna Durelli" },
        { titulo: "Consulta com nutricionista", descricao: "1 consulta com nutricionista" },
      ],
    },
    {
      titulo: "Plasma Intermediário",
      duracao: "Programa Mais Escolhido",
      destaque: true,
      itens: [
        { titulo: "Plasma", descricao: "2 sessões de plasma" },
        { titulo: "Consultas com nutrólogo", descricao: "2 consultas de nutrologia" },
        { titulo: "Consultas com nutricionista", descricao: "4 consultas com nutricionista" },
        { titulo: "Acompanhamento", descricao: "4 meses de acompanhamento" },
        { titulo: "Comunidade de apoio no WhatsApp", descricao: "Incluso" },
        { titulo: "Tira-dúvidas com nutricionista pelo WhatsApp", descricao: "Incluso" },
      ],
    },
    {
      titulo: "Pacote Plasma",
      duracao: "Programa Completo",
      destaque: false,
      itens: [
        { titulo: "Plasma", descricao: "3 sessões de plasma" },
        { titulo: "Consultas com nutrólogo", descricao: "3 consultas com Dra. Bruna Durelli" },
        { titulo: "Consultas com nutricionista", descricao: "6 consultas com nutricionista" },
        { titulo: "Acompanhamento", descricao: "6 meses de acompanhamento" },
        { titulo: "Comunidade de apoio no WhatsApp", descricao: "Incluso" },
        { titulo: "Tira-dúvidas com nutricionista pelo WhatsApp", descricao: "Incluso" },
      ],
    },
  ];

  const escolher = (programa: string) => {
    trackEvent("programa_clicked", { source: "plasma_programas", programa });
    openLeadChat("plasma_programas", CONTACT.WHATSAPP_PLASMA_VENDAS);
  };

  return (
    <section id="programas" className="relative py-16 md:py-24 bg-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Escolha Seu Programa
          </h2>
          <p className="text-lg text-muted-foreground">
            Programas personalizados com acompanhamento especializado para garantir seus resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {programas.map((programa, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-elegant hover:shadow-hover transition-all relative ${
                programa.destaque ? "border-2 border-primary scale-105" : "border border-border/50"
              }`}
            >
              {programa.destaque && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-premium text-white">
                  Mais Escolhido
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{programa.titulo}</h3>
                <p className="text-sm text-muted-foreground">{programa.duracao}</p>
              </div>

              <div className="space-y-4 mb-8">
                {programa.itens.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">{item.titulo}</p>
                      <p className="text-muted-foreground">{item.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${programa.destaque ? "bg-gradient-premium" : ""}`}
                variant={programa.destaque ? "default" : "outline"}
                onClick={() => escolher(programa.titulo)}
              >
                Escolher Este Programa
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
