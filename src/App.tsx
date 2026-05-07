import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  FileText,
  FolderKanban,
  Github,
  Mail,
  Moon,
  Sparkles,
  Sun,
  UserRound,
} from 'lucide-react';
import {
  experiences,
  metrics,
  profile,
  projects,
  skillGroups,
  workCaseStudies,
  type Project,
} from './data/portfolio';
import { additionalDetails, resumeExperiences, resumeInfo, resumeIntroduction } from './data/resume';
import { trackAnalyticsEvent } from './analytics/google';

const resumePath = '/resume';
const excelConditionPainterPath = '/projects/excel-condition-painter';
const cpuMemoryStressTestPath = '/projects/cpu-memory-stress-test';
const rfidCollisionSearchSimulatorPath = '/projects/rfid-collision-search-simulator';
const industrialAoiPlatformPath = '/projects/industrial-aoi-platform';
const industrialAoiInspectionAutomationPath = '/projects/industrial-aoi-platform/inspection-automation';
const industrialAoiProductionIntegrationPath = '/projects/industrial-aoi-platform/production-integration';
const industrialAoiOperationFlowPath = '/projects/industrial-aoi-platform/operation-flow';

const industrialAoiAreaRoutes: Record<string, string> = {
  'inspection-automation': industrialAoiInspectionAutomationPath,
  'production-integration': industrialAoiProductionIntegrationPath,
  'operation-flow': industrialAoiOperationFlowPath,
};

const industrialAoiRouteAreaIds: Record<string, string> = {
  [industrialAoiInspectionAutomationPath]: 'inspection-automation',
  [industrialAoiProductionIntegrationPath]: 'production-integration',
  [industrialAoiOperationFlowPath]: 'operation-flow',
};

const gerberPartMatchingMockups = [
  {
    title: 'Module / Part View',
    image: '/assets/aoi-gerber-part-matching/module-part-fiducial-aligned.png',
    description: 'Red: Module area · Green: Part ROI',
    legend: [
      { label: 'Module area', tone: 'red' },
      { label: 'Part ROI', tone: 'green' },
    ],
  },
  {
    title: 'Gerber View',
    image: '/assets/aoi-gerber-part-matching/gerber-aligned.png',
    description: 'Gerber ROI 기준 Part Window ROI 후보 확인 화면',
    legend: [
      { label: 'Gerber ROI', tone: 'pink' },
    ],
  },
];

const gerberPartPerformanceSummary = {
  before: '~6m 20s',
  after: '~3s',
  reduction: '99%+',
};

const gerberPartPerformanceScale = [
  { label: 'Modules', value: '약 270개' },
  { label: 'Part Window ROI', value: '약 7만 개' },
  { label: 'Gerber ROI', value: '약 39만 개' },
];

const gerberPartMeasurementNotes = [
  '동일 조건에서 Start/End 로그 타임스탬프 차이로 처리 시간 산출',
  '각 단계별 2회 실행 후 평균값 기준 비교',
  '개선 전 평균 6분 22.711초에서 최종 평균 3.5155초로 단축',
];

const gerberPartPerformanceMethods = [
  {
    title: '기존 구조',
    points: ['Part Window ROI마다 전체 Gerber ROI를 반복 비교', 'Part Window ROI 수와 Gerber 수 증가 시 비교 횟수 급증'],
  },
  {
    title: '개선 구조',
    points: ['Module별 Gerber 후보를 먼저 계산', 'Part Window ROI는 해당 Module 후보 Gerber와만 비교', 'Gerber ROI 변환 결과를 캐싱해 동일 계산 반복 감소'],
  },
];

const navItems = [
  { label: '성과', href: '#metrics' },
  { label: '업무 사례', href: '#work-cases' },
  { label: 'GitHub', href: '#projects' },
  { label: '경험', href: '#experience' },
  { label: '기술', href: '#skills' },
];

const portfolioRailItems = [
  { id: 'about', label: 'About', href: '#about', icon: UserRound },
  { id: 'metrics', label: 'Impact', href: '#metrics', icon: FileText },
  { id: 'work-cases', label: 'Work', href: '#work-cases', icon: FolderKanban },
  { id: 'projects', label: 'GitHub', href: '#projects', icon: Github },
  { id: 'experience', label: 'Experience', href: '#experience', icon: CalendarDays },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Code2 },
];

function AnalyticsNotice() {
  return <p className="analytics-notice">이 사이트는 방문 통계 분석을 위해 Google Analytics를 사용합니다.</p>;
}

type InternalNavigate = (event: MouseEvent<HTMLAnchorElement>, path: string) => void;
type ThemeMode = 'light' | 'dark';
type ThemedPageProps = {
  onNavigate: InternalNavigate;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
};

const themeStorageKey = 'growndombo-theme';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (isThemeMode(storedTheme)) {
      return storedTheme;
    }
  } catch {
    return 'light';
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

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
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(getCurrentPath());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (currentPath !== industrialAoiPlatformPath) {
      return;
    }

    window.history.replaceState(null, '', '/#projects');
    setCurrentPath(getCurrentPath());
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 0);
  }, [currentPath]);

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, themeMode);
    } catch {
      // Theme persistence is optional; the UI still works without storage access.
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleInternalNavigate: InternalNavigate = (event, path) => {
    if (!isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, '', path);
    setCurrentPath(getCurrentPath());
    window.setTimeout(() => {
      const hash = path.split('#')[1];

      if (hash) {
        if (hash === 'about') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  if (currentPath === resumePath) {
    return <ResumePage onNavigate={handleInternalNavigate} />;
  }

  const industrialAoiSelectedAreaId = industrialAoiRouteAreaIds[currentPath];

  if (industrialAoiSelectedAreaId) {
    return (
      <IndustrialAOIPlatformProjectPage
        onNavigate={handleInternalNavigate}
        themeMode={themeMode}
        onThemeToggle={toggleThemeMode}
        selectedAreaId={industrialAoiSelectedAreaId}
      />
    );
  }

  if (currentPath === excelConditionPainterPath) {
    return (
      <ExcelConditionPainterProjectPage
        onNavigate={handleInternalNavigate}
        themeMode={themeMode}
        onThemeToggle={toggleThemeMode}
      />
    );
  }

  if (currentPath === cpuMemoryStressTestPath) {
    return (
      <CPUMemoryStressTestProjectPage
        onNavigate={handleInternalNavigate}
        themeMode={themeMode}
        onThemeToggle={toggleThemeMode}
      />
    );
  }

  if (currentPath === rfidCollisionSearchSimulatorPath) {
    return (
      <RFIDCollisionSearchSimulatorProjectPage
        onNavigate={handleInternalNavigate}
        themeMode={themeMode}
        onThemeToggle={toggleThemeMode}
      />
    );
  }

  return (
    <PortfolioHome
      onNavigate={handleInternalNavigate}
      themeMode={themeMode}
      onThemeToggle={toggleThemeMode}
    />
  );
}

function SiteHeader({
  isResumePage = false,
  onNavigate,
  themeMode,
  onThemeToggle,
  isDashboardHeader = false,
}: {
  isResumePage?: boolean;
  onNavigate: InternalNavigate;
  themeMode?: ThemeMode;
  onThemeToggle?: () => void;
  isDashboardHeader?: boolean;
}) {
  const nextThemeLabel = themeMode === 'dark' ? '라이트 모드로 보기' : '다크 모드로 보기';

  return (
    <header className={`site-header${isDashboardHeader ? ' site-header--dashboard' : ''}`}>
      <a className="brand" href="/" aria-label="GrownDombo 포트폴리오 홈" onClick={(event) => onNavigate(event, '/')}>
        <span className="brand-mark">GD</span>
        <span>{isDashboardHeader ? 'Portfolio' : profile.name}</span>
      </a>
      <div className="site-header-actions">
        <nav className="nav-links" aria-label="주요 섹션">
          {navItems.map((item) => (
            <a key={item.href} href={isResumePage ? `/${item.href}` : item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        {themeMode && onThemeToggle ? (
          <button className="theme-toggle" type="button" aria-label={nextThemeLabel} onClick={onThemeToggle}>
            {themeMode === 'dark' ? (
              <Sun size={17} aria-hidden="true" strokeWidth={2.2} />
            ) : (
              <Moon size={17} aria-hidden="true" strokeWidth={2.2} />
            )}
          </button>
        ) : null}
      </div>
    </header>
  );
}

function PortfolioHome({
  onNavigate,
  themeMode,
  onThemeToggle,
}: {
  onNavigate: InternalNavigate;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}) {
  const prioritizedWorkCaseStudies = [...workCaseStudies].sort((left, right) => {
    return (left.priority ?? Number.MAX_SAFE_INTEGER) - (right.priority ?? Number.MAX_SAFE_INTEGER);
  });
  const prioritizedProjects = [...projects].sort((left, right) => {
    return (left.priority ?? Number.MAX_SAFE_INTEGER) - (right.priority ?? Number.MAX_SAFE_INTEGER);
  });
  const [activeSection, setActiveSection] = useState(portfolioRailItems[0].id);
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

  useEffect(() => {
    const updateActiveSection = () => {
      const anchorY = Math.min(150, window.innerHeight * 0.18);
      let nextActiveSection = portfolioRailItems[0].id;

      for (const item of portfolioRailItems) {
        const sectionElement = document.getElementById(item.id);

        if (!sectionElement) {
          continue;
        }

        if (sectionElement.getBoundingClientRect().top <= anchorY) {
          nextActiveSection = item.id;
        }
      }

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

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
              <a
                className="portfolio-profile-resume"
                href={resumePath}
                onClick={(event) => {
                  trackAnalyticsEvent('resume_click', { link_location: 'hero' });
                  onNavigate(event, resumePath);
                }}
              >
                View Resume
              </a>
            </aside>
          <div className="portfolio-home-content" ref={contentRef}>
            <section className="hero-section portfolio-hero" id="about" aria-labelledby="hero-title">
              <div className="hero-copy">
                <p className="eyebrow">
                  <Sparkles size={16} aria-hidden="true" />
                  {profile.availability}
                </p>
                <h1 id="hero-title">{profile.headline}</h1>
                <p className="hero-summary">
                  제조라인 장비 소프트웨어를 개발하며, 복잡한 운영 흐름을 읽기 쉬운 구조와 안정적인 동작으로 정리합니다.
                </p>
                <div className="hero-focus-list" aria-label="핵심 작업 영역">
                  <span>Windows App</span>
                  <span>공정 자동화</span>
                  <span>생산 시스템 연동</span>
                  <span>성능 개선</span>
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

        <section className="section" id="work-cases" aria-labelledby="work-cases-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Work Cases</p>
              <h2 id="work-cases-title">업무 사례</h2>
            </div>
          </div>

          <div className="project-grid compact-project-grid work-case-grid">
            {prioritizedWorkCaseStudies.map((project) => (
              <article className="project-card compact-project-card" key={project.title}>
                <a
                  className="project-image-wrap project-image-link"
                  href={project.detailPath}
                  aria-label={`${project.title} 상세 페이지 보기`}
                  onClick={(event) => onNavigate(event, project.detailPath!)}
                >
                  <img src={project.image} alt={`${project.title} 썸네일`} loading="lazy" />
                  <span>{project.status}</span>
                </a>
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
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading projects-heading">
            <div>
              <p className="section-kicker">GitHub Projects</p>
              <h2 id="projects-title">GitHub 프로젝트</h2>
            </div>
          </div>

          <div className="project-grid compact-project-grid">
            {prioritizedProjects.map((project) => (
              <article className="project-card compact-project-card" key={project.title}>
                {project.detailPath ? (
                  <a
                    className="project-image-wrap project-image-link"
                    href={project.detailPath}
                    aria-label={`${project.title} 상세 페이지 보기`}
                    onClick={(event) => {
                      if (project.detailMode !== 'document') {
                        onNavigate(event, project.detailPath!);
                      }
                    }}
                  >
                    <img src={project.image} alt={`${project.title} 썸네일`} loading="lazy" />
                    <span>{project.status}</span>
                  </a>
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
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 id="experience-title">핵심 경력</h2>
              <p className="section-heading-copy">대표 작업이 만들어진 업무 맥락과 맡았던 역할을 함께 정리했습니다.</p>
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
              <p className="section-heading-copy">앞선 작업에서 반복적으로 사용한 기술을 영역별로 묶었습니다.</p>
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
                <a
                  className={isActive ? 'is-active' : undefined}
                  href={item.href}
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
                </a>
              );
            })}
          </nav>
        </div>
      </main>
    </div>
  );
}

function IndustrialAOIPlatformProjectPage({
  onNavigate,
  themeMode,
  onThemeToggle,
  selectedAreaId,
}: ThemedPageProps & {
  selectedAreaId?: string;
}) {
  const representativeProject: Project | undefined = workCaseStudies[0];
  const highlightAreas = [
    {
      id: 'inspection-automation',
      step: '01',
      title: 'AOI Workflow Improvements',
      summary: 'Gerber/Part 매칭, Teaching 화면, 검사 흐름의 장비 내부 구조 개선',
      problem: '검사 대상 매칭과 Teaching 화면 조작 흐름이 복잡해 미매칭 원인과 상태 추적이 어려운 구조',
      actions: [
        'Gerber와 Part/Fiducial 매칭 기준 정리',
        'Teaching 화면과 검사 Window 처리 흐름 보완',
        '기존 검사 결과를 유지하면서 미매칭 항목만 보정하는 흐름 정리',
      ],
      impact: [
        'AOI 내부 매칭 흐름의 추적성 개선',
        '기존 Window 결과를 보존하면서 보정 로직 추가',
        'Teaching 화면 기준 검사 작업 흐름 정리',
      ],
      directions: [
        {
          label: 'Track 01',
          title: 'AOI Matching',
          points: ['Gerber/Part/Fiducial 매칭 기능 개선', 'Module별 Gerber 후보 기반 탐색 범위 축소', '기존 매칭 결과 호환 유지'],
        },
        {
          label: 'Track 02',
          title: 'Teaching / Inspection UI',
          points: ['Teaching 화면 흐름 정리', '검사 Window 상태 관리', '작업자 확인 포인트 개선'],
        },
      ],
      improvements: [
        {
          title: 'Gerber / Part / Fiducial Matching',
          description: 'AOI 내부 매칭 기능을 하나의 흐름으로 통합. Gerber 후보 선별 기반 불필요한 탐색 감소.',
          details: ['Matching flow consolidation', 'Gerber candidate filtering', 'Repeated calculation reduction'],
        },
        {
          title: 'Teaching Screen Flow',
          description: '검사 Window와 Teaching 화면에 필요한 상태 변경 흐름 정리',
          details: ['Window 상태 갱신 보완', '작업자 확인 흐름 단순화'],
        },
      ],
      keywords: ['AOI Workflow', 'Teaching UI', 'Matching Logic', 'C# / C++', 'WinForms'],
    },
    {
      id: 'production-integration',
      step: '02',
      title: 'SECS/GEM · MES · AI Integration',
      summary: 'AOI 장비, 생산 시스템, AI 솔루션 사이의 데이터 연동 흐름 정리',
      problem: 'SECS/GEM, MES, AI 솔루션별 연동 요구 차이로 Job, 검사 결과, AutoTeaching 데이터 흐름 추적이 어려운 구조',
      actions: [
        'SECS/GEM, PEMTOGEM, MES 연동 메시지와 장비 내부 상태 매핑 보완',
        'Job Change, Alarm, 검사 결과 전송 시점을 장비 시퀀스에 맞게 조정',
        'Pembrain AutoTeaching 요청/응답 데이터 구조와 ROI 전달 흐름 정리',
      ],
      directions: [
        {
          label: 'Track 01',
          title: 'Factory System Integration',
          points: ['SECS/GEM 메시지 보완', 'MES Job/Alarm 흐름 정리', '검사 결과 전송 시점 조정'],
        },
        {
          label: 'Track 02',
          title: 'AI Solution Integration',
          points: ['Pembrain AutoTeaching 연동', 'FullMap ROI 전달', 'AI 결과 추적 흐름 정리'],
        },
      ],
      impact: [
        '생산 시스템과 장비 상태 사이의 데이터 정합성 개선',
        'AI 솔루션 연동 데이터의 입력/결과 추적성 개선',
        '고객사별 연동 시나리오 대응 범위 확대',
      ],
      improvements: [
        {
          title: 'SECS/GEM / MES Message Flow',
          description: '상위 생산 시스템과 장비 사이의 상태/결과 메시지를 장비 시퀀스 기준으로 보완',
          details: ['PEMTOGEM 연동 보완', 'Job/Alarm 전송 조건 정리', 'CompanyCode별 요구 처리'],
        },
        {
          title: 'Job Change / Board Metadata',
          description: 'Job 변경 이후 생산 시스템이 필요한 Board/Module 정보를 회신 데이터에 포함',
          details: ['변경 Job 정보 회신', 'Board Size 전송', 'Module Original Position 저장'],
        },
        {
          title: 'Pembrain AutoTeaching Interface',
          description: 'AI 솔루션으로 전달되는 이미지/ROI 데이터와 추론 결과 처리 흐름 정리',
          details: ['AI_ImageData / AI_FOVData 분리', 'FullMap ROI 전달', 'Backup 결과 추적'],
        },
      ],
      keywords: ['Equipment Interface', 'SECS/GEM', 'MES', 'AI Solution', 'TCP/IP'],
    },
    {
      id: 'operation-flow',
      step: '03',
      title: 'Repair & NG Buffer Operations',
      summary: 'Repair 화면, NG Buffer 신호, Rack 상태 갱신, 로그 정리를 하나의 운영 흐름으로 구성',
      problem: 'Repair와 NG Buffer 처리에서 연속 신호, 상/하부 장비 전달, Rack 상태 갱신이 겹칠 때 현장 재현과 원인 추적이 어려운 구조',
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
      keywords: ['Repair Flow', 'NG Buffer', 'Rack State', 'Logging', 'WinForms'],
    },
  ];
  const selectedArea = selectedAreaId ? highlightAreas.find((area) => area.id === selectedAreaId) : undefined;
  const selectedProject = selectedAreaId
    ? workCaseStudies.find((project) => project.detailPath === industrialAoiAreaRoutes[selectedAreaId])
    : undefined;
  const displayedAreas = selectedArea ? [selectedArea] : highlightAreas;
  const pageTitle = selectedArea?.title ?? 'Industrial AOI Platform Work Areas';
  const pageLead =
    selectedArea?.summary ??
    '3D AOI 장비 소프트웨어 개선 내역을 AOI, SECS/GEM·MES·AI 연동, Repair/NG Buffer 운영 기준으로 구성';
  const pageTech = selectedProject?.tech ?? ['C#', 'C++', '.NET Framework', 'WinForms', 'SECS/GEM', 'OpenCV'];
  const heroImage = selectedProject?.image ?? representativeProject?.image ?? '/assets/project-industrial-aoi-platform.svg';
  const guideTitle = selectedArea ? 'Key Contributions' : '3 Work Areas';
  const guideDescription = selectedArea
    ? '대표 개선 항목을 실제 변경 단위로 정리했습니다.'
    : 'Company and customer-specific details are omitted, and the work is grouped by AOI workflow, SECS/GEM · MES · AI integration, and Repair operations.';

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page industrial-aoi-page" id="top">
        <section className="project-detail-hero" aria-labelledby="industrial-aoi-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Work Highlights</p>
            <h1 id="industrial-aoi-title">{pageTitle}</h1>
            <p className="project-detail-lead">{pageLead}</p>
            <div className="tech-list project-detail-tech-list" aria-label={`${pageTitle} 기술 스택`}>
              {pageTech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
          <figure className="project-detail-hero-media industrial-aoi-hero-media">
            <img src={heroImage} alt={`${pageTitle} mock interface`} />
            <figcaption>Mockup</figcaption>
          </figure>
        </section>

        <article className="project-guide industrial-aoi-guide" aria-labelledby="industrial-aoi-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">{selectedArea ? 'Contribution List' : 'Work Areas'}</p>
            <h2 id="industrial-aoi-guide-title">{guideTitle}</h2>
            <p>{guideDescription}</p>
          </header>

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

              {selectedArea && area.id === 'inspection-automation' ? (
                <div className="industrial-aoi-contribution-list">
                <article className="industrial-aoi-matching-section" aria-label="Gerber Part matching details">
                  <span className="industrial-aoi-contribution-label">Contribution 01</span>
                  <div className="industrial-aoi-matching-copy">
                    <h4>Gerber ROI · Part Window ROI 매칭 시퀀스 최적화</h4>
                    <p>
                      동일 데이터 기준 실행 로그로 처리 시간 변화를 검증한 매칭 개선 작업.
                    </p>
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

                  <div className="industrial-aoi-performance-block" aria-label="Gerber matching speed improvement">
                    <div className="industrial-aoi-performance-header">
                      <div>
                        <h5>성능 측정 결과</h5>
                      </div>
                    </div>
                    <div className="industrial-aoi-performance-environment">
                      <strong>측정 환경</strong>
                      <ul className="industrial-aoi-performance-scale" aria-label="Measured input scale">
                        {gerberPartPerformanceScale.map((item) => (
                          <li key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="industrial-aoi-performance-main">
                      <div className="industrial-aoi-performance-metric">
                        <span>개선 전</span>
                        <strong>{gerberPartPerformanceSummary.before}</strong>
                      </div>
                      <div className="industrial-aoi-performance-metric">
                        <span>개선 후</span>
                        <strong>{gerberPartPerformanceSummary.after}</strong>
                      </div>
                      <div className="industrial-aoi-performance-metric industrial-aoi-performance-metric-strong">
                        <span>처리 시간 단축</span>
                        <strong>{gerberPartPerformanceSummary.reduction}</strong>
                      </div>
                    </div>
                    <div className="industrial-aoi-performance-measurement">
                      <strong>측정 방법</strong>
                      <ul>
                        {gerberPartMeasurementNotes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="industrial-aoi-performance-approach">
                      <strong>문제와 개선 방향</strong>
                      <div className="industrial-aoi-performance-methods">
                        {gerberPartPerformanceMethods.map((method) => (
                          <article key={method.title}>
                            <span>{method.title}</span>
                            <ul>
                              {method.points.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>

                </article>
                </div>
              ) : null}

              {area.directions.length === 0 ? (
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

              <div className="tech-list industrial-aoi-keywords" aria-label={`${area.title} 키워드`}>
                {area.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </section>
          ))}
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
function ExcelConditionPainterProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === excelConditionPainterPath);
  const assetPath = '/assets/excel-condition-painter';
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];
  const downloadDescriptions: Record<string, { title: string; description: string }> = {
    'Sample Data': {
      title: 'Sample Data',
      description: '가이드 화면과 같은 흐름으로 테스트해볼 수 있는 주문 데이터 샘플 파일입니다.',
    },
    'Release Download': {
      title: 'Setup',
      description: 'GitHub Releases에서 Windows 실행 파일 또는 설치 패키지를 받을 수 있습니다.',
    },
  };

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page" id="top">
        <section className="project-detail-hero" aria-labelledby="excel-condition-painter-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Project Guide</p>
            <h1 id="excel-condition-painter-title">{project?.title ?? 'ExcelConditionPainter'}</h1>
            <p className="project-detail-lead">
              Excel 주문 데이터를 열고, 조건에 맞는 행과 셀을 색상으로 표시한 뒤 결과 파일로 저장하는
              Windows Forms 보조 도구입니다.
            </p>
            <div className="tech-list project-detail-tech-list" aria-label="ExcelConditionPainter 기술 스택">
              {(project?.tech ?? ['C#', 'WinForms', 'ClosedXML']).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {repositoryLink ? (
              <div className="project-detail-actions">
                <a className="button primary" href={repositoryLink.href} target="_blank" rel="noreferrer">
                  {repositoryLink.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
          <figure className="project-detail-hero-media">
            <img src={`${assetPath}/main-image.png`} alt="ExcelConditionPainter 대표 화면" />
          </figure>
        </section>

        {downloadLinks.length > 0 ? (
          <section className="project-download-section" aria-labelledby="excel-download-title">
            <div className="project-download-copy">
              <p className="section-kicker">Downloads</p>
              <h2 id="excel-download-title">샘플 데이터와 실행 파일</h2>
              <p>가이드 내용을 직접 따라 해볼 수 있는 샘플 파일과 배포 버전을 함께 확인할 수 있습니다.</p>
            </div>
            <div className="project-download-grid">
              {downloadLinks.map((link) => {
                const detail = downloadDescriptions[link.label] ?? {
                  title: link.label,
                  description: '프로젝트에서 제공하는 관련 파일입니다.',
                };

                return (
                  <article className="project-download-card" key={link.label}>
                    <h3>{detail.title}</h3>
                    <p>{detail.description}</p>
                    <a className="button secondary" href={link.href} target="_blank" rel="noreferrer">
                      Download
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <article className="project-guide" aria-labelledby="excel-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Usage Flow</p>
            <h2 id="excel-guide-title">ExcelConditionPainter 사용 가이드</h2>
            <p>
              예시는 위 <b>Sample Data</b>에서 받을 수 있는 <code>DummyData_400Rows_Shuffled.xlsx</code> 기준입니다.
              <br />
              파일을 열고 조건을 설정한 뒤 검색과 Export까지 이어지는 흐름을 정리했습니다.
            </p>
          </header>

          <ol className="guide-flow" aria-label="ExcelConditionPainter 사용 흐름">
            <li>
              <strong>1. Open</strong>
              <span>Excel 파일 열기</span>
            </li>
            <li>
              <strong>2. Set Conditions</strong>
              <span>컬럼/조건 지정</span>
            </li>
            <li>
              <strong>3. Set</strong>
              <span>조건 색상 적용</span>
            </li>
            <li>
              <strong>4. Ctrl+F</strong>
              <span>결과 검색</span>
            </li>
            <li>
              <strong>5. Options</strong>
              <span>Export 방식 설정</span>
            </li>
            <li>
              <strong>6. Export</strong>
              <span>결과 저장</span>
            </li>
          </ol>

          <section className="guide-section" aria-labelledby="open-excel-title">
            <h3 id="open-excel-title">1. Excel 파일 열기</h3>
            <div className="guide-image-pair">
              <figure>
                <img src={`${assetPath}/main-window-before-set-cropped.png`} alt="조건 적용 전 메인 화면" />
                <figcaption>적용 전: 파일만 연 상태</figcaption>
              </figure>
              <figure>
                <img src={`${assetPath}/main-window-cropped.png`} alt="조건 적용 후 메인 화면" />
                <figcaption>적용 후: 조건 색상 표시</figcaption>
              </figure>
            </div>
            <div className="guide-table-wrap">
              <table>
                <tbody>
                  <tr>
                    <th>열기</th>
                    <td>
                      <b>Open</b> → <code>DummyData_400Rows_Shuffled.xlsx</code> 선택
                    </td>
                  </tr>
                  <tr>
                    <th>확인</th>
                    <td>
                      <b>Current file</b>에 파일명이 표시되고, <b>Excel Viewer</b>에 데이터가 표시됩니다.
                    </td>
                  </tr>
                  <tr>
                    <th>차이</th>
                    <td>
                      처음에는 색상이 없고, <b>Set</b> 적용 후 조건 결과가 색상으로 표시됩니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="conditions-title">
            <h3 id="conditions-title">2. 조건 설정</h3>
            <figure className="guide-figure guide-figure--medium">
              <img src={`${assetPath}/set-conditions-window.png`} alt="Set Conditions 창" />
              <figcaption>Set Conditions: 컬럼 매핑, 옵션 수량, 조건 목록 설정</figcaption>
            </figure>
            <div className="guide-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>예제 값</th>
                    <th>역할</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>기본키</td>
                    <td>
                      <code>상품고유번호</code>
                    </td>
                    <td>행 구분 기준</td>
                  </tr>
                  <tr>
                    <td>정렬 1</td>
                    <td>
                      <code>주문일</code>
                    </td>
                    <td>날짜순 정렬</td>
                  </tr>
                  <tr>
                    <td>정렬 2</td>
                    <td>
                      <code>주문자</code>
                    </td>
                    <td>같은 날짜 안의 보조 정렬</td>
                  </tr>
                  <tr>
                    <td>수량</td>
                    <td>
                      <code>주문수량</code>
                    </td>
                    <td>총 구매 수량 계산</td>
                  </tr>
                  <tr>
                    <td>옵션</td>
                    <td>
                      <code>판매옵션</code>
                    </td>
                    <td>옵션별 수량/특정 옵션 검색</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="guide-checklist">
              <li>
                옵션명 옆 숫자는 실제 상품 수량입니다. 예: <code>멀티비타민 -30병</code> → <code>30</code>
              </li>
              <li>컬럼 선택이 맞으면 하단 조건 목록을 조정합니다.</li>
            </ul>
          </section>

          <section className="guide-section" aria-labelledby="priority-title">
            <h3 id="priority-title">3. 조건 추가, 삭제, 우선순위</h3>
            <div className="guide-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>컨트롤</th>
                    <th>의미</th>
                    <th>추천 사용법</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>조건 추가</b> + <b>+</b>
                    </td>
                    <td>새 조건 행 추가</td>
                    <td>
                      필요한 조건만 추가하고, 불필요하면 <b>-</b>로 삭제
                    </td>
                  </tr>
                  <tr>
                    <td>왼쪽 컬럼 선택</td>
                    <td>조건 계산 기준 컬럼</td>
                    <td>
                      <code>주소</code>, <code>주문자</code>, <code>연락처</code> 등 선택
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>AND</b>
                    </td>
                    <td>선택 컬럼을 하나의 묶음으로 계산</td>
                    <td>정확히 좁혀 찾을 때 사용</td>
                  </tr>
                  <tr>
                    <td>
                      <b>OR</b>
                    </td>
                    <td>선택 컬럼 중 하나라도 맞으면 포함</td>
                    <td>넓게 훑어볼 때 사용</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Lv</b>
                    </td>
                    <td>조건 우선순위</td>
                    <td>중요 조건은 낮은 숫자, 보조 조건은 높은 숫자</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Fill</b> / <b>Font</b>
                    </td>
                    <td>배경색 / 글자색</td>
                    <td>선착순은 Fill, 중복 확인은 Font처럼 구분</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="guide-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>조건 종류</th>
                    <th>짧은 설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>중복값 Cell 검색</td>
                    <td>중복되는 셀 값을 표시</td>
                  </tr>
                  <tr>
                    <td>중복 제외 순차 검색</td>
                    <td>중복을 제외하고 앞에서부터 지정 인원 표시</td>
                  </tr>
                  <tr>
                    <td>총 구매 수량 검색</td>
                    <td>주문수량 × 옵션별 실제 수량으로 기준 이상 표시</td>
                  </tr>
                  <tr>
                    <td>특정 옵션 구매 검색</td>
                    <td>
                      선택 옵션 구매자를 순서대로 표시, <code>OR</code> 고정
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="search-title">
            <h3 id="search-title">4. 검색</h3>
            <figure className="guide-figure guide-figure--compact">
              <img src={`${assetPath}/search-window.png`} alt="Search 창" />
              <figcaption>
                <code>멀티비타민</code> 검색 결과
              </figcaption>
            </figure>
            <ol className="guide-checklist">
              <li>
                메인 화면에서 <b>Ctrl+F</b>
              </li>
              <li>
                검색어 입력: <code>멀티비타민</code>
              </li>
              <li>
                <b>모두 찾기</b> 클릭
              </li>
              <li>결과 행 선택 후 메인 그리드 위치로 이동</li>
            </ol>
          </section>

          <section className="guide-section" aria-labelledby="options-title">
            <h3 id="options-title">5. Options</h3>
            <figure className="guide-figure guide-figure--small">
              <img src={`${assetPath}/options-window.png`} alt="Options 창" />
              <figcaption>Export 분리 저장 및 조건별 기본 검색 방식</figcaption>
            </figure>
            <div className="guide-table-wrap">
              <table>
                <tbody>
                  <tr>
                    <th>Export Split By Conditions</th>
                    <td>조건별 결과 파일을 따로 저장합니다.</td>
                  </tr>
                  <tr>
                    <th>조건별 기본 검색 방식</th>
                    <td>
                      새 조건의 기본 <code>AND</code>/<code>OR</code> 값을 정합니다.
                    </td>
                  </tr>
                  <tr>
                    <th>Save</th>
                    <td>변경한 옵션을 저장합니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="export-title">
            <h3 id="export-title">6. Export</h3>
            <div className="guide-table-wrap">
              <table>
                <tbody>
                  <tr>
                    <th>버튼</th>
                    <td>
                      메인 화면 오른쪽 위 <b>Export</b>
                    </td>
                  </tr>
                  <tr>
                    <th>기본 파일</th>
                    <td>
                      <code>ExcelPainter/DummyData_400Rows_Shuffled_Default.xlsx</code>
                    </td>
                  </tr>
                  <tr>
                    <th>조건별 파일</th>
                    <td>
                      <b>Export Split By Conditions</b>가 켜져 있을 때 추가 생성
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="guide-note">
              <b>핵심:</b> 컬럼 매핑을 먼저 확인하고, <b>AND/OR</b>로 검색 범위를 정한 뒤, <b>Lv</b>와
              색상으로 중요도를 구분하면 결과를 빠르게 읽을 수 있습니다.
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}

function CPUMemoryStressTestProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === cpuMemoryStressTestPath);
  const assetPath = '/assets/cpu-memory-stress-test';
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];
  const downloadDescriptions: Record<string, { title: string; description: string; buttonText: string }> = {
    'Release Download': {
      title: 'Release v1.0.0',
      description: '배포 버전과 파일 확인',
      buttonText: 'Release',
    },
    'Windows x64 ZIP': {
      title: 'Windows x64 ZIP',
      description: '실행 파일 압축본',
      buttonText: 'ZIP Download',
    },
  };
  const runModes = [
    {
      title: 'User 대화형',
      command: 'CPUMemoryStressTestCpp.exe',
      image: 'interactive-mode.png',
      description: '질문에 답하면서 전체 테스트를 순서대로 실행합니다.',
    },
    {
      title: 'Shell',
      command: 'CPUMemoryStressTestCpp.exe shell',
      image: 'shell-mode.png',
      description: 'stress> 프롬프트에서 여러 명령을 이어서 실행합니다.',
    },
    {
      title: 'CLI',
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      image: 'cli-mode.png',
      description: '한 줄 명령으로 실행하고 JSON과 exit code를 반환합니다.',
    },
  ];
  const commandExamples = [
    {
      command: 'CPUMemoryStressTestCpp.exe list',
      purpose: '테스트 목록 확인',
      image: 'cli-list.gif?v=full-list-1',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      purpose: '메모리 테스트 quick 실행',
      image: 'cli-memory.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.prime.parallel --preset quick',
      purpose: 'CPU 병렬 테스트 quick 실행',
      image: 'cli-prime.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick --save-csv --csv-dir C:\\Csv',
      purpose: 'JSON 출력과 CSV 저장',
      image: 'cli-csv.png',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.foo --preset quick',
      purpose: '잘못된 ID의 오류 응답 확인',
      image: 'cli-invalid.png',
    },
  ];
  const commandReferenceRows = [
    {
      name: 'Shell',
      command: 'list / run memory --preset quick / exit',
      description: 'stress> 프롬프트에서 실행 파일명 없이 명령만 입력합니다.',
    },
    {
      name: 'CLI',
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      description: '실행 파일 뒤에 명령을 붙여 JSON과 exit code를 받습니다.',
    },
    {
      name: 'list',
      command: 'CPUMemoryStressTestCpp.exe list',
      description: '사용 가능한 테스트 ID를 확인합니다.',
    },
    {
      name: '--preset',
      command: '--preset quick | normal | heavy | extreme',
      description: '테스트 부하 크기를 선택합니다.',
    },
    {
      name: '--repeat',
      command: '--repeat 3',
      description: '같은 검사를 지정한 횟수만큼 반복합니다.',
    },
    {
      name: '--save-csv',
      command: '--save-csv [--csv-dir C:\\Csv]',
      description: '--csv-dir이 없으면 바탕화면의 StressTestResult 폴더에 자동 저장합니다.',
    },
  ];
  const savedResultExamples = [
    {
      fileName: 'SingleArrayMath.txt',
      testName: '단일 배열 수학 계산',
      image: 'txt-single-array-math.png',
    },
    {
      fileName: 'ParallelArrayMath.txt',
      testName: '병렬 배열 수학 계산',
      image: 'txt-parallel-array-math.png',
    },
    {
      fileName: 'SingleRecursive.txt',
      testName: '단일 재귀 피보나치',
      image: 'txt-single-recursive.png',
    },
    {
      fileName: 'ParallelRecursive.txt',
      testName: '병렬 재귀 피보나치',
      image: 'txt-parallel-recursive.png',
    },
    {
      fileName: 'SinglePrime.txt',
      testName: '단일 소수 찾기',
      image: 'txt-single-prime.png',
    },
    {
      fileName: 'ParallelPrime.txt',
      testName: '병렬 소수 찾기',
      image: 'txt-parallel-prime.png',
    },
    {
      fileName: 'SingleSort.txt',
      testName: '단일 배열 정렬',
      image: 'txt-single-sort.png',
    },
    {
      fileName: 'ParallelSort.txt',
      testName: '병렬 배열 정렬 및 병합',
      image: 'txt-parallel-sort.png',
    },
    {
      fileName: 'SingleMandelbrot.txt',
      testName: '단일 Mandelbrot 계산',
      image: 'txt-single-mandelbrot.png',
    },
    {
      fileName: 'ParallelMandelbrot.txt',
      testName: '병렬 Mandelbrot 계산',
      image: 'txt-parallel-mandelbrot.png',
    },
    {
      fileName: 'Memory.txt',
      testName: '메모리 테스트',
      image: 'txt-memory.png',
    },
  ];
  const savedResultCaptureVersion = 'txt-window-uniform-2';

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page" id="top">
        <section className="project-detail-hero" aria-labelledby="cpu-memory-stress-test-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Project Guide</p>
            <h1 id="cpu-memory-stress-test-title">{project?.title ?? 'CPUMemoryStressTest'}</h1>
            <p className="project-detail-lead">
              CPU/Memory 부하 테스트를 세 가지 방식으로 실행하고 JSON/CSV로 기록하는 C++20 콘솔 도구입니다.
            </p>
            <div className="tech-list project-detail-tech-list" aria-label="CPUMemoryStressTest 기술 스택">
              {(project?.tech ?? ['C++20', 'WinAPI', 'STL', 'JSON CLI']).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {repositoryLink ? (
              <div className="project-detail-actions">
                <a className="button primary" href={repositoryLink.href} target="_blank" rel="noreferrer">
                  {repositoryLink.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
          <figure className="project-detail-hero-media project-detail-hero-media--console">
            <img src={`${assetPath}/main-console.png`} alt="CPUMemoryStressTest CLI 실행 화면" />
          </figure>
        </section>

        {downloadLinks.length > 0 ? (
          <section className="project-download-section" aria-labelledby="cpu-download-title">
            <div className="project-download-copy">
              <p className="section-kicker">Downloads</p>
              <h2 id="cpu-download-title">Release 다운로드</h2>
              <p>
                <b>v1.0.0</b> Windows x64 실행 ZIP을 제공합니다.
              </p>
            </div>
            <div className="project-download-grid">
              {downloadLinks.map((link) => {
                const detail = downloadDescriptions[link.label] ?? {
                  title: link.label,
                  description: '관련 배포 파일',
                  buttonText: 'Open',
                };

                return (
                  <article className="project-download-card" key={link.label}>
                    <h3>{detail.title}</h3>
                    <p>{detail.description}</p>
                    <a className="button secondary" href={link.href} target="_blank" rel="noreferrer">
                      {detail.buttonText}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <article className="project-guide" aria-labelledby="cpu-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Run Modes</p>
            <h2 id="cpu-guide-title">상황에 맞게 고르는 3가지 실행 방식</h2>
            <p>
              캡처 이미지는 모두 실제 CMD 창만 다시 캡처한 화면입니다.
              <br />
              핵심 사용 방식과 출력 흐름만 간단히 정리했습니다.
            </p>
          </header>

          <ol className="guide-flow cpu-guide-flow" aria-label="CPUMemoryStressTest 실행 방식">
            <li>
              <strong>1. User</strong>
              <span>질문에 답하며 실행</span>
            </li>
            <li>
              <strong>2. Shell</strong>
              <span>반복 명령 실행</span>
            </li>
            <li>
              <strong>3. CLI</strong>
              <span>자동화와 JSON 출력</span>
            </li>
          </ol>

          <section className="guide-section" aria-labelledby="cpu-run-modes-title">
            <h3 id="cpu-run-modes-title">1. 실행 방식</h3>
            <div className="run-mode-grid">
              {runModes.map((mode) => (
                <article className="run-mode-card" key={mode.title}>
                  <figure>
                    <img src={`${assetPath}/${mode.image}`} alt={`${mode.title} 실행 CMD 캡처`} />
                  </figure>
                  <div>
                    <span className="mode-badge">{mode.title}</span>
                    <h4>{mode.command}</h4>
                    <p>{mode.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" aria-labelledby="cpu-cli-title">
            <h3 id="cpu-cli-title">2. CLI 실행 예시</h3>
            <div className="guide-table-wrap console-command-table">
              <table>
                <thead>
                  <tr>
                    <th>구성</th>
                    <th>명령</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {commandReferenceRows.map((row) => (
                    <tr key={`${row.name}-${row.command}`}>
                      <td>{row.name}</td>
                      <td>
                        <code>{row.command}</code>
                      </td>
                      <td>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cli-output-grid">
              {commandExamples.map((item) => (
                <article className="cli-output-card" key={item.command}>
                  <figure>
                    <img src={`${assetPath}/${item.image}`} alt={`${item.purpose} CMD 출력 캡처`} />
                  </figure>
                  <div>
                    <code>{item.command}</code>
                    <p>{item.purpose}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" aria-labelledby="cpu-output-title">
            <h3 id="cpu-output-title">3. CSV 저장</h3>
            <div className="csv-file-grid">
                {savedResultExamples.map((item) => (
                  <article className="csv-file-card" key={item.fileName}>
                    <figure>
                      <img
                        src={`${assetPath}/${item.image}?v=${savedResultCaptureVersion}`}
                        alt={`${item.fileName} 파일 내용 캡처`}
                      />
                  </figure>
                  <div>
                    <code>{item.fileName}</code>
                    <p>{item.testName}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="guide-note">
              <code>run all --preset quick --repeat 3 --save-csv --csv-dir C:\Csv</code> 결과를 검사별 TXT 파일로 열어 확인했습니다.
              <br />
              <code>--repeat</code> 값을 주면 같은 검사를 지정한 횟수만큼 실행해 결과를 여러 줄로 저장합니다.
              <br />
              <code>--csv-dir</code>을 생략하면 <code>바탕화면\StressTestResult\yyyyMMdd_HHmmss</code> 폴더가 자동 생성됩니다.
            </div>
          </section>

          <section className="guide-section" aria-labelledby="cpu-preset-title">
            <h3 id="cpu-preset-title">4. Preset과 안전장치</h3>
            <div className="guide-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Preset</th>
                    <th>용도</th>
                    <th>대표 설정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>quick</code>
                    </td>
                    <td>빠른 기능 확인</td>
                    <td>worker 최대 2개, memory 128 MB</td>
                  </tr>
                  <tr>
                    <td>
                      <code>normal</code>
                    </td>
                    <td>일반 부하 확인</td>
                    <td>worker 최대 4개, memory 512 MB</td>
                  </tr>
                  <tr>
                    <td>
                      <code>heavy</code>
                    </td>
                    <td>강한 부하 확인</td>
                    <td>hardware worker, memory 2048 MB</td>
                  </tr>
                  <tr>
                    <td>
                      <code>extreme</code>
                    </td>
                    <td>장시간 고부하</td>
                    <td>shell/대화형 모드에서 확인 입력 후 실행</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="guide-note">
              <b>핵심:</b> <code>extreme</code>은 실수로 실행되지 않도록 shell 또는 대화형 모드에서 확인 입력을 거칩니다.
            </div>
          </section>

          <section className="guide-section" aria-labelledby="cpu-architecture-title">
            <h3 id="cpu-architecture-title">5. 실행 구조</h3>
            <div className="architecture-flow" aria-label="CPUMemoryStressTest CLI 실행 구조">
              <span>CliParser</span>
              <span>CliCommandExecutor</span>
              <span>TestRegistry</span>
              <span>IStressTest</span>
              <span>TestResult</span>
              <span>JsonResultWriter</span>
            </div>
            <div className="guide-note">
              테스트는 <code>IStressTest</code> 전략으로 분리하고, <code>TestRegistry</code>에서 ID 기반으로 찾아 실행합니다.
              출력은 JSON/CSV Writer로 나눠 실행 로직과 저장 형식을 분리했습니다.
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}

function RFIDCollisionSearchSimulatorProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === rfidCollisionSearchSimulatorPath);
  const assetPath = '/assets/rfid-collision-search-simulator';
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];
  const downloadDescriptions: Record<string, { title: string; description: string; buttonText: string }> = {

    'Windows x64 EXE': {
      title: 'Windows x64 EXE',
      description: '',
      buttonText: 'Download',
    },
  };
  const searchStates = [
    {
      state: 'Empty',
      description: '현재 Prefix와 일치하는 TAG가 없어 해당 분기를 종료합니다.',
    },
    {
      state: 'Success',
      description: 'TAG가 1개만 응답해 식별에 성공하고 발견 목록에 추가합니다.',
    },
    {
      state: 'Collision',
      description: '2개 이상의 TAG가 응답하면 Prefix에 0과 1을 붙여 하위 분기를 탐색합니다.',
    },
  ];
  const comparisonRows = [
    { label: '발견 Tag 동일 여부', recursive: '동일', iterative: '동일' },
    { label: '질의 횟수', recursive: '11', iterative: '11' },
    { label: '충돌 횟수', recursive: '5', iterative: '5' },
    { label: '실행 시간', recursive: '11.100 us', iterative: '9.000 us' },
    { label: '탐색 방식', recursive: '함수 호출로 하위 Prefix 탐색', iterative: 'Stack으로 탐색 대상 Prefix 관리' },
  ];

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page" id="top">
        <section className="project-detail-hero" aria-labelledby="rfid-collision-search-simulator-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Project Guide</p>
            <h1 id="rfid-collision-search-simulator-title">{project?.title ?? 'RFID Collision Search Simulator'}</h1>
            <p className="project-detail-lead">
              Prefix 질의로 RFID TAG 충돌을 탐색하고,
              <br />
              같은 문제를 재귀 방식과 반복 방식으로 풀어
              <br />
              결과를 비교하는 C++ 콘솔 시뮬레이터입니다.
            </p>
            <div className="tech-list project-detail-tech-list" aria-label="RFID Collision Search Simulator 기술 스택">
              {(project?.tech ?? ['C++', 'STL', 'Visual Studio 2022']).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            {repositoryLink ? (
              <div className="project-detail-actions">
                <a className="button primary" href={repositoryLink.href} target="_blank" rel="noreferrer">
                  {repositoryLink.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
          <figure className="project-detail-hero-media project-detail-hero-media--console project-detail-hero-media--rfid">
            <img src={`${assetPath}/main-image.png`} alt="RFID Collision Search Simulator preset 실행 화면" />
          </figure>
        </section>

        {downloadLinks.length > 0 ? (
          <section className="project-download-section" aria-labelledby="rfid-download-title">
            <div className="project-download-copy">
              <p className="section-kicker">Downloads</p>
              <h2 id="rfid-download-title">실행 파일 다운로드</h2>
              <p>
                Windows x64 콘솔 실행 파일입니다.
              </p>
            </div>
            <div className="project-download-grid rfid-download-grid">
              {downloadLinks.map((link) => {
                const detail = downloadDescriptions[link.label] ?? {
                  title: link.label,
                  description: '프로젝트에서 제공하는 관련 배포 파일입니다.',
                  buttonText: 'Open',
                };

                return (
                  <article className="project-download-card rfid-download-card" key={link.label}>
                    <h3>{detail.title}</h3>
                    {detail.description ? <p>{detail.description}</p> : null}
                    <a className="button secondary" href={link.href} target="_blank" rel="noreferrer">
                      {detail.buttonText}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <article className="project-guide rfid-project-guide" aria-labelledby="rfid-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Usage Flow</p>
            <h2 id="rfid-guide-title">Prefix 충돌 탐색 흐름 확인</h2>
            <p>
              캡처 이미지는 실제 Release 실행 파일을
              <br />
              <code>1</code>번 preset 데이터로 실행한 출력입니다.
              <br />
              입력 방식, 탐색 로그, 최종 비교 결과를 정리했습니다.
            </p>
          </header>

          <ol className="guide-flow rfid-guide-flow" aria-label="RFID Collision Search Simulator 실행 흐름">
            <li>
              <strong>1. Preset</strong>
              <span>정해진 TAG 데이터 선택</span>
            </li>
            <li>
              <strong>2. Search Log</strong>
              <span>재귀/반복 로그와 전위 우선 흐름</span>
            </li>
            <li>
              <strong>3. Compare</strong>
              <span>결과와 탐색 지표 비교</span>
            </li>
          </ol>

          <section className="guide-section" aria-labelledby="rfid-run-title">
            <h3 id="rfid-run-title">1. 입력 데이터 선택</h3>
            <figure className="guide-figure guide-figure--console rfid-console-figure">
              <img src={`${assetPath}/preset-tags.png`} alt="정해진 TAG 데이터 선택과 TAG 목록 출력" />
              <figcaption>
                1. 정해진 데이터를 선택하면 4bit TAG 5개로 충돌 탐색을 시작합니다.
              </figcaption>
            </figure>
          </section>

          <section className="guide-section" aria-labelledby="rfid-recursive-title">
            <h3 id="rfid-recursive-title">2. 재귀/반복 방식과 전위 우선 탐색</h3>
            <div className="guide-image-pair rfid-search-pair">
              <figure>
                <img src={`${assetPath}/recursive-search.png`} alt="재귀 방식 Prefix 탐색 로그" />
                <figcaption>
                  재귀 방식: 함수 호출로 하위 Prefix를 깊게 탐색합니다.
                </figcaption>
              </figure>
              <figure>
                <img src={`${assetPath}/iterative-search.png`} alt="반복 방식 Prefix 탐색 로그" />
                <figcaption>
                  반복 방식: Stack으로 같은 Prefix 탐색 순서를 재현합니다.
                </figcaption>
              </figure>
            </div>
            <figure className="guide-figure guide-figure--tree rfid-preorder-figure">
              <img src={`${assetPath}/preorder-tree.svg`} alt="RFID Prefix 트리의 전위 우선 탐색 방문 순서" />
              <figcaption>
                두 구현 방식 모두 현재 Prefix를 먼저 평가한 뒤 0 분기와 1 분기로 내려가는 전위 우선 순서를 따릅니다.
              </figcaption>
            </figure>
            <div className="guide-note rfid-preorder-note">
              <b>핵심:</b> 로그의 Cycle 순서는 Prefix 트리를 전위 우선으로 방문한 결과입니다.
              충돌이 발생한 Prefix에서만 <code>prefix + "0"</code>, <code>prefix + "1"</code> 하위 질의를 이어갑니다.
            </div>
          </section>

          <section className="guide-section" aria-labelledby="rfid-comparison-title">
            <h3 id="rfid-comparison-title">3. 반복 방식과 비교 결과</h3>
            <figure className="guide-figure guide-figure--console rfid-console-figure">
              <img src={`${assetPath}/comparison-summary.png`} alt="반복 방식 탐색 로그와 재귀 반복 비교 결과" />
              <figcaption>
                두 방식 모두 같은 TAG를 발견하고, 질의 횟수, 충돌 횟수, 실행 시간을 함께 비교합니다.
              </figcaption>
            </figure>
            <div className="guide-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>비교 항목</th>
                    <th>재귀 방식</th>
                    <th>반복 방식</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.recursive}</td>
                      <td>{row.iterative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="rfid-search-model-title">
            <h3 id="rfid-search-model-title">4. Search Model</h3>
            <div className="search-state-grid">
              {searchStates.map((item) => (
                <article className="search-state-card" key={item.state}>
                  <h4>{item.state}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="guide-note">
              Prefix는 <code>ROOT</code>에서 시작해 충돌이 발생한 분기만 <code>0</code>, <code>1</code>로 확장합니다.
              이 과정을 통해 불필요한 TAG 분기를 건너뛰면서 식별 가능한 TAG를 수집합니다.
            </div>
          </section>

          <section className="guide-section" aria-labelledby="rfid-architecture-title">
            <h3 id="rfid-architecture-title">5. 실행 구조</h3>
            <div className="architecture-flow rfid-architecture-flow" aria-label="RFID Collision Search Simulator 실행 구조">
              <span>TagUIConsole</span>
              <span>TagProvider_Factory</span>
              <span>ITagProvider</span>
              <span>ITagSearcher</span>
              <span>SearchResult</span>
              <span>Comparison</span>
            </div>
            <div className="guide-note">
              TAG 생성 방식은 <code>ITagProvider</code>로, 탐색 알고리즘은 <code>ITagSearcher</code>로 분리했습니다.
              그래서 preset, 직접 입력, 랜덤 TAG 생성과 재귀/반복 탐색을 서로 독립적으로 교체할 수 있습니다.
            </div>
          </section>
        </article>

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
