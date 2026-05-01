import { useEffect, useState, type MouseEvent } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Github,
  Mail,
  Sparkles,
} from 'lucide-react';
import {
  experiences,
  metrics,
  profile,
  projects,
  skillGroups,
  type ProfileLink,
} from './data/portfolio';
import { additionalDetails, resumeExperiences, resumeInfo, resumeIntroduction } from './data/resume';
import { trackAnalyticsEvent } from './analytics/google';

const resumePath = '/resume';

const navItems = [
  { label: '성과', href: '#metrics' },
  { label: '경험', href: '#experience' },
  { label: '기술', href: '#skills' },
  { label: '프로젝트', href: '#projects' },
];

const linkIcons: Record<ProfileLink['kind'], typeof Github> = {
  github: Github,
  email: Mail,
  blog: FileText,
  resume: FileText,
};

const linkEvents: Partial<Record<ProfileLink['kind'], 'github_click' | 'tech_blog_click' | 'email_click'>> = {
  github: 'github_click',
  blog: 'tech_blog_click',
  email: 'email_click',
};

function AnalyticsNotice() {
  return <p className="analytics-notice">이 사이트는 방문 통계 분석을 위해 Google Analytics를 사용합니다.</p>;
}

type InternalNavigate = (event: MouseEvent<HTMLAnchorElement>, path: string) => void;

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey;
}

function splitMetricText(metric: string, highlightTitle: string) {
  const separatorIndex = metric.indexOf(': ');

  if (separatorIndex >= 0) {
    return {
      label: metric.slice(0, separatorIndex),
      result: metric.slice(separatorIndex + 2),
    };
  }

  if (highlightTitle === '생산 시스템 연동 기능 개발·유지보수 및 구조 개선') {
    const splitMap: Record<string, { label: string; result: string }> = {
      '장애 이슈 관련 메일 전분기 대비 약 70% 감소': {
        label: '장애 이슈 관련 메일 발생량 감소',
        result: '전분기 대비 약 70% 감소',
      },
      '운영 구조 표준화로 장애 대응 시간 약 40% 단축': {
        label: '운영 구조 표준화 후 장애 대응 시간 단축',
        result: '약 40% 단축',
      },
      '10개 이상 신규 고객사 생산 시스템 연동 시나리오 개발': {
        label: '신규 고객사 유치 및 생산 시스템 연동',
        result: '시나리오 10개 이상 개발',
      },
    };

    return splitMap[metric] ?? { label: metric, result: '' };
  }

  if (highlightTitle === 'MSSQL 기반 검사 이력 관리 시스템 개발') {
    const splitMap: Record<string, { label: string; result: string }> = {
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

  if (highlightTitle === '검출 영역 기반 외곽 폴리곤 추출 기능 개발') {
    const splitMap: Record<string, { label: string; result: string }> = {
      '고객사 장비 구입 조건으로 제시된 기능을 개발해 약 8억 원 매출에 기여': {
        label: '검출 영역 기반 외곽 폴리곤 추출 기능 개발',
        result: '약 8억 원 규모 장비 수주에 기여',
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

function ResumeIconLink({
  href,
  label,
  onClick,
  isExternal = true,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  isExternal?: boolean;
}) {
  const externalProps = isExternal ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <a className="resume-icon-link" href={href} aria-label={label} onClick={onClick} {...externalProps}>
      <ArrowUpRight size={12} aria-hidden="true" strokeWidth={2.2} />
    </a>
  );
}

function renderMetricResult(result: string) {
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

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const resumeLink = profile.links.find((link) => link.kind === 'resume');

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(getCurrentPath());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleInternalNavigate: InternalNavigate = (event, path) => {
    if (!isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, '', path);
    setCurrentPath(getCurrentPath());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === resumePath) {
    return <ResumePage onNavigate={handleInternalNavigate} />;
  }

  return <PortfolioHome resumeLink={resumeLink} onNavigate={handleInternalNavigate} />;
}

function SiteHeader({
  isResumePage = false,
  onNavigate,
}: {
  isResumePage?: boolean;
  onNavigate: InternalNavigate;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="GrownDombo 포트폴리오 홈" onClick={(event) => onNavigate(event, '/')}>
        <span className="brand-mark">GD</span>
        <span>{profile.name}</span>
      </a>
      <nav className="nav-links" aria-label="주요 섹션">
        {navItems.map((item) => (
          <a key={item.href} href={isResumePage ? `/${item.href}` : item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function PortfolioHome({
  resumeLink,
  onNavigate,
}: {
  resumeLink?: ProfileLink;
  onNavigate: InternalNavigate;
}) {
  return (
    <div className="site-shell">
      <SiteHeader onNavigate={onNavigate} />

      <main id="top">
        <section className="hero-section compact-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              {profile.availability}
            </p>
            <h1 id="hero-title">{profile.headline}</h1>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-meta" aria-label="프로필 요약">
              <span>
                <BriefcaseBusiness size={17} aria-hidden="true" />
                {profile.role}
              </span>
            </div>
            <div className="hero-actions">
              {resumeLink ? (
                <a
                  className="button primary"
                  href={resumePath}
                  onClick={(event) => {
                    trackAnalyticsEvent('resume_click', { link_location: 'hero' });
                    onNavigate(event, resumePath);
                  }}
                >
                  이력서 보기
                  <FileText size={18} aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div className="hero-channel-links" aria-label="프로필 채널">
              {profile.links
                .filter((link) => link.kind !== 'resume')
                .map((link) => {
                  const Icon = linkIcons[link.kind];
                  const eventName = linkEvents[link.kind];

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        if (eventName) {
                          trackAnalyticsEvent(eventName, { link_location: 'hero' });
                        }
                      }}
                    >
                      <Icon size={17} aria-hidden="true" />
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  );
                })}
            </div>
          </div>
        </section>

        <section className="metrics-section" id="metrics" aria-labelledby="metrics-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Performance</p>
              <h2 id="metrics-title">숫자로 남긴 개선</h2>
            </div>
          </div>
          <div className="impact-strip">
            {metrics.map((metric) => (
              <article className="impact-item" key={metric.label}>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 id="experience-title">핵심 경력</h2>
            </div>
          </div>
          <ol className="experience-timeline">
            {experiences.map((item) => (
              <li className="experience-timeline-item" key={`${item.period}-${item.title}`}>
                <div className="timeline-period">
                  <time>{item.period}</time>
                </div>
                <span className="timeline-marker" aria-hidden="true" />
                <article className="timeline-content">
                  <span className="timeline-company">{item.organization}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <div className="tech-list" aria-label={`${item.title} 기술 키워드`}>
                    {item.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Skills</p>
              <h2 id="skills-title">기술 스택</h2>
            </div>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading projects-heading">
            <div>
              <p className="section-kicker">Projects</p>
              <h2 id="projects-title">GitHub 프로젝트</h2>
            </div>
          </div>

          <div className="project-grid compact-project-grid">
            {projects.map((project) => (
              <article className="project-card compact-project-card" key={project.title}>
                <div className="project-image-wrap">
                  <img src={project.image} alt={`${project.title} 썸네일`} />
                  <span>{project.status}</span>
                </div>
                <div className="project-content">
                  <div>
                    <p className="project-role">{project.role}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <div className="tech-list project-tech-list" aria-label={`${project.title} 기술 스택`}>
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a key={link.label} href={link.href} aria-label={`${project.title} ${link.label}`}>
                        {link.label}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <AnalyticsNotice />
      </main>
    </div>
  );
}

function ResumePage({ onNavigate }: { onNavigate: InternalNavigate }) {
  return (
    <div className="site-shell">
      <SiteHeader isResumePage onNavigate={onNavigate} />

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
                              highlight.title === '병목 구간 분석 및 처리 성능 개선' ||
                              highlight.title === '생산 시스템 연동 기능 개발·유지보수 및 구조 개선' ||
                              highlight.title === 'MSSQL 기반 검사 이력 관리 시스템 개발' ||
                              highlight.title === '검출 영역 기반 외곽 폴리곤 추출 기능 개발' ||
                              highlight.title === '지도 API 연동 및 지도·검색 기능 개발'
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

export default App;
