export type ProfileLink = {
  label: string;
  href: string;
  kind: 'github' | 'email' | 'linkedin' | 'blog';
};

export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  availability: string;
  links: ProfileLink[];
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  summary: string;
  role: string;
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
  image: string;
  status: string;
};

export type Experience = {
  period: string;
  title: string;
  organization: string;
  description: string;
  outcomes: string[];
};

export const profile: Profile = {
  name: 'GrownDombo',
  role: 'Frontend / Full-Stack Developer',
  headline: '사용자의 흐름을 제품의 구조로 바꾸는 개발자',
  summary:
    '문제를 작게 분해하고, 빠르게 검증 가능한 인터페이스로 연결하는 일을 좋아합니다. 이 포트폴리오는 프로젝트, 기술 선택, 협업 경험을 채용 담당자가 빠르게 살펴볼 수 있도록 구성했습니다.',
  location: 'Seoul, Korea',
  availability: '새로운 기회와 협업을 찾고 있습니다',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/GrownDombo',
      kind: 'github',
    },
    {
      label: 'Email',
      href: 'mailto:hello@example.com',
      kind: 'email',
    },
    {
      label: 'LinkedIn',
      href: '#',
      kind: 'linkedin',
    },
    {
      label: 'Blog',
      href: '#',
      kind: 'blog',
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Product Frontend',
    description: '사용자가 반복해서 쓰는 화면을 빠르고 안정적으로 만듭니다.',
    skills: ['React', 'TypeScript', 'Vite', 'Responsive UI', 'Accessibility'],
  },
  {
    title: 'Application Logic',
    description: '상태, 데이터 흐름, API 경계를 명확하게 설계합니다.',
    skills: ['Node.js', 'REST API', 'Auth Flow', 'Data Modeling', 'Error Handling'],
  },
  {
    title: 'Delivery',
    description: '작동하는 결과물을 꾸준히 배포하고 개선하는 흐름을 챙깁니다.',
    skills: ['GitHub Actions', 'Testing', 'Performance', 'Documentation', 'Code Review'],
  },
];

export const projects: Project[] = [
  {
    title: 'TaskFlow Dashboard',
    summary:
      '팀의 업무 흐름과 병목을 한눈에 파악하는 운영 대시보드 콘셉트입니다. 작업 상태, 우선순위, 담당자별 진행 상황을 카드와 차트로 정리합니다.',
    role: 'UI 설계, 상태 구조, 반응형 화면 구현',
    tech: ['React', 'TypeScript', 'Dashboard UX', 'Charts'],
    highlights: [
      '복잡한 업무 상태를 스캔 가능한 정보 구조로 재배치',
      '데스크톱과 모바일에서 같은 우선순위가 유지되는 레이아웃',
      '필터, 상태 배지, 핵심 지표를 한 화면에 통합',
    ],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Live Demo', href: '#' },
    ],
    image: '/assets/project-taskflow.png',
    status: 'Case study draft',
  },
  {
    title: 'Code Review Notes',
    summary:
      '리뷰 코멘트와 개선 이력을 정리하는 개발자 노트 앱 콘셉트입니다. 반복되는 피드백을 패턴화해 다음 구현에 반영할 수 있게 돕습니다.',
    role: '정보 구조, 컴포넌트 설계, 로컬 데이터 흐름',
    tech: ['React', 'Local Storage', 'Design System', 'Search'],
    highlights: [
      '리뷰 유형별 태그와 검색 흐름 설계',
      '작은 컴포넌트 단위로 재사용 가능한 UI 구성',
      '학습 기록과 액션 아이템을 분리해 추적성 강화',
    ],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Live Demo', href: '#' },
    ],
    image: '/assets/project-review-notes.png',
    status: 'Ready to customize',
  },
  {
    title: 'Launch Metrics',
    summary:
      '사이드 프로젝트 출시 후 핵심 지표를 관찰하는 분석 화면 콘셉트입니다. 방문, 전환, 리텐션 신호를 간결하게 비교합니다.',
    role: '프로토타입 제작, 지표 카드, 시각적 피드백',
    tech: ['TypeScript', 'Analytics UX', 'CSS Grid', 'Automation'],
    highlights: [
      '초기 제품에 필요한 지표만 남기는 화면 밀도 조절',
      '변화량과 다음 행동을 함께 보여주는 카드 패턴',
      'GitHub Pages 배포를 염두에 둔 정적 사이트 구조',
    ],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Live Demo', href: '#' },
    ],
    image: '/assets/project-launch-metrics.png',
    status: 'Placeholder visual',
  },
];

export const experiences: Experience[] = [
  {
    period: '2026',
    title: 'Portfolio Refresh',
    organization: 'Personal Project',
    description:
      '채용 담당자가 프로젝트와 기술 역량을 빠르게 확인할 수 있도록 포트폴리오 정보 구조를 재정리했습니다.',
    outcomes: ['React/Vite 기반 정적 배포 구조 설계', '프로젝트 갤러리형 섹션 구성', '콘텐츠 데이터 분리'],
  },
  {
    period: '2025',
    title: 'Project-Based Learning',
    organization: 'Independent Study',
    description:
      '프론트엔드 구현, API 연동, 자동화 배포를 작은 프로젝트 단위로 반복하며 실전 흐름을 정리했습니다.',
    outcomes: ['TypeScript 컴포넌트 설계 연습', 'GitHub 기반 협업 워크플로 정리', '반응형 UI 개선'],
  },
];
