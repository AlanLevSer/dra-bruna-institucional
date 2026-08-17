import { useEffect } from "react";

declare global {
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: ClarityFn;
    __analyticsLoaded?: boolean;
    __clarityLoaded?: boolean;
  }
}

const GTM_ID = "GTM-WZFMV5R7";
const CLARITY_ID = "idm2xm22st";

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

const loadClarity = () => {
  if (typeof window === "undefined" || window.__clarityLoaded) return;
  window.__clarityLoaded = true;

  if (typeof window.clarity !== "function") {
    const queue: unknown[][] = [];
    const clarityFn: ClarityFn = ((...args: unknown[]) => {
      queue.push(args);
    }) as ClarityFn;
    clarityFn.q = queue;
    window.clarity = clarityFn;
  }

  const clarityScript = document.createElement("script");
  clarityScript.async = true;
  clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  clarityScript.crossOrigin = "anonymous";
  document.head.appendChild(clarityScript);
};

export const AnalyticsLoader = () => {
  useEffect(() => {
    const scheduleGTM = () => {
      setTimeout(loadGTM, 800);
    };

    // Clarity deferred to requestIdleCallback — loads when browser is idle,
    // after critical content is interactive. Timeout ensures it loads within 5s.
    const scheduleClarity = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadClarity, { timeout: 5000 });
      } else {
        setTimeout(loadClarity, 3000);
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
