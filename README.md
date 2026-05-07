# GrownDombo.github.io

개인 프로젝트와 실무 경험을 정리한 GitHub Pages 기반 포트폴리오입니다.

React, Vite, TypeScript로 구성했으며 홈, 프로젝트 상세, 문서형 이력서, 외부 링크를 한 곳에서 확인할 수 있도록 정리했습니다.

## 주요 내용

- 개발자 소개 및 핵심 성과
- 업무 사례와 개인 프로젝트 상세 페이지
- 기술 스택과 경험 요약
- 문서형 이력서 페이지
- GitHub, Tech Blog, 이메일 연결
- GitHub Pages 배포 및 Google Analytics 4 적용

## 기술 스택

- React
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions
- Google Analytics 4

## 디자인 참고

이 사이트는 아래 Figma Community 템플릿의 구조와 톤을 참고하되, 현재 콘텐츠와 웹 사용성에 맞게 재구성했습니다.

- 이력서: [개발자 이력서 템플릿](https://www.figma.com/design/ruqRkzKlOhoko97nrMBb3O/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C-%ED%85%9C%ED%94%8C%EB%A6%BF--Community-?node-id=2-111)
- 포트폴리오: [Website Developer Personal PortFolio Template](https://www.figma.com/design/zZW0XBbhuSu8wj1U3hYFAc/Website-Developer-Personal-PortFolio-Template--Community-?node-id=1-4)
- 포트폴리오 템플릿 원작자: confident_coder

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

포트폴리오 문구, 프로젝트, 기술 스택, 연락처 정보는 `src/data/portfolio.ts`에서 수정할 수 있습니다.

## 배포

이 저장소는 사용자 페이지 저장소인 `GrownDombo.github.io`이므로 Vite `base`는 기본값 `/`를 사용합니다.

GitHub 저장소의 Settings -> Pages -> Build and deployment에서 Source를 `GitHub Actions`로 선택하면, `main` 브랜치 push 시 `.github/workflows/deploy.yml`이 사이트를 빌드하고 Pages에 배포합니다.

## 방문자 분석

Google Analytics 4를 사용합니다. GitHub 저장소의 Settings -> Secrets and variables -> Actions -> Variables에 `GA_MEASUREMENT_ID`를 등록하면 배포 빌드에 자동으로 반영됩니다.
