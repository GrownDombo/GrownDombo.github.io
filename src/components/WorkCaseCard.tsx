import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import type { WorkCaseCardData } from '../data/workCaseCards';
import type { InternalNavigate } from '../types/navigation';

type WorkCaseCardProps = {
  caseData: WorkCaseCardData;
  onNavigate: InternalNavigate;
};

export function WorkCaseCard({ caseData, onNavigate }: WorkCaseCardProps) {
  return (
    <article className="case-study-card">
      <div className="case-study-card-top">
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

      <div className="case-study-main">
        <Link
          className="case-study-media"
          to={caseData.detailPath}
          aria-label={`${caseData.title} 상세 페이지 보기`}
          onClick={(event) => onNavigate(event, caseData.detailPath)}
        >
          <img src={caseData.image} alt={caseData.imageAlt} loading="lazy" />
        </Link>

        <div className="case-study-copy">
          <h3>{caseData.title}</h3>
          <p>{caseData.summary}</p>
          <div className="case-study-metrics" aria-label={`${caseData.title} 핵심 지표`}>
            {caseData.metrics.map((metric) => (
              <div className="case-study-metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="case-study-flow" aria-label={`${caseData.title} 문제 해결 흐름`}>
        {caseData.phases.map((phase) => (
          <section className="case-study-phase" key={phase.label} aria-label={phase.title}>
            <span>{phase.label}</span>
            <strong>{phase.title}</strong>
            <ul className="case-study-phase-list">
              {phase.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
