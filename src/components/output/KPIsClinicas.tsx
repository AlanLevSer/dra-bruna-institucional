import { TransformacaoOutput } from "@/types/quiz";
import { TrendingDown } from "lucide-react";

interface KPIsClinicasProps {
  kpis: TransformacaoOutput['kpis'];
}

export const KPIsClinicas = ({ kpis }: KPIsClinicasProps) => {
  return (
    <div className="py-12 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Indicadores de Sucesso
          </h2>
          <p className="text-muted-foreground">
            Metas clínicas personalizadas para sua jornada
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-4 text-left font-semibold">Métrica</th>
                <th className="p-4 text-center font-semibold">Hoje</th>
                <th className="p-4 text-center font-semibold">Meta em 12 meses</th>
                <th className="p-4 text-center font-semibold">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, index) => (
                <tr 
                  key={index}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4 font-medium">{kpi.metrica}</td>
                  <td className="p-4 text-center text-muted-foreground">{kpi.antes}</td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-primary">{kpi.meta}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-green-600">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm font-medium">Melhora</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-center">
            <strong>Nota:</strong> Estas metas são baseadas em evidências clínicas e serão ajustadas 
            durante sua avaliação inicial com a Dra. Bruna.
          </p>
        </div>
      </div>
    </div>
  );
};
