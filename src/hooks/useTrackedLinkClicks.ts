import { useEffect } from 'react';
import { trackAnalyticsEvent } from '../analytics/google';

function getAnalyticsLinkText(link: HTMLAnchorElement) {
  const text = link.textContent?.replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, 90) : undefined;
}

function getAnalyticsLinkLocation(link: HTMLAnchorElement) {
  return link.closest<HTMLElement>('section[id], article[id], main[id], [id]')?.id;
}

function isAnalyticsDownloadLink(url: URL, link: HTMLAnchorElement) {
  return (
    link.hasAttribute('download') ||
    /\.(csv|pdf|zip|msi|exe|xlsx|xlsm)$/i.test(url.pathname) ||
    url.pathname.toLowerCase().includes('/releases')
  );
}

export function useTrackedLinkClicks() {
  useEffect(() => {
    const handleTrackedLinkClick = (event: globalThis.MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest('a[href]');

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const rawHref = link.getAttribute('href');

      if (!rawHref || rawHref.startsWith('#')) {
        return;
      }

      let url: URL;

      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return;
      }

      const isDownloadLink = isAnalyticsDownloadLink(url, link);
      const isExternalLink = url.origin !== window.location.origin;

      if (!isDownloadLink && !isExternalLink) {
        return;
      }

      trackAnalyticsEvent(isDownloadLink ? 'download_click' : 'external_link_click', {
        link_location: getAnalyticsLinkLocation(link),
        link_text: getAnalyticsLinkText(link),
        link_url: url.href,
      });
    };

    document.addEventListener('click', handleTrackedLinkClick, true);
    return () => document.removeEventListener('click', handleTrackedLinkClick, true);
  }, []);
}
