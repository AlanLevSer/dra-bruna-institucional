import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import { getSessionId } from '@/lib/sessionTracking';

interface ExitIntentTrackerProps {
  pageName: string;
  pageType?: string;
}

export const ExitIntentTracker = ({ pageName, pageType = 'landing_page' }: ExitIntentTrackerProps) => {
  const exitTracked = useRef(false);
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const modalOpened = useRef(false);

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }
    };

    // Track modal opens (detect LeadChat)
    const checkModalOpen = () => {
      const hasModal = document.querySelector('[role="dialog"]') !== null;
      if (hasModal && !modalOpened.current) {
        modalOpened.current = true;
      }
    };

    // Desktop: Mouse leave viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitTracked.current) return;
      if (e.clientY <= 0) {
        trackExitIntent();
      }
    };

    // Tab switching / visibility change
    const handleVisibilityChange = () => {
      if (exitTracked.current) return;
      if (document.hidden) {
        trackExitIntent();
      }
    };

    const trackExitIntent = () => {
      if (exitTracked.current) return;
      exitTracked.current = true;

      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      const sessionId = getSessionId();

      trackEvent('exit_intent', {
        page_name: pageName,
        page_type: pageType,
        page_path: window.location.pathname,
        session_id: sessionId,
        time_on_page: timeOnPage,
        max_scroll: maxScroll.current,
        modal_opened: modalOpened.current,
        timestamp: new Date().toISOString(),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const modalCheckInterval = setInterval(checkModalOpen, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(modalCheckInterval);
    };
  }, [pageName, pageType]);

  return null; // This is a tracking component, no UI
};
