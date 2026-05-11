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
  lastUpdated: '2026-05-01',
  name: '최준영',
  title: '7년 차 - C#/.NET 제조 장비 SW 개발자',
  photo: '/assets/resume/profile.jpg',
  statement: [
    'AOI 성능 최적화와 MES·SECS-GEM 연동 안정화를 경험했습니다.',
    'WinForms/C++ 기반 장비 SW 유지보수와 구조 개선을 담당했습니다.',
  ],
  contact: 'yjc0455@naver.com',
  channels: [
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
      title: 'Core Tech',
      skills: ['.NET Framework', 'Android SDK'],
    },
    {
      title: 'Database',
      skills: ['MSSQL', 'MariaDB', 'SQLite'],
    },
    {
      title: 'ORM',
      skills: ['iBATIS.NET'],
    },
    {
      title: 'Domain Tech',
      skills: ['SECS/GEM', 'OpenCV'],
    },
  ] satisfies ResumeSkillGroup[],
};

export const resumeIntroduction = [
  '반도체/SMT 제조라인의 3D 검사 장비 소프트웨어를 개발·유지보수하며 AOI 검사 준비 병목, 생산 연동 장애, 장비 운영 흐름 문제를 개선했습니다.',
  '대표 사례로 Gerber-Part ROI 매칭 시간을 6분 22초에서 3.5초로 줄였고, MES·SECS-GEM 연동 구조 정리로 반복 장애 알림을 약 70% 감소시켰습니다.',
  '개인 프로젝트는 WinForms 도구와 C++ 검증 프로그램 중심으로 공개하며, 코드 구조와 재사용 가능한 설계를 확인할 수 있게 정리하고 있습니다.',
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: '펨트론 (Pemtron)',
    companyHref: 'https://www.pemtron.com',
    role: 'C#/.NET 제조 장비 소프트웨어 개발자',
    period: '2020.04 ~ 현재',
    responsibilities: [
      '광학 검사 장비 SW 개발·유지보수',
      'MES·SECS-GEM 생산 연동 기능 개선',
      'AOI 성능 최적화 및 운영 흐름 정리',
    ],
    highlights: [
      {
        category: '공정 자동화 및 생산 시스템',
        title: '생산 시스템 연동 기능 개발·유지보수 및 구조 개선',
        metrics: [
          '장애 이슈 관련 메일 전분기 대비 약 70% 감소',
          '10개 이상 신규 고객사 생산 시스템 연동 시나리오 개발',
        ],
        details: [
          'SECS/GEM·FTP·TCP/IP 기반 생산 연동 요구사항 구현',
          '공통 이벤트 기준과 채널별 책임 분리로 운영 안정성 향상',
        ],
        keywords: ['C#', '.NET Framework', 'SECS/GEM', 'TCP/IP', 'FTP', 'Refactoring', 'Design Pattern'],
      },
      {
        category: '성능 최적화 및 처리 구조 개선',
        title: '병목 구간 분석 및 처리 성능 개선',
        metrics: [
          'Gerber-Part ROI 매칭 시간 단축: 6분 22초 → 3.5초, 약 99% 개선',
          '사용자 정의 단축키 응답 속도 개선: 2초 → 0.3초, 약 85% 개선',
          '원격 PC의 파일 이동 처리 시간 단축: 14초 → 0.5초 이내, 약 96% 개선',
        ],
        details: [
          'Module 후보군 선별과 변환 결과 캐싱으로 대용량 ROI 매칭 연산 축소',
          '복합키 자료구조 적용과 실행 주체 조정으로 응답 지연 및 전송 오버헤드 완화',
        ],
        keywords: ['C#', 'Data Structure', 'Parallel Processing', 'Producer-Consumer', 'System Design'],
      },
      {
        category: '데이터 관리 및 이력 시스템',
        title: 'MSSQL 기반 검사 이력 관리 시스템 개발',
        metrics: [
          '로그 기반으로만 가능하던 검사 결과 분석을 UI 기반으로 전환',
          '파일 시스템 기반 관리 방식에서 발생하던 접근 충돌 문제 완화',
        ],
        details: [
          '검사 이력 데이터의 저장·조회·필터링 기능을 DLL 형태로 구현',
          'DB 생성·초기화·인덱스·트랜잭션 저장 구조로 데이터 관리 안정성 향상',
        ],
        keywords: ['C#', 'MSSQL', 'iBATIS.NET', 'DLL', 'Data Modeling'],
      },
      {
        category: '영상처리',
        title: '검출 영역 기반 외곽 폴리곤 추출 기능 개발',
        metrics: ['고객사 장비 구입 조건으로 제시된 기능을 개발해 약 8억 원 매출에 기여'],
        details: [
          '기존 검출 영역을 활용해 호환성을 유지하고 불필요한 다각형 연산 축소',
          '바이너리 파일셋 저장 구조로 타 프로세스 시각화 기능 확장',
        ],
        keywords: ['C++', 'OpenCV', 'Binary File', 'Image Processing'],
      },
    ],
  },
  {
    company: '비마시스',
    role: 'Android 개발자',
    period: '2019.10 ~ 2020.04',
    responsibilities: [
      '모빌리티 서비스 사용자용 Android 애플리케이션 개발',
      'Naver Map API 연동 및 지도·검색 기능 개발',
    ],
    highlights: [
      {
        category: '지도·검색 기능 개발',
        title: '지도 API 연동 및 지도·검색 기능 개발',
        metrics: [
          'Naver Map API에서 제공하지 않는 Polygon 영역 판별 기능을 직접 구현',
          '비동기 주소 검색 제어와 SQLite 기반 검색 기록 저장 기능을 개발해 사용자 편의성 향상',
        ],
        details: [
          '탑승 위치와 서비스 지역 경계를 구분하는 다각형 내부 판별 알고리즘 구현',
          '입력 멈춤 후 검색을 수행해 API 요청을 줄이고 주소 검색 응답성 개선',
        ],
        keywords: ['Java', 'Android', 'Naver Map API', 'API Integration', 'SQLite', 'Async'],
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
        meta: '이공계열',
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
        details: ['Raspberry Pi/Ubuntu 기반 영상처리·I/O 연동'],
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
        meta: '해군·갑판병',
        period: '2013.01.07 ~ 2014.12.06',
      },
    ],
  },
];
