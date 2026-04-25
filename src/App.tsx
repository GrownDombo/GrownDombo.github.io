import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { experiences, profile, projects, skillGroups, type ProfileLink } from './data/portfolio';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const linkIcons: Record<ProfileLink['kind'], typeof Github> = {
  github: Github,
  email: Mail,
  linkedin: Linkedin,
  blog: FileText,
};

function App() {
  const featuredProject = projects[0];

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
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              {profile.availability}
            </p>
            <h1 id="hero-title">{profile.headline}</h1>
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-meta" aria-label="프로필 요약">
              <span>
                <MapPin size={17} aria-hidden="true" />
                {profile.location}
              </span>
              <span>
                <BriefcaseBusiness size={17} aria-hidden="true" />
                {profile.role}
              </span>
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                대표 프로젝트
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button secondary" href="#contact">
                연락하기
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="대표 프로젝트 미리보기">
            <img src={featuredProject.image} alt={`${featuredProject.title} 미리보기`} />
            <div className="hero-visual-caption">
              <span>{featuredProject.status}</span>
              <strong>{featuredProject.title}</strong>
            </div>
          </div>
        </section>

        <section className="intro-strip" aria-label="포트폴리오 핵심 관점">
          <span>Product-minded UI</span>
          <span>Readable TypeScript</span>
          <span>Deployable Workflows</span>
        </section>

        <section className="section two-column" id="about" aria-labelledby="about-title">
          <div>
            <p className="section-kicker">About</p>
            <h2 id="about-title">문제 정의부터 배포 가능한 화면까지 연결합니다.</h2>
          </div>
          <div className="section-body">
            <p>
              좋은 포트폴리오는 화려한 장식보다 의사결정의 흔적을 잘 보여준다고 믿습니다. 그래서 이
              사이트는 프로젝트의 목적, 맡은 역할, 기술 선택, 개선 포인트를 빠르게 비교할 수 있는
              구조로 만들었습니다.
            </p>
            <p>
              실제 정보로 교체할 때는 각 프로젝트의 배경, 해결한 문제, 가장 크게 배운 점을 더하면
              채용형 포트폴리오로 바로 확장할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="section-kicker">Skills</p>
            <h2 id="skills-title">제품을 만들고 다듬는 데 필요한 기술 묶음</h2>
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
              <h2 id="projects-title">대표 프로젝트 갤러리</h2>
            </div>
            <p>
              각 카드는 실제 스크린샷과 링크로 교체할 수 있도록 데이터 기반으로 구성되어 있습니다.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
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
                  <ul className="project-highlights">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="tech-list" aria-label={`${project.title} 기술스택`}>
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

        <section className="section two-column" id="experience" aria-labelledby="experience-title">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 id="experience-title">학습과 프로젝트 경험을 결과 중심으로 정리합니다.</h2>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.title}`}>
                <time>{item.period}</time>
                <div>
                  <p>{item.organization}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                  <ul>
                    {item.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">프로젝트와 협업 이야기를 나눌 준비가 되어 있습니다.</h2>
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
