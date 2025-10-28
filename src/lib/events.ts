export type EventSourceEl = HTMLElement & { dataset: DOMStringMap };

export const fireDataEvent = (el: EventSourceEl, extra?: Record<string, unknown>) => {
  const ev = el.dataset.event || 'interaction';
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    try {
      (window as any).dataLayer.push({ event: ev, ...(extra || {}) });
    } catch {}
  }
};

