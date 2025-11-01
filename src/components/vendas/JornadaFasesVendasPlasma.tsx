import { CheckCircle } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface Fase {
  numero: number;
  titulo: string;
  descricao: string;
  duracao: string;
}

export const JornadaFasesVendasPlasma = () => {
  const fases: Fase[] = [
    {
      numero: 1,
      titulo: "Avaliação Completa",
      descricao: "Consulta inicial + endoscopia diagnóstica para avaliar a dilatação e definir o protocolo ideal.",
      duracao: "1-2 semanas",
    },
    {
      numero: 2,
      titulo: "Procedimento Endoscópico",
      descricao: "Aplicação de plasma de argônio sob sedação. Alta no mesmo dia.",
      duracao: "30-45 minutos",
    },
    {
      numero: 3,
      titulo: "Recuperação Rápida",
      descricao: "Retorno às atividades em 24-48h. Dieta líquida nos primeiros 3 dias.",
      duracao: "1 semana",
    },
    {
      numero: 4,
      titulo: "Acompanhamento Ativo",
      descricao: "Consultas regulares com nutrologia e nutrição. Ajustes no plano alimentar conforme evolução.",
      duracao: "4-6 meses",
    },
    {
      numero: 5,
      titulo: "Manutenção",
      descricao: "Monitoramento contínuo para garantir resultados duradouros e prevenir novo reganho.",
      duracao: "Longo prazo",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-background to-muted/30 overflow-hidden">
      <GrafismoDecor variant="background" position="top-right" size="lg" opacity={0.1} />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Sua Jornada de Transformação
          </h2>
          <p className="text-lg text-muted-foreground">
            Acompanhamento completo desde a primeira consulta até a manutenção dos resultados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {fases.map((fase, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-hover transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">{fase.numero}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{fase.titulo}</h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{fase.duracao}</span>
                  </div>
                  <p className="text-muted-foreground">{fase.descricao}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
