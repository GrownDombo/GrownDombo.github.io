import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, FileText, Github, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { AnalyticsNotice } from '../components/AnalyticsNotice';
import { SiteHeader } from '../components/SiteHeader';
import { WorkCaseCard } from '../components/WorkCaseCard';
import { experiences, metrics, profile, projects, skillGroups } from '../data/portfolio';
import { resumeInfo } from '../data/resume';
import { portfolioRailItems } from '../data/navigation';
import { workCaseCards } from '../data/workCaseCards';
import { trackAnalyticsEvent } from '../analytics/google';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { resumePath } from '../routes/paths';
import type { InternalNavigate, ThemeMode } from '../types/navigation';

const portfolioSectionIds = portfolioRailItems.map((item) => item.id);

type PortfolioMetric = (typeof metrics)[number];

type ImpactBaseCard = {
  metric: PortfolioMetric | undefined;
  resultLabel: string;
  graphLabel: string;
  before: string;
  after: string;
};

type ImpactMeterCard = ImpactBaseCard & {
  variant?: 'meter';
  fill: number;
};

type ImpactRangeCard = ImpactBaseCard & {
  variant: 'range';
};

type ImpactChartCard = ImpactMeterCard | ImpactRangeCard;

export function PortfolioHome({
  onNavigate,
  themeMode,
  onThemeToggle,
}: {
  onNavigate: InternalNavigate;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}) {
  const prioritizedWorkCaseCards = [...workCaseCards].sort((left, right) => {
    return (left.priority ?? Number.MAX_SAFE_INTEGER) - (right.priority ?? Number.MAX_SAFE_INTEGER);
  });
  const prioritizedProjects = [...projects].sort((left, right) => {
    return (left.priority ?? Number.MAX_SAFE_INTEGER) - (right.priority ?? Number.MAX_SAFE_INTEGER);
  });
  const roiSpeedMetric = metrics.find((metric) => metric.label === 'Gerber-Part ROI 매칭 시간 단축');
  const shortcutScopeMetric = metrics.find((metric) => metric.label === '단축키 기능 확장 및 리팩터링');
  const issueMetric = metrics.find((metric) => metric.label === '장애 이슈 등록 건수 감소');
  const remoteIoMetric = metrics.find((metric) => metric.label === '원격 공유 폴더 I/O 처리 시간 단축');
  const visibleWorkCaseCards = prioritizedWorkCaseCards.slice(0, 2);
  const additionalWorkCaseCards = prioritizedWorkCaseCards.slice(2);
  const visibleProjects = prioritizedProjects.slice(0, 3);
  const additionalProjects = prioritizedProjects.slice(3);
  const impactChartCards: ImpactChartCard[] = [
    {
      metric: roiSpeedMetric,
      resultLabel: '개선율',
      graphLabel: '약 99%',
      before: '6분 22초',
      after: '3.5초',
      fill: 99,
    },
    {
      metric: issueMetric,
      resultLabel: '감소율',
      graphLabel: '약 70%',
      before: '수정 전 6개월',
      after: '수정 후 6개월',
      fill: 70,
    },
    {
      metric: shortcutScopeMetric,
      resultLabel: '지원 범위',
      graphLabel: '',
      before: '28개 단일키',
      after: '전체 키 + 조합키',
      variant: 'range',
    },
  ];
  const additionalImpactChartCards: ImpactChartCard[] = remoteIoMetric
    ? [
        {
          metric: remoteIoMetric,
          resultLabel: '단축률',
          graphLabel: '약 90%',
          before: '약 32초',
          after: '3초대',
          fill: 90,
        },
      ]
    : [];
  const [showAdditionalMetrics, setShowAdditionalMetrics] = useState(false);
  const [showAdditionalWorkCases, setShowAdditionalWorkCases] = useState(false);
  const [showAdditionalProjects, setShowAdditionalProjects] = useState(false);
  const [activeSection, setActiveSection] = useScrollSpy(portfolioSectionIds);
  const contentRef = useRef<HTMLDivElement>(null);
  const profileCardDetails = [
    {
      label: 'Email',
      value: resumeInfo.contact,
      href: `mailto:${resumeInfo.contact}`,
      icon: Mail,
      eventName: 'email_click' as const,
    },
    {
      label: 'GitHub',
      value: 'GrownDombo',
      href: 'https://github.com/GrownDombo',
      icon: Github,
      eventName: 'github_click' as const,
    },
    {
      label: 'Tech Blog',
      value: 'Tech Blog',
      href: 'https://growndombo.tistory.com',
      icon: FileText,
      eventName: 'tech_blog_click' as const,
    },
  ];

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader
        onNavigate={onNavigate}
        themeMode={themeMode}
        onThemeToggle={onThemeToggle}
        isDashboardHeader
      />

      <main className="portfolio-home-main" id="top">
        <div className="portfolio-home-layout">
          <aside className="portfolio-profile-card" aria-label="프로필 요약 카드">
              <div className="portfolio-profile-photo">
                <img src={resumeInfo.photo} alt={`${resumeInfo.name} 프로필 사진`} />
              </div>
              <h2>
                <span>{resumeInfo.name}</span>
                <span>GrownDombo</span>
              </h2>
              <p>{profile.role}</p>
              <dl className="portfolio-profile-detail-list">
                {profileCardDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <dt>
                        <Icon size={17} aria-hidden="true" strokeWidth={2.2} />
                        <span>{item.label}</span>
                      </dt>
                      <dd>
                        <a
                          href={item.href}
                          onClick={() => trackAnalyticsEvent(item.eventName, { link_location: 'hero' })}
                        >
                          {item.value}
                        </a>
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <Link
                className="portfolio-profile-resume"
                to={resumePath}
                onClick={(event) => {
                  trackAnalyticsEvent('resume_click', { link_location: 'hero' });
                  onNavigate(event, resumePath);
                }}
              >
                View Resume
              </Link>
            </aside>
          <div className="portfolio-home-content" ref={contentRef}>
            <section className="hero-section portfolio-hero" id="about" aria-labelledby="hero-title">
              <div className="hero-copy">
                <p className="eyebrow">
                  <Sparkles size={16} aria-hidden="true" />
                  {profile.availability}
                </p>
                <h1 id="hero-title">{profile.headline}</h1>
                <p className="hero-summary">{profile.summary}</p>
                <div className="hero-focus-list" aria-label="핵심 작업 영역">
                  <span>C#/.NET</span>
                  <span>AOI 성능 최적화</span>
                  <span>MES·SECS-GEM</span>
                  <span>WinForms/C++ 유지보수</span>
                </div>
              </div>
            </section>

        <section className="metrics-section" id="metrics" aria-labelledby="metrics-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Performance</p>
              <h2 id="metrics-title">정량 성과</h2>
            </div>
          </div>
          <div className="impact-meter-grid" aria-label="정량 성과 도식">
            {impactChartCards.map((card) => {
              const cardContent = (
                <>
                  <div className="impact-meter-copy">
                    <h3>{card.metric?.label}</h3>
                  </div>
                  <div
                    className="impact-meter-visual"
                    aria-label={`${card.metric?.label} ${card.resultLabel} ${card.graphLabel}`}
                  >
                    {card.variant === 'range' ? (
                      <>
                        <div className="impact-meter-row impact-meter-row--range">
                          <span>{card.resultLabel}</span>
                          {card.graphLabel ? <strong>{card.graphLabel}</strong> : null}
                        </div>
                        <div className="impact-range-flow" aria-hidden="true">
                          <span className="impact-range-node impact-range-node--before">
                            <em>Before</em>
                            <b>{card.before}</b>
                          </span>
                          <i>→</i>
                          <span className="impact-range-node impact-range-node--after">
                            <em>After</em>
                            <b>{card.after}</b>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="impact-meter-row">
                          <span>{card.resultLabel}</span>
                          <strong>{card.graphLabel}</strong>
                        </div>
                        <div className="impact-meter-track" aria-hidden="true">
                          <span style={{ width: `${card.fill}%` }} />
                        </div>
                        <div className="impact-meter-labels">
                          <span>
                            <b>Before</b>
                            {card.before}
                          </span>
                          <span>
                            <b>After</b>
                            {card.after}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              );

              return card.metric?.evidence ? (
                <Link
                  className="impact-meter-card impact-meter-card--link"
                  to={card.metric.evidence.href}
                  key={card.metric.label}
                  onClick={(event) => onNavigate(event, card.metric!.evidence!.href)}
                >
                  {cardContent}
                  <span className="impact-meter-link-icon" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={2.2} />
                  </span>
                </Link>
              ) : (
                <article className="impact-meter-card" key={card.metric?.label ?? card.resultLabel}>
                  {cardContent}
                </article>
              );
            })}
          </div>
          {additionalImpactChartCards.length > 0 ? (
            <>
              {showAdditionalMetrics ? (
                <div className="impact-meter-grid impact-meter-grid--extra" id="additional-metrics">
                  {additionalImpactChartCards.map((card) => {
                    const metric = card.metric;

                    if (!metric) {
                      return null;
                    }

                    const cardContent = (
                      <>
                        <div className="impact-meter-copy">
                          <h3>{metric.label}</h3>
                        </div>
                        <div
                          className="impact-meter-visual"
                          aria-label={`${metric.label} ${card.resultLabel} ${card.graphLabel}`}
                        >
                          {card.variant === 'range' ? (
                            <>
                              <div className="impact-meter-row impact-meter-row--range">
                                <span>{card.resultLabel}</span>
                                {card.graphLabel ? <strong>{card.graphLabel}</strong> : null}
                              </div>
                              <div className="impact-range-flow" aria-hidden="true">
                                <span className="impact-range-node impact-range-node--before">
                                  <em>Before</em>
                                  <b>{card.before}</b>
                                </span>
                                <i>→</i>
                                <span className="impact-range-node impact-range-node--after">
                                  <em>After</em>
                                  <b>{card.after}</b>
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="impact-meter-row">
                                <span>{card.resultLabel}</span>
                                <strong>{card.graphLabel}</strong>
                              </div>
                              <div className="impact-meter-track" aria-hidden="true">
                                <span style={{ width: `${card.fill}%` }} />
                              </div>
                              <div className="impact-meter-labels">
                                <span>
                                  <b>Before</b>
                                  {card.before}
                                </span>
                                <span>
                                  <b>After</b>
                                  {card.after}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    );

                    return metric.evidence ? (
                      <Link
                        className="impact-meter-card impact-meter-card--link"
                        to={metric.evidence.href}
                        key={metric.label}
                        onClick={(event) => onNavigate(event, metric.evidence!.href)}
                      >
                        {cardContent}
                        <span className="impact-meter-link-icon" aria-hidden="true">
                          <ArrowUpRight size={18} strokeWidth={2.2} />
                        </span>
                      </Link>
                    ) : (
                      <article className="impact-meter-card" key={metric.label}>
                        {cardContent}
                      </article>
                    );
                  })}
                </div>
              ) : null}
              <div className="section-disclosure">
                <button
                  className="section-disclosure-button"
                  type="button"
                  aria-expanded={showAdditionalMetrics}
                  aria-controls="additional-metrics"
                  onClick={() => setShowAdditionalMetrics((current) => !current)}
                >
                  {showAdditionalMetrics ? '추가 성과 접기' : '추가 성과 보기'}
                  {showAdditionalMetrics ? (
                    <ChevronUp size={16} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </>
          ) : null}
        </section>

        <section className="section" id="work-cases" aria-labelledby="work-cases-title">
          <div className="section-heading work-cases-heading">
            <div>
              <p className="section-kicker">Work Impact</p>
              <h2 id="work-cases-title">핵심 업무 성과</h2>
              <p className="section-heading-copy">
                제조 장비 SW에서 성능 최적화, 생산 연동 안정화, 운영 응답성 고도화를 정량 지표로 검증한 프로젝트
              </p>
            </div>
          </div>

          <div className="case-study-list">
            {(showAdditionalWorkCases ? prioritizedWorkCaseCards : visibleWorkCaseCards).map((caseData) => (
              <WorkCaseCard caseData={caseData} onNavigate={onNavigate} key={caseData.title} />
            ))}
          </div>
          {additionalWorkCaseCards.length > 0 ? (
            <div className="section-disclosure">
              <button
                className="section-disclosure-button"
                type="button"
                aria-expanded={showAdditionalWorkCases}
                aria-controls="work-cases"
                onClick={() => setShowAdditionalWorkCases((current) => !current)}
              >
                {showAdditionalWorkCases ? '추가 성과 접기' : '추가 성과 보기'}
                {showAdditionalWorkCases ? (
                  <ChevronUp size={16} aria-hidden="true" />
                ) : (
                  <ChevronDown size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          ) : null}
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading projects-heading">
            <div>
              <p className="section-kicker">GitHub Projects</p>
              <h2 id="projects-title">개인 GitHub 프로젝트</h2>
              <p className="section-heading-copy">공개 코드, 설계 구조, 완성도를 확인할 수 있는 개인 프로젝트</p>
            </div>
          </div>

          <div className="project-grid compact-project-grid" id="project-list">
            {(showAdditionalProjects ? prioritizedProjects : visibleProjects).map((project) => (
              <article className="project-card compact-project-card" key={project.title}>
                {project.detailPath && project.detailMode === 'document' ? (
                  <a
                    className="project-image-wrap project-image-link"
                    href={project.detailPath}
                    aria-label={`${project.title} 상세 페이지 보기`}
                  >
                    <img src={project.image} alt={`${project.title} 썸네일`} loading="lazy" />
                    <span>{project.status}</span>
                  </a>
                ) : project.detailPath ? (
                  <Link
                    className="project-image-wrap project-image-link"
                    to={project.detailPath}
                    aria-label={`${project.title} 상세 페이지 보기`}
                    onClick={(event) => onNavigate(event, project.detailPath!)}
                  >
                    <img src={project.image} alt={`${project.title} 썸네일`} loading="lazy" />
                    <span>{project.status}</span>
                  </Link>
                ) : (
                  <div className="project-image-wrap">
                    <img src={project.image} alt={`${project.title} 썸네일`} loading="lazy" />
                    <span>{project.status}</span>
                  </div>
                )}
                <div className="project-content">
                  <div>
                    <p className="project-role">{project.role}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {additionalProjects.length > 0 ? (
            <div className="section-disclosure">
              <button
                className="section-disclosure-button"
                type="button"
                aria-expanded={showAdditionalProjects}
                aria-controls="project-list"
                onClick={() => setShowAdditionalProjects((current) => !current)}
              >
                {showAdditionalProjects ? '추가 프로젝트 접기' : '추가 프로젝트 보기'}
                {showAdditionalProjects ? (
                  <ChevronUp size={16} aria-hidden="true" />
                ) : (
                  <ChevronDown size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          ) : null}
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 id="experience-title">핵심 경력</h2>
              <p className="section-heading-copy">제조 장비 소프트웨어 개발과 생산 시스템 연동 개선 중심의 경력 요약</p>
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
              <p className="section-heading-copy">실무 개선 사례와 개인 프로젝트에서 활용한 기술의 영역별 분류</p>
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
        <AnalyticsNotice />
          </div>
          <nav className="portfolio-section-rail" aria-label="포트폴리오 섹션 바로가기">
            {portfolioRailItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <Link
                  className={isActive ? 'is-active' : undefined}
                  to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                  key={item.id}
                  aria-label={item.label}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => {
                    setActiveSection(item.id);
                    onNavigate(event, item.href);
                  }}
                >
                  <Icon size={18} aria-hidden="true" strokeWidth={2.2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </main>
    </div>
  );
}
