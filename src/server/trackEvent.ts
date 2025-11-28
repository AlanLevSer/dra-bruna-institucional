import type { SupabaseClient } from '@supabase/supabase-js';

export interface TrackingPayload {
  event_type: 'page_view' | 'event' | 'form_submission';
  visitor_id: string;
  session_id: string;
  site_slug: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_source_platform?: string;
  utm_creative_format?: string;
  utm_marketing_tactic?: string;
  gclid?: string;
  fbclid?: string;
  device_type?: string;
  user_agent?: string;
  event_name?: string;
  event_properties?: Record<string, any>;
  form_type?: string;
  form_data?: Record<string, any>;
  converted?: boolean;
}

export interface TrackEventResult {
  success: boolean;
  error?: string;
}

export async function trackEvent(
  supabase: SupabaseClient,
  payload: TrackingPayload
): Promise<TrackEventResult> {
  try {
    // 1. Ensure site exists
    const { data: site } = await supabase
      .from('sites')
      .select('id')
      .eq('slug', payload.site_slug)
      .single();

    if (!site) {
      return { success: false, error: 'Site not found' };
    }

    const siteId = site.id;

    // 2. Ensure visitor exists
    let visitorId: string;
    const { data: existingVisitor } = await supabase
      .from('visitors')
      .select('id')
      .eq('visitor_uid', payload.visitor_id)
      .eq('site_id', siteId)
      .single();

    if (existingVisitor) {
      visitorId = existingVisitor.id;
      // Update last seen
      await supabase
        .from('visitors')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('id', visitorId);
    } else {
      const { data: newVisitor, error: visitorError } = await supabase
        .from('visitors')
        .insert({
          site_id: siteId,
          visitor_uid: payload.visitor_id,
          first_visit_url: payload.page_url,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          utm_term: payload.utm_term,
          utm_content: payload.utm_content,
          utm_source_platform: payload.utm_source_platform,
          utm_creative_format: payload.utm_creative_format,
          utm_marketing_tactic: payload.utm_marketing_tactic,
          gclid: payload.gclid,
          fbclid: payload.fbclid,
          referrer: payload.referrer,
          device_type: payload.device_type,
          user_agent: payload.user_agent,
        })
        .select('id')
        .single();

      if (visitorError) {
        return { success: false, error: 'Failed to create visitor' };
      }

      visitorId = newVisitor.id;
    }

    // 3. Ensure session exists
    let sessionDbId: string;
    const { data: existingSession } = await supabase
      .from('sessions')
      .select('id')
      .eq('session_uid', payload.session_id)
      .eq('visitor_id', visitorId)
      .single();

    if (existingSession) {
      sessionDbId = existingSession.id;
      // Update session last activity
      await supabase
        .from('sessions')
        .update({ 
          last_activity_at: new Date().toISOString(),
        })
        .eq('id', sessionDbId);
    } else {
      const { data: newSession, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          visitor_id: visitorId,
          session_uid: payload.session_id,
          landing_page: payload.page_url,
          referrer: payload.referrer,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          utm_term: payload.utm_term,
          utm_content: payload.utm_content,
          device_type: payload.device_type,
        })
        .select('id')
        .single();

      if (sessionError) {
        return { success: false, error: 'Failed to create session' };
      }

      sessionDbId = newSession.id;
    }

    // 4. Record the specific event
    if (payload.event_type === 'page_view') {
      const { error: pageViewError } = await supabase
        .from('page_views')
        .insert({
          session_id: sessionDbId,
          page_url: payload.page_url,
          page_title: payload.page_title,
          referrer: payload.referrer,
        });

      if (pageViewError) {
        return { success: false, error: 'Failed to record page view' };
      }
    } else if (payload.event_type === 'event') {
      const { error: eventError } = await supabase
        .from('events')
        .insert({
          session_id: sessionDbId,
          event_name: payload.event_name,
          event_properties: payload.event_properties || {},
          page_url: payload.page_url,
        });

      if (eventError) {
        return { success: false, error: 'Failed to record event' };
      }
    } else if (payload.event_type === 'form_submission') {
      const { error: formError } = await supabase
        .from('form_submissions')
        .insert({
          session_id: sessionDbId,
          form_type: payload.form_type,
          form_data: payload.form_data || {},
          page_url: payload.page_url,
          converted: payload.converted ?? true,
        });

      if (formError) {
        return { success: false, error: 'Failed to record form submission' };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error in trackEvent:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
