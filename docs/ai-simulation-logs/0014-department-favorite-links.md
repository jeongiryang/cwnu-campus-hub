# AI Simulation Log

## 작업 요약
- 학과별 즐겨찾기 데이터 구조와 v1 UI를 추가함.

## 사용자 프롬프트 요약
- 사용자가 홈 대시보드 UI/UX 현대화 이후 학과별 즐겨찾기 데이터 구조 설계를 요청함.
- 전체 학과 데이터 수집이 아니라, 먼저 departmentLinks registry와 MainPage 연결 구조를 만드는 작업으로 제한함.

## Codex 응답 요약
- 학과별 즐겨찾기 데이터 구조 설계 Issue를 생성함.
- 작업 브랜치를 생성함.
- MainPage와 campusLinks 구조를 분석함.
- departmentLinks 데이터 파일을 추가함.
- MainPage에 학과 선택 및 학과 바로가기 v1 영역을 연결함.
- localStorage 기반 선택 학과 저장을 추가함.
- lint, build, audit 검증을 수행함.
- PR을 생성함.
- 자동 merge 조건을 만족하면 squash merge 후 브랜치를 정리함.

## 변경 파일
- frontend/src/data/departmentLinks.js
- frontend/src/pages/MainPage.jsx
- docs/ai-simulation-logs/0014-department-favorite-links.md

## 주요 변경 내용
- `departmentLinks` registry를 추가하고 학과, 단과대학, 학과별 링크 목록 구조를 정의함.
- MainPage의 학과 즐겨찾기 영역을 실제 학과 선택 UI와 링크 카드 영역으로 연결함.
- 선택 학과 id를 `cwnu.selectedDepartmentId` localStorage key에 저장함.
- 검증된 URL이 없는 샘플 학과 링크는 빈 URL, `needsVerification: true`, `disabled: true`로 관리함.
- 전체 학과 데이터 수집, 서버 저장, 인증 기반 즐겨찾기는 후속 작업으로 넘김.

## 검증 내용
- `git diff --check` 실행 결과 통과함.
- `npm --prefix frontend run lint` 실행 결과 통과함.
- `npm --prefix frontend run build` 실행 결과 성공함. Vite 번들 크기 경고는 출력됐지만 빌드는 성공함.
- `npm --prefix frontend audit` 최초 실행은 registry audit endpoint 오류로 실패함.
- `npm --prefix frontend audit` 재실행 결과 `found 0 vulnerabilities` 확인함.
- backend, README, package.json, package-lock.json 변경 없음.
- 검증되지 않은 URL을 클릭 가능한 링크로 추가하지 않음.

## 커밋 메시지 제안
[feat] - 학과별 즐겨찾기 데이터 구조 설계 - MainPage v1 연결

## 다음 작업
- 학과별 공식 URL 검증 작업을 진행함.
- 검증 필요 캠퍼스 링크를 확인함.
- PWA 설정을 진행함.
