export const CLARITY_ID = "idm2xm22st";

declare global {
  type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
  interface Window {
    clarity?: ClarityFn;
    __clarityLoaded?: boolean;
  }
}

// Idempotent — safe to call before the real Clarity script loads.
// Creates a queue-proxy so events fired before the script loads are
// buffered and replayed when the script finishes.
export const initClarityQueue = () => {
  if (typeof window === "undefined" || typeof window.clarity === "function") return;
  const queue: unknown[][] = [];
  const clarityFn: ClarityFn = ((...args: unknown[]) => {
    queue.push(args);
  }) as ClarityFn;
  clarityFn.q = queue;
  window.clarity = clarityFn;
};

// Idempotent — injects the Clarity script exactly once.
// Called eagerly on the first CRO event so the script loads before
// the user navigates away (e.g. WhatsApp redirect).
// Also called via requestIdleCallback for sessions with no interaction.
export const ensureClarityLoaded = () => {
  if (typeof window === "undefined" || window.__clarityLoaded) return;
  window.__clarityLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
};
