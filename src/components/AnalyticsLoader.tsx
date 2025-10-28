import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: (...args: unknown[]) => void;
    __analyticsLoaded?: boolean;
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

  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      (window.clarity as any).q = (window.clarity as any).q || [];
      (window.clarity as any).q.push(args);
    };

  const clarityScript = document.createElement("script");
  clarityScript.async = true;
  clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(clarityScript);
};

export const AnalyticsLoader = () => {
  useEffect(() => {
    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadThirdPartyScripts, { timeout: 2000 });
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

