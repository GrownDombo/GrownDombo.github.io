export type ProfileLink = {
  label: string;
  href: string;
  kind: 'github' | 'email' | 'blog' | 'resume';
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

export type Metric = {
  value: string;
  label: string;
  description: string;
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
  keywords: string[];
};

export const profile: Profile = {
  name: '최준영 / GrownDombo',
  role: '7년 차 Windows 응용프로그램 개발자',
  headline: '잘 읽히는 구조와 안정적인 동작을 만드는 개발자',
  summary:
    '반도체/SMT 제조라인의 3D 검사 장비 소프트웨어를 개발·유지보수하며, 공정 자동화와 생산 시스템 연동을 중심으로 기능 고도화와 운영 안정화 업무를 수행하고 있습니다.',
  location: 'Seoul, Korea',
  availability: '잘 읽히는 구조와 지속적으로 개선 가능한 소프트웨어를 지향합니다',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/GrownDombo',
      kind: 'github',
    },
    {
      label: 'Email',
      href: 'mailto:yjc0455@naver.com',
      kind: 'email',
    },
    {
      label: 'Blog',
      href: 'https://growndombo.tistory.com/',
      kind: 'blog',
    },
    {
      label: 'Resume',
      href: 'https://growndombo.tistory.com/page/Grown-Dombo-%EC%9E%98-%EC%9D%BD%ED%9E%88%EB%8A%94-%EA%B0%9C%EB%B0%9C%EC%9E%90',
      kind: 'resume',
    },
  ],
};

export const metrics: Metric[] = [
  {
    value: '70%',
    label: '장애 이슈 메일 감소',
    description: '생산 시스템 연동 구조 개선 후 전분기 대비 감소',
  },
  {
    value: '6m 20s → 5s',
    label: 'ROI 겹침 판별 처리 단축',
    description: '9만 × 39만 좌표 데이터 기준 약 97% 개선',
  },
  {
    value: '10+',
    label: '신규 고객사 연동 시나리오',
    description: '생산 시스템 요구사항에 맞춘 연동 기능 개발',
  },
  {
    value: '2s → 0.3s',
    label: '단축키 응답 속도 개선',
    description: '복합키 자료구조 적용으로 사용성 향상',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: '업무 프로그램, 장비 기능, 보조 도구 구현에 사용하는 언어입니다.',
    skills: ['C#', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Core Tech',
    description: 'Windows 응용프로그램과 Android 앱 개발 경험의 기반 기술입니다.',
    skills: ['.NET Framework', 'Android SDK'],
  },
  {
    title: 'Database',
    description: '검사 이력, 검색 기록, 운영 데이터를 저장하고 조회합니다.',
    skills: ['MySQL', 'MariaDB', 'SQLite', 'MS SQL Server'],
  },
  {
    title: 'ORM',
    description: '레거시 Windows 애플리케이션의 데이터 접근 계층을 다룹니다.',
    skills: ['iBATIS.NET'],
  },
  {
    title: 'Domain Tech',
    description: '제조라인 연동과 영상처리 기능 개발에 사용하는 도메인 기술입니다.',
    skills: ['SECS/GEM', 'OpenCV', 'TCP/IP', 'FTP'],
  },
];

export const experiences: Experience[] = [
  {
    period: '2020.04 ~ 현재',
    title: 'Windows 응용프로그램 개발자',
    organization: '펨트론 (Pemtron)',
    description: '광학 검사 장비 소프트웨어 개발·유지보수와 생산 시스템 연동 기능을 담당합니다.',
    outcomes: [
      '생산 시스템 연동 기능 개발·유지보수 및 구조 개선',
      '병목 구간 분석을 통한 데이터 처리 성능 개선',
      'MSSQL 기반 검사 이력 관리 시스템과 OpenCV 기반 영상처리 기능 개발',
    ],
    keywords: ['C#', 'C++', '.NET Framework', 'SECS/GEM', 'OpenCV', 'Refactoring'],
  },
  {
    period: '2019.10 ~ 2020.04',
    title: 'Android 개발자',
    organization: '비마시스',
    description: '모빌리티 서비스 사용자용 Android 앱의 지도·검색 기능 개발에 참여했습니다.',
    outcomes: [
      'Naver Map API 연동 및 지도·검색 기능 개발',
      'Polygon 영역 판별 알고리즘 직접 구현',
      'SQLite 기반 검색 기록 저장과 비동기 주소 검색 제어 구현',
    ],
    keywords: ['Java', 'Android', 'Naver Map API', 'SQLite', 'Async'],
  },
];

export const projects: Project[] = [
  {
    title: 'WinFormsCustomControls',
    summary: 'WinForms에서 반복적으로 쓰는 UI 패턴을 커스텀 컨트롤 DLL로 묶은 라이브러리입니다.',
    role: '커스텀 컨트롤 설계 · UI 패턴 재사용 구조화',
    tech: ['C#', '.NET Framework 4.8', 'WinForms'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/WinFormsCustomControls',
      },
    ],
    image: '/assets/project-winforms-custom-controls.png',
    status: 'WinForms Library',
  },
  {
    title: 'ExcelConditionPainter',
    summary: 'Excel 데이터를 조건에 따라 강조 표시하고 결과 파일로 내보내는 Windows Forms 보조 도구입니다.',
    role: '조건 설정 UI · Excel 처리 · Export 기능 구현',
    tech: ['C#', 'WinForms', 'ClosedXML'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/ExcelConditionPainter',
      },
      {
        label: 'Blog Post',
        href: 'https://growndombo.tistory.com/entry/Excel-%EC%A1%B0%EA%B1%B4%EB%B6%80-%ED%91%9C%EC%8B%9C-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%82%AC%EC%9A%A9%EB%B2%95',
      },
    ],
    image: '/assets/project-excel-condition-painter.png',
    status: 'Desktop Utility',
  },
  {
    title: 'CPUMemoryStressTest',
    summary: 'CPU와 메모리 부하를 발생시켜 단일·병렬 처리와 알고리즘별 특성을 비교하는 C++ 콘솔 도구입니다.',
    role: '테스트 시나리오 구성 · C++ 재구현 · CSV 로깅',
    tech: ['C++', 'WinAPI', 'STL'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/CPUMemoryStressTest',
      },
    ],
    image: '/assets/project-cpu-memory-stress-test.png',
    status: 'Stress Tool',
  },
];
