import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Sparkles, Utensils } from 'lucide-react';
import type { ScoreResult } from '@/lib/mapa-metabolico/types';

interface PillarCardProps {
  pillarKey: keyof ScoreResult['pillars'];
  score: number;
  status: 'OK' | 'Atencao' | 'Critico';
}

export const PillarCard = ({ pillarKey, score, status }: PillarCardProps) => {
  const pillarConfig = {
    nutricao: {
      name: 'Nutrição Inteligente',
      icon: Utensils,
      description: getDescription('nutricao', status),
    },
    metabolica_regenerativa: {
      name: 'Saúde Metabólica & Regenerativa',
      icon: Sparkles,
      description: getDescription('metabolica_regenerativa', status),
    },
    movimento: {
      name: 'Corpo em Movimento',
      icon: Activity,
      description: getDescription('movimento', status),
    },
    mente_comportamento: {
      name: 'Mente & Comportamento',
      icon: Brain,
      description: getDescription('mente_comportamento', status),
    },
  };

  const config = pillarConfig[pillarKey];
  const Icon = config.icon;

  const statusConfig = {
    OK: { variant: 'default' as const, label: 'OK', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    Atencao: {
      variant: 'secondary' as const,
      label: 'Atenção',
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    Critico: {
      variant: 'destructive' as const,
      label: 'Crítico',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  };

  const statusDetails = statusConfig[status];

  return (
    <div className={`p-6 rounded-2xl border border-border ${statusDetails.bg} transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-background">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{config.name}</h3>
            <p className="text-2xl font-bold mt-1 text-foreground">{score}/100</p>
          </div>
        </div>
        <Badge variant={statusDetails.variant} className="font-medium">
          {statusDetails.label}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{config.description}</p>
    </div>
  );
};

function getDescription(pillar: string, status: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    nutricao: {
      OK: 'Seus hábitos alimentares estão alinhados com uma nutrição inteligente.',
      Atencao: 'Alguns ajustes na alimentação podem otimizar seus resultados.',
      Critico: 'Sua nutrição precisa de revisão para destravar energia e peso.',
    },
    metabolica_regenerativa: {
      OK: 'Sua saúde metabólica está em boa condição.',
      Atencao: 'Há sinais que merecem atenção para prevenir desequilíbrios metabólicos.',
      Critico: 'Detectamos padrões que sugerem desregulação metabólica.',
    },
    movimento: {
      OK: 'Seu corpo está em movimento adequado para saúde e metabolismo.',
      Atencao: 'Aumentar a frequência de exercícios pode acelerar seus resultados.',
      Critico: 'Sedentarismo está impactando negativamente seu metabolismo.',
    },
    mente_comportamento: {
      OK: 'Sua relação com comida e hábitos está equilibrada.',
      Atencao: 'Trabalhar gatilhos emocionais pode facilitar a manutenção do peso.',
      Critico: 'Padrões emocionais e comportamentais estão sabotando seus esforços.',
    },
  };

  return descriptions[pillar]?.[status] || 'Análise não disponível.';
}
