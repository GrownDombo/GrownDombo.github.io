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
  title: '7년 차 - 잘 읽히는 개발자',
  photo: '/assets/resume/profile.jpg',
  statement: [
    '잘 읽히는 구조와 안정적인 동작을 중요하게 생각하며,',
    '지속적으로 개선 가능한 소프트웨어를 만드는 개발자입니다.',
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
  '반도체/SMT 제조라인에서 사용되는 3D 검사 장비 소프트웨어의 개발 및 유지보수를 담당하며, 공정 자동화와 생산 시스템 연동을 중심으로 기능 고도화와 운영 안정화에 필요한 업무를 수행하고 있습니다.',
  '초기 경력에서는 모빌리티 서비스 데모 프로젝트에 참여해 Java 기반 Android 앱 개발을 맡았으며, 개발 초기부터 1차 데모 완료까지 과정에 기여했습니다.',
  '안정적인 구조와 최적화된 성능을 함께 고려한 개발을 중요하게 생각하며, 자료구조, 패턴, 알고리즘을 중심으로 역량을 꾸준히 쌓아 왔습니다. 그 과정에서 이슈 발생률을 약 70% 줄이고, 데이터 처리 속도를 약 97% 향상시킨 경험이 있습니다.',
  '다양한 소프트웨어 도구와 직접 제작한 보조 도구를 활용해 검증, 테스트, 운영 과정에서 발생하는 문제를 효율적으로 해결해 왔습니다. 실무에 필요한 도구를 개발해 업무 효율을 높였고, 일부 프로그램은 GitHub에 공유하고 있습니다.',
  '지식과 경험은 함께 나눌 때 더 큰 성과로 이어진다고 생각합니다. 최근에는 실무 경험과 학습한 내용을 기술 블로그에 정리하고 있으며 작성한 내용은 팀원들과도 공유하며 함께 활용하고 있습니다.',
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: '펨트론 (Pemtron)',
    companyHref: 'https://www.pemtron.com',
    role: 'Windows 응용프로그램 개발자',
    period: '2020.04 ~ 현재',
    responsibilities: [
      '광학 검사 장비 소프트웨어 개발·유지보수',
      '공정 자동화 및 생산 시스템 연동 기능 개발·유지보수',
      '소프트웨어 구조 개선 및 성능 최적화',
    ],
    highlights: [
      {
        category: '공정 자동화 및 생산 시스템',
        title: '생산 시스템 연동 기능 개발·유지보수 및 구조 개선',
        metrics: [
          '장애 이슈 관련 메일 전분기 대비 약 70% 감소',
          '운영 구조 표준화로 장애 대응 시간 약 40% 단축',
          '10개 이상 신규 고객사 생산 시스템 연동 시나리오 개발',
        ],
        details: [
          'SECS/GEM·FTP·TCP/IP 기반으로 다양한 생산 연동 요구사항 구현',
          '분기 구조를 디자인 패턴 기반으로 리팩토링해 관리 효율·운영 안정성 향상',
        ],
        keywords: ['C#', '.NET Framework', 'SECS/GEM', 'TCP/IP', 'FTP', 'Refactoring', 'Design Pattern'],
      },
      {
        category: '성능 최적화 및 처리 구조 개선',
        title: '병목 구간 분석 및 처리 성능 개선',
        metrics: [
          '2D 좌표 기반 ROI 겹침 판별 처리 시간 단축: 6분 20초 → 5초, 약 97% 개선',
          '자동 파라미터 생성 처리 시간 단축: 26분 20초 → 16분 30초, 약 38% 개선',
          '사용자 정의 단축키 응답 속도 개선: 2초 → 0.3초, 약 85% 개선',
          '원격 PC의 파일 이동 처리 시간 단축: 14초 → 0.5초 이내, 약 96% 개선',
        ],
        details: [
          '큰 ROI 기준 후보군 선별 구조를 적용해 대용량 좌표 기반 매칭 연산을 효율화',
          'Producer-Consumer 패턴으로 수신·생성 과정을 병렬화해 처리 시간 단축',
          '복합키 자료구조를 개발·적용해 사용자 정의 단축키의 사용성과 응답성을 개선',
          '실행 주체를 원격 PC로 옮겨 파일 이동 프로토콜 오버헤드 축소',
        ],
        keywords: ['C#', 'Data Structure', 'Parallel Processing', 'Producer-Consumer', 'System Design'],
      },
      {
        category: '데이터 관리 및 이력 시스템',
        title: 'MSSQL 기반 검사 이력 관리 시스템 개발',
        metrics: [
          '로그 기반으로만 가능하던 검사 결과 분석을 UI 기반으로 전환',
          '파일 시스템 기반 관리 방식에서 발생하던 접근 충돌 문제 완화',
          '향후 다른 검사 결과 시스템에도 확장 적용할 수 있는 공통 DB 구조 마련',
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
