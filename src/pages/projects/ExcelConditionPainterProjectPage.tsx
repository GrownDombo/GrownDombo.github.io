import { ArrowUpRight } from 'lucide-react';
import { AnalyticsNotice } from '../../components/AnalyticsNotice';
import { ProjectDownloadSection } from '../../components/ProjectDownloadSection';
import { SiteHeader } from '../../components/SiteHeader';
import { TechList } from '../../components/TechList';
import { projects, type Project } from '../../data/portfolio';
import { excelConditionPainterPath } from '../../routes/paths';
import type { ThemedPageProps } from '../../types/navigation';
import { downloadDescriptions, excelConditionPainterConfig } from './excelConditionPainterConfig';

export function ExcelConditionPainterProjectPage({ onNavigate, themeMode, onThemeToggle }: ThemedPageProps) {
  const project: Project | undefined = projects.find((item) => item.detailPath === excelConditionPainterPath);
  const assetPath = excelConditionPainterConfig.assetPath;
  const repositoryLink = project?.links.find((link) => link.label === 'Repository');
  const downloadLinks = project?.links.filter((link) => link.label !== 'Repository') ?? [];

  return (
    <div className="site-shell" data-theme={themeMode}>
      <SiteHeader isResumePage onNavigate={onNavigate} themeMode={themeMode} onThemeToggle={onThemeToggle} />

      <main className="project-detail-page excel-condition-page" id="top">
        <section className="project-detail-hero" aria-labelledby="excel-condition-painter-title">
          <div className="project-detail-hero-copy">
            <p className="section-kicker">Business Automation</p>
            <h1 id="excel-condition-painter-title">{project?.title ?? 'ExcelConditionPainter'}</h1>
            <p className="project-detail-lead">
              판매사 이벤트 이후 주문 통계 산출과 조건별 Excel 강조 표시를 자동화한 Windows Forms 업무 보조 도구.
              <br />
              수동 집계와 반복 색상 표시 작업을 줄이고, 조건 기준과 결과 Export 흐름을 표준화.
            </p>
            <TechList
              className="tech-list project-detail-tech-list"
              ariaLabel="ExcelConditionPainter 기술 스택"
              items={project?.tech ?? excelConditionPainterConfig.fallbackTech}
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
          <figure className="project-detail-hero-media excel-condition-hero-media">
            <img src={`${assetPath}/main-image.png`} alt="ExcelConditionPainter 대표 화면" />
          </figure>
        </section>

        <ProjectDownloadSection
          titleId="excel-download-title"
          title="샘플 데이터 및 실행 파일"
          description="업무 자동화 흐름 검증을 위한 샘플 주문 데이터와 배포 버전 정보"
          links={downloadLinks}
          descriptions={downloadDescriptions}
          defaultDescription="프로젝트 관련 배포 파일"
          defaultButtonText="Download"
        />

        <article className="project-guide excel-condition-guide" aria-labelledby="excel-guide-title">
          <header className="project-guide-header">
            <p className="section-kicker">Automation Flow</p>
            <h2 id="excel-guide-title">ExcelConditionPainter 업무 자동화 흐름</h2>
            <p>
              예시는 위 <b>Sample Data</b>에서 제공하는 <code>DummyData_400Rows_Shuffled.xlsx</code> 기준입니다.
              <br />
              주문 데이터 로드, 조건 설정, 검색, Export까지 이어지는 반복 업무 처리 흐름을 기준으로 구성.
            </p>
            <div className="guide-note">
              <b>업무 배경:</b> 판매사 이벤트 운영 후 주문자, 옵션, 수량, 주소 기준 통계를 수동 산출하고
              <br />
              Excel에 조건별 색상을 표시하던 반복 작업을 자동화하기 위해 제작.
            </div>
          </header>

          <ol className="guide-flow" aria-label="ExcelConditionPainter 사용 흐름">
            <li>
              <strong>1. Open</strong>
              <span>주문 데이터 로드</span>
            </li>
            <li>
              <strong>2. Set Conditions</strong>
              <span>컬럼 및 조건 기준 지정</span>
            </li>
            <li>
              <strong>3. Set</strong>
              <span>조건 결과 시각화</span>
            </li>
            <li>
              <strong>4. Ctrl+F</strong>
              <span>결과 위치 검색</span>
            </li>
            <li>
              <strong>5. Options</strong>
              <span>Export 정책 설정</span>
            </li>
            <li>
              <strong>6. Export</strong>
              <span>결과 파일 생성</span>
            </li>
          </ol>

          <section className="guide-section" aria-labelledby="open-excel-title">
            <h3 id="open-excel-title">1. 주문 데이터 로드</h3>
            <div className="guide-image-pair">
              <figure>
                <img src={`${assetPath}/main-window-before-set-cropped.png`} alt="조건 적용 전 메인 화면" />
                <figcaption>적용 전: 주문 데이터 로드 상태</figcaption>
              </figure>
              <figure>
                <img src={`${assetPath}/main-window-cropped.png`} alt="조건 적용 후 메인 화면" />
                <figcaption>적용 후: 조건 결과 시각화 상태</figcaption>
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
                      <b>Current file</b> 영역에 파일명 표시, <b>Excel Viewer</b> 영역에 주문 데이터 표시
                    </td>
                  </tr>
                  <tr>
                    <th>차이</th>
                    <td>
                      <b>Set</b> 적용 후 조건 결과를 색상 기준으로 구분
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="conditions-title">
            <h3 id="conditions-title">2. 조건 기준 설정</h3>
            <figure className="guide-figure guide-figure--medium">
              <img src={`${assetPath}/set-conditions-window.png`} alt="Set Conditions 창" />
              <figcaption>Set Conditions: 컬럼 매핑, 옵션 수량, 조건 목록 정의</figcaption>
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
                옵션명 옆 숫자: 실제 상품 수량.
                <br />
                예: <code>멀티비타민 -30병</code> → <code>30</code>
              </li>
              <li>컬럼 매핑 확인 후 하단 조건 목록 기준 조정</li>
            </ul>
          </section>

          <section className="guide-section" aria-labelledby="priority-title">
            <h3 id="priority-title">3. 조건 추가, 삭제, 우선순위 관리</h3>
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
                      필요 조건 추가, 불필요 조건은 <b>-</b>로 삭제
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
                    <td>정확한 조건 범위 산출</td>
                  </tr>
                  <tr>
                    <td>
                      <b>OR</b>
                    </td>
                    <td>선택 컬럼 중 하나라도 맞으면 포함</td>
                    <td>확장 조건 탐색</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Lv</b>
                    </td>
                    <td>조건 우선순위</td>
                    <td>
                      <code>0</code>은 항상 실행되는 기본 조건
                      <br />
                      중요 조건은 낮은 숫자, 보조 조건은 높은 숫자
                    </td>
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
            <h3 id="search-title">4. 결과 검색</h3>
            <figure className="guide-figure guide-figure--compact">
              <img src={`${assetPath}/search-window.png`} alt="Search 창" />
              <figcaption>
                <code>멀티비타민</code> 검색 결과
              </figcaption>
            </figure>
            <ol className="guide-checklist">
              <li>
                메인 화면 <b>Ctrl+F</b>
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
            <h3 id="options-title">5. Export 옵션 설정</h3>
            <figure className="guide-figure guide-figure--small">
              <img src={`${assetPath}/options-window.png`} alt="Options 창" />
              <figcaption>Export 분리 저장 및 조건별 기본 검색 방식</figcaption>
            </figure>
            <div className="guide-table-wrap">
              <table>
                <tbody>
                  <tr>
                    <th>Export Split By Conditions</th>
                    <td>조건별 결과 파일 분리 저장</td>
                  </tr>
                  <tr>
                    <th>조건별 기본 검색 방식</th>
                    <td>
                      신규 조건의 기본 <code>AND</code>/<code>OR</code> 값 정의
                    </td>
                  </tr>
                  <tr>
                    <th>Save</th>
                    <td>옵션 변경사항 저장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section" aria-labelledby="export-title">
            <h3 id="export-title">6. 결과 파일 Export</h3>
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
                      <b>Export Split By Conditions</b> 활성화 시 추가 생성
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="guide-note">
              <b>핵심:</b> 컬럼 매핑을 먼저 확인하고, <b>AND/OR</b>로 검색 범위를 정한 뒤, <b>Lv</b>와
              <br />
              색상 기준으로 중요도를 구분해 이벤트 주문 결과 확인 시간을 단축.
            </div>
          </section>
        </article>

        <AnalyticsNotice />
      </main>
    </div>
  );
}
