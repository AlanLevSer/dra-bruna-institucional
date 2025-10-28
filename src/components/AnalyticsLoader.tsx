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

