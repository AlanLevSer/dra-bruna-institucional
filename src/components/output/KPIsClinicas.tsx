import { TransformacaoOutput } from "@/types/quiz";
import { TrendingDown } from "lucide-react";

interface KPIsClinicasProps {
  kpis: TransformacaoOutput['kpis'];
}

export const KPIsClinicas = ({ kpis }: KPIsClinicasProps) => {
  return (
    <div className="py-8 md:py-12 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Indicadores de Sucesso
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Metas clínicas personalizadas para sua jornada
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-lg text-sm md:text-base">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-2 md:p-4 text-left font-semibold text-xs md:text-base">Métrica</th>
                <th className="p-2 md:p-4 text-center font-semibold text-xs md:text-base">Hoje</th>
                <th className="p-2 md:p-4 text-center font-semibold text-xs md:text-base">Meta 12m</th>
                <th className="p-2 md:p-4 text-center font-semibold text-xs md:text-base">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, index) => (
                <tr 
                  key={index}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                   <td className="p-2 md:p-4 font-medium text-xs md:text-base">{kpi.metrica}</td>
                  <td className="p-2 md:p-4 text-center text-muted-foreground text-xs md:text-base">{kpi.antes}</td>
                  <td className="p-2 md:p-4 text-center">
                    <span className="font-bold text-primary text-xs md:text-base">{kpi.meta}</span>
                  </td>
                  <td className="p-2 md:p-4 text-center">
                    <div className="inline-flex items-center gap-1 text-green-600">
                      <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-medium">Melhora</span>
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
