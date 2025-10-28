export type EventSourceEl = HTMLElement & { dataset: DOMStringMap };

type DataLayerEvent = Record<string, unknown>;
type DataLayerWindow = Window & { dataLayer?: DataLayerEvent[] };

export const fireDataEvent = (el: EventSourceEl, extra?: Record<string, unknown>) => {
  const eventName = el.dataset.event || 'interaction';
  if (typeof window === 'undefined') {
    return;
  }
  const dataLayer = (window as DataLayerWindow).dataLayer;
  if (!Array.isArray(dataLayer)) {
    return;
  }

  dataLayer.push({ event: eventName, ...(extra ?? {}) });
};
