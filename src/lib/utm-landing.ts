/**
 * UTM Landing Page Tracking
 * Captures and persists UTM parameters for quiz landing page campaigns
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

const STORAGE_KEY = 'quiz_landing_utm';
const STORAGE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Extracts UTM parameters from current URL
 */
export const getURLParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  
  // Extract all UTM and tracking parameters
  const trackedParams = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid'
  ];
  
  trackedParams.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param as keyof UTMParams] = value;
    }
  });
  
  return utmParams;
};

/**
 * Checks if current URL has any UTM parameters
 */
export const hasUTMParams = (): boolean => {
  const params = getURLParams();
  return Object.keys(params).length > 0;
};

/**
 * Saves UTM parameters to localStorage with expiry
 */
export const saveUTMParams = (params: UTMParams): void => {
  if (typeof window === 'undefined') return;
  
  const data = {
    params,
    timestamp: Date.now(),
    expiry: Date.now() + STORAGE_EXPIRY
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save UTM params:', e);
  }
};

/**
 * Retrieves saved UTM parameters from localStorage
 * Returns null if expired or not found
 */
export const getSavedUTMParams = (): UTMParams | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    
    // Check if expired
    if (Date.now() > data.expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return data.params;
  } catch (e) {
    console.warn('Failed to retrieve UTM params:', e);
    return null;
  }
};

/**
 * Captures UTM params from URL and saves them
 * Should be called on landing page mount
 */
export const captureUTMLandingParams = (): void => {
  const urlParams = getURLParams();
  
  // Only save if we have new UTM parameters
  if (Object.keys(urlParams).length > 0) {
    saveUTMParams(urlParams);
  }
};

/**
 * Gets the active UTM parameters (URL params take precedence over saved)
 */
export const getActiveUTMParams = (): UTMParams => {
  const urlParams = getURLParams();
  
  // If URL has UTM params, use those
  if (Object.keys(urlParams).length > 0) {
    return urlParams;
  }
  
  // Otherwise fallback to saved params
  return getSavedUTMParams() || {};
};

/**
 * Formats UTM parameters for analytics tracking
 */
export const formatUTMForAnalytics = (params?: UTMParams): Record<string, string> => {
  const utmParams = params || getActiveUTMParams();
  
  return {
    source: utmParams.utm_source || 'direct',
    medium: utmParams.utm_medium || 'none',
    campaign: utmParams.utm_campaign || 'none',
    term: utmParams.utm_term || '',
    content: utmParams.utm_content || '',
    gclid: utmParams.gclid || '',
    fbclid: utmParams.fbclid || ''
  };
};

/**
 * Clears saved UTM parameters
 */
export const clearUTMParams = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear UTM params:', e);
  }
};
