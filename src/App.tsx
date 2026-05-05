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
  type Project,
  type ProfileLink,
} from './data/portfolio';
import { additionalDetails, resumeExperiences, resumeInfo, resumeIntroduction } from './data/resume';
import { trackAnalyticsEvent } from './analytics/google';

const resumePath = '/resume';
const excelConditionPainterPath = '/projects/excel-condition-painter';
const cpuMemoryStressTestPath = '/projects/cpu-memory-stress-test';

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
    window.setTimeout(() => {
      const hash = path.split('#')[1];

      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  if (currentPath === resumePath) {
    return <ResumePage onNavigate={handleInternalNavigate} />;
  }

  if (currentPath === excelConditionPainterPath) {
    return <ExcelConditionPainterProjectPage onNavigate={handleInternalNavigate} />;
  }

  if (currentPath === cpuMemoryStressTestPath) {
    return <CPUMemoryStressTestProjectPage onNavigate={handleInternalNavigate} />;
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
                    <img src={project.image} alt={`${project.title} 썸네일`} />
                    <span>{project.status}</span>
                  </a>
                ) : (
                  <div className="project-image-wrap">
                    <img src={project.image} alt={`${project.title} 썸네일`} />
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

        <AnalyticsNotice />
      </main>
    </div>
  );
}

function ExcelConditionPainterProjectPage({ onNavigate }: { onNavigate: InternalNavigate }) {
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
    <div className="site-shell">
      <SiteHeader isResumePage onNavigate={onNavigate} />

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

function CPUMemoryStressTestProjectPage({ onNavigate }: { onNavigate: InternalNavigate }) {
  const project: Project | undefined = projects.find((item) => item.detailPath === cpuMemoryStressTestPath);
  const assetPath = '/assets/cpu-memory-stress-test';
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];
  const downloadDescriptions: Record<string, { title: string; description: string; buttonText: string }> = {
    'Release Download': {
      title: 'Release v1.0.0',
      description: 'GitHub Releases에서 배포 버전과 포함된 에셋을 확인할 수 있습니다.',
      buttonText: 'Open Release',
    },
    'Windows x64 ZIP': {
      title: 'Windows x64 ZIP',
      description: '압축을 풀고 실행 파일로 바로 테스트할 수 있는 Windows x64 배포본입니다.',
      buttonText: 'Download ZIP',
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
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick',
      purpose: '메모리 테스트 quick 실행',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.prime.parallel --preset quick',
      purpose: 'CPU 병렬 테스트 quick 실행',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run memory --preset quick --save-csv',
      purpose: 'JSON 출력과 CSV 저장',
    },
    {
      command: 'CPUMemoryStressTestCpp.exe run cpu.foo --preset quick',
      purpose: '잘못된 ID의 오류 응답 확인',
    },
  ];

  return (
    <div className="site-shell">
      <SiteHeader isResumePage onNavigate={onNavigate} />

      <main className="project-detail-page" id="top">
        <section className="project-detail-hero" aria-labelledby="cpu-memory-stress-test-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Project Guide</p>
            <h1 id="cpu-memory-stress-test-title">{project?.title ?? 'CPUMemoryStressTest'}</h1>
            <p className="project-detail-lead">
              CPU와 메모리 부하를 실행하는 C++20 콘솔 도구입니다. User 대화형, Shell, CLI 세 가지 방식으로
              실행하고 결과는 JSON 또는 CSV로 남길 수 있습니다.
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
            <img src={`${assetPath}/cli-mode.png`} alt="CPUMemoryStressTest CLI 실행 화면" />
          </figure>
        </section>

        {downloadLinks.length > 0 ? (
          <section className="project-download-section" aria-labelledby="cpu-download-title">
            <div className="project-download-copy">
              <p className="section-kicker">Downloads</p>
              <h2 id="cpu-download-title">Release 다운로드</h2>
              <p>
                <b>v1.0.0</b>부터 Windows x64 ZIP 배포본을 제공합니다. 실행 파일 하나로 세 가지 실행 방식을
                확인할 수 있습니다.
              </p>
            </div>
            <div className="project-download-grid">
              {downloadLinks.map((link) => {
                const detail = downloadDescriptions[link.label] ?? {
                  title: link.label,
                  description: '프로젝트에서 제공하는 관련 배포 파일입니다.',
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
            <figure className="guide-figure guide-figure--console">
              <img src={`${assetPath}/cli-mode.png`} alt="CLI quick preset 실행 CMD 캡처" />
              <figcaption>
                <code>run cpu.prime.parallel --preset quick</code>: quick preset 결과를 JSON으로 출력
              </figcaption>
            </figure>
            <div className="guide-table-wrap">
              <table className="console-command-table">
                <thead>
                  <tr>
                    <th>명령</th>
                    <th>용도</th>
                  </tr>
                </thead>
                <tbody>
                  {commandExamples.map((item) => (
                    <tr key={item.command}>
                      <td>
                        <code>{item.command}</code>
                      </td>
                      <td>{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="cpu-output-title">
            <h3 id="cpu-output-title">3. CSV 저장</h3>
            <figure className="guide-figure guide-figure--console">
              <img src={`${assetPath}/csv-output.png`} alt="CSV 저장 옵션 실행 CMD 캡처" />
              <figcaption>
                <code>--save-csv</code>: CLI에서는 명시적으로 요청한 경우에만 CSV 저장
              </figcaption>
            </figure>
            <div className="guide-note">
              기본 결과는 stdout JSON으로 반환하고, 필요할 때만 <code>--save-csv</code>와 <code>--csv-dir</code>로
              파일 로그를 남깁니다. 잘못된 명령도 JSON과 exit code로 구분됩니다.
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
