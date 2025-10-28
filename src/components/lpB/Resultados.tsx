export default function Resultados() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Resultados</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Mais energia","Sono melhor","Relação leve com a comida","Redução de medidas"].map((t) => (
          <div key={t} className="rounded-2xl border p-4 shadow-sm">
            <div className="h-24 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" aria-hidden />
            <p className="mt-2 text-sm text-slate-700">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

