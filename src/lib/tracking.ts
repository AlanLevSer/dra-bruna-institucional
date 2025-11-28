import { externalSupabase } from '@/lib/external-supabase';

const VISITOR_ID_KEY = 'levser_visitor_id';
const SESSION_ID_KEY = 'levser_session_id';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SITE_SLUG = 'brunadurelli';

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get or create visitor ID
function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

// Get or create session ID
function getSessionId(): string {
  const now = Date.now();
  const sessionData = sessionStorage.getItem(SESSION_ID_KEY);
  
  if (sessionData) {
    try {
      const { id, timestamp } = JSON.parse(sessionData);
      // Check if session is still valid
      if (now - timestamp < SESSION_TIMEOUT_MS) {
        // Update timestamp
        sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ id, timestamp: now }));
        return id;
      }
    } catch (e) {
      console.error('Error parsing session data:', e);
    }
  }
  
  // Create new session
  const sessionId = generateUUID();
  sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ id: sessionId, timestamp: now }));
  return sessionId;
}

// Get UTM parameters from URL
function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_source_platform',
    'utm_creative_format',
    'utm_marketing_tactic',
    'gclid',
    'fbclid',
  ];
  
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
}

// Get device type
function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

// Base tracking payload
interface BaseTrackingData {
  visitor_id: string;
  session_id: string;
  site_slug: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  device_type?: string;
  user_agent?: string;
  [key: string]: any;
}

function getBaseTrackingData(): BaseTrackingData {
  const utmParams = getUtmParams();
  
  return {
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    site_slug: SITE_SLUG,
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer,
    device_type: getDeviceType(),
    user_agent: navigator.userAgent,
    ...utmParams,
  };
}

// Send tracking data to Edge Function
async function sendTrackingEvent(payload: any): Promise<void> {
  // Graceful degradation: skip if external Supabase not configured
  if (!externalSupabase) {
    console.warn('Tracking skipped - external Supabase not configured');
    return;
  }

  try {
    const { error } = await externalSupabase.functions.invoke('track', {
      body: payload,
    });
    
    if (error) {
      console.error('Tracking error:', error);
    }
  } catch (error) {
    console.error('Failed to send tracking event:', error);
  }
}

// Track page view
export async function trackPageView(): Promise<void> {
  const payload = {
    ...getBaseTrackingData(),
    event_type: 'page_view',
  };
  
  await sendTrackingEvent(payload);
}

// Track custom event
export async function trackCustomEvent(
  eventName: string,
  eventProperties?: Record<string, any>
): Promise<void> {
  const payload = {
    ...getBaseTrackingData(),
    event_type: 'event',
    event_name: eventName,
    event_properties: eventProperties || {},
  };
  
  await sendTrackingEvent(payload);
}

// Track form submission
export async function trackFormSubmission(
  formType: string,
  formData: Record<string, any>,
  converted: boolean = true
): Promise<void> {
  const payload = {
    ...getBaseTrackingData(),
    event_type: 'form_submission',
    form_type: formType,
    form_data: formData,
    converted,
  };
  
  await sendTrackingEvent(payload);
}

// Initialize tracking (call on app mount)
export function initTracking(): void {
  // Ensure IDs are generated
  getVisitorId();
  getSessionId();
  
  // Track initial page view
  trackPageView();
}

// Export for use in other modules
export { getVisitorId, getSessionId };
