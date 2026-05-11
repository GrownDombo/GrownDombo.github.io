import { ArrowRight, ArrowUpRight, Box, CheckCircle, Database, Gauge, Layers, type LucideIcon } from 'lucide-react';
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
    title: 'Repair & NG Buffer 운영 흐름 정리',
    problem: {
      body: 'Repair 화면, NG Buffer 신호, Rack 상태가 어긋날 때 현장 재현과 원인 추적이 어려웠습니다.',
    },
    before: {
      body: '신호 처리, 화면 표시, Rack 상태 갱신 기준이 분산되어 같은 현상을 다시 확인하기 어려웠습니다.',
      label: '기존 구조',
      highlight: '상태 기준 분산',
      note: 'Repair/NG Buffer/Rack 흐름을 함께 추적해야 했음',
    },
    improvement: {
      body: 'NG Buffer In/Out 흐름, Rack 표시 동기화, 신호 로그 기준을 같은 운영 흐름에서 정리했습니다.',
      steps: [
        { icon: Layers, title: '신호 흐름 정리', description: 'NG Buffer In/Out 기준과 전달 흐름 정리' },
        { icon: CheckCircle, title: 'Rack 상태 동기화', description: '화면 표시와 내부 상태 갱신 기준 보완' },
        { icon: Gauge, title: '로그 기준 보강', description: '현장 재현을 위한 신호·상태 로그 정리' },
      ],
    },
    results: [
      { title: '상태 정합성', metric: '누락 완화', description: '표시와 내부 상태 기준 정리' },
      { title: '운영 추적', metric: '개선', description: '신호 로그 기준 정리' },
    ],
    roles: [
      'NG Buffer In/Out 흐름 점검',
      'Rack 표시 동기화 기준 정리',
      '현장 추적 로그 보강',
    ],
    keywords: ['Repair', 'NG Buffer', 'Rack State', 'Logging'],
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
      id: 'operation-flow',
      step: '03',
      title: 'Repair & NG Buffer 운영 흐름 정리',
      summary: '장비 상태와 화면 표시 기준을 맞춰 현장 추적성을 개선한 사례',
      problem: 'Repair, NG Buffer, Rack 상태 갱신이 겹칠 때 현장 재현과 원인 추적이 어려운 구조',
      actions: [
        'NG Buffer In/Out 신호 처리와 Rack 상태 갱신 누락 가능성 점검',
        'Repair 화면과 내부 Rack 데이터가 다르게 보이는 구간 정리',
        '현장 장애 추적을 위해 신호/상태 로그와 데이터 처리 구조 개선',
      ],
      directions: [],
      impact: [
        'Repair와 NG Buffer 흐름의 상태 누락 가능성 완화',
        '현장 장애 재현과 원인 추적에 필요한 로그 품질 개선',
        '장비 운영 흐름 관련 코드의 읽기 쉬운 구조화',
      ],
      improvements: [
        {
          title: 'NG Buffer Signal Flow',
          description: 'NG Buffer In/Out 신호와 Rack 상태 갱신 흐름 점검. 상태 누락 가능성 완화.',
          details: ['Bottom Rack 제거 누락 수정', 'Top/Bottom 신호 전달 확인', '연속 신호 처리 보완'],
        },
        {
          title: 'Repair Rack State Sync',
          description: 'Repair 화면과 내부 Rack 데이터 표시 차이를 줄이기 위한 상태 갱신 흐름 정리',
          details: ['Rack 표시 데이터 정합성 개선', 'Barcode Rack Search 보완', 'Without Empty Rack 조건 처리'],
        },
        {
          title: 'Logging / Data Cleanup',
          description: '현장 재현이 어려운 장비 이슈 추적을 위한 로그 보강과 데이터 처리 코드 정리',
          details: ['신호 관련 로그 강화', '과도한 반복 로그 완화', 'NGBufferListCtrl 구조 정리'],
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
      : selectedArea?.id === 'production-integration'
        ? 'MES · SECS/GEM 생산 연동 안정화'
      : selectedArea?.title ?? 'Industrial AOI Platform Work Areas';
  const pageLead =
    selectedArea?.id === 'inspection-automation'
      ? '6분 22초 걸리던 대용량 ROI 매칭을 Module 후보 선별과 캐싱으로 3.5초 수준까지 줄인 업무 사례'
      : selectedArea?.id === 'production-integration'
        ? '서비스별로 분산된 생산 연동 로직을 공통 이벤트 기준과 채널별 책임 구조로 정리한 업무 사례'
      : selectedArea?.summary ??
        '3D AOI 장비 소프트웨어 개선 내역을 성능 개선, 생산 연동, 운영 유지보수 기준으로 구성';
  const pageTech =
    selectedArea?.id === 'inspection-automation'
      ? gerberPartReportTech
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
  const guideTitle = selectedArea ? 'Key Contributions' : '3 Work Areas';
  const guideDescription = selectedArea
    ? '문제, 기존 방식, 개선 방식, 결과, 담당 역할 중심 구성'
    : '회사·고객사 세부 정보는 제외하고 성능 개선, 생산 연동, 운영 유지보수 기준으로 정리했습니다.';

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

              {selectedArea && area.id === 'production-integration' ? <ProductionIntegrationDiagramSection /> : null}


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
