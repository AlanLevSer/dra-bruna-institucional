export default function Resultados() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Resultados</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border p-4 shadow-sm">
            <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
            <p className="mt-2 text-sm text-slate-600">Antes e depois real, supervisão clínica.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

