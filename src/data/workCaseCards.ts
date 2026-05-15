import {
  industrialAoiBridgePolygonVisualizationPath,
  industrialAoiHotKeyOptimizationPath,
  industrialAoiInspectionAutomationPath,
  industrialAoiOperationFlowPath,
  industrialAoiProductionIntegrationPath,
} from '../routes/paths';

export type WorkCasePhase = {
  label: string;
  title: string;
  details: string[];
};

export type WorkCaseMetric = {
  label: string;
  value?: string;
  description?: string;
  beforeLabel?: string;
  beforeValue?: string;
  afterLabel?: string;
  afterValue?: string;
  evidenceLabel?: string;
  evidenceText?: string;
  tone?: 'accent';
};

export type WorkCaseCardData = {
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  detailPath: string;
  priority: number;
  metrics: WorkCaseMetric[];
  phases: WorkCasePhase[];
};

export const workCaseCards: WorkCaseCardData[] = [
  {
    title: 'Gerber-Part ROI 매칭 성능 최적화',
    subtitle: 'ROI 매칭 병목 개선',
    summary: '좌표의 후보 선별과 캐시 구조로 ROI 매칭 병목 해소',
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    imageAlt: 'Module and Part ROI matching mockup',
    detailPath: industrialAoiInspectionAutomationPath,
    priority: 0,
    metrics: [
      {
        label: '시간 단축',
        value: '약 99% 단축',
        beforeValue: '6분 22초',
        afterValue: '3.5초',
        evidenceLabel: '로그',
        evidenceText: '기준 측정',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['대량 ROI 전수 비교', '검사 준비 시간 지연', '좌표 변환 반복'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['전체 Gerber 순회', 'Window마다 재계산'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['Module 후보 선별', '변환 결과 캐싱', '기존 결과 유지'],
      },
    ],
  },
  {
    title: '단축키 설정 범위 확장 및 입력 응답성 최적화',
    subtitle: 'WinForms UX/UI · 기능 확장 · 응답성 개선',
    summary: '설정 UI와 입력 매칭 구조를 개선해 응답성 향상',
    image: '/assets/shortcut-key-redesign-mockup.png',
    imageAlt: '단축키 설정 화면 Before After 익명화 목업',
    detailPath: industrialAoiHotKeyOptimizationPath,
    priority: 3,
    metrics: [
      {
        label: '지원 범위 확장',
        beforeValue: '28개 단일키',
        afterValue: '전체 키 + 조합키',
      },
      {
        label: '응답성 개선',
        value: '약 85% 개선',
        beforeValue: '2초',
        afterValue: '0.3초',
        evidenceLabel: '로그',
        evidenceText: '기준 측정',
        tone: 'accent',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['데모 요구 대응 한계', '단일 키 중심 설정', '입력 응답 지연'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['28개 키 한정', '조합키 미지원', '실행 대상 반복 탐색'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['설정 UI 범위 확장', 'KeyDown 매칭 개선', '설정 운영성 강화'],
      },
    ],
  },
  {
    title: 'MES · SECS/GEM 생산 연동 안정화',
    subtitle: '생산 시스템 연동 안정화',
    summary: '고객사별 차이를 공통 이벤트로 정리해 반복 장애 알림을 감소',
    image: '/assets/industrial-aoi-production-integration/main-image.png',
    imageAlt: 'MES SECS GEM production integration mockup',
    detailPath: industrialAoiProductionIntegrationPath,
    priority: 1,
    metrics: [
      {
        label: '장애 메일 감소',
        value: '약 70% 감소',
        evidenceLabel: '이슈 관리 시스템 측정',
        evidenceText: '수정 전후 6개월 단위 추적',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['고객사 예외 누적', '전송 책임 혼재', '로그 추적 분산'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['서비스별 조건 분기', '응답 흐름 분산'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['공통 이벤트 기준', '채널 책임 분리', '패킷 경계 안정화'],
      },
    ],
  },
  {
    title: '원격 공유 폴더 I/O 병목 해소',
    subtitle: '원격 I/O 처리 최적화',
    summary: '공유 폴더 처리를 로컬 실행 구조로 전환',
    image: '/assets/shared-folder-bottleneck.png',
    imageAlt: 'Remote shared-folder file move bottleneck improvement illustration',
    detailPath: industrialAoiOperationFlowPath,
    priority: 4,
    metrics: [
      {
        label: '시간 단축',
        value: '약 90% 단축',
        beforeValue: '32초',
        afterValue: '3초',
        evidenceLabel: '로그',
        evidenceText: '기준 측정',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['원격 PC 직접 조작', 'SMB 왕복 비용', 'Confirm 전체 지연'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['공유 폴더 move/delete', '네트워크 경유 파일 처리'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['bat 생성', 'TCP/IP 실행 위임', '로컬 PC에서 이동'],
      },
    ],
  },
  {
    title: '검출 영역 Polygon 가시화 체계 구축',
    subtitle: '영상처리 기반 가시화 · Polygon 표현 표준 · 공통 바이너리 구조',
    summary: 'Bounding Box 표시를 실제 Blob 외곽 Polygon 기반으로 표준화',
    image: '/assets/defect-polygon-visualization-standardization.png',
    imageAlt: 'Bounding Box display and Polygon visualization Before After inspection UI mockup',
    detailPath: industrialAoiBridgePolygonVisualizationPath,
    priority: 2,
    metrics: [
      {
        label: '가시화',
        value: '다각형 검출 알고리즘 및 표시 기능 개발',
        tone: 'accent',
      },
      {
        label: '표준화',
        value: '유관 부서 협의 기반 Polygon 바이너리 파일 구성',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['Bounding Box 기반 표시', '실제 검출 외곽 미표현'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['좌상/우하 2점 기준', 'Blob 실제 형상 표현 부재'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['N-point Polygon 가시화', '공통 Polygon 구조 표준화', '검사 UI 적용'],
      },
    ],
  },
];
