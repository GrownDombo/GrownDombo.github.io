const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const googleTagUrl = 'https://www.googletagmanager.com/gtag/js';

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

export function installGoogleAnalytics() {
  if (!measurementId || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `${googleTagUrl}?id=${encodeURIComponent(measurementId)}`;

  document.head.appendChild(script);
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (!measurementId || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
