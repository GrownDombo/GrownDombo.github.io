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
  priority?: number;
  detailPath?: string;
  detailMode?: 'spa' | 'document';
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
  availability: '잘 읽히는 구조와 지속적으로 개선 가능한 소프트웨어를 지향합니다',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/GrownDombo',
      kind: 'github',
    },
    {
      label: 'Tech Blog',
      href: 'https://growndombo.tistory.com/',
      kind: 'blog',
    },
    {
      label: 'yjc0455@naver.com',
      href: 'mailto:yjc0455@naver.com',
      kind: 'email',
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
    value: '70% 감소',
    label: '장애 이슈 메일 감소',
    description: '생산 시스템 연동 구조 개선 후 전분기 대비 감소',
  },
  {
    value: '6분 20초 → 5초',
    label: 'ROI 겹침 판별 처리 단축',
    description: '9만 × 39만 좌표 데이터 기준 약 97% 개선',
  },
  {
    value: '10개 이상',
    label: '신규 고객사 연동 시나리오',
    description: '생산 시스템 요구사항에 맞춘 연동 기능 개발',
  },
  {
    value: '2초 → 0.3초',
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
    skills: ['MSSQL', 'MariaDB', 'SQLite'],
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

export const workCaseStudies: Project[] = [
  {
    title: 'AOI Workflow Improvements',
    summary: '검사 화면, Gerber/Part 매칭, AutoTeaching 흐름 개선',
    role: 'AOI Matching · Teaching Workflow',
    tech: ['C#', 'C++', '.NET Framework', 'WinForms', 'OpenCV', 'TCP/IP'],
    links: [],
    image: '/assets/industrial-aoi-inspection-automation.png',
    priority: 0,
    detailPath: '/projects/industrial-aoi-platform/inspection-automation',
    status: 'Work Highlights',
  },
  {
    title: 'SECS/GEM · MES · AI Integration',
    summary: '장비, 생산 시스템, AI 솔루션 간 데이터 연동 정리',
    role: 'Equipment Interface · AI Module Integration',
    tech: ['C#', 'C++', '.NET Framework', 'WinForms', 'TCP/IP'],
    links: [],
    image: '/assets/project-industrial-aoi-platform.svg',
    priority: 1,
    detailPath: '/projects/industrial-aoi-platform/production-integration',
    status: 'Work Highlights',
  },
  {
    title: 'Repair & NG Buffer Operations',
    summary: 'Repair 화면, NG Buffer, Rack 상태 처리 흐름 개선',
    role: 'Repair Flow · NG Buffer · Rack State',
    tech: ['C#', '.NET Framework', 'WinForms', 'TCP/IP', 'Logging'],
    links: [],
    image: '/assets/project-industrial-aoi-platform.svg',
    priority: 2,
    detailPath: '/projects/industrial-aoi-platform/operation-flow',
    status: 'Work Highlights',
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
      {
        label: 'Release Download',
        href: 'https://github.com/GrownDombo/WinFormsCustomControls/releases/latest',
      },
    ],
    image: '/assets/project-winforms-custom-controls.png',
    priority: 3,
    detailPath: '/projects/winforms-custom-controls/',
    detailMode: 'document',
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
        label: 'Sample Data',
        href: 'https://github.com/GrownDombo/ExcelConditionPainter/raw/main/DummyData_400Rows_Shuffled.xlsx',
      },
      {
        label: 'Release Download',
        href: 'https://github.com/GrownDombo/ExcelConditionPainter/releases',
      },
    ],
    image: '/assets/excel-condition-painter/main-image.png',
    priority: 1,
    detailPath: '/projects/excel-condition-painter',
    status: 'Desktop Utility',
  },
  {
    title: 'RFID Collision Search Simulator',
    summary: '재귀 방식과 반복 방식의 RFID 태그 충돌 탐색 과정을 비교하는 C++ 콘솔 시뮬레이터입니다.',
    role: 'Prefix 탐색 모델 설계 · 재귀/반복 알고리즘 비교 구현',
    tech: ['C++', 'STL', 'Visual Studio 2022'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/RFIDSearchSimulator',
      },

      {
        label: 'Windows x64 EXE',
        href: 'https://github.com/GrownDombo/RFIDSearchSimulator/releases/latest/download/RFIDSearchingSimulator.exe',
      },
    ],
    image: '/assets/rfid-collision-search-simulator/main-image.png',
    priority: 4,
    detailPath: '/projects/rfid-collision-search-simulator',
    status: 'Console Simulator',
  },
  {
    title: 'CPUMemoryStressTest',
    summary: 'User 대화형, Shell, CLI를 모두 지원하는 C++20 CPU/Memory 스트레스 테스트 도구입니다.',
    role: '3가지 실행 모드 설계 · JSON CLI · 테스트 Registry 구조화',
    tech: ['C++20', 'WinAPI', 'STL', 'JSON CLI'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/CPUMemoryStressTest',
      },
      {
        label: 'Release Download',
        href: 'https://github.com/GrownDombo/CPUMemoryStressTest/releases/tag/v1.0.0',
      },
      {
        label: 'Windows x64 ZIP',
        href: 'https://github.com/GrownDombo/CPUMemoryStressTest/releases/download/v1.0.0/CPUMemoryStressTestCpp-windows-x64-v1.0.0.zip',
      },
    ],
    image: '/assets/cpu-memory-stress-test/cli-mode.png',
    priority: 2,
    detailPath: '/projects/cpu-memory-stress-test',
    status: 'Stress Tool',
  },
];
