# AGENTS.md

## 프로젝트 정체성

`cwnu-campus-hub`는 기존 소프트웨어공학 개인과제 레포에서 분리한 새 프로젝트다. 목표는 기존 CWNU Smart Portal 과제 결과물을 창원대학교 학생이 실제로 쓰는 캠퍼스 허브 웹앱으로 발전시키는 것임.

핵심 방향은 학교 서비스 링크 통합, 학식 확인, 전자출석/e캠퍼스/와글/도서관/학사일정/수강신청/장학재단 바로가기, 사용자 학과 기반 즐겨찾기, ToDo List 개선, 스톱워치/타이머 개선, 학점계산기 개선, 학점 그래프 시각화, CSV 다운로드, 다크모드, 한국어/영어/중국어 베타 다국어 지원, PWA 및 Capacitor 기반 APK 패키징 준비임.

## 마이그레이션 원칙

이 프로젝트는 기존 소프트웨어공학 개인과제 코드를 단순 복사한 상태에서 시작함. 현재 레포의 목적은 기존 과제 코드 보존이 아니라 CWNU Campus Hub 제품화 방향으로 재구성하는 것임.

- 평가용 소공 레포와의 호환성을 고려하지 않아도 됨.
- 기존 기능을 무조건 유지하지 않고 실사용 가치 기준으로 재평가함.
- CWNU Campus Hub 목표에 맞지 않는 기능은 삭제하거나 교체할 수 있음.
- 학점계산기 그래프, CSV 다운로드, 학식 API처럼 실사용 가치가 있는 기능은 유지 및 개선함.
- 웹버전과 APK버전을 모두 고려하되, 우선 웹/PWA 구조를 정리하고 이후 Capacitor 기반 APK 패키징을 준비함.
- 기존 과제 문서와 스크린샷은 제품 문서로 재사용 가능한지 판단한 뒤 유지/삭제/보관 여부를 정함.

## 현재 기술 스택

- 프론트엔드는 `frontend/`에 있음. React 19, Vite 8, React Router 7, Tailwind CSS 4, Chart.js, react-chartjs-2를 사용함.
- 백엔드는 `backend/`에 있음. Node.js, Express 5, Mongoose, MongoDB Atlas, axios, cheerio, Google Gemini API 연동을 사용함.
- 배포는 루트 `vercel.json`에서 Vercel static build와 Node serverless function을 함께 설정함.
- 개발 서버에서는 `frontend/vite.config.js`가 `/api`, `/proxy/weather`, `/proxy/dust` 프록시를 담당함.

## 주요 파일 맵

- `frontend/src/App.jsx`: 전역 라우팅, 헤더, 다크모드, 언어 선택, 시계, 타이머/스톱워치 공용 상태를 담당함.
- `frontend/src/pages/MainPage.jsx`: 홈 대시보드, 학식 패널, 날씨/미세먼지, 학교 링크 바로가기, 서비스 카드 구현 위치임.
- `frontend/src/pages/TodoPage.jsx`: ToDo CRUD, 중요도, 마감일, 검색, 정렬, 뷰 전환, 드래그 정렬, AI 비서, 타이머 UI 구현 위치임.
- `frontend/src/pages/GpaPage.jsx`: 학점계산기, 학기 탭, 로컬 저장소, 학점 그래프, 목표 학점 시뮬레이터, CSV 다운로드 구현 위치임.
- `frontend/src/pages/MarketPage.jsx`: 중고장터 구현 위치이며 후순위 또는 제거 후보임.
- `frontend/src/pages/LostPage.jsx`: 분실물센터 구현 위치이며 후순위 또는 제거 후보임.
- `backend/index.js`: MongoDB 연결, 공용 `Item` 모델, 학식 크롤링 API, market/todo/lost CRUD API, 공용 item update/delete/like API, Gemini 중계 API 구현 위치임.
- `frontend/src/index.css`: Tailwind import와 class 기반 dark variant 설정 위치임.
- `frontend/src/App.css`: 현재 앱에서 import되지 않는 Vite 템플릿 잔여 스타일로 보임.

## 제거 또는 후순위 기능 원칙

중고장터와 분실물센터는 실사용성 대비 운영 부담이 큰 커뮤니티성 기능으로 취급함. 제거 또는 후순위 처리 전 아래 영향을 먼저 정리함.

- `App.jsx`의 import, 상단 내비게이션, `/market`, `/lost` 라우트 제거 또는 숨김 처리 필요함.
- `MainPage.jsx`의 서비스 카드와 가이드 문구에서 중고장터/분실물센터 항목 제거 또는 다른 캠퍼스 도구로 대체 필요함.
- `MarketPage.jsx`, `LostPage.jsx` 자체 파일은 제거 후보임.
- `backend/index.js`의 `Item` schema `type` enum, `/api/market`, `/api/lost`, 공용 `/api/items/:id/like` 사용 범위 확인 필요함.
- MongoDB에 기존 `market`, `lost` type 데이터가 있을 수 있으므로 데이터 삭제 여부는 별도 결정 필요함.
- README와 screenshots에는 중고장터/분실물센터 설명과 이미지가 많으므로 문서 정리도 별도 작업으로 처리함.

## Legacy Code 관리 원칙

이 레포에는 기존 소공 개인과제 코드가 그대로 포함되어 있음. 따라서 앞으로 작업할 때는 기존 파일을 무조건 유지하지 않고, CWNU Campus Hub의 목표에 맞는지 기준으로 유지/삭제/개선 여부를 판단함.

### 유지할 파일/기능

아래에 해당하는 기능과 파일은 유지하거나 개선함.

- 주요 학교 링크 기능
- 학식 확인 기능
- ToDo List
- 스톱워치
- 타이머
- 학점계산기
- 학점 그래프 시각화
- CSV 다운로드 기능
- 다크모드
- 다국어 기능
- UI/UX 개선에 재사용 가능한 컴포넌트
- Vite, React, Tailwind, Vercel 배포에 필요한 설정 파일
- 백엔드 중 학식 API처럼 실제 사용 가치가 있는 기능

### 제거 또는 후순위 처리할 파일/기능

아래에 해당하는 기능과 파일은 제거하거나 후순위 처리함.

- 중고장터
- 분실물센터
- 운영자가 필요한 커뮤니티성 기능
- 더 이상 사용하지 않는 라우트
- 연결되지 않은 컴포넌트
- 오래된 스크린샷
- 기존 소공 과제 설명에만 필요한 문서
- CWNU Campus Hub 방향과 맞지 않는 임시 코드
- 사용되지 않는 API 엔드포인트
- 사용되지 않는 MongoDB 모델 또는 enum 값

### 정리 방식

- 큰 삭제나 구조 변경은 반드시 별도 브랜치와 PR로 진행함.
- 삭제 전 영향 범위를 먼저 분석함.
- 삭제 대상 파일, 참조 위치, 라우팅 영향, README/screenshot 영향을 함께 정리함.
- 기능 제거 후 가능한 경우 `npm run build`로 검증함.
- 삭제한 이유를 PR과 AI 시뮬레이션 로그에 남김.
- 판단이 애매한 파일은 바로 삭제하지 않고 `deprecate candidate`로 문서화함.
- 커밋과 push는 사용자가 직접 수행함. Codex는 사용자의 명시 요청 없이 임의로 커밋하거나 push하지 않음.

## 작업 방식

- 큰 기능 추가, 구조 변경, 많은 파일 변경은 feature 브랜치에서 작업 후 PR 생성함.
- 작은 문서 수정, 오타 수정, 작은 설정 변경은 main 직접 커밋 가능함. 단, Codex는 사용자가 명시적으로 요청한 경우에만 커밋을 수행함.
- Issue는 중요 기능 변경, 작업 계획, 진행 상황 요약, 큰 리팩토링 단위에 사용함.
- PR에는 변경 목적, 변경 파일, 검증 결과, 다음 작업을 정리함.
- 코드 기능 변경 전에는 관련 파일과 라우팅, API 영향 범위를 먼저 확인함.
- 사용자가 분석만 요청한 작업에서는 기능 코드를 수정하지 않음.

## 커밋 메시지 규칙

커밋 메시지는 아래 형식을 사용함.

```text
[type] - 한글 내용 - 한글 내용
```

사용 가능한 type은 `[feat]`, `[fix]`, `[refactor]`, `[ui]`, `[docs]`, `[build]`, `[chore]`, `[test]`임.

예시:

```text
[docs] - 작업 규칙 추가 - AGENTS 문서 생성
[refactor] - 중고장터 기능 제거 - 라우팅 및 카드 정리
[ui] - 홈 대시보드 개선 - 모바일 중심 카드 레이아웃 적용
[feat] - 학과 즐겨찾기 추가 - 학과별 링크 레지스트리 생성
[fix] - 학식 패널 오류 수정 - 주말 빈 데이터 안내 개선
[build] - PWA 설정 추가 - manifest 및 아이콘 정리
```

## 문체 규칙

PR, Issue, README, docs, AI 시뮬레이션 로그, 작업 요약은 간결한 한국어 문체로 작성함.

사용 문체:

- `~함`
- `~다`
- `~했음`
- `~사용함`
- `~구현함`
- `~수정함`

피할 문체:

- `~했습니다`
- `~하였습니다`
- `~됩니다`
- `~주세요`
- 과하게 공손한 문체
- 과장된 홍보 문구

## AI 시뮬레이션 로그 규칙

Codex가 작업을 수행할 때마다 `docs/ai-simulation-logs/` 아래에 작업 단위별 Markdown 로그를 생성함.

파일명 예시:

```text
docs/ai-simulation-logs/0001-repository-analysis.md
docs/ai-simulation-logs/0002-project-rules.md
docs/ai-simulation-logs/0003-remove-marketplace-lost-found.md
docs/ai-simulation-logs/0004-redesign-dashboard.md
```

각 로그에는 작업 요약, 사용자 프롬프트 요약, Codex 응답 요약, 변경 파일, 주요 변경 내용, 검증 내용, 커밋 메시지 제안, 다음 작업을 포함함.

## 리팩토링 주의사항

- `App.jsx`가 라우팅뿐 아니라 다크모드, 언어, 시계, 타이머 상태까지 가진 큰 컴포넌트임. 기능 분리 시 전역 상태 경계를 먼저 정해야 함.
- `TodoPage.jsx`, `MarketPage.jsx`, `LostPage.jsx`는 AI 채팅 UI와 폼 자동완성 로직이 중복됨. 중고장터/분실물센터 제거 전 공용 API가 ToDo에 필요한지 확인함.
- `backend/index.js`는 모든 API가 한 파일에 몰려 있음. 라우터 분리 시 Vercel serverless export 구조를 유지해야 함.
- 학점계산기 데이터는 브라우저 localStorage에만 저장됨. 개인정보 보호 설명과 실제 저장 방식이 어긋나지 않게 유지함.
- 학식 기능은 창원대 페이지 HTML 구조에 의존함. 크롤링 selector 변경 가능성을 고려해야 함.
- `lang`은 현재 `ko`/`en` 중심임. 중국어 베타 추가 전 문자열 레지스트리 분리와 fallback 정책이 필요함.
- `README.md`는 기존 과제 레포 URL과 소프트웨어공학 보고서 성격이 강함. 새 프로젝트 브랜딩에 맞게 별도 정리 필요함.
- PWA/Capacitor 작업 전 라우팅, asset 경로, API base URL, 웹뷰 권한, 아이콘/스플래시 리소스를 함께 검토함.
