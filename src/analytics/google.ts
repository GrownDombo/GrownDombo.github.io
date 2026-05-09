type AnalyticsEventName =
  | 'resume_click'
  | 'github_click'
  | 'tech_blog_click'
  | 'email_click'
  | 'internal_navigation'
  | 'external_link_click'
  | 'download_click';

type AnalyticsEventParams = {
  [key: string]: string | number | boolean | undefined;
  link_location?: string;
};

type AnalyticsPageViewParams = {
  actual_path?: string;
  page_title?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  const gtag = typeof window !== 'undefined' ? window.gtag : undefined;

  if (typeof gtag !== 'function') {
    return;
  }

  gtag('event', eventName, params);
}

export function trackPageView(pagePath: string, params: AnalyticsPageViewParams = {}) {
  const gtag = typeof window !== 'undefined' ? window.gtag : undefined;

  if (typeof gtag !== 'function') {
    return;
  }

  gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: params.page_title ?? document.title,
    ...(params.actual_path && params.actual_path !== pagePath ? { actual_path: params.actual_path } : {}),
  });
}
