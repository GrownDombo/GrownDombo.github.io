import {
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
  value: string;
  description: string;
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
    subtitle: 'AOI 알고리즘 최적화',
    summary: '검사 준비 병목을 후보 선별과 캐시 구조로 줄여 대용량 ROI 매칭 시간을 단축',
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    imageAlt: 'Module and Part ROI matching mockup',
    detailPath: industrialAoiInspectionAutomationPath,
    priority: 0,
    metrics: [
      {
        label: '시간 단축',
        value: '99%+',
        description: '6분 22초 → 3.5초',
      },
      {
        label: '측정 기준',
        value: 'Start/End 로그',
        description: '동일 데이터 평균 비교',
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
    title: '단축키 처리 구조 재설계와 응답성 최적화',
    subtitle: 'WinForms UX/UI · 입력 처리 구조화',
    summary: '2-Key Dictionary 기반 즉시 조회 구조를 적용해 입력 지연을 제거하고 설정 UX를 통합',
    image: '/assets/hotkey-ux-performance.svg',
    imageAlt: '단축키 2-Key Dictionary 응답성 최적화 다이어그램',
    detailPath: industrialAoiHotKeyOptimizationPath,
    priority: 2,
    metrics: [
      {
        label: '처리 시간 단축률',
        value: '약 85%',
        description: '약 2초 → 0.3초',
      },
      {
        label: '측정 기준',
        value: 'Debug 로그',
        description: '2-Key Dictionary 즉시 조회',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 상황',
        details: ['단축키 입력 처리 지연', '연속 조작 흐름 지연', '설정 UI 분산'],
      },
      {
        label: 'Before',
        title: '기존 방식',
        details: ['입력 시 실행 대상 탐색', '항목 증가에 따른 처리 비용 증가'],
      },
      {
        label: 'After',
        title: '적용 방식',
        details: ['단축키 설정·실행 통합', 'Modifier + Key 즉시 매칭', '안내 문구 자동 반영'],
      },
    ],
  },
  {
    title: 'MES · SECS/GEM 생산 연동 안정화',
    subtitle: '생산 시스템 연동 안정화',
    summary: '고객사별 연동 차이를 공통 이벤트 기준으로 정리해 반복 장애 알림을 감소',
    image: '/assets/industrial-aoi-production-integration/main-image.png',
    imageAlt: 'MES SECS GEM production integration mockup',
    detailPath: industrialAoiProductionIntegrationPath,
    priority: 1,
    metrics: [
      {
        label: '장애 메일',
        value: '약 70% 감소',
        description: '반복 이슈 알림 감소',
      },
      {
        label: '측정 기준',
        value: '이슈 내역',
        description: '개선 전후 6개월 비교',
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
    summary: '공유 폴더 파일 처리를 로컬 실행 구조로 전환해 Confirm 전체 시간을 3초대로 단축',
    image: '/assets/shared-folder-bottleneck.png',
    imageAlt: 'Remote shared-folder file move bottleneck improvement illustration',
    detailPath: industrialAoiOperationFlowPath,
    priority: 3,
    metrics: [
      {
        label: 'Confirm 전체',
        value: '약 90% 단축',
        description: '약 32초 → 3초대',
      },
      {
        label: '측정 기준',
        value: 'Start/End 로그',
        description: '이슈 발생 PC 기준',
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
];
