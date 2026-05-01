# GrownDombo.github.io

개인 프로젝트와 개발 경험을 정리하기 위해 만든 GitHub Pages 기반 포트폴리오 웹사이트입니다.

React, Vite, TypeScript를 사용해 구성했으며,  
프로젝트 소개, 기술 스택, 개발 경험, 연락처 정보를 한 페이지에서 확인할 수 있도록 제작했습니다.

## 주요 내용

- 개발자 소개
- 주요 프로젝트 정리
- 기술 스택 정리
- GitHub 및 블로그 링크 연결
- GitHub Pages 배포
- Google Analytics 4 방문자 분석 적용

## 기술 스택

- React
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions
- Google Analytics 4

## 개발 방식

본 프로젝트는 AI 도구를 활용해 초기 구조와 UI 구성을 빠르게 잡고,  
포트폴리오 문구, 프로젝트 구성, 기술 스택 정리, 배포 설정을 직접 검토하며 제작했습니다.

단순한 웹사이트 제작보다,  
개인 프로젝트와 개발 경험을 정리하고 공개 가능한 형태로 관리하는 것을 목표로 했습니다.

## 디자인 출처

이력서 페이지의 문서형 레이아웃은 Figma Community의
[개발자 이력서 템플릿](https://www.figma.com/design/ruqRkzKlOhoko97nrMBb3O/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B4%EB%A0%A5%EC%84%9C-%ED%85%9C%ED%94%8C%EB%A6%BF--Community-?node-id=2-111)을 참고해 웹 환경에 맞게 재구성했습니다.

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
