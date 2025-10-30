import { useEffect } from "react";

declare global {
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
  type FBQFunction = ((...args: unknown[]) => void) & {
    push?: FBQFunction;
    loaded?: boolean;
    version?: string;
    queue?: unknown[][];
  };
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: ClarityFn;
    fbq?: FBQFunction;
    _fbq?: FBQFunction;
    __analyticsLoaded?: boolean;
    __fbPixelLoaded?: boolean;
  }
}

const GTM_ID = "GTM-WZFMV5R7";
const CLARITY_ID = "idm2xm22st";
const FB_PIXEL_ID = "3581322512114101";

const initFacebookPixel = () => {
  if (typeof window === "undefined" || window.__fbPixelLoaded) {
    return;
  }

  if (!window.fbq) {
    const fbq: FBQFunction = ((...args: unknown[]) => {
      fbq.queue?.push(args);
    }) as FBQFunction;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    window.fbq = fbq;
    window._fbq = fbq;

    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(fbScript);
  }

  window.fbq?.("init", FB_PIXEL_ID);
  window.fbq?.("track", "PageView");

  if (!document.querySelector('[data-fb-pixel="noscript"]')) {
    const img = document.createElement("img");
    img.setAttribute("data-fb-pixel", "noscript");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
    document.body.appendChild(img);
  }

  window.__fbPixelLoaded = true;
};

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

  initFacebookPixel();
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
