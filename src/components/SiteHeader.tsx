import { Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { profile } from '../data/portfolio';
import { navItems } from '../data/navigation';
import type { InternalNavigate, ThemeMode } from '../types/navigation';

export function SiteHeader({
  isResumePage = false,
  onNavigate,
  themeMode,
  onThemeToggle,
  isDashboardHeader = false,
}: {
  isResumePage?: boolean;
  onNavigate: InternalNavigate;
  themeMode?: ThemeMode;
  onThemeToggle?: () => void;
  isDashboardHeader?: boolean;
}) {
  const nextThemeLabel = themeMode === 'dark' ? '라이트 모드로 보기' : '다크 모드로 보기';

  return (
    <header className={`site-header${isDashboardHeader ? ' site-header--dashboard' : ''}`}>
      <Link className="brand" to="/" aria-label="GrownDombo 포트폴리오 홈" onClick={(event) => onNavigate(event, '/')}>
        <span className="brand-mark">GD</span>
        <span>{isDashboardHeader ? 'Portfolio' : profile.name}</span>
      </Link>
      <div className="site-header-actions">
        <nav className="nav-links" aria-label="주요 섹션">
          {navItems.map((item) => {
            const href = isResumePage ? `/${item.href}` : item.href;
            const target = href.startsWith('#') ? `/${href}` : href;

            return (
              <NavLink key={item.href} to={target} onClick={(event) => onNavigate(event, href)}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        {themeMode && onThemeToggle ? (
          <button className="theme-toggle" type="button" aria-label={nextThemeLabel} onClick={onThemeToggle}>
            {themeMode === 'dark' ? (
              <Sun size={17} aria-hidden="true" strokeWidth={2.2} />
            ) : (
              <Moon size={17} aria-hidden="true" strokeWidth={2.2} />
            )}
          </button>
        ) : null}
      </div>
    </header>
  );
}
