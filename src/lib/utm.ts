import {
  getStoredTrackingParams,
  getTrackingParamsFromUrl,
  persistTrackingParams,
} from "./tracking";

export type UTMParams = Record<string, string>;

type StoredContext = {
  params: Record<string, string>;
  landingPage?: string;
  lastPage?: string;
  referrer?: string;
  firstVisit?: string;
  updatedAt?: string;
};

export const getParams = (): UTMParams => getTrackingParamsFromUrl();

export const isGoogleSource = () => {
  const params = getTrackingParamsFromUrl();
  const referrer = typeof document !== "undefined" ? document.referrer.toLowerCase() : "";
  return (params.utm_source || "").toLowerCase() === "google" || referrer.includes("google.");
};

export const isMetaSource = () => {
  const params = getTrackingParamsFromUrl();
  const referrer = typeof document !== "undefined" ? document.referrer.toLowerCase() : "";
  const source = (params.utm_source || "").toLowerCase();

  return (
    ["facebook", "instagram", "meta"].includes(source) ||
    referrer.includes("facebook.") ||
    referrer.includes("instagram.")
  );
};

export const getPersona = (): "rh" | "empreendedora" | "saude" | undefined => {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const persona = (params.get("persona") || params.get("utm_persona") || "").toLowerCase();

  if (["rh", "empreendedora", "saude"].includes(persona)) {
    return persona as "rh" | "empreendedora" | "saude";
  }

  return undefined;
};

export const isPriceCampaign = () => {
  const params = getTrackingParamsFromUrl();
  const campaign = (params.utm_campaign || "").toLowerCase();
  return campaign.includes("price") || campaign.includes("valor");
};

export const rememberVisitContext = () => {
  persistTrackingParams();
};

export const getStoredUTMContext = (): StoredContext => {
  const stored = getStoredTrackingParams();

  return {
    params: {
      ...stored.first_touch_tracking.params,
      ...stored.last_touch_tracking.params,
    },
    landingPage: stored.first_touch_tracking.landing_page,
    lastPage: stored.last_touch_tracking.last_page,
    referrer: stored.first_touch_tracking.referrer || stored.last_touch_tracking.referrer,
    firstVisit: stored.first_touch_tracking.timestamp,
    updatedAt: stored.last_touch_tracking.timestamp,
  };
};
