import { ArrowUpRight } from 'lucide-react';
import { AnalyticsNotice } from '../../components/AnalyticsNotice';
import { ProjectDownloadSection } from '../../components/ProjectDownloadSection';
import { SiteHeader } from '../../components/SiteHeader';
import { TechList } from '../../components/TechList';
import { projects, type Project } from '../../data/portfolio';
import { rfidCollisionSearchSimulatorPath } from '../../routes/paths';
import type { ThemedPageProps } from '../../types/navigation';
import {
  comparisonRows,
  downloadDescriptions,
  rfidCollisionSearchSimulatorConfig,
  searchStates,
} from './rfidCollisionSearchSimulatorConfig';

export function RFIDCollisionSearchSimulatorProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === rfidCollisionSearchSimulatorPath);
  const assetPath = rfidCollisionSearchSimulatorConfig.assetPath;
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page github-project-page rfid-project-page" id="top">
        <section className="project-detail-hero" aria-labelledby="rfid-collision-search-simulator-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Algorithm Simulation</p>
            <h1 id="rfid-collision-search-simulator-title">{project?.title ?? 'RFID Collision Search Simulator'}</h1>
            <p className="project-detail-lead">
              RFID TAG 충돌 탐색 문제를 Prefix 질의 모델로 추상화하고 동일 입력을 재귀 방식과 반복 방식으로 비교한 C++ 콘솔 시뮬레이터.
              <br />
              탐색 상태, 질의 횟수, 충돌 횟수, 실행 시간을 동일 기준으로 출력해 알고리즘 동작을 검증.
            </p>
            <TechList
              className="tech-list project-detail-tech-list"
              ariaLabel="RFID Collision Search Simulator 기술 스택"
              items={project?.tech ?? rfidCollisionSearchSimulatorConfig.fallbackTech}
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
          <figure className="project-detail-hero-media project-detail-hero-media--console project-detail-hero-media--rfid github-project-hero-media rfid-hero-media">
            <img src={`${assetPath}/main-image.png`} alt="RFID Collision Search Simulator preset 실행 화면" />
          </figure>
        </section>

        <ProjectDownloadSection
          titleId="rfid-download-title"
          title="Windows 실행 파일"
          description="RFID 충돌 탐색 시뮬레이션을 실행할 수 있는 Windows x64 콘솔 실행 파일"
          links={downloadLinks}
          descriptions={downloadDescriptions}
          defaultDescription="관련 배포 파일"
          gridClassName="project-download-grid rfid-download-grid"
          cardClassName="project-download-card rfid-download-card"
        />

        <article className="project-guide rfid-project-guide" aria-labelledby="rfid-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Algorithm Flow</p>
            <h2 id="rfid-guide-title">Prefix 기반 충돌 탐색 검증 흐름</h2>
            <p>
              Release 실행 파일을 preset 데이터로 실행한 실제 출력 기준.
              입력 데이터 선택, 탐색 로그, 재귀/반복 결과 비교 흐름으로 구성.
            </p>
          </header>

          <ol className="guide-flow rfid-guide-flow" aria-label="RFID Collision Search Simulator 실행 흐름">
            <li>
              <strong>1. Preset</strong>
              <span>Preset TAG 데이터 선택</span>
            </li>
            <li>
              <strong>2. Search Log</strong>
              <span>재귀/반복 탐색 로그</span>
            </li>
            <li>
              <strong>3. Compare</strong>
              <span>탐색 결과 및 지표 비교</span>
            </li>
          </ol>

          <section className="guide-section" aria-labelledby="rfid-run-title">
            <h3 id="rfid-run-title">1. 입력 데이터 선택</h3>
            <figure className="guide-figure guide-figure--console rfid-console-figure">
              <img src={`${assetPath}/preset-tags.png`} alt="정해진 TAG 데이터 선택과 TAG 목록 출력" />
              <figcaption>
                4bit TAG 5개로 Prefix 충돌 탐색 시작
              </figcaption>
            </figure>
          </section>

          <section className="guide-section" aria-labelledby="rfid-recursive-title">
            <h3 id="rfid-recursive-title">2. 재귀/반복 방식과 전위 우선 탐색</h3>
            <div className="guide-image-pair rfid-search-pair">
              <figure>
                <img src={`${assetPath}/recursive-search.png`} alt="재귀 방식 Prefix 탐색 로그" />
                <figcaption>
                  재귀 방식: 함수 호출 기반 하위 Prefix 깊이 탐색
                </figcaption>
              </figure>
              <figure>
                <img src={`${assetPath}/iterative-search.png`} alt="반복 방식 Prefix 탐색 로그" />
                <figcaption>
                  반복 방식: Stack 기반 탐색 대상 Prefix 관리
                </figcaption>
              </figure>
            </div>
            <figure className="guide-figure guide-figure--tree rfid-preorder-figure">
              <img src={`${assetPath}/preorder-tree.svg`} alt="RFID Prefix 트리의 전위 우선 탐색 방문 순서" />
              <figcaption>
                두 구현 모두 현재 Prefix 평가 후 0/1 하위 분기로 이동하는 전위 우선 순서 적용
              </figcaption>
            </figure>
            <div className="guide-note rfid-preorder-note">
              <b>탐색 기준:</b> 로그의 Cycle 순서는 Prefix 트리 전위 우선 방문 결과.
              충돌 Prefix에서만 <code>prefix + "0"</code>, <code>prefix + "1"</code> 하위 질의 확장.
            </div>
          </section>

          <section className="guide-section" aria-labelledby="rfid-comparison-title">
            <h3 id="rfid-comparison-title">3. 반복 방식과 비교 결과</h3>
            <figure className="guide-figure guide-figure--console rfid-console-figure">
              <img src={`${assetPath}/comparison-summary.png`} alt="반복 방식 탐색 로그와 재귀 반복 비교 결과" />
              <figcaption>
                동일 TAG 발견 여부, 질의 횟수, 충돌 횟수, 실행 시간 비교
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
              <code>ROOT</code>에서 시작해 충돌 분기만 <code>0</code>, <code>1</code>로 확장.
              불필요한 TAG 분기를 제외하면서 식별 가능한 TAG 수집.
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
              TAG 생성은 <code>ITagProvider</code>, 탐색 알고리즘은 <code>ITagSearcher</code>로 분리.
              preset, 직접 입력, 랜덤 TAG 생성과 재귀/반복 탐색 방식을 독립적으로 교체 가능한 구조.
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
