import { isGoogleSource, isMetaSource } from "@/lib/utm";
import { fireDataEvent } from "@/lib/events";

type Props = {
  onPrimaryClick?: () => void;
};

export default function Header({ onPrimaryClick }: Props) {
  const google = isGoogleSource();
  const meta = isMetaSource();
  const primaryLabel = google ? "Agendar minha avaliação" : meta ? "Fazer teste de 60s" : "Agendar minha avaliação";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-slate-900">Dra. Bruna Durelli</a>
        <nav className="flex items-center gap-2">
          <a
            href="#lead"
            data-event="cta_click_top_primary"
            onClick={(e) => { fireDataEvent(e.currentTarget as any); onPrimaryClick?.(); }}
            className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-white text-sm shadow-sm hover:bg-slate-800"
          >
            {primaryLabel}
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_click_top_whatsapp"
            onClick={(e) => fireDataEvent(e.currentTarget as any)}
            className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm text-slate-900 hover:bg-slate-50"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
