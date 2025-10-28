export default function PrecoBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Valores e condições</h2>
        <p className="mt-2 text-sm text-slate-700">Transparência no investimento e nas opções. Detalhes completos na avaliação.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {['6m','12m','12m (reaj.)'].map((p) => (
            <div key={p} className="rounded-xl border p-4">
              <div className="text-slate-900 font-medium">Balão {p}</div>
              <div className="text-sm text-slate-600">Condição especial por campanha.</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

