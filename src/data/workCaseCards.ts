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
        details: ['대량 ROI 전수 비교', '검사 준비 시간 증가'],
      },
      {
        label: 'Cause',
        title: '원인 분석',
        details: ['후보 범위 과다', '좌표 변환 계산 반복'],
      },
      {
        label: 'Approach',
        title: '해결 접근',
        details: ['Module 기준 후보 선별', '변환 결과 캐싱'],
      },
      {
        label: 'Build',
        title: '기술 구현',
        details: ['후보군 축소', 'ROI 캐시', '기존 결과 포맷 호환'],
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
        details: ['고객사별 예외 누적', '서비스별 조건 분기 증가'],
      },
      {
        label: 'Cause',
        title: '원인 분석',
        details: ['생산 이벤트 기준 분산', '전송 책임 경계 불명확'],
      },
      {
        label: 'Approach',
        title: '해결 접근',
        details: ['공통 이벤트 기준 정리', '채널별 책임 분리'],
      },
      {
        label: 'Build',
        title: '기술 구현',
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
        details: ['Rack 상태 불일치', '현장 재현 어려움'],
      },
      {
        label: 'Cause',
        title: '원인 분석',
        details: ['연속 신호 처리 분산', '화면 표시와 내부 갱신 분리'],
      },
      {
        label: 'Approach',
        title: '해결 접근',
        details: ['신호 처리 흐름 정리', 'Rack 상태 기준 통일'],
      },
      {
        label: 'Build',
        title: '기술 구현',
        details: ['NG Buffer In/Out 정리', 'Rack 표시 동기화', '로그 기준 정리'],
      },
    ],
  },
];
