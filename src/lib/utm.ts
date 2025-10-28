export type UTMParams = Record<string, string>;

export const getParams = (): UTMParams => {
  try {
    return Object.fromEntries(new URLSearchParams(location.search)) as UTMParams;
  } catch {
    return {};
  }
};

const ref = () => (typeof document !== 'undefined' ? document.referrer.toLowerCase() : '');

export const isGoogleSource = () => {
  const p = getParams();
  const r = ref();
  return (p.utm_source || '').toLowerCase() === 'google' || r.includes('google.');
};

export const isMetaSource = () => {
  const p = getParams();
  const r = ref();
  const s = (p.utm_source || '').toLowerCase();
  return ['facebook', 'instagram', 'meta'].includes(s) || r.includes('facebook.') || r.includes('instagram.');
};

export const getPersona = (): string | undefined => {
  const p = getParams();
  const persona = (p.persona || p.utm_persona || '').toLowerCase();
  if (['rh', 'empreendedora', 'saude'].includes(persona)) return persona;
  return undefined;
};

export const isPriceCampaign = () => {
  const p = getParams();
  const c = (p.utm_campaign || '').toLowerCase();
  return c.includes('price') || c.includes('valor');
};

