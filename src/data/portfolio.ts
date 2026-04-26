export type ProfileLink = {
  label: string;
  href: string;
  kind: 'github' | 'email' | 'blog';
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
  name: '최준영 / GrownDombo',
  role: 'C# / C++ 기반 Windows Software Developer',
  headline: '제조 현장의 Windows 도구와 장비 소프트웨어를 개선하는 개발자',
  summary:
    'C# / C++ 기반 Windows 프로그램을 개발하며, 반도체·SMT 제조라인에서 사용되는 검사 장비 소프트웨어의 개발 및 유지보수 경험이 있습니다. 공정 자동화, 생산 시스템 연동, UI 개선, 성능 최적화처럼 현장의 흐름을 안정적인 소프트웨어로 연결하는 일에 집중합니다.',
  location: 'Seoul, Korea',
  availability: 'Windows 애플리케이션과 제조 자동화 영역의 기회를 찾고 있습니다',
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
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: 'Windows 데스크톱 도구와 성능 테스트, 업무 자동화 구현에 사용하는 언어입니다.',
    skills: ['C#', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Windows / Application',
    description: '사용자가 반복해서 쓰는 업무 도구와 WinForms 기반 UI를 구현합니다.',
    skills: ['.NET Framework', 'WinForms', 'ClosedXML', 'Visual Studio', 'Installer Project'],
  },
  {
    title: 'Domain / Infra',
    description: '제조라인 소프트웨어의 데이터, 장비 연동, 영상 처리 흐름을 다룹니다.',
    skills: ['MSSQL', 'MariaDB', 'SQLite', 'iBATIS.NET', 'SECS/GEM', 'OpenCV'],
  },
];

export const projects: Project[] = [
  {
    title: 'WinFormsCustomControls',
    summary:
      '.NET Framework 4.8 기반 WinForms 프로젝트에서 반복적으로 쓰는 UI 패턴을 커스텀 컨트롤 DLL로 묶은 라이브러리입니다. 데모 프로젝트를 통해 각 컨트롤의 동작을 확인할 수 있도록 구성했습니다.',
    role: '커스텀 컨트롤 설계, WinForms UI 패턴 재사용 구조화',
    tech: ['C#', '.NET Framework 4.8', 'WinForms', 'System.Drawing'],
    highlights: [
      'ColorComboBox, CheckBoxComboBox, CheckableGroupBox 등 반복 UI 요소 구현',
      'DoubleBufferedDataGridView로 많은 행 표시 시 깜빡임을 줄이는 그리드 제공',
      'DLL 직접 참조와 솔루션 내 프로젝트 참조 모두 가능한 사용 흐름 정리',
    ],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/WinFormsCustomControls',
      },
    ],
    image: '/assets/project-winforms-custom-controls.png',
    status: '.NET Framework 4.8',
  },
  {
    title: 'ExcelConditionPainter',
    summary:
      '사용자 정의 조건에 따라 Excel 데이터를 검색하고 강조 표시한 뒤, 결과를 새 파일로 내보낼 수 있는 Windows Forms 기반 데스크톱 도구입니다. 단순 필터링으로 부족한 데이터 정리 과정을 보조하기 위해 만들었습니다.',
    role: '조건 설정 UI, Excel 처리 흐름, Export 기능 구현',
    tech: ['C#', 'WinForms', 'ClosedXML', 'Visual Studio Setup Project'],
    highlights: [
      '중복값, 수량, 옵션 등 기준 검색과 AND / OR 조건 조합 지원',
      '조건 우선순위와 Font / Fill 색상 지정으로 결과를 시각적으로 구분',
      '원본을 덮어쓰지 않고 `_Painted.xlsx` 결과 파일로 저장하는 흐름 제공',
    ],
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
    summary:
      'CPU와 메모리 자원에 강한 부하를 발생시켜 단일 처리와 병렬 처리의 차이, 알고리즘별 부하 특성, 메모리 사용 패턴을 비교할 수 있도록 만든 C++ 콘솔 스트레스 테스트 도구입니다.',
    role: '테스트 시나리오 구성, C++ 재구현, CSV 결과 로깅',
    tech: ['C++', 'WinAPI', 'STL', 'Visual Studio 2022'],
    highlights: [
      '수학 연산, 재귀, 소수 탐색, 정렬, Mandelbrot, 메모리 할당 시나리오 구성',
      '동일 작업을 단일 처리와 병렬 처리로 나누어 실행 시간과 특성을 비교',
      '반복 실행 결과를 CSV로 기록해 누적 비교가 가능하도록 구성',
    ],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/GrownDombo/CPUMemoryStressTest',
      },
    ],
    image: '/assets/project-cpu-memory-stress-test.png',
    status: 'C++ Stress Tool',
  },
];

export const experiences: Experience[] = [
  {
    period: 'Professional',
    title: '검사 장비 소프트웨어 개발 및 유지보수',
    organization: 'Semiconductor / SMT Manufacturing Line',
    description:
      '반도체·SMT 제조라인에서 사용되는 검사 장비 소프트웨어를 개발하고 유지보수하며, 현장 운영에 필요한 안정성과 사용성을 개선했습니다.',
    outcomes: ['C# / C++ 기반 Windows 프로그램 개발', '장비 소프트웨어 UI 개선', '성능 최적화 및 유지보수 대응'],
  },
  {
    period: 'Professional',
    title: '공정 자동화 및 생산 시스템 연동',
    organization: 'Manufacturing Software',
    description:
      '공정 자동화와 생산 시스템 연동 흐름을 다루며, 장비·데이터·사용자 화면 사이의 연결을 안정적으로 구성하는 경험을 쌓았습니다.',
    outcomes: ['생산 시스템 데이터 연동', 'MSSQL / MariaDB / SQLite 활용', 'SECS/GEM 및 OpenCV 기반 도메인 경험'],
  },
  {
    period: 'Open Source',
    title: 'Windows 도구와 학습 프로젝트 정리',
    organization: 'GitHub / Technical Blog',
    description:
      '업무에서 반복되는 UI 패턴과 데이터 처리 문제를 개인 프로젝트로 정리하고, 사용 방법과 설계 의도를 README와 블로그에 기록했습니다.',
    outcomes: ['WinForms 커스텀 컨트롤 라이브러리 공개', 'Excel 조건부 표시 도구 제작', 'C++ 성능 테스트 도구 구현'],
  },
];
