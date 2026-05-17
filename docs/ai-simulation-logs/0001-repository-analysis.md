# AI Simulation Log

## 작업 요약

- `cwnu-campus-hub` 레포 전체 구조를 분석함.
- 현재 기술스택, 폴더 구조, 주요 컴포넌트, 라우팅, 기능별 구현 위치, 제거 후보 기능 영향 범위를 정리함.
- `AGENTS.md`에 프로젝트 작업 규칙과 문체, 커밋, AI 로그 규칙을 문서화함.
- `docs/roadmap.md`에 분석 결과와 향후 리팩토링 로드맵을 작성함.
- 코드 기능 변경은 수행하지 않음.

## 사용자 프롬프트 요약

- 기존 소프트웨어공학 개인과제 레포에서 분리한 새 프로젝트로, 창원대학교 학생용 실사용 캠퍼스 허브 앱으로 발전시키라고 요청함.
- 중고장터, 분실물센터, 운영자 의존 커뮤니티 기능은 제거 또는 후순위 처리하되 먼저 영향 범위를 분석하라고 요청함.
- 커밋 메시지 형식, 문서 문체, 브랜치/PR/Issue 운영 규칙, AI 시뮬레이션 로그 규칙을 지정함.
- 첫 작업은 코드 수정 없이 레포 분석, 작업 규칙 문서화, 로드맵 정리까지만 수행하라고 요청함.

## Codex 응답 요약

- 대상 작업 디렉터리가 상위 폴더가 아니라 `cwnu-campus-hub` 하위 폴더임을 확인함.
- Git 상태가 `main...origin/main`이고 변경 전에는 clean 상태임을 확인함.
- 프론트엔드와 백엔드 설정, 페이지 컴포넌트, 배포 설정, README를 읽고 기능별 위치를 정리함.
- 중고장터/분실물센터 제거가 프론트 라우팅, 홈 카드, 백엔드 API, 공용 MongoDB `Item` 모델, README와 screenshots까지 영향을 준다고 판단함.
- 학점계산기와 성적 데이터는 백엔드가 아니라 localStorage 기반 client-side only 구조임을 확인함.

## 변경 파일

- `AGENTS.md`
- `docs/roadmap.md`
- `docs/ai-simulation-logs/0001-repository-analysis.md`

## 주요 변경 내용

- `AGENTS.md`에 프로젝트 정체성, 기술스택, 주요 파일 맵, 제거 후보 기능 원칙, 작업 방식, 커밋 메시지 규칙, 문체 규칙, AI 시뮬레이션 로그 규칙, 리팩토링 주의사항을 추가함.
- `docs/roadmap.md`에 요청한 14개 분석 항목을 정리함.
- `docs/roadmap.md`에 기반 정리, 제거/후순위화, 링크 허브, 홈 대시보드, ToDo/타이머, 학점계산기, 다크모드/다국어, PWA/APK, 테스트/배포 단계 로드맵을 추가함.
- AI 로그 파일에 이번 작업의 판단, 변경 파일, 검증 내용, 다음 작업을 기록함.

## 검증 내용

- `git status --short --branch` 실행함. 대상 레포가 `main...origin/main` 상태임을 확인함.
- `rg --files -g '!screenshots/**' -g '!node_modules/**'` 실행함. 주요 소스 파일과 설정 파일 목록을 확인함.
- `Get-Content -Encoding UTF8 frontend/src/App.jsx` 실행함. 라우팅, 다크모드, 언어, 타이머 상태 구현을 확인함.
- `Get-Content -Encoding UTF8 frontend/src/pages/MainPage.jsx` 실행함. 학식 패널, 날씨/미세먼지, 주요 링크, 서비스 카드 구현을 확인함.
- `Select-String`으로 `MarketPage.jsx`, `LostPage.jsx`, `TodoPage.jsx`, `GpaPage.jsx`, `backend/index.js`의 기능별 키워드를 확인함.
- `Get-Content -Encoding UTF8 vercel.json`, `frontend/vite.config.js`, `frontend/tailwind.config.js`, `frontend/index.css` 실행함. Vercel, Vite proxy, Tailwind dark mode 설정을 확인함.
- `git diff --check` 실행함. 공백 오류 없음.
- `git ls-files --others --exclude-standard` 실행함. 추가 대상 파일이 `AGENTS.md`, `docs/roadmap.md`, `docs/ai-simulation-logs/0001-repository-analysis.md` 3개임을 확인함.
- 기능 코드 변경이 없는 문서 작업이라 프론트엔드 빌드와 백엔드 실행 검증은 수행하지 않음.

## 커밋 메시지 제안

```text
[docs] - 레포 구조 분석 - 작업 규칙 및 로드맵 문서화
```

## 다음 작업

- README를 `cwnu-campus-hub` 프로젝트 기준으로 재작성함.
- 중고장터/분실물센터 제거 범위와 데이터 보존 여부를 별도 Issue로 정리함.
- 학교 링크 레지스트리와 학과 기반 즐겨찾기 구조를 설계함.
- 학식 패널의 주말, 빈 데이터, 크롤링 실패 상태를 개선함.
- PWA/Capacitor 도입 전 배포 경로와 API base URL 정책을 정리함.
