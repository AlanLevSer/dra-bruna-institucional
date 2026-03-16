import { trackEvent } from "@/lib/analytics";

const VISITOR_ID_KEY = "levser_visitor_id";
const SESSION_ID_KEY = "levser_session_id";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getVisitorId(): string {
  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return "visitor-unavailable";
  }
}

function getSessionId(): string {
  const now = Date.now();

  try {
    const sessionData = sessionStorage.getItem(SESSION_ID_KEY);

    if (sessionData) {
      const { id, timestamp } = JSON.parse(sessionData) as { id: string; timestamp: number };
      if (now - timestamp < SESSION_TIMEOUT_MS) {
        sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ id, timestamp: now }));
        return id;
      }
    }

    const sessionId = generateUUID();
    sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ id: sessionId, timestamp: now }));
    return sessionId;
  } catch {
    return "session-unavailable";
  }
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_source_platform",
    "utm_creative_format",
    "utm_marketing_tactic",
    "gclid",
    "fbclid",
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

interface BaseTrackingData {
  visitor_id: string;
  session_id: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  device_type?: string;
  user_agent?: string;
  [key: string]: unknown;
}

function getBaseTrackingData(): BaseTrackingData {
  const utmParams = getUtmParams();

  return {
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer,
    device_type: getDeviceType(),
    user_agent: navigator.userAgent,
    ...utmParams,
  };
}

export async function trackPageView(): Promise<void> {
  trackEvent("page_view", getBaseTrackingData());
}

export async function trackCustomEvent(
  eventName: string,
  eventProperties?: Record<string, unknown>
): Promise<void> {
  trackEvent(eventName, {
    ...getBaseTrackingData(),
    ...(eventProperties || {}),
  });
}

export async function trackFormSubmission(
  formType: string,
  formData: Record<string, unknown>,
  converted: boolean = true
): Promise<void> {
  trackEvent("form_submission", {
    ...getBaseTrackingData(),
    form_type: formType,
    converted,
    ...formData,
  });
}

export function initTracking(): void {
  getVisitorId();
  getSessionId();
  void trackPageView();
}

export { getVisitorId, getSessionId };
