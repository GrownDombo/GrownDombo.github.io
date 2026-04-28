type AnalyticsEventName = 'resume_click' | 'github_click' | 'tech_blog_click' | 'email_click';
type AnalyticsEventParams = {
  link_location?: 'hero' | 'resume';
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
