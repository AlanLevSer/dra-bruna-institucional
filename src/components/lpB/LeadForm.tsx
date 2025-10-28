import { useEffect, useMemo, useRef, useState } from "react";
import { isGoogleSource, isMetaSource } from "@/lib/utm";
import { attachPhoneMask } from "@/lib/phoneMask";

type Props = {
  initialPersona?: 'rh' | 'empreendedora' | 'saude';
};

export default function LeadForm({ initialPersona }: Props) {
  const google = isGoogleSource();
  const meta = isMetaSource();
  const isOneStep = google && !meta;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', whatsapp: '', city: '', perfil: initialPersona || 'rh', objetivo: '', lgpd: false });
  const phoneRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => attachPhoneMask(phoneRef.current), []);
  useEffect(() => { if (initialPersona) setForm((f) => ({ ...f, perfil: initialPersona })); }, [initialPersona]);

  useEffect(() => { if (isOneStep) setStep(1); }, [isOneStep]);

  const canNext = useMemo(() => form.name && form.whatsapp, [form]);
  const canSubmit = useMemo(() => {
    if (isOneStep) return form.name && form.whatsapp && form.city && form.objetivo && form.lgpd;
    return form.city && form.perfil && form.objetivo && form.lgpd;
  }, [form, isOneStep]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Push event via dataset attribute used by upstream listeners
    const btn = (e.target as HTMLFormElement).querySelector('[data-event]') as HTMLElement | null;
    btn?.dispatchEvent(new Event('click', { bubbles: true }));
    // For now just log
    console.log('Lead', form);
    alert('Recebemos seus dados. Entraremos em contato!');
  };

  return (
    <section id="lead" className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Agende sua avaliação</h2>
        <form aria-labelledby="lead" onSubmit={onSubmit} className="mt-4 grid gap-3">
          {(!isOneStep && step === 1) && (
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl border px-3 py-2" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input ref={phoneRef} className="rounded-xl border px-3 py-2" placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} inputMode="tel" autoComplete="tel" required />
              <div className="sm:col-span-2 flex justify-end">
                <button type="button" disabled={!canNext} onClick={() => setStep(2)} data-event="lead_next_meta" className="rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50">Continuar</button>
              </div>
            </div>
          )}

          {(isOneStep || step === 2) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {isOneStep && (
                <>
                  <input className="rounded-xl border px-3 py-2" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <input ref={phoneRef} className="rounded-xl border px-3 py-2" placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} inputMode="tel" autoComplete="tel" required />
                </>
              )}
              <input className="rounded-xl border px-3 py-2" placeholder="Cidade/UF" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
              {!isOneStep && (
                <select className="rounded-xl border px-3 py-2" value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value as typeof form.perfil })}>
                  <option value="rh">Executiva com rotina intensa</option>
                  <option value="empreendedora">Empreendedora/Influencer</option>
                  <option value="saude">Profissional de saúde/pré-diabetes</option>
                </select>
              )}
              <input className="sm:col-span-2 rounded-xl border px-3 py-2" placeholder="Objetivo" value={form.objetivo} onChange={(e) => setForm({ ...form, objetivo: e.target.value })} required />
              <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.lgpd} onChange={(e) => setForm({ ...form, lgpd: e.target.checked })} required />
                Concordo com o uso dos meus dados para contato sobre a avaliação e informações do programa (LGPD).
              </label>
              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <button data-event="lead_submit" type="submit" disabled={!canSubmit} className="rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50">Enviar</button>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" data-event="lead_whatsapp_alt" className="rounded-xl border px-4 py-2 text-slate-900 hover:bg-slate-50">WhatsApp</a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
