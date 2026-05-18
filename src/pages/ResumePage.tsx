import { AnalyticsNotice } from '../components/AnalyticsNotice';
import { SiteHeader } from '../components/SiteHeader';
import { trackAnalyticsEvent } from '../analytics/google';
import { additionalDetails, resumeExperiences, resumeInfo, resumeIntroduction } from '../data/resume';
import type { ThemedPageProps } from '../types/navigation';
import { ResumeIconLink, renderMetricResult, splitMetricText } from './resume/resumeFormatting';

export function ResumePage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="resume-page" id="top">
        <article className="resume-document" aria-labelledby="resume-title">
          <p className="resume-updated">Last Update : {resumeInfo.lastUpdated}</p>

          <header className="resume-document-header">
            <div>
              <p className="resume-greeting">안녕하세요.</p>
              <h1 id="resume-title">
                {resumeInfo.title}
                <br />
                {resumeInfo.name}입니다.
              </h1>
              <div className="resume-statement">
                {resumeInfo.statement.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="resume-photo-frame">
              <img src={resumeInfo.photo} alt={`${resumeInfo.name} 프로필 사진`} />
            </div>
          </header>

          <dl className="resume-profile-list" aria-label="이력서 기본 정보">
            <div>
              <dt>이메일</dt>
              <dd>
                <a
                  className="resume-text-link"
                  href={`mailto:${resumeInfo.contact}`}
                  onClick={() => trackAnalyticsEvent('email_click', { link_location: 'resume' })}
                >
                  {resumeInfo.contact}
                </a>
              </dd>
            </div>
            {resumeInfo.channels.map((channel) => {
              const eventName = channel.label === 'GitHub' ? 'github_click' : 'tech_blog_click';

              return (
                <div key={channel.label}>
                  <dt>{channel.label}</dt>
                  <dd>
                    <a
                      className="resume-text-link"
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${channel.label} 바로가기`}
                      onClick={() => trackAnalyticsEvent(eventName, { link_location: 'resume' })}
                    >
                      {channel.value}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>

          <section className="resume-document-section" aria-labelledby="resume-skills-title">
            <h2 id="resume-skills-title">기술 스택</h2>
            <div className="resume-skill-lines">
              {resumeInfo.skills.map((group) => (
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

          <section className="resume-document-section" aria-labelledby="resume-introduction-title">
            <h2 id="resume-introduction-title">자기 소개</h2>
            <div className="resume-paragraph-stack">
              {resumeIntroduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="resume-document-section" aria-labelledby="resume-experience-title">
            <h2 id="resume-experience-title">업무 경험</h2>

            <div className="resume-job-list">
              {resumeExperiences.map((job) => (
                <article className="resume-job-card" key={`${job.company}-${job.period}`}>
                  <div className="resume-job-header">
                    <h3>
                      <span>{job.company}</span>
                      {job.companyHref ? (
                        <ResumeIconLink href={job.companyHref} label={`${job.company} 웹사이트 바로가기`} />
                      ) : null}
                    </h3>
                    <p>{job.role}</p>
                    <time>{job.period}</time>
                  </div>

                  <ul className="resume-responsibility-list" aria-label={`${job.company} 주요 업무`}>
                    {job.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-document-section" aria-labelledby="resume-performance-title">
            <h2 id="resume-performance-title">주요 성과</h2>

            <div className="resume-highlight-list">
              {resumeExperiences.map((job) => (
                <article className="resume-highlight-company" key={`${job.company}-${job.period}-highlights`}>
                  <header className="resume-highlight-company-header">
                    <h3>{job.company}</h3>
                    <p>
                      {job.role} · {job.period}
                    </p>
                  </header>

                  <div className="resume-highlight-card-list">
                    {job.highlights.map((highlight) => (
                      <article className="resume-highlight-card" key={highlight.title}>
                        <header>
                          <h4>{highlight.title}</h4>
                          <p>{highlight.category}</p>
                        </header>
                        <div className="resume-highlight-block">
                          <ul
                            className={`resume-metric-list${
                              highlight.metrics.some((metric) => metric.includes(': '))
                                ? ' resume-metric-list--performance'
                                : ''
                            }`}
                          >
                            {highlight.metrics.map((metric) => {
                              const splitMetric = splitMetricText(metric, highlight.title);

                              return splitMetric.result ? (
                                <li className="resume-metric-split" key={metric}>
                                  <span>{splitMetric.label}</span>
                                  <strong className="resume-metric-result">{renderMetricResult(splitMetric.result)}</strong>
                                </li>
                              ) : (
                                <li key={metric}>{metric}</li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="resume-highlight-block resume-highlight-approach">
                          <ul className="resume-detail-list">
                            {highlight.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="tech-list resume-tech-list">
                          {highlight.keywords.map((keyword) => (
                            <span key={keyword}>{keyword}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-document-section" aria-labelledby="resume-additional-title">
            <h2 id="resume-additional-title">부가 정보</h2>

            <div className="resume-detail-grid">
              {additionalDetails.map((group) => (
                <article className="resume-detail-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div>
                    {group.items.map((item) => (
                      <section key={`${group.title}-${item.title}`} className="resume-detail-item">
                        <h4>
                          <span>{item.title}</span>
                          {item.href ? <ResumeIconLink href={item.href} label={`${item.title} 링크 열기`} /> : null}
                        </h4>
                        {item.meta ? <p className="resume-detail-meta">{item.meta}</p> : null}
                        {item.period ? <time>{item.period}</time> : null}
                        {item.details?.map((detail) => (
                          <p key={detail}>{detail}</p>
                        ))}
                      </section>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
