import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import type { WorkCaseCardData } from '../data/workCaseCards';
import type { InternalNavigate } from '../types/navigation';

type WorkCaseCardProps = {
  caseData: WorkCaseCardData;
  onNavigate: InternalNavigate;
};

function getMetricSummary(metric: WorkCaseCardData['metrics'][number]) {
  const range = metric.beforeValue && metric.afterValue ? `${metric.beforeValue} → ${metric.afterValue}` : undefined;

  if (metric.evidenceLabel && metric.evidenceText) {
    const basis = metric.evidenceText.includes('기준')
      ? `[${metric.evidenceLabel} ${metric.evidenceText}]`
      : `[${metric.evidenceLabel}] ${metric.evidenceText}`;
    const result = [range, metric.value ? `(${metric.value})` : undefined].filter(Boolean).join(' ');

    return `${basis} ${result}`.trim();
  }

  if (range) {
    return metric.label ? `[${metric.label}] ${range}` : range;
  }

  return [metric.label, metric.value, metric.description].filter(Boolean).join(' ');
}

function renderSummary(summary: string) {
  const tagMatch = summary.match(/^\[([^\]]+)\]\s*(.*)$/);

  if (!tagMatch) {
    return summary;
  }

  return (
    <>
      <span className="case-study-summary-tag">{tagMatch[1]}</span>
      {tagMatch[2]}
    </>
  );
}

export function WorkCaseCard({ caseData, onNavigate }: WorkCaseCardProps) {
  const summaryItems = [caseData.summary, ...caseData.metrics.map(getMetricSummary)].filter(Boolean);

  return (
    <article className="case-study-card">
      <div className="case-study-card-top">
        <div className="case-study-eyebrow-row">
          <p className="project-role case-study-kicker">{caseData.subtitle}</p>
          <Link
            className="case-study-detail-link"
            to={caseData.detailPath}
            onClick={(event) => onNavigate(event, caseData.detailPath)}
          >
            자세히 보기
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="case-study-heading">
          <h3>{caseData.title}</h3>
          <ul className="case-study-summary-list">
            {summaryItems.map((summary, index) => (
              <li className={index === 0 ? 'case-study-summary-item--plain' : undefined} key={summary}>
                {renderSummary(summary)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="case-study-main">
        <Link
          className="case-study-media"
          to={caseData.detailPath}
          aria-label={`${caseData.title} 상세 페이지 보기`}
          onClick={(event) => onNavigate(event, caseData.detailPath)}
        >
          <img src={caseData.image} alt={caseData.imageAlt} loading="lazy" />
        </Link>
      </div>

      <div className="case-study-flow" aria-label={`${caseData.title} 문제 해결 흐름`}>
        {caseData.phases.map((phase) => (
          <section className="case-study-phase" key={phase.label} aria-label={phase.title}>
            <span>{phase.label}</span>
            <strong>{phase.title}</strong>
            <ul className="case-study-phase-list">
              {phase.details.slice(0, 2).map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
