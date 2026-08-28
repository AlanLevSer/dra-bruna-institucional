import { useEffect } from "react";
import { initClarityQueue, ensureClarityLoaded } from "@/lib/clarity";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __analyticsLoaded?: boolean;
  }
}

const GTM_ID = "GTM-WZFMV5R7";

const loadGTM = () => {
  if (typeof window === "undefined" || window.__analyticsLoaded) return;
  window.__analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtmScript);
};

export const AnalyticsLoader = () => {
  useEffect(() => {
    // Queue proxy set up immediately so events before idle callback are buffered,
    // not lost. The real Clarity script replays the queue on load.
    initClarityQueue();

    const scheduleGTM = () => {
      setTimeout(loadGTM, 800);
    };

    // Clarity script deferred to requestIdleCallback for sessions with no
    // interaction. On the first CRO event, ensureClarityLoaded() fires eagerly
    // from trackEvent() — this idle path is the fallback for passive sessions.
    const scheduleClarity = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(ensureClarityLoaded, { timeout: 5000 });
      } else {
        setTimeout(ensureClarityLoaded, 3000);
      }
    };

    if (document.readyState === "complete") {
      scheduleGTM();
      scheduleClarity();
    } else {
      window.addEventListener("load", () => {
        scheduleGTM();
        scheduleClarity();
      }, { once: true });
    }
  }, []);

  return null;
};
