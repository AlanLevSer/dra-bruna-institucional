export type UTMParams = Record<string, string>;

type StoredContext = {
  params: Record<string, string>;
  landingPage?: string;
  lastPage?: string;
  referrer?: string;
  firstVisit?: string;
  updatedAt?: string;
};

const STORAGE_KEY = "levser_utm_context_v1";

const TRACKED_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "utm_platform",
  "utm_adset",
  "utm_ad",
  "utm_group",
  "gclid",
  "fbclid",
  "msclkid",
  "yclid",
  "ttclid",
  "gbraid",
  "wbraid",
]);

const getBrowserParams = (): UTMParams => {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    return Object.fromEntries(new URLSearchParams(window.location.search)) as UTMParams;
  } catch {
    return {};
  }
};

const referenceReferrer = () => {
  if (typeof document === "undefined") return "";
  return document.referrer.toLowerCase();
};

const readStoredContext = (): StoredContext => {
  if (typeof window === "undefined") {
    return { params: {} };
  }
  try {
    const raw =
      window.sessionStorage?.getItem(STORAGE_KEY) ??
      window.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return { params: {} };
    const parsed = JSON.parse(raw) as StoredContext | null;
    if (!parsed) return { params: {} };
    return { params: parsed.params ?? {}, ...parsed };
  } catch {
    return { params: {} };
  }
};

const persistContext = (context: StoredContext) => {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(context);
  try {
    window.sessionStorage?.setItem(STORAGE_KEY, payload);
  } catch {
    try {
      window.localStorage?.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore storage failures (Safari private mode, etc.)
    }
  }
};

export const getParams = (): UTMParams => getBrowserParams();

export const isGoogleSource = () => {
  const params = getBrowserParams();
  const r = referenceReferrer();
  return (params.utm_source || "").toLowerCase() === "google" || r.includes("google.");
};

export const isMetaSource = () => {
  const params = getBrowserParams();
  const r = referenceReferrer();
  const source = (params.utm_source || "").toLowerCase();
  return (
    ["facebook", "instagram", "meta"].includes(source) ||
    r.includes("facebook.") ||
    r.includes("instagram.")
  );
};

export const getPersona = (): "rh" | "empreendedora" | "saude" | undefined => {
  const params = getBrowserParams();
  const persona = (params.persona || params.utm_persona || "").toLowerCase();
  if (["rh", "empreendedora", "saude"].includes(persona)) {
    return persona as "rh" | "empreendedora" | "saude";
  }
  return undefined;
};

export const isPriceCampaign = () => {
  const params = getBrowserParams();
  const campaign = (params.utm_campaign || "").toLowerCase();
  return campaign.includes("price") || campaign.includes("valor");
};

export const rememberVisitContext = () => {
  if (typeof window === "undefined") return;

  const context = readStoredContext();
  const params = getBrowserParams();

  const utmEntries = Object.entries(params).filter(([key, value]) => {
    if (!value) return false;
    if (TRACKED_KEYS.has(key)) return true;
    return key.toLowerCase().startsWith("utm_");
  });

  if (!context.firstVisit) {
    context.firstVisit = new Date().toISOString();
  }

  if (!context.landingPage) {
    context.landingPage = window.location.href;
  }

  context.lastPage = window.location.href;
  context.updatedAt = new Date().toISOString();

  if (!context.referrer && typeof document !== "undefined" && document.referrer) {
    context.referrer = document.referrer;
  }

  context.params = context.params ?? {};

  for (const [key, value] of utmEntries) {
    if (!context.params[key]) {
      context.params[key] = value;
    }
  }

  persistContext(context);
};

export const getStoredUTMContext = (): StoredContext => readStoredContext();
