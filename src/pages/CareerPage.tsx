import { useRef } from 'react';
import { FileDown } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { AnalyticsNotice } from '../components/AnalyticsNotice';
import { SiteHeader } from '../components/SiteHeader';
import { trackAnalyticsEvent } from '../analytics/google';
import {
  careerAdditionalProjects,
  careerCompetencies,
  careerExperiences,
  careerPersonalProjects,
  careerProfile,
  careerProjects,
  careerSkillGroups,
  careerTroubleshootingNotes,
  type CareerLearningItem,
  type CareerProject,
} from '../data/career';
import { resumePath } from '../routes/paths';
import type { ThemedPageProps } from '../types/navigation';
import { ResumeIconLink, renderDocumentRole } from './resume/resumeFormatting';

function CareerProjectCard({
  project,
  onNavigate,
}: {
  project: CareerProject;
  onNavigate: ThemedPageProps['onNavigate'];
}) {
  return (
    <article className="career-project-card">
      <header className="career-project-card-header">
        <div>
          <div className="career-linked-title">
            <h3>{project.title}</h3>
            {project.detailHref ? (
              <ResumeIconLink
                href={project.detailHref}
                label={`${project.title} 상세 보기`}
                isExternal={false}
                onClick={(event) => onNavigate(event, project.detailHref!)}
              />
            ) : null}
          </div>
          <p>{project.subtitle}</p>
        </div>
      </header>

      <div className="career-project-summary">
        <section>
          <h4>문제 상황</h4>
          <ul className="career-list">
            {(project.problemPoints ?? [project.problem]).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>담당 역할</h4>
          <ul className="career-list">
            {(project.rolePoints ?? [project.role]).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="career-project-detail-grid">
        <section>
          <h4>구현 내용</h4>
          <ul className="career-list">
            {project.contributions.map((contribution) => (
              <li key={contribution}>{contribution}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>성과</h4>
          <ul className="career-list career-list--result">
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="career-tech-list" aria-label={`${project.title} 사용 기술`}>
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </article>
  );
}

function CareerLearningList({
  items,
  onNavigate,
}: {
  items: CareerLearningItem[];
  onNavigate: ThemedPageProps['onNavigate'];
}) {
  return (
    <div className="career-learning-list">
      {items.map((item) => (
        <article className="career-learning-item" key={item.title}>
          <div className="career-linked-title">
            <h3>{item.title}</h3>
            <ResumeIconLink
              href={item.detailHref}
              label={`${item.title} 자세히 보기`}
              isExternal={item.detailHref.startsWith('http')}
              onClick={item.detailHref.startsWith('http') ? undefined : (event) => onNavigate(event, item.detailHref)}
            />
          </div>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function CareerPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const careerPrintRef = useRef<HTMLElement>(null);
  const printCareer = useReactToPrint({
    contentRef: careerPrintRef,
    documentTitle: 'Choi-Junyoung-GrownDombo-career-description',
  });

  const handleCareerPrint = () => {
    trackAnalyticsEvent('download_click', { link_location: 'career_pdf' });
    printCareer();
  };

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="resume-page career-page" id="top" ref={careerPrintRef}>
        <div className="resume-print-actions no-print">
          <a className="resume-action-link" href={resumePath} onClick={(event) => onNavigate(event, resumePath)}>
            이력서 보기
          </a>
          <button className="resume-print-button" type="button" onClick={handleCareerPrint}>
            <FileDown size={17} aria-hidden="true" strokeWidth={2.2} />
            PDF로 저장
          </button>
        </div>

        <article className="resume-document career-document" aria-labelledby="career-title">
          <header className="career-document-header">
            <p className="career-kicker">Career Description</p>
            <h1 id="career-title">{careerProfile.title}</h1>
            <p className="career-name">{careerProfile.name}</p>
            <p className="career-headline">{careerProfile.headline}</p>
          </header>

          <dl className="resume-profile-list career-profile-list" aria-label="경력기술서 기본 정보">
            {careerProfile.contacts.map((contact) => (
              <div key={contact.label}>
                <dt>{contact.label}</dt>
                <dd>
                  <a className="resume-text-link" href={contact.href} target={contact.href.startsWith('mailto:') ? undefined : '_blank'} rel={contact.href.startsWith('mailto:') ? undefined : 'noreferrer'}>
                    {contact.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <section className="resume-document-section career-section" aria-labelledby="career-summary-title">
            <h2 id="career-summary-title">핵심 요약</h2>
            <div className="career-summary-box">
              {careerProfile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="career-competency-grid">
              {careerCompetencies.map((competency) => (
                <article key={competency.title}>
                  <h3>{competency.title}</h3>
                  <p>{competency.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-experience-title">
            <h2 id="career-experience-title">경력 요약</h2>
            <div className="career-experience-list">
              {careerExperiences.map((experience) => (
                <article className="career-experience-card" key={`${experience.company}-${experience.period}`}>
                  <header>
                    <h3>{experience.company}</h3>
                    <p>{renderDocumentRole(experience.role)}</p>
                    <time>{experience.period}</time>
                  </header>
                  <div>
                    <h4>담당 범위</h4>
                    <ul className="career-list">
                      {experience.scope.map((scope) => (
                        <li key={scope}>{scope}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>주요 성과</h4>
                    <ul className="career-list career-list--result">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-projects-title">
            <h2 id="career-projects-title">대표 프로젝트</h2>
            <div className="career-project-list">
              {careerProjects.map((project) => (
                <CareerProjectCard key={project.title} project={project} onNavigate={onNavigate} />
              ))}
            </div>
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-support-title">
            <h2 id="career-support-title">보조 성과</h2>
            <div className="career-support-list">
              {careerAdditionalProjects.map((project) => (
                <article className="career-support-item" key={project.title}>
                  <header>
                    <div className="career-linked-title">
                      <h3>{project.title}</h3>
                      {project.detailHref ? (
                        <ResumeIconLink
                          href={project.detailHref}
                          label={`${project.title} 상세 보기`}
                          isExternal={false}
                          onClick={(event) => onNavigate(event, project.detailHref!)}
                        />
                      ) : null}
                    </div>
                    <p>{project.subtitle}</p>
                  </header>
                  <ul className="career-list career-list--result">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-skills-title">
            <h2 id="career-skills-title">기술 역량</h2>
            <div className="resume-skill-lines career-skill-lines">
              {careerSkillGroups.map((group) => (
                <div key={group.title}>
                  <strong>{group.title}</strong>
                  <span>
                    {group.skills.map((skill) => (
                      <em key={skill}>{skill}</em>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-personal-title">
            <h2 id="career-personal-title">개인 프로젝트</h2>
            <CareerLearningList items={careerPersonalProjects} onNavigate={onNavigate} />
          </section>

          <section className="resume-document-section career-section" aria-labelledby="career-troubleshooting-title">
            <h2 id="career-troubleshooting-title">트러블슈팅 및 학습</h2>
            <CareerLearningList items={careerTroubleshootingNotes} onNavigate={onNavigate} />
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
