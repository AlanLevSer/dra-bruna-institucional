import { trackEvent } from '@/lib/analytics';

export function trackMapaStart() {
  trackEvent('mm_start', {
    page_type: 'mapa_metabolico',
    timestamp: new Date().toISOString(),
  });
}

export function trackMapaStepSubmit(stepId: string, stepNumber: number) {
  trackEvent('mm_step_submit', {
    step_id: stepId,
    step_number: stepNumber,
    page_type: 'mapa_metabolico',
  });
}

export function trackMapaAbandon(currentStep: number, totalSteps: number) {
  trackEvent('mm_abandon', {
    current_step: currentStep,
    total_steps: totalSteps,
    completion_rate: Math.round((currentStep / totalSteps) * 100),
    page_type: 'mapa_metabolico',
  });
}

export function trackMapaCompleted(score: number, classification: string) {
  trackEvent('mm_completed', {
    score,
    classification,
    page_type: 'mapa_metabolico',
    timestamp: new Date().toISOString(),
  });
}

export function trackMapaResultView(score: number, classification: string) {
  trackEvent('mm_result_view', {
    score,
    classification,
    page_type: 'mapa_metabolico',
  });
}

export function trackMapaScore(score: number, scoreBucket: string) {
  trackEvent('mm_score', {
    score,
    score_bucket: scoreBucket,
    page_type: 'mapa_metabolico',
  });
}

export function trackMapaCTAClick(ctaType: 'booking' | 'whatsapp' | 'email_report', score: number) {
  const eventName =
    ctaType === 'booking'
      ? 'cta_click_booking'
      : ctaType === 'whatsapp'
        ? 'cta_click_whatsapp'
        : 'cta_click_email_report';

  trackEvent(eventName, {
    source: 'mapa_metabolico',
    score,
    page_type: 'mapa_metabolico',
  });
}
