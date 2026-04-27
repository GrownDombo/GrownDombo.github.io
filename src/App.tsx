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

const navItems = [
  { label: '성과', href: '#metrics' },
  { label: '경험', href: '#experience' },
  { label: '기술', href: '#skills' },
  { label: '프로젝트', href: '#projects' },
  { label: '연락', href: '#contact' },
];

const linkIcons: Record<ProfileLink['kind'], typeof Github> = {
  github: Github,
  email: Mail,
  blog: FileText,
  resume: FileText,
};

function App() {
  const resumeLink = profile.links.find((link) => link.kind === 'resume');

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="GrownDombo 포트폴리오 홈">
          <span className="brand-mark">GD</span>
          <span>{profile.name}</span>
        </a>
        <nav className="nav-links" aria-label="주요 섹션">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

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
                <a className="button primary" href={resumeLink.href}>
                  이력서 원문
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : null}
              <a className="button secondary" href="#contact">
                연락하기
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="metrics-section" id="metrics" aria-labelledby="metrics-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Performance</p>
              <h2 id="metrics-title">숫자로 남긴 개선</h2>
            </div>
            <p>공개 이력서의 핵심 성과만 골라 첫 화면 이후 바로 읽히도록 정리했습니다.</p>
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
            <p>연도 흐름을 기준으로 회사, 역할, 주요 성과를 빠르게 훑을 수 있게 정리했습니다.</p>
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
            <p>업무에서 반복된 문제를 도구와 라이브러리 형태로 정리한 프로젝트입니다.</p>
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
                  <div className="tech-list" aria-label={`${project.title} 기술 스택`}>
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

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">더 자세한 이력과 기록은 아래 링크에서 확인할 수 있습니다.</h2>
          </div>
          <div className="contact-links">
            {profile.links.map((link) => {
              const Icon = linkIcons[link.kind];

              return (
                <a key={link.label} href={link.href} className="contact-link">
                  <Icon size={20} aria-hidden="true" />
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
