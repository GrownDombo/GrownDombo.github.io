import type { MouseEventHandler } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function splitMetricText(metric: string, highlightTitle: string) {
  const separatorIndex = metric.indexOf(': ');

  if (separatorIndex >= 0) {
    return {
      label: metric.slice(0, separatorIndex),
      result: metric.slice(separatorIndex + 2),
    };
  }

  if (highlightTitle === '생산 시스템 연동 기능 개발 및 운영 안정화') {
    const splitMap: Record<string, { label: string; result: string }> = {
      '장애 이슈 관련 메일 전분기 대비 약 70% 감소': {
        label: '장애 이슈 관련 메일 발생량 감소',
        result: '전분기 대비 약 70% 감소',
      },
      '10개 이상 신규 고객사 생산 시스템 연동 시나리오 개발': {
        label: '신규 고객사 유치 및 생산 시스템 연동',
        result: '시나리오 10개 이상 개발',
      },
    };

    return splitMap[metric] ?? { label: metric, result: '' };
  }

  if (highlightTitle === '검사 이력 조회 구조 구축') {
    const splitMap: Record<string, { label: string; result: string }> = {
      'NG 검사 결과를 검사 결과 계층 구조로 저장·조회': {
        label: '검사 이력 데이터 모델링',
        result: '검사 결과 계층 구조화',
      },
      'SQL Mapper 기반 데이터 접근 구조로 검사 이력 조회 흐름 구축': {
        label: '데이터 접근 계층 구축',
        result: 'SQL Mapper 기반 조회 흐름',
      },
      '로그 기반으로만 가능하던 검사 결과 분석을 UI 기반으로 전환': {
        label: '검사 결과 분석 환경 개선',
        result: 'UI 기반 분석으로 전환',
      },
      '파일 시스템 기반 관리 방식에서 발생하던 접근 충돌 문제 완화': {
        label: '파일 기반 데이터 관리 안정화',
        result: '접근 충돌 문제 완화',
      },
      '향후 다른 검사 결과 시스템에도 확장 적용할 수 있는 공통 DB 구조 마련': {
        label: '공통 DB 구조 설계',
        result: '타 검사 결과 시스템 확장 기반 마련',
      },
    };

    return splitMap[metric] ?? { label: metric, result: '' };
  }

  if (highlightTitle === '검출 영역 폴리곤 표현 체계 구축') {
    const splitMap: Record<string, { label: string; result: string }> = {
      '좌상/우하 Bounding Box 표시 한계를 개선하고 실제 검출 외곽을 폴리곤으로 가시화하는 공통 표현 구조 표준화': {
        label: '검출 외곽 폴리곤 가시화',
        result: '공통 폴리곤 표현 표준화',
      },
    };

    return splitMap[metric] ?? { label: metric, result: '' };
  }

  if (highlightTitle === '지도 API 연동 및 지도·검색 기능 개발') {
    const splitMap: Record<string, { label: string; result: string }> = {
      'Naver Map API에서 제공하지 않는 Polygon 영역 판별 기능을 직접 구현': {
        label: '서비스 지역 판별 로직 구현',
        result: 'Polygon 내부 판별 알고리즘 직접 구현',
      },
      '비동기 주소 검색 제어와 SQLite 기반 검색 기록 저장 기능을 개발해 사용자 편의성 향상': {
        label: '주소 검색 흐름 개선',
        result: '비동기 제어 및 검색 기록 저장 기능 개발',
      },
    };

    return splitMap[metric] ?? { label: metric, result: '' };
  }

  return { label: metric, result: '' };
}

export function ResumeIconLink({
  href,
  label,
  onClick,
  isExternal = true,
}: {
  href: string;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isExternal?: boolean;
}) {
  const externalProps = isExternal ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <a className="resume-icon-link" href={href} aria-label={label} title={label} onClick={onClick} {...externalProps}>
      <ArrowUpRight size={12} aria-hidden="true" strokeWidth={2.2} />
    </a>
  );
}

export function renderDocumentRole(role: string) {
  if (role === 'C#/.NET Windows 응용프로그램 개발자') {
    return (
      <>
        C#/.NET Windows
        <br />
        응용프로그램 개발자
      </>
    );
  }

  return role;
}

export function renderMetricResult(result: string) {
  const percentMatch = result.match(/(약\s*)?\d+%[^\s,]*(?:\s*(?:개선|감소|단축|향상))?/);

  if (!percentMatch || percentMatch.index === undefined) {
    return <span className="resume-metric-result-neutral">{result}</span>;
  }

  const beforeRaw = result.slice(0, percentMatch.index);
  const hasCommaSeparator = /,\s*$/.test(beforeRaw);
  const before = beforeRaw.replace(/[,\s]+$/, '');
  const highlight = percentMatch[0];
  const after = result.slice(percentMatch.index + highlight.length);

  return (
    <>
      {before ? <span className="resume-metric-result-neutral">{before}</span> : null}
      {before ? (
        <span className={hasCommaSeparator ? 'resume-metric-result-separator' : 'resume-metric-result-gap'}>
          {hasCommaSeparator ? ',' : ''}
        </span>
      ) : null}
      <span className="resume-metric-result-accent">{highlight}</span>
      {after ? <span className="resume-metric-result-neutral">{after}</span> : null}
    </>
  );
}
