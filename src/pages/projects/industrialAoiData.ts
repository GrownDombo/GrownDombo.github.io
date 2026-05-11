import { Box, CheckCircle, Code2, Database, FileText, Gauge, Layers, Target } from 'lucide-react';

export const gerberPartMatchingMockups = [
  {
    title: 'Module / Part View',
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    description: 'Red: Module area · Green: Part ROI',
    legend: [
      { label: 'Module area', tone: 'red' },
      { label: 'Part ROI', tone: 'green' },
    ],
  },
  {
    title: 'Gerber View',
    image: '/assets/aoi-gerber-part-matching/gerber-aligned.png',
    description: 'Gerber ROI 기준 Part Window ROI 후보 확인 화면',
    legend: [
      { label: 'Gerber ROI', tone: 'pink' },
    ],
  },
];

export const gerberPartPerformanceSummary = {
  before: '~6m 20s',
  after: '~3.5s',
  reduction: '99%+',
};

export const gerberPartPerformanceScale = [
  { label: 'Modules', value: '272개' },
  { label: 'Part Window ROI', value: '70,448개' },
  { label: 'Gerber ROI', value: '387,600개' },
];

export const gerberPartMeasurementNotes = [
  '동일 검사 데이터에서 Start/End 로그 타임스탬프 기준으로 처리 시간 산출',
  '개선 전/후 각각 2회 실행 후 평균값으로 비교',
  '평균 처리 시간 6분 22.711초에서 3.5155초로 단축',
];

export const gerberPartReportTech = [
  'C#',
  '.NET Framework',
  'WinForms',
  'Algorithm',
  'Performance Optimization',
];

export const gerberPartOptimizationSteps = [
  {
    icon: Target,
    title: 'Module 후보군 선별',
    description: 'Module 영역 기준으로 Gerber 후보군을 먼저 좁혀 전체 순회 범위를 제한',
  },
  {
    icon: Box,
    title: '변환 결과 캐싱',
    description: 'Gerber ROI 변환 결과를 재사용해 동일 좌표 계산의 반복 수행을 감소',
  },
  {
    icon: CheckCircle,
    title: '기존 흐름 호환',
    description: '기존 매칭 결과 형식을 유지해 후속 검사 흐름 영향 없이 적용',
  },
];

export const structureRoiRows = [7, 24, 41, 59, 76, 93];

export const structureComparisonLinks = structureRoiRows.flatMap((fromY, fromIndex) =>
  structureRoiRows.map((toY, toIndex) => ({
    key: `${fromIndex}-${toIndex}`,
    opacity: fromIndex === toIndex ? 0.62 : 0.34,
    y1: fromY,
    y2: toY,
  })),
);

export const structureModuleRows = [15.5, 50, 84.5];

export const structureModulePartLinks = structureRoiRows.map((toY, index) => ({
  key: `module-part-${index}`,
  y1: structureModuleRows[Math.min(Math.floor(index / 2), structureModuleRows.length - 1)],
  y2: toY,
}));

export const structurePartGerberLinks = [
  ...structureRoiRows.slice(0, 2).flatMap((fromY, fromIndex) =>
    structureRoiRows.slice(0, 2).map((toY, toIndex) => ({
      key: `part-1-gerber-${fromIndex}-${toIndex}`,
      y1: fromY,
      y2: toY,
    })),
  ),
  ...structureRoiRows.slice(2, 4).flatMap((fromY, fromIndex) =>
    structureRoiRows.slice(2, 4).map((toY, toIndex) => ({
      key: `part-2-gerber-${fromIndex}-${toIndex}`,
      y1: fromY,
      y2: toY,
    })),
  ),
  ...structureRoiRows.slice(4).flatMap((fromY, fromIndex) =>
    structureRoiRows.slice(4).map((toY, toIndex) => ({
      key: `part-n-gerber-${fromIndex}-${toIndex}`,
      y1: fromY,
      y2: toY,
    })),
  ),
];

export const gerberPartRoleItems = [
  '대용량 ROI 매칭 병목 구간 분석 및 개선 방향 수립',
  'Module 단위 Gerber 후보군 선별 로직 설계 및 구현',
  'Gerber ROI 변환 결과 캐싱 구조 적용',
  '실행 로그 기반 처리 시간 측정 및 개선 효과 검증',
  '기존 검사 결과 포맷과 후속 처리 흐름의 호환성 검증',
];

export const gerberPartKeywordItems = [
  '성능 최적화',
  '탐색 범위 축소',
  'Gerber-Part Matching',
  'ROI 캐싱',
  '대용량 데이터',
  '호환성 유지',
];

export const gerberPartSkillItems = [
  { icon: Code2, label: 'C#' },
  { icon: Database, label: 'Data Structure' },
  { icon: Layers, label: 'ROI Matching' },
  { icon: Gauge, label: 'Profiling' },
];

export const integrationReportTech = [
  'C#',
  '.NET Framework',
  'WinForms',
  'TCP/IP',
  'SECS/GEM',
  'Request Builder',
  'Facade / Dispatcher',
  'Abstract / Override',
  'Packet Framing',
];

export const integrationDirectionSteps = [
  {
    icon: Database,
    title: '생산 이벤트 표준화',
    description: 'Job, Barcode, Result, Alarm을 공통 생산 이벤트 기준으로 정리',
  },
  {
    icon: Layers,
    title: '생성·전송·응답 책임 분리',
    description: '요청 데이터 생성, 전송 분기, 응답 반영을 역할별로 정리',
  },
  {
    icon: CheckCircle,
    title: 'SECS/GEM 확장 계층',
    description: '공통 처리 계약과 고객사별 Override 지점을 분리',
  },
  {
    icon: Gauge,
    title: 'TCP/IP 메시지 안정화',
    description: 'Header/Length 기반 Packet Framing으로 메시지 경계 처리 안정화',
  },
];

export const integrationComparisonRows = [
  {
    target: '이벤트 처리',
    before: '서비스별 조건 분기 누적',
    after: '공통 생산 이벤트 기준',
    method: '이벤트 표준화',
  },
  {
    target: 'MES 전송',
    before: '전처리, 전송, 응답 반영 분산',
    after: '생성·전송·응답 책임 분리',
    method: '요청 데이터 구성 + 전송 Dispatcher',
  },
  {
    target: 'SECS/GEM',
    before: '고객사별 예외가 공통 흐름에 혼재',
    after: '공통 계약과 고객사별 Override 분리',
    method: 'Abstract / Override',
  },
  {
    target: 'TCP/IP 메시지',
    before: '대용량 메시지 경계 처리 취약',
    after: 'Header/Length 기반 Packet Framing',
    method: 'Packet Framing',
  },
  {
    target: '장애 추적',
    before: '로그 위치와 응답 흐름 분산',
    after: '이벤트-전송-응답 기준 추적',
    method: '표준 로그 흐름',
  },
];

export const integrationResultItems = [
  {
    title: '연동 이슈 메일',
    metric: '약 70% 감소',
    description: '반복 장애 유형을 공통 처리 기준으로 정리하여 운영 이슈 감소',
  },
  {
    title: '장애 대응 시간',
    metric: '약 40% 단축',
    description: '이벤트-전송-응답 흐름 기준으로 원인 추적 범위 축소',
  },
  {
    title: '신규 고객사 연동',
    metric: '10개 이상',
    description: '공통 계약과 확장 지점 분리로 고객사별 시나리오 대응성 강화',
  },
  {
    title: '운영 추적성',
    metric: '추적 체계화',
    description: '생산 이벤트, 전송, 응답, 로그를 연결한 추적 구조 확보',
  },
];

export const integrationMeasurementNotes = [
  '사내 이슈 관리 시스템에 등록된 연동 이슈를 개선 전후 각 6개월 단위로 비교',
  '이슈 발생 건수와 처리 완료까지의 소요 시간을 기준으로 산정',
];

export const integrationRoleItems = [
  '생산 연동 요구사항 및 기존 분기 구조 분석',
  'Job, Barcode, Result, Alarm 기준 공통 생산 이벤트 기준 정리',
  '요청 데이터 생성, 전송 분기, 응답 반영 책임 분리',
  'SECS/GEM 공통 계약 및 고객사별 Override 구조 분리',
  'TCP/IP 패킷 구성, 응답 처리, 예외 케이스 검증',
  '이벤트-전송-응답 기준 로그 추적 체계 정리',
];

export const integrationKeywordItems = [
  'MES',
  'SECS/GEM',
  'Production Integration',
  'Request Builder',
  'Facade',
  'Abstract / Override',
  'Message Dispatcher',
  'Packet Framing',
  'TCP/IP',
  'Refactoring',
];

export const integrationSkillItems = [
  { icon: Code2, label: 'C#' },
  { icon: Database, label: '.NET Framework' },
  { icon: Layers, label: 'WinForms' },
  { icon: Gauge, label: 'TCP/IP' },
  { icon: CheckCircle, label: 'SECS/GEM' },
  { icon: Box, label: 'Request Builder' },
  { icon: Target, label: 'Facade / Dispatcher' },
  { icon: FileText, label: 'Abstract / Override' },
  { icon: Database, label: 'Packet Framing' },
];
