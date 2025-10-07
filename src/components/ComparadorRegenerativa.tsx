import { Check, X } from "lucide-react";
import { GrafismoDecor } from "@/components/GrafismoDecor";

interface ItemComparacao {
  aspecto: string;
  semRegenerativa: string;
  comRegenerativa: string;
}

const dados: ItemComparacao[] = [
  {
    aspecto: "Foco do Tratamento",
    semRegenerativa: "Apenas calorias e peso na balança",
    comRegenerativa: "Qualidade celular, energia e composição corporal"
  },
  {
    aspecto: "Energia no Dia a Dia",
    semRegenerativa: "Fadiga crônica, irritabilidade",
    comRegenerativa: "Disposição sustentada, foco mental"
  },
  {
    aspecto: "Preservação Muscular",
    semRegenerativa: "Perda de massa magra junto com gordura",
    comRegenerativa: "Protocolos para manter força e músculo"
  },
  {
    aspecto: "Pele & Cabelo",
    semRegenerativa: "Flacidez, queda capilar, envelhecimento",
    comRegenerativa: "Suporte regenerativo para elasticidade"
  },
  {
    aspecto: "Risco de Recaídas",
    semRegenerativa: "Frequentes (corpo pede energia)",
    comRegenerativa: "Reduzidas (corpo nutrido adequadamente)"
  },
  {
    aspecto: "Resultados Longo Prazo",
    semRegenerativa: "Efeito rebote comum, frustração",
    comRegenerativa: "Manutenção estável, autonomia"
  }
];

export const ComparadorRegenerativa = () => {
  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <GrafismoDecor variant="background" position="bottom-right" size="md" opacity={0.18} rotate={-25} color="gray" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-center">
          Com vs. Sem Abordagem Regenerativa
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          Compare os resultados de um tratamento convencional vs. nossa abordagem regenerativa
        </p>

        {/* Desktop: Tabela lado a lado */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-6 font-serif text-lg text-foreground">Aspecto</th>
                <th className="text-left py-4 px-6 font-serif text-lg text-destructive/80">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5" />
                    <span>Sem Regenerativa</span>
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-serif text-lg text-primary">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Com Regenerativa</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{item.aspecto}</td>
                  <td className="py-4 px-6 text-muted-foreground bg-destructive/5">{item.semRegenerativa}</td>
                  <td className="py-4 px-6 text-foreground bg-primary/5 font-medium">{item.comRegenerativa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet: Cards alternados */}
        <div className="lg:hidden space-y-6">
          {dados.map((item, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-elegant border border-border/50">
              <h3 className="text-lg font-serif font-bold text-foreground mb-4">{item.aspecto}</h3>
              
              <div className="space-y-4">
                <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive/30">
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-4 h-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive">Sem Regenerativa</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.semRegenerativa}</p>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium text-primary">Com Regenerativa</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">{item.comRegenerativa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-accent/10 border-l-4 border-accent rounded-lg p-6 max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Nota importante:</strong> Os resultados variam conforme 
            histórico clínico, adesão ao protocolo e exames de acompanhamento. Todos os protocolos são 
            individualizados e acompanhados pela equipe médica.
          </p>
        </div>
      </div>
    </section>
  );
};
