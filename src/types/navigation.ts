import type { MouseEvent } from 'react';

export type InternalNavigate = (event: MouseEvent<HTMLAnchorElement>, path: string) => void;

export type ThemeMode = 'light' | 'dark';

export type ThemedPageProps = {
  onNavigate: InternalNavigate;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
};

export type RoutePath = `/${string}` | `#${string}`;

export type NavItem = {
  label: string;
  href: RoutePath;
};

export type DownloadDescription = {
  title: string;
  description: string;
  buttonText?: string;
};

export type ProjectDetailConfig = {
  title: string;
  path: RoutePath;
  assetPath: string;
  fallbackTech: string[];
};
