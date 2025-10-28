export default function Pilares() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Os 4 Pilares</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">Nutrição Inteligente</h3>
          <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
            <li>Plano por fases (não restritivo)</li>
            <li>Estratégias de saciedade e prazer</li>
            <li>Educação alimentar para autonomia</li>
          </ul>
        </article>
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">Saúde Metabólica & Regenerativa</h3>
          <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
            <li>Otimização de insulina, glicemia e marcadores inflamatórios</li>
            <li>Nutrição celular para mitocôndrias eficientes</li>
            <li>Protocolos regenerativos para preservar massa magra e queimar gordura</li>
          </ul>
        </article>
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">Corpo em Movimento</h3>
          <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
            <li>Rotina progressiva (sem exageros)</li>
            <li>Força + mobilidade + condicionamento</li>
            <li>Prevenção de dores e lesões</li>
          </ul>
        </article>
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">Mente & Comportamento</h3>
          <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
            <li>Ferramentas de escolha consciente</li>
            <li>Organização alimentar & ambiente</li>
            <li>Estratégias para recaídas e gatilhos</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

