import { useEffect, useRef } from "react";
import { attachPhoneMask } from "@/lib/phoneMask";
import { fireDataEvent } from "@/lib/events";

export default function MiniFormTop() {
  const phoneRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => attachPhoneMask(phoneRef.current || null), []);

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <form aria-labelledby="mini-form-title" className="grid gap-3 sm:grid-cols-4">
          <h2 id="mini-form-title" className="sr-only">Agende sua avaliação</h2>
          <input className="rounded-xl border px-3 py-2" name="name" placeholder="Nome" required />
          <input className="rounded-xl border px-3 py-2" name="city" placeholder="Cidade/UF" required />
          <input ref={phoneRef} className="rounded-xl border px-3 py-2" name="whatsapp" placeholder="WhatsApp" required inputMode="tel" autoComplete="tel" />
          <button data-event="lead_submit_mini_top" onClick={(e) => fireDataEvent(e.currentTarget as import("@/lib/events").EventSourceEl)} className="rounded-xl bg-slate-900 px-4 py-2 text-white">Agendar minha avaliação</button>
        </form>
      </div>
    </section>
  );
}
