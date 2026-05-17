import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

const scrollPositions = new Map<string, number>();

function restoreScrollPosition(locationKey: string) {
  const savedScrollY = scrollPositions.get(locationKey);

  if (typeof savedScrollY !== 'number') {
    return false;
  }

  window.scrollTo({ top: savedScrollY, behavior: 'auto' });
  return true;
}

export function useAnchorScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    return () => {
      scrollPositions.set(location.key, window.scrollY);
    };
  }, [location.key]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (navigationType === 'POP' && restoreScrollPosition(location.key)) {
        return;
      }

      const hash = location.hash.replace(/^#/, '');

      if (!hash || hash === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.key, location.pathname, location.hash, navigationType]);
}
