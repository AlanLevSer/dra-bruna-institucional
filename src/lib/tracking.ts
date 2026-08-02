type Primitive = string | number | boolean | null | undefined;

type FBQTrackMode = "track" | "trackCustom";

type PandaPlayerInstance = {
  onEvent: (event: string, callback: (payload?: number) => void) => void;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, Primitive>,
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (mode: FBQTrackMode, eventName: string, params?: Record<string, Primitive>) => void;
    pandascripttag?: Array<() => void>;
    pandaplayer?: (id: string) => PandaPlayerInstance | undefined;
  }
}

export const TRACKING_PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "fbp",
  "fbc",
  "click_id",
  "utm_referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_adgroup",
  "utm_term",
  "utm_content",
  "utm_matchtype",
  "utm_device",
  "utm_network",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
  "campaign_id",
  "ad_group_id",
  "keyword",
] as const;

export type TrackingParamKey = (typeof TRACKING_PARAM_KEYS)[number];
export type TrackingParams = Record<TrackingParamKey, string>;

type TrackingContext = {
  params: TrackingParams;
  landing_page: string;
  first_page: string;
  last_page: string;
  referrer: string;
  timestamp: string;
};

type StoredTrackingState = {
  first_touch_tracking: TrackingContext;
  last_touch_tracking: TrackingContext;
};

export type LeadTrackingPayload = TrackingParams & {
  gclientid: string;
  landing_page: string;
  first_page: string;
  last_page: string;
  referrer: string;
  page_path: string;
  page_url: string;
  timestamp: string;
};

export type AnalyticsLeadEventPayload = Pick<
  LeadTrackingPayload,
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_id"
  | "utm_adgroup"
  | "utm_term"
  | "utm_content"
  | "utm_matchtype"
  | "utm_device"
  | "utm_network"
  | "utm_source_platform"
  | "utm_creative_format"
  | "utm_marketing_tactic"
  | "gclid"
  | "gbraid"
  | "wbraid"
  | "fbclid"
  | "fbp"
  | "fbc"
  | "page_path"
  | "landing_page"
  | "first_page"
  | "last_page"
> & {
  event_name: string;
  has_name: boolean;
  has_phone: boolean;
  has_email: boolean;
};

const FIRST_TOUCH_STORAGE_KEY = "first_touch_tracking";
const LAST_TOUCH_STORAGE_KEY = "last_touch_tracking";

const STANDARD_FB_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Search",
  "AddToCart",
  "InitiateCheckout",
  "AddPaymentInfo",
  "Purchase",
  "Lead",
  "CompleteRegistration",
  "Contact",
  "Schedule",
  "SubmitApplication",
]);

const EMPTY_TRACKING_PARAMS = TRACKING_PARAM_KEYS.reduce((acc, key) => {
  acc[key] = "";
  return acc;
}, {} as TrackingParams);

const isBrowser = () => typeof window !== "undefined";

const safeReadStorage = (key: string): string | null => {
  if (!isBrowser()) return null;

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }
};

const safeWriteStorage = (key: string, value: string) => {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};

const safeReadCookie = (name: string): string => {
  if (typeof document === "undefined") return "";

  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
};

const buildCurrentPageUrl = () => {
  if (!isBrowser()) return "";
  return window.location.href;
};

const buildCurrentPagePath = () => {
  if (!isBrowser()) return "";
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

const createTrackingContext = (
  params: Partial<TrackingParams>,
  base?: Partial<TrackingContext>,
): TrackingContext => ({
  params: { ...EMPTY_TRACKING_PARAMS, ...params },
  landing_page: base?.landing_page || buildCurrentPageUrl(),
  first_page: base?.first_page || buildCurrentPagePath(),
  last_page: base?.last_page || buildCurrentPagePath(),
  referrer:
    base?.referrer ||
    (typeof document !== "undefined" ? document.referrer : "") ||
    "",
  timestamp: base?.timestamp || new Date().toISOString(),
});

const parseStoredContext = (raw: string | null): TrackingContext | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<TrackingContext> | null;
    if (!parsed) return null;

    return createTrackingContext(parsed.params ?? {}, {
      landing_page: parsed.landing_page,
      first_page: parsed.first_page,
      last_page: parsed.last_page,
      referrer: parsed.referrer,
      timestamp: parsed.timestamp,
    });
  } catch {
    return null;
  }
};

const readTrackingState = (): StoredTrackingState => {
  const first = parseStoredContext(safeReadStorage(FIRST_TOUCH_STORAGE_KEY));
  const last = parseStoredContext(safeReadStorage(LAST_TOUCH_STORAGE_KEY));
  const fallback = createTrackingContext({});

  return {
    first_touch_tracking: first ?? fallback,
    last_touch_tracking: last ?? fallback,
  };
};

const writeTrackingState = (state: StoredTrackingState) => {
  safeWriteStorage(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(state.first_touch_tracking));
  safeWriteStorage(LAST_TOUCH_STORAGE_KEY, JSON.stringify(state.last_touch_tracking));
};

const mergeFirstTouchParams = (
  existing: TrackingParams,
  incoming: Partial<TrackingParams>,
): TrackingParams => {
  const merged = { ...existing };

  for (const key of TRACKING_PARAM_KEYS) {
    if (!merged[key] && incoming[key]) {
      merged[key] = incoming[key] ?? "";
    }
  }

  return merged;
};

const mergeLastTouchParams = (incoming: Partial<TrackingParams>, fallback: TrackingParams): TrackingParams => {
  const merged = { ...fallback };

  for (const key of TRACKING_PARAM_KEYS) {
    if (incoming[key]) {
      merged[key] = incoming[key] ?? "";
    }
  }

  return merged;
};

const normalizeFbc = (fbclid: string, existingFbc?: string): string => {
  if (existingFbc) return existingFbc;
  if (!fbclid) return "";
  return `fb.1.${Date.now()}.${fbclid}`;
};

export const getTrackingParamsFromUrl = (): TrackingParams => {
  if (!isBrowser()) {
    return { ...EMPTY_TRACKING_PARAMS };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const params = { ...EMPTY_TRACKING_PARAMS };

  for (const key of TRACKING_PARAM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  }

  return params;
};

export const getGoogleClientId = (): string => {
  const gaCookie = safeReadCookie("_ga");
  if (!gaCookie) return "";

  const parts = gaCookie.split(".");
  if (parts.length < 4) return "";
  return `${parts[2]}.${parts[3]}`;
};

export const getMetaBrowserIds = (): { fbp: string; fbc: string } => {
  const fbp = safeReadCookie("_fbp");
  const fbc = safeReadCookie("_fbc");
  const fbclid = getTrackingParamsFromUrl().fbclid;

  return {
    fbp,
    fbc: normalizeFbc(fbclid, fbc),
  };
};

export const persistTrackingParams = (
  sourceParams: Partial<TrackingParams> = getTrackingParamsFromUrl(),
): StoredTrackingState => {
  const metaIds = getMetaBrowserIds();
  const enrichedParams: Partial<TrackingParams> = {
    ...sourceParams,
    fbp: sourceParams.fbp || metaIds.fbp,
    fbc: normalizeFbc(sourceParams.fbclid || "", sourceParams.fbc || metaIds.fbc),
  };

  const storedFirst = parseStoredContext(safeReadStorage(FIRST_TOUCH_STORAGE_KEY));
  const storedLast = parseStoredContext(safeReadStorage(LAST_TOUCH_STORAGE_KEY));
  const currentState = readTrackingState();
  const hasIncomingValues = TRACKING_PARAM_KEYS.some((key) => !!enrichedParams[key]);

  const firstContext = storedFirst
    ? {
        ...storedFirst,
        params: mergeFirstTouchParams(storedFirst.params, enrichedParams),
      }
    : createTrackingContext(enrichedParams);

  const lastBase = storedLast ?? currentState.first_touch_tracking;
  const lastContext = createTrackingContext(
    hasIncomingValues
      ? mergeLastTouchParams(enrichedParams, currentState.last_touch_tracking.params)
      : currentState.last_touch_tracking.params,
    {
      landing_page: lastBase.landing_page || currentState.first_touch_tracking.landing_page,
      first_page: currentState.first_touch_tracking.first_page,
      last_page: buildCurrentPagePath(),
      referrer: currentState.first_touch_tracking.referrer || currentState.last_touch_tracking.referrer,
    },
  );

  const nextState = {
    first_touch_tracking: firstContext,
    last_touch_tracking: lastContext,
  };

  writeTrackingState(nextState);
  return nextState;
};

export const getStoredTrackingParams = (): StoredTrackingState => {
  const persisted = persistTrackingParams();
  const metaIds = getMetaBrowserIds();

  return {
    first_touch_tracking: {
      ...persisted.first_touch_tracking,
      params: {
        ...persisted.first_touch_tracking.params,
        fbp: persisted.first_touch_tracking.params.fbp || metaIds.fbp,
        fbc: persisted.first_touch_tracking.params.fbc || metaIds.fbc,
      },
    },
    last_touch_tracking: {
      ...persisted.last_touch_tracking,
      params: {
        ...persisted.last_touch_tracking.params,
        fbp: persisted.last_touch_tracking.params.fbp || metaIds.fbp,
        fbc: persisted.last_touch_tracking.params.fbc || metaIds.fbc,
      },
    },
  };
};

export const buildLeadTrackingPayload = (): LeadTrackingPayload => {
  const state = getStoredTrackingParams();
  const metaIds = getMetaBrowserIds();
  const firstTouch = state.first_touch_tracking;
  const lastTouch = state.last_touch_tracking;
  const mergedParams = { ...EMPTY_TRACKING_PARAMS, ...firstTouch.params, ...lastTouch.params };

  mergedParams.fbp = mergedParams.fbp || metaIds.fbp;
  mergedParams.fbc = mergedParams.fbc || metaIds.fbc;

  return {
    ...mergedParams,
    gclientid: getGoogleClientId(),
    landing_page: firstTouch.landing_page,
    first_page: firstTouch.first_page,
    last_page: lastTouch.last_page,
    referrer: firstTouch.referrer || lastTouch.referrer || "",
    page_path: buildCurrentPagePath(),
    page_url: buildCurrentPageUrl(),
    timestamp: new Date().toISOString(),
  };
};

export const buildAnalyticsLeadEventPayload = (
  eventName: string,
  options?: {
    name?: string;
    phone?: string;
    email?: string;
    extra?: Record<string, unknown>;
  },
): AnalyticsLeadEventPayload & Record<string, unknown> => {
  const trackingPayload = buildLeadTrackingPayload();

  return {
    event_name: eventName,
    has_name: !!options?.name?.trim(),
    has_phone: !!options?.phone?.trim(),
    has_email: !!options?.email?.trim(),
    utm_source: trackingPayload.utm_source,
    utm_medium: trackingPayload.utm_medium,
    utm_campaign: trackingPayload.utm_campaign,
    utm_id: trackingPayload.utm_id,
    utm_adgroup: trackingPayload.utm_adgroup,
    utm_term: trackingPayload.utm_term,
    utm_content: trackingPayload.utm_content,
    utm_matchtype: trackingPayload.utm_matchtype,
    utm_device: trackingPayload.utm_device,
    utm_network: trackingPayload.utm_network,
    utm_source_platform: trackingPayload.utm_source_platform,
    utm_creative_format: trackingPayload.utm_creative_format,
    utm_marketing_tactic: trackingPayload.utm_marketing_tactic,
    gclid: trackingPayload.gclid,
    gbraid: trackingPayload.gbraid,
    wbraid: trackingPayload.wbraid,
    fbclid: trackingPayload.fbclid,
    fbp: trackingPayload.fbp,
    fbc: trackingPayload.fbc,
    page_path: trackingPayload.page_path,
    landing_page: trackingPayload.landing_page,
    first_page: trackingPayload.first_page,
    last_page: trackingPayload.last_page,
    ...(options?.extra || {}),
  };
};

const normalizeEmail = (email?: string): string => (email || "").trim().toLowerCase();

const normalizePhone = (phone?: string): string => (phone || "").replace(/\D/g, "");

const normalizeName = (name?: string): string =>
  (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

export type UserProvidedDataPayload = {
  name: string;
  phone: string;
  email: string;
};

// Future-only helper for Enhanced Conversions/CAPI integrations.
// Do not send this payload to generic dataLayer/gtag/fbq events.
// Any future usage must add consent checks plus the required normalization,
// hashing, and destination-specific transport.
export const buildUserProvidedDataPayload = (input: {
  name?: string;
  phone?: string;
  email?: string;
}): UserProvidedDataPayload => ({
  name: normalizeName(input.name),
  phone: normalizePhone(input.phone),
  email: normalizeEmail(input.email),
});

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (!isBrowser()) return;

  const eventParams = params as Record<string, Primitive> | undefined;

  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...(params || {}) });
  }

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  if (window.fbq) {
    const fbMode: FBQTrackMode = STANDARD_FB_EVENTS.has(eventName) ? "track" : "trackCustom";
    try {
      window.fbq(fbMode, eventName, eventParams);
    } catch {
      // ignore Meta Pixel failures
    }
  }

  if (import.meta.env.DEV) {
    console.log("Tracking event:", eventName, params);
  }
};

export async function trackPageView(): Promise<void> {
  persistTrackingParams();
  trackEvent("page_view", buildLeadTrackingPayload());
}

export async function trackCustomEvent(
  eventName: string,
  eventProperties?: Record<string, unknown>,
): Promise<void> {
  persistTrackingParams();
  trackEvent(eventName, {
    ...buildLeadTrackingPayload(),
    ...(eventProperties || {}),
  });
}

export async function trackFormSubmission(
  formType: string,
  formData: Record<string, unknown>,
  converted = true,
): Promise<void> {
  persistTrackingParams();
  const name = typeof formData.name === "string" ? formData.name : "";
  const phone =
    typeof formData.whatsapp === "string"
      ? formData.whatsapp
      : typeof formData.phone === "string"
        ? formData.phone
        : "";
  const email = typeof formData.email === "string" ? formData.email : "";

  trackEvent("form_submission", {
    ...buildAnalyticsLeadEventPayload("form_submission", {
      name,
      phone,
      email,
      extra: {
        form_type: formType,
        converted,
      },
    }),
    form_type: formType,
    converted,
  });
}

export function initTracking(): void {
  persistTrackingParams();
  void trackPageView();
}
