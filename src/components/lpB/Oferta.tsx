export default function Oferta() {
  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Oferta: Quiz + Guia</h2>
        <p className="mt-2 text-slate-700">Descubra seu melhor caminho em 60 segundos e receba o Guia de 7 dias.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="#lead" data-event="cta_click_oferta_quiz" className="rounded-2xl bg-slate-900 px-4 py-2 text-white shadow-sm hover:bg-slate-800">Fazer teste de 60s</a>
          <a id="guia" href="#lead" data-event="cta_click_oferta_guide" className="rounded-2xl border px-4 py-2 text-slate-900 hover:bg-slate-50">Baixar guia 7 dias</a>
        </div>
      </div>
    </section>
  );
}

