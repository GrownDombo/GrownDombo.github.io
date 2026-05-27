import {
  industrialAoiBridgePolygonVisualizationPath,
  industrialAoiDefectHistoryDataLayerPath,
  industrialAoiInspectionAutomationPath,
  industrialAoiProductionIntegrationPath,
} from '../routes/paths';

export type ResumeChannel = {
  label: string;
  value: string;
  href: string;
};

export type ResumeSkillGroup = {
  title: string;
  skills: string[];
};

export type ResumeHighlight = {
  category: string;
  title: string;
  metrics: string[];
  details: string[];
  keywords: string[];
  detailHref?: string;
};

export type ResumeExperience = {
  company: string;
  companyHref?: string;
  role: string;
  period: string;
  responsibilities: string[];
  highlights: ResumeHighlight[];
};

export type ResumeDetailItem = {
  title: string;
  meta?: string;
  period?: string;
  href?: string;
  details?: string[];
};

export type ResumeDetailGroup = {
  title: string;
  items: ResumeDetailItem[];
};

export const resumeInfo = {
  lastUpdated: '2026-05-27',
  name: '최준영',
  title: '7년 차 C#/.NET Windows 응용프로그램 개발자',
  photo: '/assets/resume/profile.jpg',
  statement: [
    '6분대 처리 시간을 3.5초로 줄이고, 이슈 등록 건수를 약 70% 낮춘 Windows 응용프로그램 개발자입니다.',
    '성능 병목 분석, 시스템 연동, 데이터 가시화, 기능 확장을 코드 구조 개선으로 연결합니다.',
  ],
  contact: 'yjc0455@naver.com',
  channels: [
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
  ] satisfies ResumeChannel[],
  skills: [
    {
      title: 'Languages',
      skills: ['C#', 'C++', 'Java', 'Python'],
    },
    {
      title: 'Windows App',
      skills: ['.NET Framework', 'WinForms'],
    },
    {
      title: 'Database',
      skills: ['MSSQL', 'MariaDB', 'SQLite'],
    },
    {
      title: 'Domain Tech',
      skills: ['SECS/GEM', 'OpenCV'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'SVN'],
    },
  ] satisfies ResumeSkillGroup[],
};

export const resumeIntroduction = [
  'C#/.NET 기반 Windows 응용프로그램을 중심으로 성능 최적화, 생산 시스템 연동, 검사 데이터 관리 기능을 개발해 왔습니다. 단순 유지보수보다 사용자가 겪는 지연, 반복 장애, 기능 제약을 코드 구조와 처리 흐름 개선으로 해결하는 데 강점이 있습니다.',
  '대표적으로 대용량 ROI 매칭 시간을 6분 22초에서 3.5초로 단축했고, 생산 연동 구조 정리로 이슈 관리 시스템 등록 건수를 약 70% 줄였습니다. 단축키 지원 범위 확장, 원격 공유 폴더 I/O 병목 해소, 폴리곤 기반 검출 영역 가시화처럼 사용자가 바로 체감할 수 있는 개선도 함께 수행했습니다.',
  '개발 과정에서는 문제를 기능 단위로만 보지 않고, 사용자가 어떤 흐름에서 불편을 겪는지와 운영 중 어떤 지점에서 비용이 반복되는지를 함께 확인하려고 합니다. 로그, 처리 시간, 이슈 등록 건수처럼 확인 가능한 근거를 바탕으로 병목을 좁히고, 기존 흐름과의 호환성을 유지하면서 개선을 적용하는 방식을 선호합니다.',
  '개인 프로젝트에서는 실무에서 마주친 반복 작업, 성능 측정, 사용 흐름 개선 문제를 작은 도구로 분리해 검증하는 과정을 중요하게 생각합니다. Excel 자동화 도구, CPU/Memory 부하 테스트 도구처럼 직접 사용할 수 있는 도구를 만들며 자동화와 성능 검증에 대한 관심을 이어가고 있습니다. GitHub에는 결과물뿐 아니라 문제를 재현하고 구조를 개선해 가는 과정을 남기며, 코드 품질과 사용성을 함께 다듬고 있습니다.',
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: '펨트론 (Pemtron)',
    companyHref: 'https://www.pemtron.com',
    role: 'C#/.NET Windows 응용프로그램 개발자',
    period: '2020.04 ~ 현재',
    responsibilities: [
      'C#/.NET 기반 검사 및 운영용 Windows 응용프로그램 개발',
      'SECS/GEM, TCP/IP, FTP 기반 생산 시스템 연동 기능 개발',
      '대용량 검사 데이터 처리, 이력 관리, 가시화 UI 구조 개선',
    ],
    highlights: [
      {
        category: '대용량 데이터 처리 · 성능 최적화',
        title: 'Gerber-Part ROI 매칭 성능 최적화',
        metrics: [
          '처리 시간 단축: 6분 22초 → 3.5초, 약 99% 단축',
          '비교 범위 축소: 약 273억 회 → 약 1억 회 수준',
        ],
        details: [
          'Module 영역 후보 선별과 Gerber ROI 변환 결과 캐싱으로 반복 비교 비용을 축소',
          '기존 검사 결과 포맷을 유지해 후속 검사 흐름 영향 없이 성능 개선을 적용',
        ],
        keywords: ['C#', '.NET Framework', 'WinForms', 'Algorithm', 'Performance Optimization'],
        detailHref: industrialAoiInspectionAutomationPath,
      },
      {
        category: '생산 시스템 연동 · 운영 안정화',
        title: 'MES·SECS/GEM 생산 연동 안정화',
        metrics: [
          '이슈 등록 건수 감소: 수정 전 6개월 대비 수정 후 6개월 약 70% 감소',
          '신규 고객사 연동: 생산 시스템 연동 시나리오 10개 이상 개발',
        ],
        details: [
          'SECS/GEM·FTP·TCP/IP 기반으로 고객사별 생산 연동 요구사항 구현',
          '고객사별 분기와 예외 흐름을 공통 이벤트 및 채널 책임 분리 구조로 정리',
        ],
        keywords: ['C#', '.NET Framework', 'SECS/GEM', 'TCP/IP', 'FTP', 'Refactoring'],
        detailHref: industrialAoiProductionIntegrationPath,
      },
      {
        category: '검사 데이터 · 이력 추적 · 데이터 계층',
        title: '검사 이력 데이터 계층 구축',
        metrics: [
          '조회 구조 전환: 파일·로그 중심 확인 → 계층형 DB 조회',
          '추적 범위 확장: 화면·부품·알고리즘·ROI 단위까지 조회 가능',
        ],
        details: [
          'NG 검사 결과를 계층형 데이터 모델로 저장·조회하는 공통 데이터 구조 설계',
          'SQL Mapper 기반 데이터 접근 계층과 이력 조회 UI를 구현해 분석 흐름을 표준화',
        ],
        keywords: ['C#', '.NET Framework', 'MSSQL', 'iBATIS.NET', 'Data Modeling'],
        detailHref: industrialAoiDefectHistoryDataLayerPath,
      },
      {
        category: '검사 데이터 · 이력 관리 · 가시화',
        title: '검출 영역 폴리곤 표현 체계 구축',
        metrics: [
          '고객사 수주 요구사항 대응: 약 8억 원 규모 프로젝트의 필수 표시 기능 구현',
          '검출 영역 표현 체계 구축: 사각형 표시 → 폴리곤 표현',
        ],
        details: [
          '기존 사각형 표시를 실제 검출 외곽 기반 폴리곤 표현으로 개선',
          '검출 이미지 기준으로 외곽선을 추출해 공통 저장 구조로 정리',
        ],
        keywords: ['C++', 'C#', 'OpenCV', 'MSSQL', 'Data Modeling'],
        detailHref: industrialAoiBridgePolygonVisualizationPath,
      },
    ],
  },
  {
    company: '비마시스',
    role: 'Android 개발자',
    period: '2019.10 ~ 2020.04',
    responsibilities: [
      '모빌리티 서비스 사용자용 Android 애플리케이션 개발',
      'Naver Map API 연동 및 지도 기반 위치 기능 개발',
    ],
    highlights: [
      {
        category: '지도 API 연동 · 위치 기반 기능',
        title: '지도 API 연동 및 위치 기반 기능 개발',
        metrics: [
          '영역 판별 로직 구현: 지도 API에서 제공하지 않는 위치 영역 판별 기능 직접 구현',
          '사용 흐름 개선: 비동기 주소 검색 제어와 SQLite 기반 검색 기록 저장 기능 개발',
        ],
        details: [
          '사용자 위치와 서비스 영역을 비교하는 판별 로직 구현',
          '입력 중복 요청을 줄이고 주소 검색 응답 흐름을 안정화',
        ],
        keywords: ['Java', 'Android', 'Naver Map API', 'SQLite'],
      },
    ],
  },
];

export const additionalDetails: ResumeDetailGroup[] = [
  {
    title: '학력',
    items: [
      {
        title: '대전대학교',
        meta: '전자정보통신공학과',
        period: '2012.03.01 ~ 2019.02.22',
        details: ['4.07 / 4.5, 수석 졸업'],
      },
      {
        title: '순천고등학교',
        meta: '자연계열',
        period: '2009.03.02 ~ 2012.02.08',
      },
    ],
  },
  {
    title: '교육 · 연수',
    items: [
      {
        title: '파이썬과 R을 활용한 빅데이터 분석 교육',
        meta: '국비지원',
        period: '2019.02.25 ~ 2019.08.22',
      },
      {
        title: '미국 어학연수',
        period: '2017.09.17 ~ 2018.07.07',
      },
    ],
  },
  {
    title: '논문',
    items: [
      {
        title: '주차구역 단속 시스템 설계 및 구현',
        meta: '대전대학교 산업기술연구소 Vol.30 No.1',
        href: 'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&control_no=a5a7a98742e78d74b7998d826d417196',
        details: ['Raspberry Pi/Ubuntu 기반 영상처리 I/O 연동'],
      },
    ],
  },
  {
    title: '자격',
    items: [
      {
        title: '정보처리기사',
        meta: '한국산업인력공단',
        period: '2017.05.26',
      },
    ],
  },
  {
    title: '병역',
    items: [
      {
        title: '병장 만기 전역',
        meta: '육군 · 갑판병',
        period: '2013.01.07 ~ 2014.12.06',
      },
    ],
  },
];
