import {
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
    title: 'Gerber-Part ROI 매칭 성능 개선',
    subtitle: 'Performance Optimization',
    summary: '검사 준비 병목을 후보 선별과 캐시 구조로 줄인 사례',
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    imageAlt: 'Module and Part ROI matching mockup',
    detailPath: industrialAoiInspectionAutomationPath,
    priority: 0,
    metrics: [
      {
        label: '시간 단축',
        value: '99%+',
        description: '약 6분 20초 → 약 3초',
      },
      {
        label: '측정 기준',
        value: '로그 기반 분석',
        description: '개선 전후 소요 시간 비교',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 정의',
        details: ['대량 ROI 전수 비교로 검사 준비 대기 시간이 길어짐', '넓은 후보 범위가 병목으로 작동', '좌표 변환 반복 계산 발생'],
      },
      {
        label: 'Solution',
        title: '해결 방식',
        details: ['Module 기준 후보 선별', '변환 결과 캐싱'],
      },
      {
        label: 'Contribution',
        title: '기여 범위',
        details: ['로그 기반 병목 확인', '후보군 필터링 구조 개선', 'ROI 캐시 적용'],
      },
    ],
  },
  {
    title: 'MES · SECS/GEM 생산 이벤트 구조 개선',
    subtitle: 'Integration Refactoring',
    summary: '고객사별 연동 차이를 공통 이벤트 흐름으로 흡수한 사례',
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
        value: '이슈 관리 시스템 분석',
        description: '6개월 단위 이슈 내역 비교',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 정의',
        details: ['고객사별 예외 누적', '서비스별 조건 분기 증가', '이벤트 기준과 전송 책임 경계 불명확'],
      },
      {
        label: 'Solution',
        title: '해결 방식',
        details: ['공통 생산 이벤트 기준 정리', '채널별 책임 분리'],
      },
      {
        label: 'Contribution',
        title: '기여 범위',
        details: ['생성·전송·응답 책임 분리', 'Override 구조화', '패킷 흐름 표준화'],
      },
    ],
  },
  {
    title: 'Repair & NG Buffer 운영 흐름 정리',
    subtitle: 'Operation Flow',
    summary: '장비 상태와 화면 표시를 하나의 운영 흐름으로 맞춘 사례',
    image: '/assets/project-industrial-aoi-platform.svg',
    imageAlt: 'Repair and NG Buffer operation flow illustration',
    detailPath: industrialAoiOperationFlowPath,
    priority: 2,
    metrics: [
      {
        label: '상태 정합성',
        value: '누락 완화',
        description: '표시와 내부 상태 기준 정리',
      },
      {
        label: '운영 추적',
        value: '개선',
        description: '신호 로그 기준 정리',
      },
    ],
    phases: [
      {
        label: 'Problem',
        title: '문제 정의',
        details: ['Repair, NG Buffer, Rack 상태 불일치', '현장 재현 어려움', '신호 처리와 화면 표시 기준 분산'],
      },
      {
        label: 'Solution',
        title: '해결 방식',
        details: ['신호 처리 흐름 정리', 'Rack 상태 갱신 기준 정리'],
      },
      {
        label: 'Contribution',
        title: '기여 범위',
        details: ['NG Buffer In/Out 흐름 정리', 'Rack 표시 동기화', '로그 기준 보강'],
      },
    ],
  },
];
