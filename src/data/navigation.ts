import { CalendarDays, Code2, FileText, FolderKanban, Github, UserRound, type LucideIcon } from 'lucide-react';
import type { NavItem, RoutePath } from '../types/navigation';

export const navItems: NavItem[] = [
  { label: '정량 성과', href: '#metrics' },
  { label: '업무 개선', href: '#work-cases' },
  { label: 'GitHub', href: '#projects' },
  { label: '경력', href: '#experience' },
  { label: '기술', href: '#skills' },
];

export type PortfolioRailItem = {
  id: string;
  label: string;
  href: RoutePath;
  icon: LucideIcon;
};

export const portfolioRailItems: PortfolioRailItem[] = [
  { id: 'about', label: 'About', href: '#about', icon: UserRound },
  { id: 'metrics', label: 'Impact', href: '#metrics', icon: FileText },
  { id: 'work-cases', label: 'Work', href: '#work-cases', icon: FolderKanban },
  { id: 'projects', label: 'GitHub', href: '#projects', icon: Github },
  { id: 'experience', label: 'Experience', href: '#experience', icon: CalendarDays },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Code2 },
];
