import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useAnchorScroll() {
  const location = useLocation();

  useEffect(() => {
    window.setTimeout(() => {
      const hash = location.hash.replace(/^#/, '');

      if (!hash || hash === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [location.pathname, location.hash]);
}
