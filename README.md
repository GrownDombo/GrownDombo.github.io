# GrownDombo.github.io

React, Vite, TypeScript로 만든 GitHub Pages용 개발자 포트폴리오입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드 확인

```bash
npm run build
npm run preview
```

## 콘텐츠 수정

포트폴리오 문구, 프로젝트, 기술스택, 연락처는 `src/data/portfolio.ts`에서 교체할 수 있습니다.

## 배포

이 저장소는 사용자 페이지 저장소인 `GrownDombo.github.io`이므로 Vite `base`는 기본값 `/`를 사용합니다.

GitHub 저장소의 Settings -> Pages -> Build and deployment에서 Source를 `GitHub Actions`로 선택하면, `main` 브랜치 push 시 `.github/workflows/deploy.yml`이 사이트를 빌드하고 Pages에 배포합니다.

## 방문자 분석

Google Analytics 4를 사용합니다. GitHub 저장소의 Settings -> Secrets and variables -> Actions -> Variables에 `GA_MEASUREMENT_ID`를 등록하면 배포 빌드에 자동으로 반영됩니다.
