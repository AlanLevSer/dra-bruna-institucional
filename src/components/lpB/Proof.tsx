export default function Proof() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Histórias reais, resultados sustentáveis</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="h-24 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" />
              <p className="mt-2 text-sm text-slate-600">"Melhorei minha relação com a comida e ganhei energia."</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

