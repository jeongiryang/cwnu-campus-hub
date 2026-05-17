# AI Simulation Log

## 작업 요약
- 주요 캠퍼스 링크 레지스트리를 구축함.

## 사용자 프롬프트 요약
- 사용자가 보안, lint 정리 이후 홈 대시보드 UI/UX 현대화 전에 주요 캠퍼스 링크 레지스트리 구축을 요청함.
- 학교 공식 링크를 별도 데이터 구조로 분리하고, MainPage가 이를 참조하도록 정리할 것을 요청함.

## Codex 응답 요약
- 주요 캠퍼스 링크 레지스트리 구축 Issue를 생성함.
- 작업 브랜치를 생성함.
- 기존 MainPage 링크 구조를 분석함.
- campusLinks 데이터 파일을 추가함.
- MainPage의 공지 버튼과 shortcut 카드 참조를 registry 기반으로 정리함.
- lint, build, audit 검증을 수행함.
- PR을 생성함.
- 자동 merge 조건을 만족하면 squash merge 후 브랜치를 정리함.

## 변경 파일
- frontend/src/data/campusLinks.js
- frontend/src/pages/MainPage.jsx
- docs/ai-simulation-logs/0012-campus-link-registry.md

## 주요 변경 내용
- `campusLinks` 배열을 추가하고 id, category, labelKo, labelEn, labelZh, descriptionKo, url, icon, featured 필드를 사용함.
- `campusLinksById`, `campusNoticeLinkIds`, `campusQuickLinkIds`, `getCampusLinkLabel` helper를 추가함.
- MainPage 공지 버튼 2개와 shortcut 카드 8개를 registry에서 파생해 렌더링하도록 정리함.
- 기존 코드에 있던 공개 링크만 사용함.
- 추가 링크 후보 중 전자출석과 장학재단은 기존 코드에서 검증된 URL을 찾지 못해 이번 registry에 추가하지 않음.

## 검증 내용
- `rg "http|https|ecampus|wagle|library|도서관|전자출석|학사|수강|장학|CopyKiller|Dream|이뤄드림|instagram|인스타|food|학식" frontend/src`로 기존 링크 위치를 확인함.
- `rg "market|MarketPage|/api/market|lost|LostPage|/api/lost" frontend/src` 결과: 런타임 코드 참조 없음.
- `git diff --check` 결과: 통과함.
- `npm --prefix frontend run lint` 결과: 통과함.
- `npm --prefix frontend run build` 결과: 성공함. Vite 번들 크기 경고는 유지됨.
- `npm --prefix frontend audit` 결과: 0 vulnerabilities 유지함.
- package.json과 package-lock.json 변경 없음.
- backend 변경 없음.
- README 변경 없음.
- 예상 밖 파일 변경 없음.

## 커밋 메시지 제안
[feat] - 주요 캠퍼스 링크 레지스트리 구축 - MainPage 링크 데이터 분리

## 다음 작업
- 홈 대시보드 UI/UX 현대화 작업을 진행함.
- 학과별 즐겨찾기 데이터 구조를 설계함.
