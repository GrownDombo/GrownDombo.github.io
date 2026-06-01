# GrownDombo.github.io

개인 프로젝트와 실무 경험을 정리한 GitHub Pages 기반 포트폴리오입니다.

React, TypeScript, Vite, React Router로 구성했으며 개발자 소개, 업무 개선 사례, GitHub 프로젝트 상세, 문서형 이력서와 경력기술서, PDF 저장, 외부 채널 링크를 한 곳에서 확인할 수 있도록 정리했습니다.

## 주요 내용

- 개발자 소개 및 핵심 성과
- 업무 사례와 개인 프로젝트 상세 페이지
- 코드 블록, CLI 실행 예시, 처리 흐름 시각화
- 기술 스택과 경력 요약
- 문서형 이력서와 경력기술서 페이지 및 PDF 저장
- 이력서 주요 성과에서 포트폴리오 상세 페이지로 이동하는 링크
- GitHub, Tech Blog, 이메일 연결
- GitHub Pages 배포 및 Google Analytics 4 적용

## 기술 스택

- React 19
- React Router 7
- React To Print
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions
- Google Analytics 4

## 프로젝트 구조

```text
src/
  analytics/     Google Analytics 이벤트 및 페이지뷰 처리
  components/    공통 UI 컴포넌트
  data/          포트폴리오, 이력서, 경력기술서, 내비게이션 데이터
  hooks/         테마, 라우팅, 스크롤, 분석 side effect
  pages/         홈, 이력서, 경력기술서, 프로젝트 상세 페이지
  routes/        public URL과 legacy route 매핑
  styles/        base/layout/home/projects/resume 등 CSS 분리
  types/         라우팅과 페이지 공통 타입
```

`src/App.tsx`는 최상위 route composition만 담당하고, 화면과 데이터는 `pages`, `components`, `data`, `hooks`로 분리했습니다.

## 라우팅

React Router의 `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Link/NavLink`를 사용합니다.

주요 URL은 아래와 같습니다.

- `/`
- `/resume`
- `/career`
- `/projects/excel-condition-painter`
- `/projects/cpu-memory-stress-test`
- `/projects/rfid-collision-search-simulator`
- `/work/gerber-part-roi-matching-optimization`
- `/work/hotkey-ux-ui-response-optimization`
- `/work/mes-secs-gem-data-flow`
- `/work/remote-shared-folder-io-bottleneck`
- `/work/defect-polygon-visualization-standardization`
- `/work/defect-history-data-layer`

기존 `/projects/industrial-aoi-platform/...` legacy URL은 동일 상세 페이지로 매핑합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

Windows PowerShell 실행 정책 때문에 `npm`이 막히면 아래처럼 `.cmd` 실행 파일을 사용합니다.

```powershell
npm.cmd install
npm.cmd run dev
```

## 빌드 확인

```bash
npm run build
npm run preview
```

Windows PowerShell에서는 다음 명령도 사용할 수 있습니다.

```powershell
npx.cmd tsc -b --pretty false
npm.cmd run build
```

## 문서 PDF 저장

`/resume`과 `/career` 페이지에는 `react-to-print` 기반의 `PDF로 저장` 버튼을 제공합니다.

- 출력 대상은 각 문서 본문 영역으로 제한합니다.
- PDF/인쇄 시 사이트 헤더, 저장 버튼, 분석 안내 문구는 숨깁니다.
- 다크모드 상태에서도 PDF는 흰 배경 기준으로 출력합니다.
- 섹션 구분선, 여백, 페이지 분리 규칙을 인쇄 전용 CSS에서 별도로 조정합니다.
- 주요 성과와 대표 프로젝트 제목 옆 상세 링크 아이콘은 PDF에서도 보이도록 유지합니다.

브라우저 인쇄창에서 대상 프린터를 `PDF로 저장` 또는 `Save as PDF`로 선택해 파일로 저장합니다.

## 콘텐츠 수정

- 포트폴리오 기본 정보, 성과, 프로젝트: `src/data/portfolio.ts`
- 이력서 정보: `src/data/resume.ts`
- 경력기술서 정보: `src/data/career.ts`
- 이력서 화면과 PDF 저장 버튼: `src/pages/ResumePage.tsx`
- 경력기술서 화면과 PDF 저장 버튼: `src/pages/CareerPage.tsx`
- 문서형 화면과 인쇄 전용 스타일: `src/styles/resume.css`, `src/styles/career.css`
- 내비게이션 항목: `src/data/navigation.ts`
- 프로젝트 상세 페이지별 설정: `src/pages/projects/*Config.ts`, `src/pages/projects/industrialAoiData.ts`
- URL 경로와 legacy 매핑: `src/routes/paths.ts`

## 배포

이 저장소는 사용자 페이지 저장소인 `GrownDombo.github.io`이므로 Vite `base`는 기본값 `/`를 사용합니다.

GitHub 저장소의 Settings -> Pages -> Build and deployment에서 Source를 `GitHub Actions`로 선택하면, `main` 브랜치 push 시 `.github/workflows/deploy.yml`이 사이트를 빌드하고 Pages에 배포합니다.

React Router의 Browser History를 사용하므로 GitHub Pages 직접 접근을 위해 `public/404.html` fallback을 유지합니다. `/resume` 또는 `/projects/...`로 직접 접속하면 GitHub Pages가 `404.html`을 반환하고, 해당 스크립트가 `/?redirect=...`로 이동한 뒤 `index.html`이 원래 경로로 복원합니다.

현재 구조는 `https://growndombo.github.io/` 같은 루트 사용자 페이지에 맞춰져 있습니다. `https://사용자.github.io/레포명/` 형태의 하위 경로 배포로 바꾸는 경우에는 Vite `base`, React Router `basename`, 404 redirect 경로를 함께 조정해야 합니다.

## 방문자 분석

Google Analytics 4를 사용합니다. GitHub 저장소의 Settings -> Secrets and variables -> Actions -> Variables에 `GA_MEASUREMENT_ID`를 등록하면 배포 빌드에 자동으로 반영됩니다.

## 디자인 참고

이 사이트는 아래 Figma Community 템플릿의 구조와 톤을 참고하되, 템플릿을 그대로 복제하지 않고 현재 콘텐츠와 웹 사용성에 맞게 재구성했습니다.

- 이력서: [개발자 이력서 템플릿](https://www.figma.com/design/ruqRkzKlOhoko97nrMBb3O/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C-%ED%85%9C%ED%94%8C%EB%A6%BF--Community-?node-id=2-111)
- 포트폴리오: [Website Developer Personal PortFolio Template](https://www.figma.com/design/zZW0XBbhuSu8wj1U3hYFAc/Website-Developer-Personal-PortFolio-Template--Community-?node-id=1-4)
- 코드 블록: [Code block / Syntax highlighting](https://www.figma.com/design/SeFyUSh9fQGcf9hpKzOx0i/Code-block--Syntax-highlighting--Bloc-de-code--%E4%BB%A3%E7%A0%81%E5%9D%97--%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE--%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF--Community-?node-id=0-1)
- 포트폴리오 템플릿 원작자: confident_coder
