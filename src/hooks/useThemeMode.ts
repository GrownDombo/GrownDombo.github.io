import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types/navigation';

const themeStorageKey = 'growndombo-theme';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (isThemeMode(storedTheme)) {
      return storedTheme;
    }
  } catch {
    return 'light';
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, themeMode);
    } catch {
      // Theme persistence is optional; the UI still works without storage access.
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return { themeMode, toggleThemeMode };
}
