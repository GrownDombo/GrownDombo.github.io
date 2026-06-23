import {
  cpuMemoryStressTestPath,
  excelConditionPainterPath,
  industrialAoiBridgePolygonVisualizationPath,
  industrialAoiDefectHistoryDataLayerPath,
  industrialAoiHotKeyOptimizationPath,
  industrialAoiInspectionAutomationPath,
  industrialAoiOperationFlowPath,
  industrialAoiProductionIntegrationPath,
  rfidCollisionSearchSimulatorPath,
} from '../routes/paths';

export type CareerContact = {
  label: string;
  value: string;
  href: string;
};

export type CareerCompetency = {
  title: string;
  description: string;
};

export type CareerExperience = {
  company: string;
  role: string;
  period: string;
  scope: string[];
  achievements: string[];
};

export type CareerProject = {
  title: string;
  subtitle: string;
  role: string;
  problem: string;
  problemPoints?: string[];
  rolePoints?: string[];
  contributions: string[];
  results: string[];
  tech: string[];
  detailHref?: string;
};

export type CareerSkillGroup = {
  title: string;
  skills: string[];
};

export type CareerLearningItem = {
  title: string;
  description: string;
  detailHref: string;
};

export const careerProfile = {
  name: '최준영 / GrownDombo',
  title: 'C#/.NET Windows 응용프로그램 개발자',
  headline: '성능 병목, 외부 시스템 연동, 데이터 흐름을 개선하는 개발자',
  contacts: [
    {
      label: 'Email',
      value: 'yjc0455@naver.com',
      href: 'mailto:yjc0455@naver.com',
    },
    {
      label: 'Portfolio',
      value: 'growndombo.github.io',
      href: 'https://growndombo.github.io/',
    },
    {
      label: 'GitHub',
      value: 'GrownDombo',
      href: 'https://github.com/GrownDombo',
    },
    {
      label: 'Tech Blog',
      value: 'growndombo.tistory.com',
      href: 'https://growndombo.tistory.com',
    },
  ] satisfies CareerContact[],
  summary: [
    'C#/.NET 기반 Windows 응용프로그램을 중심으로 대용량 데이터 처리, 외부 시스템 연동, 처리 결과 조회와 가시화 구조 개선을 수행해 왔습니다.',
    '처리 지연, 반복 이슈, 조회 불편 등 사용자가 직접 겪는 문제를 코드 구조와 데이터 흐름 개선으로 줄이는 데 강점이 있습니다.',
    '대표적으로 대용량 매칭 시간을 6분 22초에서 3.5초로 단축했고, 외부 시스템 연동 구조 정리로 이슈 관리 시스템 등록 건수를 약 70% 줄였으며, 파일과 로그 중심 확인을 DB 기반 이력 조회 구조로 전환했습니다.',
  ],
};

export const careerCompetencies: CareerCompetency[] = [
  {
    title: '성능 병목 분석 및 최적화',
    description: '대용량 좌표 비교, 반복 탐색, 원격 I/O처럼 시간이 크게 늘어나는 구간을 측정하고 후보 선별, 캐싱, 실행 위치 변경으로 처리 시간 단축',
  },
  {
    title: '외부 시스템 연동 안정화',
    description: '고객사별 분기와 예외 처리를 공통 이벤트, 채널 책임, 응답 반영 흐름으로 분리해 운영 중 반복되는 이슈 감소',
  },
  {
    title: '처리 데이터 구조화와 조회 흐름 개발',
    description: '파일과 로그에 흩어진 처리 결과를 DB 기반 계층 구조로 정리하고 기간과 Job 조건 검색부터 상세 결과 복원까지 이어지는 조회 기능 구현',
  },
  {
    title: '처리 결과 가시화와 Windows UI 개발',
    description: 'C++ 처리 결과와 C# UI 사이의 데이터 표현 방식을 정리하고 사용자가 판단 근거를 화면에서 확인할 수 있는 가시화 기능 개발',
  },
];

export const careerExperiences: CareerExperience[] = [
  {
    company: '펨트론 (Pemtron)',
    role: 'C#/.NET Windows 응용프로그램 개발자',
    period: '2020.04 ~ 현재',
    scope: [
      'C#/.NET 기반 데이터 처리 및 운영용 Windows 응용프로그램 개발',
      '외부 시스템 연동, 데이터 처리, 이력 조회, 처리 결과 가시화 기능 개발',
      '대용량 데이터 처리 병목 분석, 운영 이슈 원인 추적, 기존 기능 구조 개선',
    ],
    achievements: [
      '대용량 매칭 처리 시간 6분 22초에서 3.5초로 단축',
      '외부 시스템 연동 구조 개선 후 이슈 관리 시스템 등록 건수 약 70% 감소',
      '약 8억 원 규모 고객사 수주 요구사항에 대응해 결과 영역 표현 체계 구축',
    ],
  },
  {
    company: '비마시스',
    role: 'Android 개발자',
    period: '2019.10 ~ 2020.04',
    scope: [
      '모빌리티 서비스 사용자용 Android 애플리케이션 개발',
      'Naver Map API 연동, 위치 기반 기능, 주소 검색 흐름 개발',
    ],
    achievements: [
      '지도 API에서 직접 제공하지 않는 위치 영역 판별 로직 구현',
      '비동기 주소 검색 제어와 SQLite 기반 검색 기록 저장 기능 개발',
    ],
  },
];

export const careerProjects: CareerProject[] = [
  {
    title: '대용량 좌표 데이터 매칭 성능 최적화',
    subtitle: '좌표 매칭 성능 최적화',
    role: '병목 분석, 후보 선별 구조 설계, 캐싱 적용, 결과 호환성 검증',
    problem: '데이터 처리 과정에서 대량의 좌표 데이터를 반복 비교해 데이터 규모가 커질수록 처리 시간이 급격히 증가하는 구조',
    problemPoints: [
      '데이터 처리 과정에서 대량의 좌표 데이터를 반복 비교',
      '데이터 규모가 커질수록 처리 시간이 급격히 증가하는 구조',
    ],
    rolePoints: ['병목 구간 분석과 처리 흐름 측정', '후보 선별 구조 설계, 캐싱 적용, 결과 호환성 검증'],
    contributions: [
      '반복 비교가 발생하는 구간을 로그와 처리 흐름 기준으로 분석',
      '상위 영역과 교차하는 후보만 먼저 선별해 비교 대상을 축소',
      '좌표 변환 결과를 캐싱해 반복 계산을 줄이고 기존 결과 포맷은 유지',
    ],
    results: [
      '처리 시간 6분 22초 → 3.5초, 약 99% 단축',
      '비교 범위 약 273억 회 → 약 1억 회 수준으로 축소',
      '후속 검사 흐름 변경 없이 성능 개선 적용',
    ],
    tech: ['C#', '.NET Framework', 'WinForms', 'Algorithm', 'Performance Optimization'],
    detailHref: industrialAoiInspectionAutomationPath,
  },
  {
    title: '외부 시스템 연동 안정화',
    subtitle: '외부 시스템 연동 안정화',
    role: '고객사별 연동 요구사항 구현, 이벤트 처리 구조 정리, 예외 흐름 개선',
    problem: '고객사별 외부 연동 조건과 예외 처리 누적으로 변경 영향 범위와 반복 이슈 추적 비용이 증가하는 구조',
    problemPoints: [
      '고객사별 외부 연동 조건과 예외 처리 누적',
      '변경 영향 범위와 반복 이슈 추적 비용이 증가하는 구조',
    ],
    rolePoints: ['고객사별 외부 시스템 연동 요구사항 구현', '이벤트 처리 구조 정리와 예외 흐름 개선'],
    contributions: [
      '외부 연동 이벤트 생성, 전송 분기, 응답 반영 책임을 분리',
      '고객사별 차이를 공통 이벤트 기준과 확장 지점으로 정리',
      '연동 로그와 응답 처리 기준을 맞춰 이슈 원인 추적 흐름을 개선',
    ],
    results: [
      '수정 전후 6개월 기준 이슈 관리 시스템 등록 건수 약 70% 감소',
      '신규 고객사 외부 시스템 연동 시나리오 10개 이상 개발',
      '변경 영향 범위와 장애 추적 비용 감소',
    ],
    tech: ['C#', '.NET Framework', 'WinForms', 'System Integration'],
    detailHref: industrialAoiProductionIntegrationPath,
  },
  {
    title: '처리 이력 조회 구조 구축',
    subtitle: '파일과 로그 중심 확인을 DB 기반 조회 구조로 전환',
    role: '데이터 모델 설계, SQL Mapper 기반 접근 계층 구현, 이력 조회 UI 개발',
    problem: '처리 결과 확인이 파일과 로그 중심으로 분산되어 조건별 조회와 상세 결과 추적이 어려운 구조',
    problemPoints: ['처리 결과 확인이 파일과 로그 중심으로 분산', '조건별 조회와 상세 결과 추적이 어려운 구조'],
    rolePoints: ['처리 이력 데이터 모델 설계', 'SQL Mapper 기반 접근 계층 구현과 이력 조회 UI 개발'],
    contributions: [
      '처리 결과를 화면, 항목, 알고리즘, 영역 단위로 추적할 수 있는 데이터 구조 설계',
      'MSSQL과 SQL Mapper 기반 데이터 접근 계층을 구현해 저장과 조회 책임을 분리',
      '기간과 Job 기준 검색부터 상세 결과 확인까지 이어지는 조회 UI 개발',
    ],
    results: [
      '파일과 로그 중심 확인을 DB 기반 조회 구조로 전환',
      '처리 결과 추적 범위를 화면, 항목, 알고리즘, 영역 단위까지 확장',
      '운영 중 결과 확인과 분석 흐름을 표준화',
    ],
    tech: ['C#', '.NET Framework', 'WinForms', 'MSSQL', 'iBATIS.NET', 'Data Modeling'],
    detailHref: industrialAoiDefectHistoryDataLayerPath,
  },
  {
    title: '결과 영역 폴리곤 표현 체계 구축',
    subtitle: '약 8억 원 규모 고객사 수주 요구사항 대응',
    role: '결과 영역 추출 흐름 정리, 공통 저장 구조 정의, C# UI 가시화 구현',
    problem: '고객사 수주를 위해 실제 결과 외곽 확인이 필요했으나, 기존 사각형 표시만으로는 판단 근거를 충분히 보여주기 어려운 구조',
    problemPoints: [
      '고객사 수주를 위해 실제 결과 외곽 확인이 필요한 상황',
      '기존 사각형 표시만으로는 판단 근거를 충분히 보여주기 어려운 구조',
    ],
    rolePoints: ['결과 영역 추출 흐름 정리와 공통 저장 구조 정의', 'C# UI에서 결과 영역 폴리곤 가시화 구현'],
    contributions: [
      '결과 이미지 기준으로 외곽선을 추출하고 좌표를 원본 이미지 기준으로 복원',
      'C++ 처리 결과와 C# UI가 함께 사용할 수 있는 공통 표현 구조 정리',
      '결과 확인 화면에서 영역을 폴리곤 형태로 확인할 수 있도록 UI 적용',
    ],
    results: [
      '약 8억 원 규모 고객사 수주를 위한 필수 표시 요구사항 대응',
      '사각형 중심 표시를 실제 결과 외곽 기반 표현으로 개선',
      '검사 엔진과 UI 사이의 표현 방식 표준화',
    ],
    tech: ['C++', 'C#', '.NET Framework', 'WinForms', 'OpenCV', 'MSSQL'],
    detailHref: industrialAoiBridgePolygonVisualizationPath,
  },
];

export const careerAdditionalProjects: CareerProject[] = [
  {
    title: '단축키 기능 확장 및 입력 응답성 개선',
    subtitle: 'WinForms 설정 UI와 KeyDown 입력 매칭부 개선',
    role: '설정 UI 확장, 입력 매칭 구조 개선, 설정 저장과 검증 흐름 정리',
    problem: '28개 단일 키 중심의 설정 방식으로 기능 확장성 제약이 있고 입력 처리 시 반복 탐색으로 응답 지연이 발생하는 구조',
    contributions: [
      '전체 키와 조합 키를 설정할 수 있도록 UI 범위 확장',
      '입력 조합을 즉시 조회하는 자료구조를 적용해 반복 탐색 제거',
    ],
    results: [
      '지원 범위 28개 단일 키 → 전체 키 + 조합 키로 확장',
      '로그 기준 입력 응답 시간 약 2초 → 0.3초로 개선',
    ],
    tech: ['C#', '.NET Framework', 'WinForms', 'Data Structure'],
    detailHref: industrialAoiHotKeyOptimizationPath,
  },
  {
    title: '원격 공유 폴더 I/O 병목 해소',
    subtitle: '공유 폴더 직접 조작을 로컬 실행 구조로 전환',
    role: 'I/O 병목 분석, 실행 위임 구조 설계, 기존 흐름 호환성 유지',
    problem: '원격 PC가 공유 폴더 파일을 직접 이동하고 삭제하면서 네트워크 경유 비용으로 전체 처리 시간이 길어지는 구조',
    contributions: [
      '파일 보유 PC에서 작업이 실행되도록 명령 생성과 실행 요청 흐름 구성',
      '접속 실패 시 기존 처리 흐름을 유지해 운영 리스크 완화',
    ],
    results: [
      'Start/End 로그 기준 약 32초 → 3초대, 약 90% 단축',
      '원격 공유 폴더 직접 조작 구간의 대기 시간 감소',
    ],
    tech: ['C#', '.NET Framework', 'WinForms', 'TCP/IP', 'File I/O'],
    detailHref: industrialAoiOperationFlowPath,
  },
];

export const careerSkillGroups: CareerSkillGroup[] = [
  {
    title: 'Languages',
    skills: ['C#', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Windows App',
    skills: ['.NET Framework', 'WinForms'],
  },
  {
    title: 'Data',
    skills: ['MSSQL', 'MariaDB', 'SQLite', 'iBATIS.NET'],
  },
  {
    title: 'Integration / Data',
    skills: ['System Integration', 'OpenCV'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'SVN'],
  },
];

export const careerPersonalProjects: CareerLearningItem[] = [
  {
    title: 'ExcelConditionPainter',
    description: '조건별 Excel 강조 표시와 주문 통계 산출 자동화, 수작업 확인 흐름을 WinForms 도구로 축소',
    detailHref: excelConditionPainterPath,
  },
  {
    title: 'CPUMemoryStressTest',
    description: 'C++20 기반 CPU/Memory 부하 실행, 반복 측정, JSON/CSV 결과 수집 흐름 구조화',
    detailHref: cpuMemoryStressTestPath,
  },
  {
    title: 'WinForms 커스텀 컨트롤 라이브러리',
    description: '반복 UI 구성, 속성 기반 설정, 재사용 가능한 컴포넌트 설계 방식 정리',
    detailHref: 'https://github.com/GrownDombo/WinFormsCustomControls',
  },
  {
    title: 'RFID Collision Search Simulator',
    description: 'Prefix 기반 태그 탐색 로직 구현, 재귀 방식과 반복 방식의 탐색 결과 비교 흐름 정리',
    detailHref: rfidCollisionSearchSimulatorPath,
  },
];

export const careerTroubleshootingNotes: CareerLearningItem[] = [
  {
    title: 'Windows 메모리 누수 분석',
    description: 'Performance Monitor와 UMDH 기반 자원 사용량 계측, 힙 덤프 비교, 누수 위치 추적 절차 정리',
    detailHref: 'https://growndombo.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-%ED%99%95%EC%9D%B8%EB%B0%A9%EB%B2%95-UMDH',
  },
  {
    title: 'GoF 디자인 패턴 및 객체지향 설계 원칙',
    description: '구조 개선과 확장 가능한 코드 설계를 위한 생성 패턴, 행위 패턴 및 설계 원칙 정리',
    detailHref: 'https://growndombo.tistory.com/15',
  },
];
