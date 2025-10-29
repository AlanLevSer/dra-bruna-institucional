import { useEffect } from "react";

declare global {
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: ClarityFn;
    __analyticsLoaded?: boolean;
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
  }
}

const GTM_ID = "GTM-WZFMV5R7";
const CLARITY_ID = "idm2xm22st";

const loadThirdPartyScripts = () => {
  if (typeof window === "undefined" || window.__analyticsLoaded) {
    return;
  }

  window.__analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtmScript);

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
    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => loadThirdPartyScripts(), { timeout: 2000 });
      } else {
        setTimeout(loadThirdPartyScripts, 1500);
      }
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      const onLoad = () => {
        scheduleLoad();
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  return null;
};

