import { useCallback, type MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { trackAnalyticsEvent } from '../analytics/google';
import type { InternalNavigate } from '../types/navigation';

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey;
}

function normalizeInternalTarget(path: string) {
  return path.startsWith('#') ? `/${path}` : path;
}

export function useInternalNavigation(): InternalNavigate {
  const navigate = useNavigate();

  return useCallback(
    (event, path) => {
      if (!isPlainLeftClick(event)) {
        return;
      }

      event.preventDefault();
      trackAnalyticsEvent('internal_navigation', {
        link_location: path.includes('#') ? 'section' : 'route',
        target_path: path,
      });
      navigate(normalizeInternalTarget(path));
    },
    [navigate],
  );
}
