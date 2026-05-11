import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { trackPageView } from '../analytics/google';
import {
  industrialAoiAreaRoutes,
  industrialAoiRouteAreaIds,
  legacyIndustrialAoiPlatformPath,
  workCaseRootPath,
} from '../routes/paths';

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

function getFullPath(pathname: string, search: string, hash: string) {
  return `${pathname}${search}${hash}`;
}

function getCanonicalAnalyticsPath(pathname: string, search: string, hash: string) {
  const currentPathname = normalizePath(pathname);
  const industrialAoiAreaId = industrialAoiRouteAreaIds[currentPathname];

  if (industrialAoiAreaId) {
    return `${industrialAoiAreaRoutes[industrialAoiAreaId]}${search}${hash}`;
  }

  if (currentPathname === workCaseRootPath || currentPathname === legacyIndustrialAoiPlatformPath) {
    return '/#work-cases';
  }

  return getFullPath(pathname, search, hash);
}

export function usePageAnalytics() {
  const location = useLocation();
  const trackedPagePathRef = useRef('');

  useEffect(() => {
    const pagePath = getCanonicalAnalyticsPath(location.pathname, location.search, location.hash);

    if (trackedPagePathRef.current === pagePath) {
      return;
    }

    trackedPagePathRef.current = pagePath;
    trackPageView(pagePath, { actual_path: getFullPath(location.pathname, location.search, location.hash) });
  }, [location]);
}
