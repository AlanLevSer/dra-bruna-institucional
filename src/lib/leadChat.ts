import { CONTACT } from "./constants";
import { trackEvent } from "./analytics";

/**
 * Opens the LeadChat widget with robust fallback handling
 * 
 * @param source - Tracking source identifier
 * @param fallbackUrl - WhatsApp URL to use if widget is unavailable
 * @returns Promise<boolean> - true if widget opened, false if fallback used
 */
export const openLeadChat = (source: string, fallbackUrl?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      trackEvent("cta_clicked", { source, action: "attempt_widget" });
      
      // Check if widget is available
      if (typeof window !== "undefined" && window.LeadChat) {
        window.LeadChat.open();
        trackEvent("cta_clicked", { source, action: "widget_opened" });
        resolve(true);
        return;
      }
      
      // Retry after short delay (widget may still be loading)
      setTimeout(() => {
        if (window.LeadChat) {
          window.LeadChat.open();
          trackEvent("cta_clicked", { source, action: "widget_opened_delayed" });
          resolve(true);
        } else {
          // Fallback: open WhatsApp directly
          trackEvent("cta_clicked", { 
            source, 
            action: "fallback_whatsapp", 
            reason: "widget_not_available" 
          });
          const url = fallbackUrl || CONTACT.WHATSAPP_URL;
          window.open(url, "_blank");
          resolve(false);
        }
      }, 300);
    } catch (error) {
      // Error handling: fallback to WhatsApp
      trackEvent("cta_error", { source, error: String(error) });
      const url = fallbackUrl || CONTACT.WHATSAPP_URL;
      window.open(url, "_blank");
      resolve(false);
    }
  });
};
