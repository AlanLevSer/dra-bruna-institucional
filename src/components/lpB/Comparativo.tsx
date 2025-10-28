export default function Comparativo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Comparativo</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">6 meses</h3>
          <p className="mt-2 text-sm text-slate-700">“arranque” concentrado para virar a chave.</p>
        </article>
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">12 meses</h3>
          <p className="mt-2 text-sm text-slate-700">janela longa para consolidar hábitos sob alta demanda.</p>
        </article>
        <article className="rounded-2xl border p-5 shadow-sm">
          <h3 className="font-semibold">12 meses (reajustável)</h3>
          <p className="mt-2 text-sm text-slate-700">flexibilidade para ajustar durante o período.</p>
        </article>
      </div>
      <p className="mt-3 text-sm text-slate-600">Nota: elegibilidade e modelo definidos em <strong>avaliação médica</strong>; <strong>recuperação geralmente curta</strong> nos primeiros dias.</p>
    </section>
  );
}

