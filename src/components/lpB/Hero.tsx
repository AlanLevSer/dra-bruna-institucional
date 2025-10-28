import { isGoogleSource, isMetaSource } from "@/lib/utm";
import { fireDataEvent } from "@/lib/events";

export default function Hero() {
  const google = isGoogleSource();
  const meta = isMetaSource();
  const primaryLabel = google ? "Agendar minha avaliação" : meta ? "Fazer teste de 60s" : "Agendar minha avaliação";

  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Emagreça com leveza, ciência e zero culpa.
            </h1>
            <p className="mt-4 text-slate-700">
              Balão intragástrico como <strong>apoio</strong> + programa interdisciplinar da <strong>Dra. Bruna Durelli</strong> (Nutrição Inteligente, Saúde Metabólica & Regenerativa, Corpo em Movimento, Mente & Comportamento) para tratar <strong>causas</strong> — e manter resultados.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={meta ? "#oferta" : "#lead"}
                data-event="cta_click_hero_primary"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-white shadow-sm hover:bg-slate-800"
                onClick={(e) => fireDataEvent(e.currentTarget as import("@/lib/events").EventSourceEl)}
              >
                {primaryLabel}
              </a>
              <a
                href="#oferta"
                data-event="cta_click_hero_quiz"
                className="inline-flex items-center rounded-2xl border px-4 py-2 text-slate-900 hover:bg-slate-50"
                onClick={(e) => fireDataEvent(e.currentTarget as import("@/lib/events").EventSourceEl)}
              >
                Fazer teste de 60s
              </a>
              <a
                href="#guia"
                data-event="cta_click_hero_guide"
                className="inline-flex items-center rounded-2xl border px-4 py-2 text-slate-900 hover:bg-slate-50"
                onClick={(e) => fireDataEvent(e.currentTarget as import("@/lib/events").EventSourceEl)}
              >
                Baixar guia 7 dias
              </a>
            </div>
            <p className="mt-2 text-xs text-slate-500">Primeira conversa acolhedora, sem compromisso.</p>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
