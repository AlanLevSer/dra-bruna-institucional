import { useEffect, useState } from "react";

type Props = {
  initial?: 'rh' | 'empreendedora' | 'saude';
  onChange?: (value: 'rh' | 'empreendedora' | 'saude') => void;
};

const personas = [
  { key: 'rh' as const, title: 'Executiva com rotina intensa (climatério/IMC~36)', sub: 'calendário previsível, alimentação prática, energia/sono.' },
  { key: 'empreendedora' as const, title: 'Empreendedora/Influencer (IMC~37)', sub: 'refeições rápidas, treino inteligente, consistência sem culpas.' },
  { key: 'saude' as const, title: 'Profissional de saúde/pré-diabetes (IMC~35)', sub: 'marcadores, marmitas/lanches, telecheck-ins.' },
];

export default function PerfilSelector({ initial, onChange }: Props) {
  const [value, setValue] = useState<'rh' | 'empreendedora' | 'saude'>(initial || 'rh');
  useEffect(() => { if (initial) setValue(initial); }, [initial]);
  useEffect(() => { onChange?.(value); }, [value, onChange]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">Quem é você hoje?</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {personas.map((p) => (
          <button
            key={p.key}
            className={
              "rounded-2xl border p-4 text-left hover:bg-slate-50 " +
              (value === p.key ? "ring-2 ring-slate-900" : "")
            }
            onClick={() => setValue(p.key)}
            data-event={`persona_select_${p.key}`}
          >
            <div className="font-medium text-slate-900">{p.title}</div>
            <div className="text-sm text-slate-600">{p.sub}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

