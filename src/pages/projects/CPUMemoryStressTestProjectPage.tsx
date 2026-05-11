import { ArrowUpRight } from 'lucide-react';
import { AnalyticsNotice } from '../../components/AnalyticsNotice';
import { ProjectDownloadSection } from '../../components/ProjectDownloadSection';
import { SiteHeader } from '../../components/SiteHeader';
import { TechList } from '../../components/TechList';
import { projects, type Project } from '../../data/portfolio';
import { cpuMemoryStressTestPath } from '../../routes/paths';
import type { ThemedPageProps } from '../../types/navigation';
import {
  commandExamples,
  commandReferenceRows,
  cpuMemoryStressTestConfig,
  downloadDescriptions,
  runModes,
  savedResultCaptureVersion,
  savedResultExamples,
} from './cpuMemoryStressTestConfig';

export function CPUMemoryStressTestProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === cpuMemoryStressTestPath);
  const assetPath = cpuMemoryStressTestConfig.assetPath;
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page github-project-page cpu-memory-page" id="top">
        <section className="project-detail-hero" aria-labelledby="cpu-memory-stress-test-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Test Automation</p>
            <h1 id="cpu-memory-stress-test-title">{project?.title ?? 'CPUMemoryStressTest'}</h1>
            <p className="project-detail-lead">
              CPU/Memory 부하 테스트 실행 방식을 대화형, Shell, CLI로 표준화하고 JSON/CSV 결과 수집을 지원하는 C++20 콘솔 기반 검증 도구.
              <br />
              테스트 Registry와 Writer 계층을 분리해 자동화 실행, 반복 측정, 결과 저장 흐름을 구조화.
            </p>
            <TechList
              className="tech-list project-detail-tech-list"
              ariaLabel="CPUMemoryStressTest 기술 스택"
              items={project?.tech ?? cpuMemoryStressTestConfig.fallbackTech}
            />
            {repositoryLink ? (
              <div className="project-detail-actions">
                <a className="button primary" href={repositoryLink.href} target="_blank" rel="noreferrer">
                  {repositoryLink.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
          <figure className="project-detail-hero-media project-detail-hero-media--console github-project-hero-media cpu-memory-hero-media">
            <img src={`${assetPath}/main-console.png`} alt="CPUMemoryStressTest CLI 실행 화면" />
          </figure>
        </section>

        <ProjectDownloadSection
          titleId="cpu-download-title"
          title="실행 파일 및 배포 정보"
          description="Windows x64 환경에서 실행 가능한 배포 파일과 릴리즈 정보"
          links={downloadLinks}
          descriptions={downloadDescriptions}
          defaultDescription="관련 배포 파일 확인"
        />

        <article className="project-guide github-project-guide cpu-project-guide" aria-labelledby="cpu-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Execution Design</p>
            <h2 id="cpu-guide-title">실행 모드와 결과 수집 구조</h2>
            <p>
              대화형 실행, Shell 반복 실행, CLI 자동화 실행을 동일 테스트 Registry 기준으로 구성.
              실제 CMD 캡처를 기준으로 입력 방식과 출력 흐름을 정리.
            </p>
          </header>

          <ol className="guide-flow cpu-guide-flow" aria-label="CPUMemoryStressTest 실행 방식">
            <li>
              <strong>1. User</strong>
              <span>대화형 입력 실행</span>
            </li>
            <li>
              <strong>2. Shell</strong>
              <span>반복 테스트 실행</span>
            </li>
            <li>
              <strong>3. CLI</strong>
              <span>자동화 결과 수집</span>
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
              <code>run all --preset quick --repeat 3 --save-csv --csv-dir C:\Csv</code> 실행 결과를 검사별 TXT/CSV 파일로 분리 저장.
              <br />
              <code>--repeat</code> 값으로 동일 테스트를 지정 횟수만큼 실행하고 결과를 누적 저장.
              <br />
              <code>--csv-dir</code> 생략 시 <code>바탕화면\StressTestResult\yyyyMMdd_HHmmss</code> 폴더 자동 생성.
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
              <b>안전장치:</b> <code>extreme</code>은 의도치 않은 고부하 실행 방지를 위해 shell 또는 대화형 모드에서 확인 입력 후 실행.
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
              <code>IStressTest</code> 전략과 <code>TestRegistry</code> ID 매핑으로 실행 대상을 분리.
              JSON/CSV Writer를 별도 계층으로 구성해 테스트 실행 로직과 저장 형식을 분리.
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
