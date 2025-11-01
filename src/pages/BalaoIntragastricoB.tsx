import Header from "@/components/lpB/Header";
import Hero from "@/components/lpB/Hero";
import MiniFaq from "@/components/lpB/MiniFaq";
import Proof from "@/components/lpB/Proof";
import Pilares from "@/components/lpB/Pilares";
import PerfilSelector from "@/components/lpB/PerfilSelector";
import Comparativo from "@/components/lpB/Comparativo";
import Resultados from "@/components/lpB/Resultados";
import Oferta from "@/components/lpB/Oferta";
import PrecoBlock from "@/components/lpB/PrecoBlock";
import Faq from "@/components/lpB/Faq";
import LeadChatWidget from "@/components/LeadChatWidget";
import { Footer } from "@/components/Footer";
import { getPersona, isGoogleSource, isMetaSource, isPriceCampaign } from "@/lib/utm";
import { useMemo } from "react";

export default function BalãoIntragastricoB() {
  const google = isGoogleSource();
  const meta = isMetaSource();
  const persona = useMemo(() => getPersona(), []);
  const showPrice = isPriceCampaign();

  const handleCTAClick = () => {
    if (typeof window !== "undefined" && window.LeadChat) {
      window.LeadChat.open();
    }
  };

  return (
    <div className="bg-background">
      <Header onPrimaryClick={handleCTAClick} />
      <main>
        <Hero />
        {showPrice && <PrecoBlock />}

        {google && (
          <>
            <MiniFaq />
          </>
        )}

        {meta ? (
          <>
            <Resultados />
            <Pilares />
            <Comparativo />
          </>
        ) : (
          <>
            <Comparativo />
            <Pilares />
          </>
        )}

        <PerfilSelector initial={persona} />
        <Proof />
        <Oferta />
        <Faq />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 backdrop-blur md:hidden p-3 flex items-center justify-between">
        <button onClick={handleCTAClick} data-event="cta_click_sticky_primary" className="rounded-xl bg-slate-900 px-4 py-2 text-white">{google ? 'Agendar minha avaliação' : 'Fazer teste de 60s'}</button>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" data-event="cta_click_sticky_whatsapp" className="rounded-xl border px-4 py-2 text-slate-900">WhatsApp</a>
      </div>

      <Footer />
      <LeadChatWidget origin={`balao-b-${persona || 'default'}`} />
    </div>
  );
}

