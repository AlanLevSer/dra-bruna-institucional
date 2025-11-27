import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

import { getStoredUTMContext, rememberVisitContext } from "./utm";

type PandaPlayerInstance = {
  onEvent: (event: string, callback: (payload?: number) => void) => void;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, string | number | boolean | null | undefined>,
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
    pandascripttag?: Array<() => void>;
    pandaplayer?: (id: string) => PandaPlayerInstance | undefined;
  }
}

const WHATSAPP_WEBHOOK_URL =
  "https://hook.eu2.make.com/a8npmvf1rzbfjw8c1iigmm1lqezfhd37";

const sendToAnalytics = (metric: Metric) => {
  const payload = {
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    event_category: "Web Vitals",
    rating: metric.rating,
  } as const;

  if (window.gtag) {
    window.gtag(
      "event",
      metric.name,
      payload as Record<string, string | number | boolean | null | undefined>,
    );
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: "web_vital",
      metric_name: metric.name,
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log("Web Vital:", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
};

export const initWebVitals = () => {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

export const observePerformance = () => {
  if (typeof PerformanceObserver === "undefined") {
    return;
  }

  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50 && import.meta.env.DEV) {
          console.warn(
            "Long task detected:",
            entry.duration.toFixed(2),
            "ms",
          );
        }
      }
    });

    const supportedEntries = (
      PerformanceObserver as unknown as { supportedEntryTypes?: string[] }
    ).supportedEntryTypes;

    if (Array.isArray(supportedEntries) && supportedEntries.includes("longtask")) {
      longTaskObserver.observe({ entryTypes: ["longtask"] });
    }
  } catch (error) {
    void error;
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (window.gtag) {
    window.gtag(
      "event",
      eventName,
      params as Record<string, string | number | boolean | null | undefined> | undefined,
    );
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...(params || {}) });
  }
  if (import.meta.env.DEV) {
    console.log("Analytics event:", eventName, params);
  }
};

export const getValueBucket = (value: number): string => {
  if (value === 0) return "0";
  if (value <= 500) return "1-500";
  if (value <= 1000) return "501-1000";
  if (value <= 2000) return "1001-2000";
  if (value <= 3000) return "2001-3000";
  return "3000+";
};

export const trackPerfilSaudeViewed = (notaGlobal: number, conceito: string) => {
  trackEvent("perfil_saude_viewed", {
    nota_global_bucket: getValueBucket(notaGlobal),
    conceito,
  });
};

export const trackPerfilSaudeExported = (format: "png" | "pdf", notaGlobal: number) => {
  trackEvent("perfil_saude_exported", {
    format,
    nota_global_bucket: getValueBucket(notaGlobal),
  });
};

export const trackPerfilSaudeCTAClicked = (
  notaGlobal: number,
  conceito: string,
  problemasQtd: number,
) => {
  trackEvent("perfil_saude_cta_clicked", {
    nota_global_bucket: getValueBucket(notaGlobal),
    conceito,
    problemas_qtd: problemasQtd,
  });
};

export const trackMicroCTAClick = (message: string, position: string) => {
  trackEvent("quiz_micro_cta_clicked", {
    message,
    position,
    timestamp: new Date().toISOString(),
  });
};

export const trackOutputSectionViewed = (section: string, timeSpent: number) => {
  trackEvent("quiz_output_section_viewed", {
    section,
    time_spent_seconds: timeSpent,
  });
};

export const trackOutputScrollDepth = (depth: number) => {
  trackEvent("quiz_output_scroll_depth", {
    depth_percentage: depth,
  });
};

export const trackFinalCTAClick = (
  ctaType: "presencial" | "teleconsulta" | "duvidas",
) => {
  trackEvent("quiz_final_cta_clicked", {
    cta_type: ctaType,
    timestamp: new Date().toISOString(),
  });
};

const sendWhatsAppWebhook = (source: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  rememberVisitContext();
  const context = getStoredUTMContext();
  const utmFlat = context.params ?? {};

  const payload = {
    event: "whatsapp_click",
    source,
    page: window.location.pathname,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    referrer:
      context.referrer ??
      (typeof document !== "undefined" ? document.referrer : undefined) ??
      undefined,
    landingPage: context.landingPage,
    lastPage: context.lastPage,
    firstVisit: context.firstVisit,
    updatedAt: context.updatedAt,
    utm: utmFlat,
    ...utmFlat,
    ...(params || {}),
  };

  if (typeof console !== "undefined") {
    // Debug log temporário para verificar disparo do webhook
    console.log("[WhatsApp webhook] payload", payload);
  }

  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(WHATSAPP_WEBHOOK_URL, blob)) {
        return;
      }
    }
  } catch (error) {
    void error;
  }

  try {
    void fetch(WHATSAPP_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch((error) => {
      if (typeof console !== "undefined") {
        console.error("[WhatsApp webhook] fetch error", error);
      }
    });
  } catch (error) {
    if (typeof console !== "undefined") {
      console.error("[WhatsApp webhook] send error", error);
    }
    void error;
  }
};

export const trackWhatsAppClick = (source: string, params?: Record<string, unknown>) => {
  try {
    const payload = { source, path: window.location.pathname, ...(params || {}) };
    trackEvent("whatsapp_click", payload);
    sendWhatsAppWebhook(source, params);
  } catch (error) {
    void error;
  }
};

// ============================================
// PRICING PAGE TRACKING (GA + Facebook Pixel)
// ============================================

export const trackPricingPageView = () => {
  // Google Analytics
  trackEvent("pricing_page_view", {
    page_type: "pricing",
    page_path: window.location.pathname,
    page_title: document.title,
  });

  // Facebook Pixel - ViewContent
  try {
    window.fbq?.("track", "ViewContent", {
      content_name: "Balao Intragastrico - Pagina de Precos",
      content_category: "pricing_page",
      content_type: "product",
    });
  } catch (e) {
    void e;
  }
};

export const trackPricingCTAClick = (metadata: {
  source: string;
  section: string;
  position: "hero" | "middle" | "bottom";
  scroll_depth: number;
}) => {
  // Google Analytics
  trackEvent("pricing_cta_clicked", {
    ...metadata,
    page_type: "pricing",
    cta_type: "whatsapp_consult",
  });

  // Facebook Pixel - InitiateCheckout
  try {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: "Consultar Valores - Balao Intragastrico",
      content_category: "pricing_inquiry",
      value: 1,
      currency: "BRL",
    });
  } catch (e) {
    void e;
  }
};

export const trackPricingLeadConversion = (metadata: {
  source: string;
  method: "widget" | "whatsapp";
  section?: string;
  position?: string;
  scroll_depth?: number;
}) => {
  // Google Analytics
  trackEvent("pricing_lead_conversion", {
    ...metadata,
    page_type: "pricing",
    conversion_type: "pricing_page",
  });

  // Facebook Pixel - Lead
  try {
    window.fbq?.("track", "Lead", {
      content_name: "Lead - Balao Intragastrico Preco",
      content_category: "pricing_lead",
      value: 1,
      currency: "BRL",
    });

    // Also fire Contact event
    window.fbq?.("track", "Contact", {
      content_name: "Contato - Pagina de Precos",
    });
  } catch (e) {
    void e;
  }
};

export const trackPricingScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  trackEvent("pricing_scroll_depth", {
    scroll_depth: depth,
    page_type: "pricing",
  });
};

// ============================================
// PARTIAL LEAD & ABANDONMENT TRACKING
// ============================================

export const trackPartialLead = (data: {
  source: string;
  last_step: string;
  partial_data: Record<string, unknown>;
  page_path: string;
  session_id?: string;
}) => {
  trackEvent("partial_lead_captured", {
    source: data.source,
    last_step: data.last_step,
    page_path: data.page_path,
    session_id: data.session_id,
    has_name: !!data.partial_data.name,
    has_whatsapp: !!data.partial_data.whatsapp,
    has_email: !!data.partial_data.email,
    timestamp: new Date().toISOString(),
  });

  // Send to webhook for remarketing
  const webhookUrl = "https://hook.eu2.make.com/a8npmvf1rzbfjw8c1iigmm1lqezfhd37";
  
  try {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "partial_lead",
        ...data.partial_data,
        last_step: data.last_step,
        source: data.source,
        page_path: data.page_path,
        session_id: data.session_id,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  } catch (e) {
    void e;
  }
};

export const trackLeadChatAbandonment = (data: {
  source: string;
  step: string;
  partial_data: Record<string, unknown>;
  session_id?: string;
}) => {
  trackEvent("lead_chat_abandoned", {
    source: data.source,
    step: data.step,
    session_id: data.session_id,
    has_partial_data: Object.keys(data.partial_data).length > 0,
    timestamp: new Date().toISOString(),
  });

  // Also track as partial lead if we have any data
  if (Object.keys(data.partial_data).length > 0) {
    trackPartialLead({
      source: data.source,
      last_step: data.step,
      partial_data: data.partial_data,
      page_path: window.location.pathname,
      session_id: data.session_id,
    });
  }
};
