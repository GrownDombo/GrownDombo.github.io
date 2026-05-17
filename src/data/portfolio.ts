import { industrialAoiBridgePolygonVisualizationPath, industrialAoiHotKeyOptimizationPath } from '../routes/paths';

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
  evidence?: {
    label: string;
    href: string;
    suffix?: string;
  };
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
  role: 'C#/.NET 기반 제조 장비 소프트웨어 개발자',
  headline: '제조 현장의 느린 처리와 반복 장애를 줄이는 Windows 장비 SW 개발자',
  summary:
    '7년간 검사 장비 소프트웨어를 개발하며 성능 병목 분석, 생산 시스템 연동, 운영 편의성 개선을 맡았습니다. 처리 시간 단축, 장애 이슈 감소, 장비 기능 고도화처럼 실제 제조 현장에서 체감되는 문제를 코드와 구조 개선으로 해결해왔습니다.',
  availability: 'C#/.NET · 성능 병목 개선 · 생산 시스템 연동',
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
    value: '6분 22초 → 3.5초',
    label: 'Gerber-Part ROI 매칭 시간 단축',
    description: 'Module 후보 선별과 캐싱으로 대용량 ROI 매칭 병목 해소',
    evidence: {
      label: '동일 검사 데이터 · Start/End 로그 기준',
      href: '/work/gerber-part-roi-matching-optimization',
      suffix: ' 약 99% 개선',
    },
  },
  {
    value: '약 70% 감소',
    label: '장애 이슈 등록 건수 감소',
    description: '생산 연동 책임 분리로 장애 이슈 등록 건수 감소',
    evidence: {
      label: 'MES · SECS/GEM 연동 장애 감소를 위한 생산 이벤트 처리 구조화',
      href: '/work/mes-secs-gem-data-flow',
    },
  },
  {
    value: '전체 키 + 조합키',
    label: '단축키 기능 확장 및 리팩터링',
    description: '설정 UI와 입력 매칭 구조를 정리해 지원 범위와 응답성을 개선',
    evidence: {
      label: '설정 UI 범위 확장 · 로그 기준 응답성 개선',
      href: industrialAoiHotKeyOptimizationPath,
      suffix: ' 약 85% 개선',
    },
  },
  {
    value: '약 90% 단축',
    label: '원격 공유 폴더 I/O 처리 시간 단축',
    description: 'SMB 직접 조작을 로컬 실행 위임 구조로 전환',
    evidence: {
      label: '이슈 발생 PC Start/End 로그 기준',
      href: '/work/remote-shared-folder-io-bottleneck',
    },
  },
  {
    value: '사각형 → Polygon',
    label: '검출 영역 Polygon 가시화 체계 구축',
    description: 'Bounding Box 표시를 Polygon 기반 공통 가시화 구조로 표준화',
    evidence: {
      label: '공통 Polygon 바이너리 구조 표준화 · 검사 UI 가시화 적용',
      href: industrialAoiBridgePolygonVisualizationPath,
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: '장비 SW와 운영 보조 도구 구현',
    skills: ['C#', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Core Tech',
    description: '제조 장비용 Windows 앱 개발 기반',
    skills: ['.NET Framework', 'Android SDK'],
  },
  {
    title: 'Database',
    description: '검사 이력과 운영 데이터 관리',
    skills: ['MSSQL', 'MariaDB', 'SQLite'],
  },
  {
    title: 'ORM',
    description: '레거시 데이터 접근 계층 유지보수',
    skills: ['iBATIS.NET'],
  },
  {
    title: 'Domain Tech',
    description: '생산 연동과 영상처리 도메인',
    skills: ['SECS/GEM', 'OpenCV', 'TCP/IP', 'FTP'],
  },
  {
    title: 'Tools / Workflow',
    description: '형상관리와 개발 협업 흐름',
    skills: ['Git', 'SVN'],
  },
];

export const experiences: Experience[] = [
  {
    period: '2020.04 ~ 현재',
    title: '제조 장비 소프트웨어 개발자',
    organization: '펨트론 (Pemtron)',
    description: 'C#/.NET 기반 광학 검사 장비 SW 개발·유지보수',
    outcomes: [
      'AOI 데이터 처리 병목 분석 및 성능 최적화',
      'MES·SECS-GEM 생산 연동 안정화',
      'WinForms 장비 기능 유지보수 및 구조화',
    ],
    keywords: ['C#', 'C++', '.NET Framework', 'SECS/GEM', 'OpenCV', 'Refactoring'],
  },
  {
    period: '2019.10 ~ 2020.04',
    title: 'Android 개발자',
    organization: '비마시스',
    description: '모빌리티 서비스 사용자용 Android 앱의 지도·검색 기능 개발 참여',
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
    title: 'Gerber-Part ROI 매칭 성능 최적화',
    summary: '6분 22초 걸리던 대용량 ROI 매칭을 3.5초 수준으로 단축',
    role: 'AOI 성능 최적화',
    tech: ['C#', '.NET Framework', 'WinForms', 'Algorithm', 'Performance Optimization'],
    links: [],
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    priority: 0,
    detailPath: '/work/gerber-part-roi-matching-optimization',
    status: 'Work Case',
  },
  {
    title: '단축키 설정 범위 확장 및 입력 응답성 최적화',
    summary: '단축키 설정 UI와 KeyDown 입력 매칭부를 재구성해 전체 키보드 키·조합키 설정을 지원하고, 응답 시간을 0.3초 수준으로 단축',
    role: 'WinForms UX/UI · 기능 확장 · 응답성 개선',
    tech: ['C#', '.NET Framework', 'WinForms', 'Data Structure', 'Performance Optimization', 'UX/UI'],
    links: [],
    image: '/assets/shortcut-key-redesign-mockup.png',
    priority: 3,
    detailPath: industrialAoiHotKeyOptimizationPath,
    status: 'Work Case',
  },
  {
    title: 'MES · SECS/GEM 생산 연동 안정화',
    summary: '공통 이벤트 기준과 책임 분리로 반복 장애 알림을 감소',
    role: '장비 연동 안정화',
    tech: ['C#', '.NET Framework', 'WinForms', 'TCP/IP', 'SECS/GEM', 'Packet Framing'],
    links: [],
    image: '/assets/industrial-aoi-production-integration/main-image.png',
    priority: 1,
    detailPath: '/work/mes-secs-gem-data-flow',
    status: 'Work Case',
  },
  {
    title: '원격 공유 폴더 I/O 병목 해소',
    summary: '공유 폴더 파일 처리를 bat + TCP/IP 기반 로컬 실행 구조로 전환해 Confirm 전체 시간을 약 32초에서 3초대로 단축',
    role: '원격 I/O 처리 최적화',
    tech: ['C#', '.NET Framework', 'WinForms', 'TCP/IP', 'Batch Process', 'File I/O'],
    links: [],
    image: '/assets/shared-folder-bottleneck.png',
    priority: 4,
    detailPath: '/work/remote-shared-folder-io-bottleneck',
    status: 'Work Case',
  },
  {
    title: '검출 영역 Polygon 가시화 체계 구축',
    summary: 'Bounding Box 표시를 실제 Blob 외곽 Polygon 가시화 구조로 표준화',
    role: '영상처리 기반 가시화 · Polygon 표현 표준 · 공통 바이너리 구조',
    tech: ['C++', 'C#', '.NET Framework', 'WinForms', 'OpenCV', 'Binary File'],
    links: [],
    image: '/assets/defect-polygon-visualization-standardization.png',
    priority: 2,
    detailPath: industrialAoiBridgePolygonVisualizationPath,
    status: 'Work Case',
  },
];

export const projects: Project[] = [
  {
    title: 'WinFormsCustomControls',
    summary: '반복 WinForms UI를 DLL 기반 커스텀 컨트롤로 정리한 공개 라이브러리',
    role: '개인 프로젝트 · 공개 코드 · DLL 설계',
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
    status: 'Personal',
  },
  {
    title: 'ExcelConditionPainter',
    summary: '조건별 Excel 강조 표시와 주문 통계 산출을 자동화한 WinForms 도구',
    role: '개인 프로젝트 · WinForms · Excel 자동화',
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
    status: 'Personal',
  },
  {
    title: 'RFID Collision Search Simulator',
    summary: 'RFID 충돌 탐색을 Prefix 질의 모델로 검증한 C++ 콘솔 시뮬레이터',
    role: '개인 프로젝트 · C++ 알고리즘 검증',
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
    status: 'Personal',
  },
  {
    title: 'CPUMemoryStressTest',
    summary: 'CPU/Memory 부하 실행과 CSV 결과 수집을 자동화한 C++20 검증 도구',
    role: '개인 프로젝트 · C++20 · 테스트 도구',
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
    status: 'Personal',
  },
];
