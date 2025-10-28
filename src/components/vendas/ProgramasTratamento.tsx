import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface Programa {
  titulo: string;
  duracao: string;
  destaque?: boolean;
  itens: { titulo: string; descricao: string }[];
}

const programas: Programa[] = [
  {
    titulo: "12 Meses",
    duracao: "Programa Completo",
    itens: [
      { titulo: "Balão", descricao: "1 balão gástrico 12 meses" },
      { titulo: "Consultas com nutrólogo", descricao: "12 consultas de nutrologia com a Dra. Bruna" },
      { titulo: "Consultas com nutricionista", descricao: "24 consultas com nutricionista" },
      { titulo: "Bioimpedância", descricao: "12" },
      { titulo: "Comunidade de apoio no WhatsApp", descricao: "Incluso" },
      { titulo: "Tira‑dúvidas com nutricionista pelo WhatsApp", descricao: "Incluso" },
    ],
  },
  {
    titulo: "6 Meses",
    duracao: "Programa Mais Escolhido",
    destaque: true,
    itens: [
      { titulo: "Balão", descricao: "1 balão gástrico 6 meses" },
      { titulo: "Consultas com nutrólogo", descricao: "6 consultas de nutrologia com a Dra. Bruna" },
      { titulo: "Consultas com nutricionista", descricao: "12 consultas com nutricionista" },
      { titulo: "Bioimpedância", descricao: "6" },
      { titulo: "Comunidade de apoio no WhatsApp", descricao: "Incluso" },
      { titulo: "Tira‑dúvidas com nutricionista pelo WhatsApp", descricao: "Incluso" },
    ],
  },
  {
    titulo: "12 Meses",
    duracao: "Programa Reajustável",
    itens: [
      { titulo: "Balão", descricao: "1 balão gástrico 12 meses (reajustável)" },
      { titulo: "Consultas com nutrólogo", descricao: "12 consultas de nutrologia com a Dra. Bruna" },
      { titulo: "Consultas com nutricionista", descricao: "24 consultas com nutricionista" },
      { titulo: "Bioimpedância", descricao: "12" },
      { titulo: "Comunidade de apoio no WhatsApp", descricao: "Incluso" },
      { titulo: "Tira‑dúvidas com nutricionista pelo WhatsApp", descricao: "Incluso" },
    ],
  },
];

export const ProgramasTratamento = () => {
  const escolher = (programa: string) => {
    try { trackEvent('programas_tratamento_cta', { programa, path: window.location.pathname }); } catch {}
    window.open(CONTACT.WHATSAPP_BALAO_VENDAS, '_blank');
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Programas de Tratamento</h2>
          <p className="text-muted-foreground">Compare nossos programas e escolha o ideal para sua jornada de transformação</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programas.map((p, idx) => (
            <div
              key={idx}
              className={`relative bg-card rounded-2xl p-8 shadow-elegant hover:shadow-hover transition-all border ${p.destaque ? 'border-primary/60 ring-1 ring-primary/20 scale-[1.02]' : 'border-border/50'}`}
            >
              {p.destaque && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-5 py-1.5 rounded-full text-[11px] md:text-xs font-bold tracking-wide text-primary-foreground shadow-lg bg-gradient-premium ring-1 ring-white/40 backdrop-blur-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/90 rounded-full animate-pulse" />
                    PROGRAMA MAIS ESCOLHIDO
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{p.titulo}</h3>
                <p className="text-base md:text-lg mt-1 font-semibold text-primary font-serif">{p.duracao}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {p.itens.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium">{item.titulo}</p>
                      <p className="text-xs text-muted-foreground">{item.descricao}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-premium hover:opacity-90 text-primary-foreground" onClick={() => escolher(p.duracao)}>
                Escolher Este Programa
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


