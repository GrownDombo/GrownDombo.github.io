import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle,
  Database,
  Gauge,
  Keyboard,
  Layers,
  MousePointerClick,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { AnalyticsNotice } from '../../components/AnalyticsNotice';
import { SiteHeader } from '../../components/SiteHeader';
import { TechList } from '../../components/TechList';
import { metrics, workCaseStudies, type Project } from '../../data/portfolio';
import {
  industrialAoiAreaRoutes,
  type IndustrialAoiAreaId,
} from '../../routes/paths';
import type { ThemedPageProps } from '../../types/navigation';
import {
  gerberPartKeywordItems,
  gerberPartMatchingMockups,
  gerberPartMeasurementNotes,
  gerberPartOptimizationSteps,
  gerberPartPerformanceScale,
  gerberPartPerformanceSummary,
  gerberPartReportTech,
  gerberPartRoleItems,
  integrationComparisonRows,
  integrationDirectionSteps,
  integrationKeywordItems,
  integrationMeasurementNotes,
  integrationReportTech,
  integrationResultItems,
  integrationRoleItems,
  structureComparisonLinks,
  structureModulePartLinks,
  structurePartGerberLinks,
} from './industrialAoiData';

type CompactReportStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type CompactReportResult = {
  title: string;
  metric: string;
  description: string;
};

type CompactWorkCaseReport = {
  title: string;
  problem: {
    body: string;
    stats?: {
      label: string;
      value: string;
      tone?: 'danger';
    }[];
  };
  before: {
    body: string;
    label: string;
    highlight: string;
    note: string;
  };
  improvement: {
    body: string;
    steps: CompactReportStep[];
  };
  results: CompactReportResult[];
  measurementNotes?: string[];
  roles: string[];
  keywords?: string[];
};

const csharpKeywords = new Set([
  'bool',
  'class',
  'else',
  'false',
  'if',
  'new',
  'null',
  'out',
  'private',
  'public',
  'return',
  'true',
  'var',
  'void',
]);

function getCsharpTokenClass(token: string, afterToken: string) {
  if (token.startsWith('//')) {
    return 'code-token-comment';
  }

  if (token.startsWith('"')) {
    return 'code-token-string';
  }

  if (/^\d/.test(token)) {
    return 'code-token-number';
  }

  if (csharpKeywords.has(token)) {
    return 'code-token-keyword';
  }

  if (/^[A-Z]/.test(token)) {
    return 'code-token-type';
  }

  if (/^\s*\(/.test(afterToken)) {
    return 'code-token-method';
  }

  if (/^[{}()[\].,;:]+$/.test(token)) {
    return 'code-token-punctuation';
  }

  if (/^[+\-*/=<>!&|?]+$/.test(token)) {
    return 'code-token-operator';
  }

  return 'code-token-identifier';
}

function renderCsharpCode(code: string) {
  const tokenPattern = /\/\/.*|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[{}()[\].,;:+\-*/=<>!&|?]+/g;

  return code.split('\n').map((line, lineIndex) => {
    const fragments = [];
    let cursor = 0;

    for (const match of line.matchAll(tokenPattern)) {
      const token = match[0];
      const index = match.index ?? 0;

      if (index > cursor) {
        fragments.push(line.slice(cursor, index));
      }

      const afterToken = line.slice(index + token.length);
      fragments.push(
        <span className={getCsharpTokenClass(token, afterToken)} key={`${lineIndex}-${index}`}>
          {token}
        </span>,
      );
      cursor = index + token.length;

      if (token.startsWith('//')) {
        break;
      }
    }

    if (cursor < line.length) {
      fragments.push(line.slice(cursor));
    }

    return (
      <span className="code-line" key={`line-${lineIndex}`}>
        {fragments.length > 0 ? fragments : ' '}
      </span>
    );
  });
}

const compactWorkCaseReports: Record<IndustrialAoiAreaId, CompactWorkCaseReport> = {
  'inspection-automation': {
    title: 'Gerber-Part ROI 매칭 성능 개선',
    problem: {
      body: '동일 검사 데이터에서 70,448개 Part Window ROI와 387,600개 Gerber ROI를 매칭하며 검사 준비 시간이 약 6분 22초까지 늘어났습니다.',
      stats: [
        ...gerberPartPerformanceScale,
        { label: '처리 시간', value: '약 6분 22초', tone: 'danger' },
      ],
    },
    before: {
      body: '각 Part Window ROI가 전체 Gerber ROI를 반복 순회해 데이터 규모가 커질수록 비교 횟수가 급증했습니다.',
      label: '개선 전 비교 횟수',
      highlight: '약 273억 회',
      note: '70,448 x 387,600 기준',
    },
    improvement: {
      body: 'Module 기준 후보군을 먼저 좁히고 Gerber ROI 변환 결과를 캐싱해 불필요한 비교와 반복 계산을 줄였습니다.',
      steps: gerberPartOptimizationSteps,
    },
    results: [
      { title: '처리 시간', metric: '6분 22초 → 3.5초', description: '동일 검사 데이터 기준' },
      { title: '개선율', metric: '99%+', description: '개선 전후 평균 비교' },
      { title: '비교 횟수', metric: '273억 → 1억', description: 'Module 후보군 기준 축소' },
    ],
    measurementNotes: gerberPartMeasurementNotes,
    roles: gerberPartRoleItems,
    keywords: gerberPartKeywordItems.slice(0, 5),
  },
  'hotkey-optimization': {
    title: '단축키 처리 구조 분석을 통한 UX/UI 및 입력 응답성 개선',
    problem: {
      body: '기존 단축키 기능은 업무 화면별로 설정과 실행 흐름이 분산되어 있었고, 키 입력 시 실행 대상을 반복 탐색하는 구조였습니다. Debug 모드 로그 기준 단축키 입력 후 실행까지 약 2초가 소요되어 연속 조작 흐름에 지연이 발생했습니다.',
      stats: [
        { label: '개선 전', value: '약 2초', tone: 'danger' },
        { label: '개선 후', value: '0.3초' },
        { label: '측정 기준', value: 'Debug 로그' },
      ],
    },
    before: {
      body: '기존 구조는 키 입력이 발생할 때마다 사용자, 화면, 키 조합을 기준으로 실행 대상을 순차 탐색했습니다. 단축키 항목 증가에 따라 입력 이벤트 처리 비용이 커지고, 화면 안내 문구와 실제 설정값을 일관되게 관리하기 어려운 구조였습니다.',
      label: '기존 처리 구조',
      highlight: '순차 탐색',
      note: '입력 시점마다 실행 대상 검색',
    },
    improvement: {
      body: '단축키 설정·로드·저장·매칭 책임을 통합하고, 설정 로드 및 저장 시 Modifier Key + Key Code 조합을 2-Key Dictionary로 사전 구성했습니다. 실제 입력 이벤트에서는 반복 탐색 없이 실행 대상을 즉시 조회하도록 처리 구조를 개선했습니다.',
      steps: [
        { icon: Database, title: '2-Key 매핑', description: 'Modifier Key와 Key Code 조합을 사전 구성' },
        { icon: Keyboard, title: '즉시 매칭', description: '입력 이벤트에서 실행 대상 즉시 조회' },
        { icon: ShieldCheck, title: '설정 안정화', description: '중복 검증, XML 백업, 안내 문구 자동 갱신 반영' },
      ],
    },
    results: [
      { title: '단축키 응답 시간', metric: '약 2초 → 0.3초', description: 'Debug 모드 로그 기준' },
      { title: '처리 시간 단축률', metric: '약 85%', description: '개선 전 약 2초 기준' },
      { title: '설정 UI 범위', metric: '9개 업무 탭', description: '업무 흐름 기준 단축키 설정 재구성' },
    ],
    measurementNotes: [
      '측정 기준: Debug 모드 로그 기준 단축키 처리 시간',
      '개선율 산정: 개선 전 약 2초 기준 약 85% 단축',
      '핵심 변경: 리스트 기반 반복 탐색을 2-Key Dictionary 기반 즉시 조회로 전환',
      '운영 효과: 반복 입력 작업에서 발생하던 응답 지연 해소',
    ],
    roles: [
      '기존 단축키 입력 이벤트와 실행 대상 탐색 구조 분석',
      '단축키 설정·저장·매칭 흐름 통합',
      '2-Key Dictionary 자료구조 설계 및 즉시 조회 방식 적용',
      '기능별 탭 UI, 중복 검증, XML 저장·백업, 안내 문구 자동 반영 구성',
    ],
    keywords: ['단축키', 'TwoKeysDictionary', 'WinForms UX/UI', 'Input Response', 'Debug Log'],
  },
  'production-integration': {
    title: 'MES · SECS/GEM 생산 연동 안정화',
    problem: {
      body: '고객사별 생산 연동 예외가 누적되며 반복 장애 알림과 변경 영향 범위가 커졌습니다.',
    },
    before: {
      body: '서비스별 조건 분기 안에 전송, 응답 반영, 고객사 예외, 로그 기준이 함께 누적되었습니다.',
      label: '기존 구조',
      highlight: '책임 경계 불명확',
      note: 'MES/SECS-GEM/TCP-IP 변경이 같은 흐름에 집중',
    },
    improvement: {
      body: '공통 생산 이벤트 기준을 세우고 생성·전송·응답 책임을 분리해 채널별 변경 지점을 정리했습니다.',
      steps: integrationDirectionSteps,
    },
    results: integrationResultItems,
    measurementNotes: integrationMeasurementNotes,
    roles: integrationRoleItems,
    keywords: integrationKeywordItems.slice(0, 5),
  },
  'operation-flow': {
    title: '원격 공유 폴더 I/O 병목 구조 개선',
    problem: {
      body: 'Repair Confirm 시 AOI가 생성한 이미지/XML을 정리해야 했고, 원격 PC의 공유 폴더 직접 조작으로 Confirm 전체 시간이 최대 약 32초까지 증가',
    },
    before: {
      body: 'Repair가 AOI 산출 파일 이동·삭제를 원격 PC에서 직접 수행하면서 네트워크 왕복 비용이 Confirm 흐름에 누적',
      label: '기존 방식',
      highlight: '원격 직접 조작',
      note: '공유 폴더 접근 비용이 작업 시간에 반영',
    },
    improvement: {
      body: '원격 PC 역할을 bat 생성·실행 요청으로 제한하고, 파일 보유 PC에서 로컬 실행하는 구조로 분리',
      steps: [
        { icon: Box, title: 'bat 생성', description: 'Confirm 대상 파일 처리 명령을 묶음' },
        { icon: Layers, title: '실행 요청', description: '파일 대신 bat 실행 정보만 전달' },
        { icon: CheckCircle, title: '로컬 처리', description: '로컬 PC에서 경로 치환 후 실행' },
      ],
    },
    results: [
      { title: 'Confirm 전체', metric: '약 32초 → 3초대', description: '이슈 발생 PC Start/End 로그 기준' },
      { title: '개선 방식', metric: 'SMB 우회', description: 'bat 실행 요청만 TCP/IP로 전달' },
      { title: '운영 안전성', metric: 'Fallback 유지', description: '접속 실패 시 기존 흐름 사용' },
    ],
    measurementNotes: [
      '측정 기준: 이슈 발생 PC의 Start/End 로그',
      '개선 방식: 파일 직접 이동 대신 실행 요청 위임 구조',
    ],
    roles: [
      '원격 공유 폴더 I/O 병목 분석',
      'bat 생성 및 실행 위임 구조 설계',
      '경로 치환과 cleanup 처리',
    ],
    keywords: ['Confirm', 'SMB Bypass', 'Batch Process', 'File Move'],
  },
};

function CompactWorkCaseReport({ areaId }: { areaId: IndustrialAoiAreaId }) {
  const report = compactWorkCaseReports[areaId];

  return (
    <article className="industrial-aoi-matching-section" aria-label={`${report.title} detail summary`}>
      <div className="industrial-aoi-report-grid industrial-aoi-problem-grid">
        <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby={`${areaId}-problem-title`}>
          <div className="industrial-aoi-report-heading">
            <span>1</span>
            <h5 id={`${areaId}-problem-title`}>문제 상황</h5>
          </div>
          <p>{report.problem.body}</p>
          {report.problem.stats ? (
            <div className="industrial-aoi-report-stat-row">
              {report.problem.stats.map((item) => (
                <div
                  className={`industrial-aoi-report-stat${item.tone === 'danger' ? ' industrial-aoi-report-stat-danger' : ''}`}
                  key={item.label}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby={`${areaId}-before-title`}>
          <div className="industrial-aoi-report-heading">
            <span>2</span>
            <h5 id={`${areaId}-before-title`}>기존 방식</h5>
          </div>
          <p>{report.before.body}</p>
          <div className="industrial-aoi-comparison-box">
            <span>{report.before.label}</span>
            <strong>{report.before.highlight}</strong>
            <p>{report.before.note}</p>
          </div>
        </section>
      </div>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby={`${areaId}-improvement-title`}>
        <div className="industrial-aoi-report-heading">
          <span>3</span>
          <h5 id={`${areaId}-improvement-title`}>개선 방식</h5>
        </div>
        <p>{report.improvement.body}</p>
        <div className="industrial-aoi-step-flow">
          {report.improvement.steps.map((step, index) => {
            const StepIcon = step.icon;

            return (
              <article className="industrial-aoi-step-card" key={step.title}>
                <div className="industrial-aoi-step-icon">
                  <StepIcon aria-hidden="true" />
                </div>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
                {index < report.improvement.steps.length - 1 ? <ArrowRight className="industrial-aoi-step-arrow" aria-hidden="true" /> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby={`${areaId}-result-title`}>
        <div className="industrial-aoi-report-heading">
          <span>4</span>
          <h5 id={`${areaId}-result-title`}>결과</h5>
        </div>
        {areaId === 'inspection-automation' ? (
          <>
            <div className="industrial-aoi-result-layout">
              <div className="industrial-aoi-result-table">
                <div><span>항목</span><span>개선 전</span><span>개선 후</span><span>개선율</span></div>
                <div><strong>처리 시간</strong><span>약 6분 22초</span><span>약 3.5초</span><strong>99%+</strong></div>
                <div><strong>비교 횟수</strong><span>약 273억 회</span><span>약 1억 회</span><strong>99%+</strong></div>
              </div>
              <div className="industrial-aoi-result-bars" aria-label="Matching time comparison">
                <strong>처리 시간</strong>
                <div className="industrial-aoi-result-bar-row">
                  <span>개선 전</span>
                  <div><em style={{ width: '100%' }} /></div>
                  <strong>6m 22s</strong>
                </div>
                <div className="industrial-aoi-result-bar-row industrial-aoi-result-bar-row-after">
                  <span>개선 후</span>
                  <div><em style={{ width: '2%' }} /></div>
                  <strong>3.5s</strong>
                </div>
              </div>
              <div className="industrial-aoi-result-bars industrial-aoi-result-bars-count" aria-label="Comparison count graph">
                <strong>비교 횟수</strong>
                <div className="industrial-aoi-result-bar-row">
                  <span>개선 전</span>
                  <div><em style={{ width: '100%' }} /></div>
                  <strong>273억</strong>
                </div>
                <div className="industrial-aoi-result-bar-row industrial-aoi-result-bar-row-after">
                  <span>개선 후</span>
                  <div><em style={{ width: '1%' }} /></div>
                  <strong>1억</strong>
                </div>
              </div>
            </div>
            {report.measurementNotes ? (
              <div className="industrial-aoi-performance-measurement">
                <strong>처리 시간 측정 기준</strong>
                <ul>
                  {report.measurementNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="industrial-aoi-performance-measurement">
              <strong>비교 횟수 산정 근거</strong>
              <ul>
                <li>기존: 70,448 Part Window ROI x 387,600 Gerber ROI = 약 273억 회</li>
                <li>개선: 272 Module x 259 Part Window ROI x 1,425 Gerber ROI = 약 1억 회</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="industrial-aoi-integration-result-grid">
            {report.results.map((item) => (
              <article className="industrial-aoi-integration-result-card" key={item.title}>
                <span>{item.title}</span>
                <strong>{item.metric}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        )}
        {report.measurementNotes && areaId !== 'inspection-automation' ? (
          <div className="industrial-aoi-performance-measurement">
            <strong>측정 기준</strong>
            <ul>
              {report.measurementNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby={`${areaId}-role-title`}>
        <div className="industrial-aoi-report-heading">
          <span>5</span>
          <h5 id={`${areaId}-role-title`}>담당 역할</h5>
        </div>
        <ul className="industrial-aoi-role-list">
          {report.roles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {report.keywords ? (
          <div className="industrial-aoi-keyword-cloud">
            {report.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        ) : null}
      </section>
    </article>
  );
}

function GerberPartDiagramSection() {
  return (
    <article className="industrial-aoi-matching-section" aria-label="Gerber Part ROI structure diagrams">
      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="gerber-view-title">
        <div className="industrial-aoi-report-heading">
          <span>6</span>
          <h5 id="gerber-view-title">ROI 기준 화면</h5>
        </div>
        <div className="industrial-aoi-matching-grid">
          {gerberPartMatchingMockups.map((mockup) => (
            <figure className="industrial-aoi-matching-figure" key={mockup.title}>
              <div className="industrial-aoi-matching-media">
                <img src={mockup.image} alt={`${mockup.title} mockup`} />
                <span className="industrial-aoi-matching-mockup-tag">Mockup</span>
              </div>
              <figcaption>
                <strong>{mockup.title}</strong>
                {mockup.legend ? (
                  <span className="industrial-aoi-matching-legend">
                    {mockup.legend.map((item) => (
                      <em className={`industrial-aoi-matching-legend-${item.tone}`} key={item.label}>
                        {item.label}
                      </em>
                    ))}
                  </span>
                ) : (
                  <span>{mockup.description}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-structure-panel" aria-labelledby="gerber-structure-title">
        <div className="industrial-aoi-structure-titlebar">
          <div className="industrial-aoi-report-heading">
            <span>7</span>
            <h5 id="gerber-structure-title">개선 전후 구조</h5>
          </div>
          <p>전체 Gerber 순회 방식과 Module 후보 선별 방식을 동일한 ROI 기준으로 비교</p>
        </div>
        <div className="industrial-aoi-structure-grid">
          <article className="industrial-aoi-structure-card industrial-aoi-structure-before">
            <div className="industrial-aoi-structure-card-header">
              <div>
                <strong>Before (기존 구조)</strong>
                <p>Part Window ROI마다 전체 Gerber ROI를 반복 비교</p>
              </div>
            </div>
            <div className="industrial-aoi-structure-diagram industrial-aoi-structure-diagram-before">
              <div className="industrial-aoi-structure-node industrial-aoi-structure-tag-column">
                <strong>Part Window ROI</strong>
                <ul>
                  <li>Part Window ROI 1</li>
                  <li>Part Window ROI 2</li>
                  <li>Part Window ROI 3</li>
                  <li>Part Window ROI 4</li>
                  <li>...</li>
                  <li>Part Window ROI n</li>
                </ul>
              </div>
              <svg className="industrial-aoi-structure-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <defs>
                  <marker id="industrial-aoi-structure-arrow-compact" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 Z" />
                  </marker>
                </defs>
                {structureComparisonLinks.map((link) => (
                  <line
                    key={link.key}
                    x1="0"
                    y1={link.y1}
                    x2="100"
                    y2={link.y2}
                    markerEnd="url(#industrial-aoi-structure-arrow-compact)"
                    style={{ opacity: link.opacity }}
                  />
                ))}
              </svg>
              <div className="industrial-aoi-structure-node industrial-aoi-structure-tag-column industrial-aoi-structure-tag-column-danger">
                <strong>Gerber ROI</strong>
                <ul>
                  <li>Gerber ROI 1</li>
                  <li>Gerber ROI 2</li>
                  <li>Gerber ROI 3</li>
                  <li>Gerber ROI 4</li>
                  <li>...</li>
                  <li>Gerber ROI n</li>
                </ul>
              </div>
            </div>
            <div className="industrial-aoi-structure-caption">
              <div className="industrial-aoi-structure-formula" aria-label="Before comparison count formula">
                <span>
                  <strong>70,448</strong>
                  <em>Part Window ROI 전체</em>
                </span>
                <b>x</b>
                <span>
                  <strong>387,600</strong>
                  <em>Gerber ROI 전체</em>
                </span>
              </div>
              <strong>전체 ROI 반복 비교</strong>
            </div>
          </article>

          <article className="industrial-aoi-structure-card industrial-aoi-structure-after">
            <div className="industrial-aoi-structure-card-header">
              <div>
                <strong>After (개선 구조)</strong>
                <p>Module 후보군 내부에서 필요한 Gerber ROI만 비교</p>
              </div>
            </div>
            <div className="industrial-aoi-structure-diagram industrial-aoi-structure-diagram-after">
              <div className="industrial-aoi-structure-node industrial-aoi-structure-tag-column industrial-aoi-structure-module-column">
                <strong>Module 후보</strong>
                <ul>
                  <li>Module 1 후보</li>
                  <li>Module 2 후보</li>
                  <li>Module N 후보</li>
                </ul>
              </div>
              <svg className="industrial-aoi-structure-lines industrial-aoi-structure-lines-filter" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <defs>
                  <marker id="industrial-aoi-structure-arrow-filter-compact-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 Z" />
                  </marker>
                </defs>
                {structureModulePartLinks.map((link) => (
                  <line key={link.key} x1="0" y1={link.y1} x2="100" y2={link.y2} markerEnd="url(#industrial-aoi-structure-arrow-filter-compact-a)" />
                ))}
              </svg>
              <div className="industrial-aoi-structure-node industrial-aoi-structure-tag-column">
                <strong>Part Window ROI</strong>
                <ul>
                  <li>Part Window ROI 1</li>
                  <li>Part Window ROI 2</li>
                  <li>Part Window ROI 3</li>
                  <li>Part Window ROI 4</li>
                  <li>...</li>
                  <li>Part Window ROI n</li>
                </ul>
              </div>
              <svg className="industrial-aoi-structure-lines industrial-aoi-structure-lines-filter" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <defs>
                  <marker id="industrial-aoi-structure-arrow-filter-compact-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 Z" />
                  </marker>
                </defs>
                {structurePartGerberLinks.map((link) => (
                  <line key={link.key} x1="0" y1={link.y1} x2="100" y2={link.y2} markerEnd="url(#industrial-aoi-structure-arrow-filter-compact-b)" />
                ))}
              </svg>
              <div className="industrial-aoi-structure-node industrial-aoi-structure-tag-column industrial-aoi-structure-tag-column-danger">
                <strong>Gerber ROI</strong>
                <ul>
                  <li>Gerber ROI 1</li>
                  <li>Gerber ROI 2</li>
                  <li>Gerber ROI 3</li>
                  <li>Gerber ROI 4</li>
                  <li>...</li>
                  <li>Gerber ROI n</li>
                </ul>
              </div>
            </div>
            <div className="industrial-aoi-structure-caption industrial-aoi-structure-caption-success">
              <div className="industrial-aoi-structure-formula" aria-label="After comparison count formula">
                <span>
                  <strong>272</strong>
                  <em>Module 수</em>
                </span>
                <b>x</b>
                <span>
                  <strong>259</strong>
                  <em>Module당 Part Window ROI</em>
                </span>
                <b>x</b>
                <span>
                  <strong>1,425</strong>
                  <em>Module당 Gerber ROI</em>
                </span>
              </div>
              <strong>Module 후보군 기준 비교</strong>
            </div>
          </article>
        </div>
      </section>
    </article>
  );
}

function HotKeyOptimizationDiagramSection() {
  const tabItems = ['Main', 'Inspection', 'Teaching', 'WndTeaching', 'Algo', 'CAD/Gerber', 'Defect', 'Repair', 'ComposeKey'];
  const stabilityItems = [
    { icon: ShieldCheck, title: '중복 키 검증', detail: '동일 범위 내 충돌 키를 저장 전에 확인' },
    { icon: Database, title: 'XML 저장/백업', detail: '버전 확인과 로컬/원격 경로 처리를 함께 구성' },
    { icon: MousePointerClick, title: '사용자 지정 버튼', detail: '키보드 단축키와 마우스 버튼 사용자 설정을 보조 기능으로 확장' },
  ];

  return (
    <article className="industrial-aoi-matching-section industrial-aoi-hotkey-section" aria-label="Shortcut UX UI and performance improvement diagrams">
      <section className="industrial-aoi-report-panel industrial-aoi-structure-panel" aria-labelledby="hotkey-structure-title">
        <div className="industrial-aoi-structure-titlebar">
          <div className="industrial-aoi-report-heading">
            <span>6</span>
            <h5 id="hotkey-structure-title">단축키 처리 구조 비교</h5>
          </div>
          <p>기존 순차 탐색 구조와 개선 후 2-Key Dictionary 즉시 조회 구조 비교</p>
        </div>
        <div className="industrial-aoi-hotkey-compare-grid">
          <article className="industrial-aoi-hotkey-compare-card industrial-aoi-hotkey-before">
            <div className="industrial-aoi-structure-card-header">
              <div>
                <strong>Before</strong>
                <p>입력 이벤트마다 실행 대상 조건 탐색</p>
              </div>
              <Timer aria-hidden="true" />
            </div>
            <ol className="industrial-aoi-hotkey-flow" aria-label="Before shortcut flow">
              <li>
                <span>01</span>
                <strong>키 입력 이벤트 수신</strong>
                <p>현재 화면과 사용자 설정을 기준으로 단축키 처리 시작</p>
              </li>
              <li>
                <span>02</span>
                <strong>실행 대상 순차 탐색</strong>
                <p>사용자, 화면, 키 조합 기준으로 실행 대상 반복 검색</p>
              </li>
              <li>
                <span>03</span>
                <strong>기능 실행 연결</strong>
                <p>식별된 기능을 실제 화면 동작으로 연결</p>
              </li>
            </ol>
            <div className="industrial-aoi-hotkey-metric">
              <span>Debug 로그 기준</span>
              <strong>약 2초</strong>
              <p>입력 후 실행 대기 발생</p>
            </div>
          </article>

          <article className="industrial-aoi-hotkey-compare-card industrial-aoi-hotkey-after">
            <div className="industrial-aoi-structure-card-header">
              <div>
                <strong>After</strong>
                <p>설정 로드 시점에 실행 대상 사전 매핑</p>
              </div>
              <Keyboard aria-hidden="true" />
            </div>
            <ol className="industrial-aoi-hotkey-flow" aria-label="After shortcut flow">
              <li>
                <span>01</span>
                <strong>단축키 관리 책임 통합</strong>
                <p>설정 로드/저장, 매칭, 안내 문구 갱신 흐름 통합</p>
              </li>
              <li>
                <span>02</span>
                <strong>2-Key Dictionary</strong>
                <p>Modifier Key + Key Code 조합을 실행 대상으로 사전 매핑</p>
              </li>
              <li>
                <span>03</span>
                <strong>즉시 실행 매칭</strong>
                <p>입력 이벤트 발생 시 매핑된 기능을 즉시 실행</p>
              </li>
            </ol>
            <div className="industrial-aoi-hotkey-metric industrial-aoi-hotkey-metric-success">
              <span>Debug 로그 기준</span>
              <strong>0.3초</strong>
              <p>응답 지연 해소</p>
            </div>
          </article>
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="hotkey-ux-title">
        <div className="industrial-aoi-report-heading">
          <span>7</span>
          <h5 id="hotkey-ux-title">UX/UI 적용 범위</h5>
        </div>
        <p className="industrial-aoi-hotkey-section-lead">업무 흐름 기준 9개 탭으로 단축키 설정 범위를 재구성했습니다.</p>
        <div className="industrial-aoi-hotkey-tabs" aria-label="Shortcut setting tabs">
          {tabItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="industrial-aoi-hotkey-stability-grid">
          {stabilityItems.map((item) => {
            const ItemIcon = item.icon;

            return (
              <article key={item.title}>
                <ItemIcon aria-hidden="true" />
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="industrial-aoi-hotkey-statement">
          <CheckCircle aria-hidden="true" />
          <p>기존 단축키의 순차 탐색 구조를 2-Key Dictionary 기반 즉시 조회 구조로 개선하여, Debug 모드 로그 기준 단축키 응답 시간을 약 2초에서 0.3초로 줄이고 입력 이벤트 처리 시간을 약 85% 단축했다.</p>
        </div>
      </section>
    </article>
  );
}

function ProductionIntegrationDiagramSection() {
  return (
    <article className="industrial-aoi-matching-section industrial-aoi-integration-section" aria-label="MES SECS GEM production integration diagrams">
      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="integration-comparison-title">
        <div className="industrial-aoi-report-heading">
          <span>6</span>
          <h5 id="integration-comparison-title">처리 기준 및 적용 구조</h5>
        </div>
        <div className="industrial-aoi-integration-comparison-table" role="table" aria-label="MES SECS GEM integration before and after comparison">
          <div className="industrial-aoi-integration-comparison-row industrial-aoi-integration-comparison-head" role="row">
            <span role="columnheader">항목</span>
            <span role="columnheader">개선 전</span>
            <span role="columnheader">개선 후</span>
            <span role="columnheader">적용 구조</span>
          </div>
          {integrationComparisonRows.map((row) => (
            <div className="industrial-aoi-integration-comparison-row" role="row" key={row.target}>
              <strong role="cell">{row.target}</strong>
              <span role="cell">{row.before}</span>
              <span role="cell">{row.after}</span>
              <span role="cell">{row.method}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="industrial-aoi-structure-panel industrial-aoi-report-card" aria-labelledby="integration-structure-title">
        <div className="industrial-aoi-structure-titlebar">
          <div className="industrial-aoi-report-heading">
            <span>7</span>
            <h5 id="integration-structure-title">구조 다이어그램</h5>
          </div>
          <p>생산 이벤트 발생, 전송, 응답 반영, 로그 추적을 단일 처리 흐름으로 구성</p>
        </div>

        <div className="industrial-aoi-integration-structure-map">
          <div className="industrial-aoi-structure-grid industrial-aoi-integration-structure-grid">
            <article className="industrial-aoi-structure-card industrial-aoi-structure-before">
              <header className="industrial-aoi-structure-card-header">
                <div>
                  <strong>Before</strong>
                  <span>분산 처리 구조</span>
                </div>
              </header>
              <div className="industrial-aoi-refactor-flow industrial-aoi-refactor-flow-before">
                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-node-source">
                  <span>AOI Events</span>
                  <strong>연동 이벤트</strong>
                  <div>
                    <em>작업 정보</em>
                    <em>바코드</em>
                    <em>판정 결과</em>
                    <em>장비 알림</em>
                    <em>...</em>
                  </div>
                </div>
                <div className="industrial-aoi-refactor-tangle" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-node-risk">
                  <span>Branch Logic</span>
                  <strong>서비스별 조건 분기</strong>
                  <div>
                    <em>MES 조건</em>
                    <em>SECS/GEM 조건</em>
                    <em>고객사 예외</em>
                  </div>
                </div>
                <div className="industrial-aoi-refactor-arrow industrial-aoi-refactor-arrow-danger" aria-hidden="true" />
                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-node-risk">
                  <span>Risk</span>
                  <strong>운영 리스크</strong>
                  <div>
                    <em>중복 구현</em>
                    <em>변경 영향 확대</em>
                    <em>장애 추적 분산</em>
                  </div>
                </div>
              </div>
              <div className="industrial-aoi-structure-caption">
                <p>서비스별 분기와 고객사 예외 누적으로 변경 범위 및 장애 추적 비용 증가</p>
              </div>
            </article>

            <article className="industrial-aoi-structure-card industrial-aoi-structure-after">
              <header className="industrial-aoi-structure-card-header">
                <div>
                  <strong>After</strong>
                  <span>채널 분리 구조</span>
                </div>
              </header>
              <div className="industrial-aoi-refactor-after-map">
                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-node-source">
                  <span>AOI Events</span>
                  <strong>연동 이벤트</strong>
                  <div>
                    <em>작업 정보</em>
                    <em>바코드</em>
                    <em>판정 결과</em>
                    <em>장비 알림</em>
                    <em>...</em>
                  </div>
                </div>

                <div className="industrial-aoi-refactor-arrow industrial-aoi-refactor-arrow-success" aria-hidden="true" />

                <div className="industrial-aoi-refactor-contract">
                  <span>Integration Event</span>
                  <strong>공통 생산 연동 기준</strong>
                  <p>서비스별 포맷 변환과 응답 처리 기준 공통화</p>
                  <div>
                    <em>전송 전처리</em>
                    <em>응답 반영</em>
                    <em>로그 추적</em>
                  </div>
                </div>

                <div className="industrial-aoi-refactor-arrow industrial-aoi-refactor-arrow-success" aria-hidden="true" />

                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-channel-node">
                  <span>Separated Channels</span>
                  <strong>채널별 책임 분리</strong>
                  <div>
                    <em>생성·전송·응답</em>
                    <em>SECS/GEM 계약</em>
                    <em>응답 / 예외 검증</em>
                  </div>
                </div>

                <div className="industrial-aoi-refactor-arrow industrial-aoi-refactor-arrow-success" aria-hidden="true" />

                <div className="industrial-aoi-refactor-node industrial-aoi-refactor-result-node">
                  <span>Result</span>
                  <strong>운영 개선 효과</strong>
                  <div>
                    <em>변경 범위 축소</em>
                    <em>데이터 정합성</em>
                    <em>로그 기반 추적</em>
                    <em>메시지 안정화</em>
                  </div>
                </div>
              </div>
              <div className="industrial-aoi-structure-caption">
                <p>공통 이벤트 기준으로 MES 전송과 SECS/GEM 확장을 분리하여 운영 안정성 강화</p>
              </div>
            </article>
          </div>
        </div>

        <div className="industrial-aoi-code-flow-diagram" aria-label="코드 기준 생산 연동 처리 흐름">
          <div className="industrial-aoi-code-flow-main">
            <div className="industrial-aoi-code-flow-node industrial-aoi-code-flow-node-event">
              <Database aria-hidden="true" />
              <div>
                <strong>생산 이벤트 발생</strong>
                <span>Job · Barcode · Result · Alarm</span>
              </div>
            </div>
            <ArrowRight className="industrial-aoi-code-flow-arrow" aria-hidden="true" />
            <div className="industrial-aoi-code-flow-node industrial-aoi-code-flow-node-model">
              <Box aria-hidden="true" />
              <div>
                <strong>공통 이벤트 기준</strong>
                <span>서비스별 포맷 변환 전 기준 데이터 정리</span>
              </div>
            </div>
            <ArrowRight className="industrial-aoi-code-flow-arrow" aria-hidden="true" />
            <div className="industrial-aoi-code-flow-channel-group">
              <article className="industrial-aoi-code-flow-channel">
                <Layers aria-hidden="true" />
                <div>
                  <strong>생성·전송·응답 책임 분리</strong>
                  <span>요청 데이터 생성 · 전송 분기 · 응답 반영</span>
                </div>
              </article>
              <article className="industrial-aoi-code-flow-channel">
                <CheckCircle aria-hidden="true" />
                <div>
                  <strong>SECS/GEM 확장 계층</strong>
                  <span>공통 처리 흐름 · 고객사별 Override</span>
                  <em>미들웨어 TCP/IP 송수신 · Header/Length Packet</em>
                </div>
              </article>
            </div>
            <ArrowRight className="industrial-aoi-code-flow-arrow" aria-hidden="true" />
            <div className="industrial-aoi-code-flow-node industrial-aoi-code-flow-node-result">
              <Gauge aria-hidden="true" />
              <div>
                <strong>응답 반영 / 로그 추적</strong>
                <span>이벤트-전송-응답 흐름 추적</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function RepairConfirmHeroVisual() {
  return (
    <figure className="project-detail-hero-media industrial-aoi-hero-media industrial-aoi-repair-hero" aria-label="Remote shared-folder file move bottleneck visual">
      <img src="/assets/shared-folder-bottleneck.png" alt="A PC와 B PC 사이 공유 폴더 I/O 병목 구조 다이어그램" />
      <div className="industrial-aoi-repair-hero-title">
        <span>Confirm Total Time</span>
        <strong>약 32초 → 3초대</strong>
      </div>
      <div className="industrial-aoi-repair-hero-flow">
        <article className="industrial-aoi-repair-hero-node">
          <Database aria-hidden="true" />
          <div>
            <strong>원격 PC</strong>
            <span>처리 대상 파일 수집</span>
          </div>
        </article>
        <ArrowRight className="industrial-aoi-repair-hero-arrow" aria-hidden="true" />
        <article className="industrial-aoi-repair-hero-node industrial-aoi-repair-hero-node-accent">
          <Box aria-hidden="true" />
          <div>
            <strong>bat + TCP/IP</strong>
            <span>실행 명령만 전달</span>
          </div>
        </article>
        <ArrowRight className="industrial-aoi-repair-hero-arrow" aria-hidden="true" />
        <article className="industrial-aoi-repair-hero-node industrial-aoi-repair-hero-node-success">
          <CheckCircle aria-hidden="true" />
          <div>
            <strong>로컬 PC</strong>
            <span>로컬 디스크에서 이동</span>
          </div>
        </article>
      </div>
      <div className="industrial-aoi-repair-hero-compare">
        <span>Before: SMB 공유 폴더 직접 이동</span>
        <strong>After: 로컬 PC 실행 위임</strong>
      </div>
      <figcaption>Mockup</figcaption>
    </figure>
  );
}

const repairConfirmFlowSteps = [
  {
    label: '1',
    title: 'bat 생성',
    description: 'Confirm 대상 이미지/XML 처리 명령을 하나의 bat로 묶음',
  },
  {
    label: '2',
    title: '실행 요청',
    description: '파일 복사가 아니라 bat 실행 정보만 TCP/IP로 전달',
  },
  {
    label: '3',
    title: '로컬 실행',
    description: '파일 보유 PC에서 로컬 루트로 경로 치환 후 실행',
  },
] as const;

const repairConfirmStructureNodes = [
  {
    file: '원격 PC',
    title: '명령 작성',
    role: 'Confirm 대상 파일을 직접 이동하지 않고 bat 명령으로 정리.',
  },
  {
    file: 'TCP/IP',
    title: '실행 위임',
    role: '이미지 파일 대신 bat 경로와 공유 루트 정보만 전달.',
  },
  {
    file: '로컬 PC',
    title: '로컬 처리',
    role: '공유 경로를 로컬 경로로 치환한 뒤 hidden process로 실행.',
  },
] as const;

const repairConfirmPseudoSnippets = [
  {
    file: '원격 요청 모듈',
    title: 'bat 생성 / 실행 요청',
    code: `private void HandleConfirmFileMove(confirmFiles, imagePath, result)
{
    // 원격 PC는 파일 이동 대신 bat 생성만 담당.

    var batch = new BatchCommand();
    batch.AppendMoveImages(confirmFiles, to: imagePath + "\\\\OKImage");
    batch.AppendDeleteXmlWhenNeeded(confirmFiles);

    var batPath = WriteBatFile(result.InspStart, batch);

    if (TryGetLocalPcIp(imagePath, out var targetIp))
    {
        // 파일 대신 실행 요청만 전송.
        if (RequestLocalBatchExec(targetIp, remoteRoot, batPath))
            return;
    }

    RunBatchHereAsFallback(batPath);
}

public bool RequestLocalBatchExec(targetIp, remoteRoot, batPath)
{
    // 네트워크에는 bat 실행 정보만 싣는다.
    var payload = JoinParams(remoteRoot, batPath);

    var packet = new TwinPacket();
    packet.InsertRequest(data: payload);

    return SendTcpRequest(targetIp, packet);
}`,
  },
  {
    file: '로컬 실행 모듈',
    title: '요청 수신 / 로컬 실행',
    code: `private Packet BatchExec(Packet packet)
{
    var request = ParseBatchExecRequest(packet);

    // 로컬 PC 기준 경로로 치환.
    var localRoot = Config.InspectResultFullRootFolder;
    var localBatPath = request.BatPath.Replace(request.RemoteRoot, localRoot);

    RewriteFile(localBatPath, text => text.Replace(request.RemoteRoot, localRoot));

    RunHiddenBatch(localBatPath);
    DeleteBatAfterExit(localBatPath);

    return AckOk("local move");
}`,
  },
] as const;

function RepairConfirmImageMoveSection() {
  return (
    <article className="industrial-aoi-matching-section industrial-aoi-repair-section" aria-label="Remote shared-folder file move process">
      <section className="industrial-aoi-report-panel industrial-aoi-report-card industrial-aoi-repair-bypass-card" aria-labelledby="repair-structure-title">
        <div className="industrial-aoi-report-heading">
          <span>6</span>
          <h5 id="repair-structure-title">SMB 우회 방식</h5>
        </div>
        <p>
          파일 보유 PC의 로컬 실행 구조로 전환, 네트워크 전송은 bat 실행 요청으로 제한
        </p>
        <div className="industrial-aoi-repair-bypass-visual" aria-label="SMB bypass before and after structure">
          <article className="industrial-aoi-repair-bypass-lane industrial-aoi-repair-bypass-lane-before">
            <span className="industrial-aoi-repair-bypass-kicker">Before</span>
            <h6>원격 PC가 공유 폴더를 직접 조작</h6>
            <p>이미지/XML 이동·삭제가 SMB 경로를 반복 경유해 Confirm 전체 시간에 누적.</p>
            <div className="industrial-aoi-repair-bypass-route" aria-label="Before path">
              <span>원격 PC</span>
              <ArrowRight aria-hidden="true" />
              <span>SMB 공유 폴더</span>
              <ArrowRight aria-hidden="true" />
              <span>move/delete</span>
            </div>
          </article>

          <div className="industrial-aoi-repair-bypass-switch">
            <Box aria-hidden="true" />
            <span>전환 포인트</span>
            <strong>파일 대신 실행 요청</strong>
            <p>bat 경로와 공유 루트만 TCP/IP로 전달</p>
          </div>

          <article className="industrial-aoi-repair-bypass-lane industrial-aoi-repair-bypass-lane-after">
            <span className="industrial-aoi-repair-bypass-kicker">After</span>
            <h6>파일이 있는 PC가 로컬 디스크에서 처리</h6>
            <p>공유 경로를 로컬 경로로 치환한 뒤 hidden process로 bat 실행.</p>
            <div className="industrial-aoi-repair-bypass-route" aria-label="After path">
              <span>원격 PC</span>
              <ArrowRight aria-hidden="true" />
              <span>TCP/IP 요청</span>
              <ArrowRight aria-hidden="true" />
              <span>로컬 PC 실행</span>
            </div>
          </article>
        </div>
        <div className="industrial-aoi-repair-bypass-impact" aria-label="SMB bypass result summary">
          <span>
            <Gauge aria-hidden="true" />
            <span>
              <strong>약 32초 → 3초대</strong>
              <em>이슈 발생 PC Start/End 로그</em>
            </span>
          </span>
          <span>
            <CheckCircle aria-hidden="true" />
            <span>
              <strong>SMB 우회</strong>
              <em>bat 실행 요청만 TCP/IP로 전달</em>
            </span>
          </span>
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="repair-code-flow-title">
        <div className="industrial-aoi-report-heading">
          <span>7</span>
          <h5 id="repair-code-flow-title">처리 흐름</h5>
        </div>
        <p>
          bat 생성, TCP/IP 실행 요청, 로컬 실행의 3단계 구성
        </p>
        <div className="industrial-aoi-repair-flow-map" aria-label="Remote shared-folder code flow">
          {repairConfirmFlowSteps.map((step, index) => (
            <div className="industrial-aoi-repair-flow-item" key={step.title}>
              <article className="industrial-aoi-repair-flow-step">
                <span>{step.label}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </article>
              {index < repairConfirmFlowSteps.length - 1 ? (
                <ArrowRight className="industrial-aoi-repair-flow-arrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="repair-code-structure-title">
        <div className="industrial-aoi-report-heading">
          <span>8</span>
          <h5 id="repair-code-structure-title">역할 분리</h5>
        </div>
        <div className="industrial-aoi-repair-structure-grid">
          {repairConfirmStructureNodes.map((node) => (
            <article className="industrial-aoi-repair-structure-card" key={`${node.file}-${node.title}`}>
              <span>{node.file}</span>
              <h6>{node.title}</h6>
              <p>{node.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="industrial-aoi-report-panel industrial-aoi-report-card" aria-labelledby="repair-pseudocode-title">
        <div className="industrial-aoi-report-heading">
          <span>9</span>
          <h5 id="repair-pseudocode-title">의사코드</h5>
        </div>
        <p>
          세부 분기와 내부 경로를 제외한 C# 스타일 핵심 의사코드
        </p>
        <div className="industrial-aoi-smb-bypass-note">
          <strong>SMB 우회 핵심</strong>
          <p>
            원격 PC는 파일 이동을 수행하지 않고 TCP/IP로 bat 실행을 요청. 로컬 PC에서 경로 치환 후 실행.
          </p>
        </div>
        <div className="industrial-aoi-pseudocode-grid">
          {repairConfirmPseudoSnippets.map((snippet) => (
            <figure className="industrial-aoi-code-window" key={snippet.title}>
              <figcaption>
                <span className="industrial-aoi-code-window-badge">C#</span>
                <strong>{snippet.title}</strong>
                <em>{snippet.file}</em>
              </figcaption>
              <pre>
                <code>{renderCsharpCode(snippet.code)}</code>
              </pre>
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
}

export function IndustrialAOIPlatformProjectPage({
  onNavigate,
  themeMode,
  onThemeToggle,
  selectedAreaId,
}: ThemedPageProps & {
  selectedAreaId?: IndustrialAoiAreaId;
}) {
  const representativeProject: Project | undefined = workCaseStudies[0];
  const highlightAreas = [
    {
      id: 'inspection-automation',
      step: '01',
      title: 'Gerber-Part ROI 매칭 성능 개선',
      summary: '대용량 ROI 매칭 병목을 후보 선별과 캐싱으로 줄인 대표 사례',
      problem: '대용량 ROI 매칭으로 검사 준비 시간이 길어지고 원인 추적이 어려운 구조',
      actions: [
        'Gerber ROI와 Part Window ROI 매칭 기준 정리',
        'Module 후보군 기반 탐색 범위 축소 로직 적용',
        '기존 검사 결과를 유지하면서 미매칭 항목 보정 흐름 정리',
      ],
      impact: [
        '대용량 ROI 매칭 처리 시간 단축',
        '기존 검사 결과 포맷과 후속 흐름 호환성 유지',
        '매칭 기준과 성능 측정 근거를 추적 가능한 형태로 정리',
      ],
      directions: [
        {
          label: 'Track 01',
          title: 'AOI Matching',
          points: ['Gerber-Part ROI 매칭 병목 개선', 'Module 후보군 기반 탐색 범위 축소', '기존 매칭 결과 호환 유지'],
        },
        {
          label: 'Track 02',
          title: 'Teaching / Inspection UI',
          points: ['Teaching 화면 흐름 정리', '검사 Window 상태 관리', '작업자 확인 지점 보완'],
        },
      ],
      improvements: [
        {
          title: 'Gerber / Part / Fiducial Matching',
          description: 'Gerber 후보 선별과 변환 결과 재사용으로 대용량 ROI 매칭 비용을 줄인 개선 작업',
          details: ['Module candidate filtering', 'Gerber ROI caching', 'Compatibility validation'],
        },
        {
          title: 'Teaching Screen Flow',
          description: '검사 Window와 Teaching 화면에 필요한 상태 변경 흐름 정리',
          details: ['Window 상태 갱신 보완', '작업자 확인 흐름 단순화'],
        },
      ],
    },
    {
      id: 'production-integration',
      step: '02',
      title: 'MES · SECS/GEM 생산 연동 안정화',
      summary: '공통 이벤트 기준과 채널별 책임 분리로 반복 장애를 줄인 사례',
      problem: '생산 이벤트 처리 기준이 서비스별로 분산되어 변경 범위와 장애 추적 비용이 증가한 구조',
      actions: [
        'Job, Barcode, Result, Alarm 기준 공통 생산 이벤트 기준 정리',
        '요청 데이터 생성, 전송 분기, 응답 반영 책임 분리',
        'SECS/GEM 공통 계약과 고객사별 Override 구조 분리',
        'Header/Length 기반 Packet Framing으로 TCP/IP 대용량 메시지 안정화',
      ],
      directions: [
        {
          label: 'Track 01',
          title: '생성·전송·응답 책임 분리',
          points: ['요청 데이터 생성', '전송 분기', '응답 반영'],
        },
        {
          label: 'Track 02',
          title: 'SECS/GEM Extension',
          points: ['공통 계약', '고객사별 Override', '응답·예외 검증'],
        },
      ],
      impact: [
        '연동 이슈 메일 약 70% 감소',
        '신규 고객사 연동 10개 이상 시나리오 대응',
        '이벤트-전송-응답 기준 운영 추적성 강화',
      ],
      improvements: [
        {
          title: '공통 생산 이벤트 기준',
          description: 'Job, Barcode, Result, Alarm을 서비스 조건에서 분리된 기준 데이터로 정리',
          details: ['이벤트 기준 정리', '변경 영향 범위 축소', '로그 추적 기준 확보'],
        },
        {
          title: '생성·전송·응답 책임 분리',
          description: '요청 데이터 생성, 전송 분기, 응답 반영을 역할별로 정리',
          details: ['요청 데이터 생성', '전송 종류별 분기', '응답 반영'],
        },
        {
          title: 'SECS/GEM 확장 계층',
          description: '추상 클래스 기반 공통 계약과 고객사별 구현 지점 분리',
          details: ['공통 호출 지점', '고객사별 재정의', '변경 범위 축소'],
        },
        {
          title: 'TCP/IP 메시지 안정화',
          description: 'Header/Length 기반 Packet Framing으로 대용량 메시지 처리 안정성 개선',
          details: ['헤더/길이 기반 패킷 구성', '문자 인코딩 보완', '대용량 메시지 보완'],
        },
      ],
    },
    {
      id: 'hotkey-optimization',
      step: '03',
      title: '단축키 처리 구조 분석을 통한 UX/UI 및 입력 응답성 개선',
      summary: '단축키 설정 UI와 입력 처리 구조를 통합하고 Debug 로그 기준 약 2초 수준의 응답 시간을 0.3초 수준으로 단축',
      problem: '키 입력마다 실행 대상을 반복 탐색해 항목 증가 시 입력 응답성이 저하되고 설정 UI가 업무 영역별로 분산된 구조',
      actions: [
        '기존 단축키 입력 처리 흐름과 실행 대상 탐색 비용 분석',
        '단축키 설정 로드, 저장, 매칭, 안내 문구 갱신 흐름 통합',
        'Modifier Key + Key Code 조합을 2-Key Dictionary로 사전 매핑',
        '기능별 탭 UI, 사용자별/장비별 설정, 중복 키 검증, XML 저장/백업 구성',
      ],
      directions: [
        {
          label: 'Track 01',
          title: '단축키 처리 구조',
          points: ['2-Key Dictionary 매핑', '입력 즉시 조회', 'Debug 로그 기반 응답성 검증'],
        },
        {
          label: 'Track 02',
          title: '설정 UX/UI',
          points: ['업무별 탭 UI', '중복 키 검증', '안내 문구 자동 반영'],
        },
      ],
      impact: [
        'Debug 모드 로그 기준 단축키 응답 시간 약 2초 → 0.3초 개선',
        '입력 이벤트 처리 시간 약 85% 단축',
        '반복 입력 작업에서 발생하던 응답 지연 해소',
        'Main, Inspection, Teaching, Algo, CAD/Gerber, Defect, Repair 등 업무 흐름 기준 단축키 설정 UI 재구성',
        '키보드 단축키와 마우스 사용자 지정 버튼을 함께 제공해 작업자 맞춤 조작 환경 확장',
      ],
      improvements: [
        {
          title: '2-Key Dictionary 조회 구조',
          description: '입력 시 리스트 검색을 반복하지 않고 Modifier + Key 조합으로 즉시 조회',
          details: ['Modifier + KeyCode 사전 매핑', '실행 대상 즉시 조회', '반복 탐색 제거'],
        },
        {
          title: '단축키 UX/UI 통합',
          description: '업무 흐름 기준으로 단축키 설정 화면과 기능 분류를 재구성',
          details: ['Main / Inspection / Teaching', 'Algo / CAD-GERBER / Defect', 'Repair / ComposeKey'],
        },
        {
          title: '설정 안정성 보완',
          description: '현장 설정 변경 시 충돌과 복구 리스크를 줄이도록 저장 흐름 보강',
          details: ['중복 키 검증', '사용자별·장비별 설정', 'XML 버전 확인·백업'],
        },
        {
          title: '사용자 지정 버튼 확장',
          description: '단축키 중심 개선에 마우스 버튼 사용자 설정을 보조 기능으로 연결',
          details: ['키보드 단축키', '마우스 사용자 지정 버튼', '작업자 맞춤 조작'],
        },
      ],
    },
    {
      id: 'operation-flow',
      step: '04',
      title: '원격 공유 폴더 I/O 병목 구조 개선',
      summary: '공유 폴더 파일 처리를 로컬 실행 구조로 전환해 Confirm 전체 시간을 3초대로 단축',
      problem: '원격 PC가 공유 폴더 파일을 직접 조작해 대기 시간이 길어지는 구조',
      actions: [
        '공유 폴더 직접 조작 구간 확인',
        '이동·삭제 명령을 bat 파일로 구성',
        '파일이 있는 PC에 실행을 위임해 로컬 경로에서 처리',
      ],
      directions: [],
      impact: [
        '이슈 발생 PC Start/End 로그 기준 약 32초 → 3초대 개선',
        '파일 이동·삭제를 bat 실행 요청 위임 구조로 전환',
        '공유 폴더 직접 조작을 로컬 PC 실행으로 전환',
        '접속 실패 시 기존 처리 흐름을 유지해 운영 리스크 완화',
      ],
      improvements: [
        {
          title: 'SMB File Move Bottleneck',
          description: 'Confirm 지연 원인을 원격 파일 조작 구조에서 확인',
          details: ['공유 경로 직접 조작 확인', '로컬 실행 전환 방향 도출'],
        },
        {
          title: 'Batch Command Generation',
          description: '이미지 이동과 XML 삭제를 하나의 실행 단위로 정리',
          details: ['move·delete 명령 생성', 'bat 파일 저장'],
        },
        {
          title: 'Local Execution Delegation',
          description: '파일 보유 PC에서 경로 치환 후 로컬 디스크 실행',
          details: ['로컬 경로 치환', 'hidden process 실행'],
        },
      ],
    },
  ] as const;
  const selectedArea = selectedAreaId ? highlightAreas.find((area) => area.id === selectedAreaId) : undefined;
  const selectedProject = selectedAreaId
    ? workCaseStudies.find((project) => project.detailPath === industrialAoiAreaRoutes[selectedAreaId])
    : undefined;
  const displayedAreas = selectedArea ? [selectedArea] : highlightAreas;
  const pageTitle =
    selectedArea?.id === 'inspection-automation'
      ? 'Gerber-Part ROI 매칭 성능 개선'
      : selectedArea?.id === 'hotkey-optimization'
        ? '단축키 처리 구조 분석을 통한 UX/UI 및 입력 응답성 개선'
      : selectedArea?.id === 'production-integration'
        ? 'MES · SECS/GEM 생산 연동 안정화'
      : selectedArea?.title ?? 'Industrial AOI Platform Work Areas';
  const pageLead =
    selectedArea?.id === 'inspection-automation'
      ? '6분 22초 걸리던 대용량 ROI 매칭을 Module 후보 선별과 캐싱으로 3.5초 수준까지 줄인 업무 사례'
      : selectedArea?.id === 'hotkey-optimization'
        ? '기존 단축키의 순차 탐색 구조를 2-Key Dictionary 즉시 조회 구조로 개선해 응답 시간을 0.3초 수준으로 단축한 업무 사례'
      : selectedArea?.id === 'production-integration'
        ? '서비스별로 분산된 생산 연동 로직을 공통 이벤트 기준과 채널별 책임 구조로 정리한 업무 사례'
      : selectedArea?.summary ??
        '3D AOI 장비 소프트웨어 개선 내역을 성능 개선, 생산 연동, 운영 유지보수 기준으로 구성';
  const pageTech =
    selectedArea?.id === 'inspection-automation'
      ? gerberPartReportTech
      : selectedArea?.id === 'hotkey-optimization'
        ? ['C#', '.NET Framework', 'WinForms', 'Data Structure', 'UX/UI', 'Performance Optimization']
      : selectedArea?.id === 'production-integration'
        ? integrationReportTech
      : selectedProject?.tech ?? ['C#', 'C++', '.NET Framework', 'WinForms', 'SECS/GEM', 'OpenCV'];
  const issueReductionMetric = metrics.find((metric) => metric.label === '장애 이슈 메일 감소');
  const showIntegrationIssueBadge = selectedArea?.id === 'production-integration' && issueReductionMetric;
  const heroImage =
    selectedArea?.id === 'inspection-automation'
      ? '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png'
      : selectedProject?.image ?? representativeProject?.image ?? '/assets/project-industrial-aoi-platform.svg';
  const heroImages =
    selectedArea?.id === 'inspection-automation'
      ? [
          {
            alt: 'Module and Part ROI matching mockup',
            image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
            label: 'Module / Part View',
          },
          {
            alt: 'Gerber ROI matching mockup',
            image: '/assets/aoi-gerber-part-matching/gerber-aligned.png',
            label: 'Gerber View',
          },
        ]
      : null;
  const guideTitle = selectedArea ? 'Key Contributions' : `${highlightAreas.length} Work Areas`;
  const guideDescription = selectedArea
    ? '문제, 기존 방식, 개선 방식, 결과, 담당 역할 중심 구성'
    : '회사·고객사 세부 정보는 제외하고 성능 개선, UX/UI 응답성, 생산 연동, 운영 유지보수 기준으로 정리했습니다.';

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page industrial-aoi-page" id="top">
        <section className="project-detail-hero" aria-labelledby="industrial-aoi-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Work Highlights</p>
            <h1 id="industrial-aoi-title">{pageTitle}</h1>
            <p className="project-detail-lead">{pageLead}</p>
            <TechList className="tech-list project-detail-tech-list" ariaLabel={`${pageTitle} 기술 스택`} items={pageTech} />
          </div>
          {heroImages ? (
            <figure className="project-detail-hero-media industrial-aoi-hero-media industrial-aoi-hero-media-pair">
              <div>
                {heroImages.map((item) => (
                  <span key={item.label}>
                    <img src={item.image} alt={item.alt} />
                    <em>{item.label}</em>
                  </span>
                ))}
              </div>
              <aside className="industrial-aoi-hero-kpi" aria-label="Performance improvement summary">
                <span>Performance</span>
                <strong>{gerberPartPerformanceSummary.reduction}</strong>
                <p>{gerberPartPerformanceSummary.before} <ArrowRight aria-hidden="true" /> {gerberPartPerformanceSummary.after}</p>
              </aside>
              <figcaption>Mockup</figcaption>
            </figure>
          ) : selectedArea?.id === 'operation-flow' ? (
            <RepairConfirmHeroVisual />
          ) : (
            <figure className="project-detail-hero-media industrial-aoi-hero-media">
              <img src={heroImage} alt={`${pageTitle} mock interface`} />
            {showIntegrationIssueBadge ? (
              <aside className="industrial-aoi-hero-kpi industrial-aoi-hero-kpi--compact" aria-label="Issue mail reduction summary">
                <span>Improvement</span>
                <strong>{issueReductionMetric.value}</strong>
                <p>장애 이슈 메일</p>
              </aside>
            ) : null}
              <figcaption>Mockup</figcaption>
            </figure>
          )}
        </section>

        <article
          className={`project-guide industrial-aoi-guide${selectedArea ? ' industrial-aoi-guide-detail' : ''}`}
          aria-label={selectedArea ? 'AOI contribution details' : undefined}
          aria-labelledby={selectedArea ? undefined : 'industrial-aoi-guide-title'}
        >
          {!selectedArea ? (
            <header className="project-guide-header">
              <p className="section-kicker">Work Areas</p>
              <h2 id="industrial-aoi-guide-title">{guideTitle}</h2>
              <p>{guideDescription}</p>
            </header>
          ) : null}

          {selectedArea ? null : (
            <>
              <ol className="guide-flow industrial-aoi-flow" aria-label="Industrial AOI Platform 업무 사례 구성">
                {highlightAreas.map((area) => (
                  <li key={area.id}>
                    <strong>{area.step}. {area.title.split(' ')[0]}</strong>
                    <span>{area.summary}</span>
                  </li>
                ))}
              </ol>

              <section className="guide-section" aria-labelledby="industrial-aoi-overview-title">
                <h3 id="industrial-aoi-overview-title">Overview</h3>
                <div className="industrial-aoi-focus-grid">
                  {highlightAreas.map((area) => {
                    const areaPath = industrialAoiAreaRoutes[area.id];

                    return (
                      <a
                        className="industrial-aoi-focus-card industrial-aoi-focus-link"
                        href={areaPath}
                        key={area.id}
                        onClick={(event) => onNavigate(event, areaPath)}
                      >
                        <span>{area.step}</span>
                        <h4>{area.title}</h4>
                        <p>{area.summary}</p>
                      </a>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {displayedAreas.map((area) => (
            <section
              className="guide-section industrial-aoi-work-section"
              id={area.id}
              aria-label={selectedArea ? area.title : undefined}
              aria-labelledby={selectedArea ? undefined : `${area.id}-title`}
              key={area.id}
            >
              {!selectedArea ? (
                <div className="industrial-aoi-work-header">
                  <p className="section-kicker">{area.step}</p>
                  <h3 id={`${area.id}-title`}>{area.title}</h3>
                  <p>{area.summary}</p>
                </div>
              ) : null}

              {!selectedArea && area.directions.length > 0 ? (
                <div className="industrial-aoi-direction-block" aria-label={`${area.title} improvement tracks`}>
                  <div className="industrial-aoi-direction-header">
                    <span>Two Improvement Tracks</span>
                  </div>
                  <div className="industrial-aoi-direction-grid">
                    {area.directions.map((direction) => (
                      <article className="industrial-aoi-direction-card" key={direction.title}>
                        <span>{direction.label}</span>
                        <h4>{direction.title}</h4>
                        <ul>
                          {direction.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {selectedArea ? <CompactWorkCaseReport areaId={area.id} /> : null}

              {selectedArea && area.id === 'inspection-automation' ? <GerberPartDiagramSection /> : null}

              {selectedArea && area.id === 'hotkey-optimization' ? <HotKeyOptimizationDiagramSection /> : null}

              {selectedArea && area.id === 'production-integration' ? <ProductionIntegrationDiagramSection /> : null}

              {selectedArea && area.id === 'operation-flow' ? <RepairConfirmImageMoveSection /> : null}


              {!selectedArea && area.directions.length === 0 ? (
                <div className="industrial-aoi-detail-grid">
                  <article className="industrial-aoi-detail-card">
                    <h4>Problem</h4>
                    <p>{area.problem}</p>
                  </article>
                  <article className="industrial-aoi-detail-card">
                    <h4>What I Did</h4>
                    <ul>
                      {area.actions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <article className="industrial-aoi-detail-card">
                    <h4>Impact</h4>
                    <ul>
                      {area.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              ) : null}

              {!selectedArea ? (
                <div className="industrial-aoi-improvement-block">
                  <h4>Detail Highlights</h4>
                  <div className="industrial-aoi-improvement-grid">
                    {area.improvements.map((item) => (
                      <article className="industrial-aoi-improvement-card" key={item.title}>
                        <h5>{item.title}</h5>
                        {area.directions.length === 0 ? <p>{item.description}</p> : null}
                        <ul>
                          {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
