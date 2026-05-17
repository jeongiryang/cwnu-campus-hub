# AI Simulation Log

## 작업 요약
- 홈 대시보드를 앱형 구조로 전면 재구성함.

## 사용자 프롬프트 요약
- 사용자가 기존 UI 구조가 아직 많이 남아 있고, 중복 버튼과 기능이 많다고 지적함.
- 기존 코드의 UI 구조는 크게 신경 쓰지 말고 현대식 UI/UX로 다시 정리하길 요청함.

## Codex 응답 요약
- 홈 대시보드 전면 재구성 Issue를 생성함.
- 작업 브랜치를 생성함.
- MainPage의 중복 섹션과 기능 노출 위치를 분석함.
- 학식, 빠른 링크, 캠퍼스 유틸리티, 학업 도구, 내 학과 영역을 앱형 대시보드 구조로 재배치함.
- 상단 App 헤더에서 본문과 중복되던 학식, 도서관, 카피킬러, 인스타그램 버튼을 제거함.
- 비렌더링 상태로 남아 있던 legacy 대시보드 JSX와 전용 데이터를 제거함.
- 기존 기능 동작은 유지함.
- lint, build, audit 검증을 수행함.
- PR을 생성함.
- 자동 merge 조건을 만족하면 squash merge 후 브랜치를 정리함.

## 변경 파일
- frontend/src/App.jsx
- frontend/src/pages/MainPage.jsx
- docs/ai-simulation-logs/0015-home-dashboard-rebuild.md

## 주요 변경 내용
- 왼쪽 플로팅 학식 탭을 제거하고 대표 학식 카드에서 봉림관과 사림관 패널을 열도록 통합함.
- 빠른 링크, 공지, 캠퍼스 유틸리티를 학교 서비스 영역으로 통합함.
- e캠퍼스, 와글, 도서관, ToDo를 상단 주요 실행 버튼으로 배치함.
- 학업 도구 영역을 compact card 구조로 유지함.
- 내 학과 바로가기 영역은 localStorage 저장과 검증 필요 링크 비활성 표시를 유지하면서 더 compact하게 정리함.
- 기존 중복 대시보드 섹션은 더 이상 렌더링하지 않고 코드에서도 제거함.
- 학과별 공식 URL 검증, PWA 설정, 검색/커맨드 팔레트 기능은 후속 작업으로 넘김.

## 검증 내용
- `git diff --check` 실행 결과 통과함.
- `npm --prefix frontend run lint` 실행 결과 통과함.
- `npm --prefix frontend run build` 실행 결과 성공함. Vite 번들 크기 경고는 출력됐지만 빌드는 성공함.
- `npm --prefix frontend audit` 최초 실행은 registry audit endpoint 오류로 실패함.
- `npm --prefix frontend audit` 재실행 결과 `found 0 vulnerabilities` 확인함.
- backend, README, package.json, package-lock.json 변경 없음.
- 중고장터/분실물센터 링크를 다시 추가하지 않음.
- 검증되지 않은 URL을 추가하지 않음.

## 커밋 메시지 제안
[ui] - 홈 대시보드 전면 재구성 - 중복 기능 정리 및 앱형 레이아웃 적용

## 다음 작업
- 학과별 공식 URL 검증을 진행함.
- PWA 설정을 진행함.
- 필요 시 검색/커맨드 팔레트 기능을 별도 작업으로 설계함.
