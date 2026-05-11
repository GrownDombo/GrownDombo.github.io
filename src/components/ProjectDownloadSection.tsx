import { ArrowUpRight } from 'lucide-react';
import type { ProjectLink } from '../data/portfolio';
import type { DownloadDescription } from '../types/navigation';

type ProjectDownloadSectionProps = {
  titleId: string;
  title: string;
  description: string;
  links: ProjectLink[];
  descriptions: Record<string, DownloadDescription>;
  defaultDescription: string;
  defaultButtonText?: string;
  gridClassName?: string;
  cardClassName?: string;
};

export function ProjectDownloadSection({
  titleId,
  title,
  description,
  links,
  descriptions,
  defaultDescription,
  defaultButtonText = 'Open',
  gridClassName = 'project-download-grid',
  cardClassName = 'project-download-card',
}: ProjectDownloadSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="project-download-section" aria-labelledby={titleId}>
      <div className="project-download-copy">
        <p className="section-kicker">Downloads</p>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={gridClassName}>
        {links.map((link) => {
          const detail = descriptions[link.label] ?? {
            title: link.label,
            description: defaultDescription,
            buttonText: defaultButtonText,
          };

          return (
            <article className={cardClassName} key={link.label}>
              <h3>{detail.title}</h3>
              {detail.description ? <p>{detail.description}</p> : null}
              <a className="button secondary" href={link.href} target="_blank" rel="noreferrer">
                {detail.buttonText ?? defaultButtonText}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
