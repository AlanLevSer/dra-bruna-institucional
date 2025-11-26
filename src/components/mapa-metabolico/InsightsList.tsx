import { Lightbulb } from 'lucide-react';

interface InsightsListProps {
  insights: string[];
}

export const InsightsList = ({ insights }: InsightsListProps) => {
  if (insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">Insights do seu mapa</h3>
          <p className="text-sm text-muted-foreground mt-1">Padrões identificados na sua avaliação</p>
        </div>
      </div>

      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
