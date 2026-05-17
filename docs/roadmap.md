# CWNU Campus Hub Roadmap

## 프로젝트 목표

`cwnu-campus-hub`는 기존 CWNU Smart Portal 과제를 바탕으로 창원대학교 학생이 자주 쓰는 학교 서비스와 학업 도구를 한 화면에서 접근하는 캠퍼스 허브 앱으로 발전시키는 프로젝트임.

우선순위는 주요 학교 링크 통합, 학식 확인, 사용자 학과 기반 즐겨찾기, ToDo와 타이머 개선, 학점계산기 개선, 다크모드와 다국어 품질 개선, PWA 및 Capacitor 기반 APK 패키징 가능 구조 정리임.

## 마이그레이션 전제

- 이 프로젝트는 기존 과제 코드를 단순 복사한 상태에서 시작함.
- 기존 과제 코드 보존이 아니라 제품화 방향으로 재구성함.
- 평가용 소공 레포와의 호환성을 고려하지 않아도 됨.
- 현재 레포에서는 CWNU Campus Hub 목표에 맞지 않는 기능을 삭제하거나 교체할 수 있음.
- 기존 기능을 무조건 유지하지 않고 실사용 가치 기준으로 재평가함.
- 학점계산기 그래프와 CSV 다운로드처럼 가치 있는 기능은 유지 및 개선함.
- 웹버전과 APK버전을 모두 고려하되, 우선 웹/PWA 구조를 정리하고 이후 Capacitor 기반 APK 패키징을 준비함.

## 현재 레포 분석

### 1. 현재 기술스택

- 프론트엔드: React 19, Vite 8, React Router 7, Tailwind CSS 4, Chart.js, react-chartjs-2 사용함.
- 백엔드: Node.js, Express 5, Mongoose, MongoDB Atlas, axios, cheerio, Google Gemini API 사용함.
- 배포: Vercel static build와 `@vercel/node` serverless function을 같이 사용함.
- 외부 데이터: Open-Meteo 날씨/미세먼지 API, 창원대 학식 페이지 크롤링, Gemini API를 사용함.

### 2. 폴더 구조

```text
cwnu-campus-hub/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── MainPage.jsx
│   │   │   ├── TodoPage.jsx
│   │   │   ├── MarketPage.jsx
│   │   │   ├── LostPage.jsx
│   │   │   └── GpaPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
├── screenshots/
├── README.md
└── vercel.json
```

### 3. 주요 컴포넌트

- `frontend/src/App.jsx`: 앱 shell, 헤더, 라우팅, 언어 토글, 다크모드 토글, 시계, 타이머/스톱워치 공용 상태를 담당함.
- `frontend/src/pages/MainPage.jsx`: 홈 대시보드, 날씨/미세먼지, 학식 drawer, 공지/와글 링크, campus shortcuts, 서비스 카드 구현 위치임.
- `frontend/src/pages/TodoPage.jsx`: ToDo CRUD, 중요도, 마감일, 밀리초 카운트다운, 검색/정렬/뷰 전환, 드래그 정렬, AI 비서 구현 위치임.
- `frontend/src/pages/GpaPage.jsx`: 학점 입력, 학기 탭, localStorage 저장, 학점 계산, 학점 그래프, 목표 학점 시뮬레이터, CSV 다운로드 구현 위치임.
- `frontend/src/pages/MarketPage.jsx`: 중고장터 CRUD, 검색/정렬, 찜, 완료 상태, AI 폼 자동완성 구현 위치임.
- `frontend/src/pages/LostPage.jsx`: 분실물센터 CRUD, 검색/정렬, 관심 수, 해결 상태, AI 폼 자동완성 구현 위치임.
- `backend/index.js`: API 서버, MongoDB 연결, 학식 크롤링, 공용 게시물 모델, Gemini 중계 구현 위치임.

### 4. 라우팅 구조

`frontend/src/main.jsx`에서 `BrowserRouter`로 `App`을 감쌈. `frontend/src/App.jsx`에서 아래 라우트를 정의함.

- `/`: `MainPage`
- `/market`: `MarketPage`
- `/lost`: `LostPage`
- `/todo`: `TodoPage`
- `/gpa`: `GpaPage`

Vercel 배포에서는 `vercel.json`의 마지막 catch-all route가 SPA 새로고침을 `frontend/index.html`로 돌림.

### 5. 중고장터/분실물센터 관련 파일 위치

- `frontend/src/pages/MarketPage.jsx`: 중고장터 화면 전체 구현 위치임.
- `frontend/src/pages/LostPage.jsx`: 분실물센터 화면 전체 구현 위치임.
- `frontend/src/App.jsx`: `MarketPage`, `LostPage` import, 내비게이션 링크, route 정의가 있음.
- `frontend/src/pages/MainPage.jsx`: 서비스 카드와 가이드 문구에 중고장터/분실물센터 항목이 있음.
- `backend/index.js`: `Item` schema의 `type` enum에 `market`, `lost`가 있고 `/api/market`, `/api/lost` CRUD가 있음.
- `README.md`와 `screenshots/`: 기존 과제 설명, 미리보기, 기능 설명 이미지가 남아 있음.

제거 영향은 프론트 라우팅, 홈 카드, 백엔드 API, MongoDB 기존 데이터, README, 스크린샷 문서 링크까지 연결됨.

### 6. 투두리스트 관련 파일 위치

- `frontend/src/pages/TodoPage.jsx`: ToDo 화면과 주요 로직 구현 위치임.
- `frontend/src/App.jsx`: timer/stopwatch 상태를 `TodoPage`로 props 전달함.
- `backend/index.js`: `/api/todo`, `/api/items/:id`, `/api/ai/generate`가 ToDo 저장과 수정, 삭제, AI 응답에 사용됨.

### 7. 학점계산기 관련 파일 위치

- `frontend/src/pages/GpaPage.jsx`: 학점계산기 전체 구현 위치임.
- 학점 데이터는 `localStorage`의 `cwnu_gpa_data_v2` 키에 저장됨.
- 백엔드 DB에 성적 데이터가 저장되지 않는 client-side only 구조임.

### 8. 학점 그래프 시각화 구현 위치

- `frontend/src/pages/GpaPage.jsx`에서 Chart.js와 `react-chartjs-2`를 import하고 등록함.
- 같은 파일의 `chartData`에서 학기별 이수 학점 bar와 학기 평점 line dataset을 구성함.
- 같은 파일의 `tour-chart` 영역에서 `<Chart type="bar" ... />`로 렌더링함.

### 9. CSV 다운로드 구현 위치

- `frontend/src/pages/GpaPage.jsx`의 `handleDownload` 함수가 CSV를 생성함.
- BOM을 붙인 `text/csv;charset=utf-8` Blob을 만들고 `CWNU_GPA_Export.csv` 파일명으로 다운로드함.
- 현재 README에는 엑셀 저장 표현이 있으나 실제 구현은 CSV 다운로드임.

### 10. 다크모드 구현 위치

- `frontend/tailwind.config.js`에서 `darkMode: 'class'`를 사용함.
- `frontend/src/index.css`에서 Tailwind import와 dark variant를 설정함.
- `frontend/src/App.jsx`에서 `cwnu_dark_mode` localStorage 값을 읽고 `document.documentElement.classList`에 `dark`를 추가/제거함.
- 각 페이지는 Tailwind `dark:` 유틸리티를 광범위하게 사용함.

### 11. 다국어 구현 위치

- `frontend/src/App.jsx`, `MainPage.jsx`, `TodoPage.jsx`, `MarketPage.jsx`, `LostPage.jsx`, `GpaPage.jsx`에 각자 `t`, `TITLE_MENTIONS`, `PLACEHOLDERS` 등 로컬 번역 객체가 있음.
- 현재 앱 전역 언어는 `cwnu_lang` localStorage에 저장되며 `ko`와 `en` 중심임.
- 중국어 베타 지원은 아직 구조화되어 있지 않음. 문자열 레지스트리 분리와 fallback 정책이 필요함.

### 12. 학식 패널 구현 위치

- 프론트: `frontend/src/pages/MainPage.jsx`의 `fetchFood`, `renderFoodCard`, 봉림관/사림관 drawer UI, 알레르기 토글 구현 위치임.
- 백엔드: `backend/index.js`의 `/api/food`가 창원대 학식 페이지를 axios와 cheerio로 크롤링함.
- 주말이면 별도 안내 데이터를 반환함.

### 13. Vercel 배포 관련 설정

- 루트 `vercel.json`에서 `backend/index.js`를 `@vercel/node`로 빌드함.
- `frontend/package.json`은 `@vercel/static-build`로 빌드하며 `dist`를 결과물로 사용함.
- `/api/(.*)`는 백엔드 serverless 함수로 전달함.
- `/proxy/weather`, `/proxy/dust`는 외부 Open-Meteo 계열 API로 전달함.
- 정적 asset과 SPA fallback route를 설정함.

### 14. 앞으로 리팩토링 시 주의할 점

- `backend/index.js`가 여러 책임을 한 파일에서 처리함. 라우터 분리 시 Vercel serverless export를 유지해야 함.
- `Item` 모델이 todo/market/lost를 같이 담는 구조임. 중고장터/분실물센터 제거 시 todo 데이터와 공용 item API 영향 확인이 필요함.
- `App.jsx`가 전역 상태와 라우팅을 동시에 처리함. 타이머 상태를 유지할지 Todo 내부로 옮길지 먼저 결정해야 함.
- 다국어 문자열이 파일마다 분산되어 있어 중국어 추가 전 i18n 구조 정리가 필요함.
- 학식 크롤링은 외부 HTML 구조 변경에 취약함. selector와 빈 데이터 처리 테스트가 필요함.
- `frontend/src/App.css`는 현재 import되지 않는 템플릿 잔여 파일로 보임. 추후 정리 가능함.
- README가 기존 과제 보고서와 기존 레포 URL 중심임. 새 프로젝트 목적에 맞게 개편해야 함.
- PWA/Capacitor 작업 전 API base URL, SPA route, asset path, manifest, icon, Android 권한을 함께 확인해야 함.

## 리팩토링 로드맵

### Phase 1: Legacy Audit

- 기존 기능과 파일 구조를 분석함.
- 유지/삭제/개선 후보를 분류함.
- 중고장터/분실물센터 제거 영향 범위를 분석함.
- 라우팅, API, MongoDB 모델, README, screenshots 참조 위치를 함께 확인함.
- 판단이 애매한 파일은 `deprecate candidate`로 기록함.

### Phase 2: Feature Pruning

- 중고장터 기능을 제거하거나 후순위 영역으로 이동함.
- 분실물센터 기능을 제거하거나 후순위 영역으로 이동함.
- 사용하지 않는 API 엔드포인트와 모델 필드를 정리함.
- 사용하지 않는 MongoDB enum 값을 정리함.
- README와 screenshots를 새 프로젝트 기준으로 정리함.
- 삭제 작업은 별도 브랜치와 PR에서 진행함.

### Phase 3: Campus Hub Core

- 주요 링크 레지스트리를 구축함.
- 전자출석, e캠퍼스, 와글, 도서관, 학사일정, 수강신청, 장학재단 등 핵심 링크를 카테고리화함.
- 학과별 즐겨찾기 기본값을 추가함.
- 학식 패널의 빈 데이터, 주말, 크롤링 실패 상태를 개선함.
- 홈 대시보드를 모바일 중심 캠퍼스 허브 화면으로 재설계함.

### Phase 4: Study Tools

- ToDo 기능을 학업 일정 관리 중심으로 개선함.
- 타이머와 스톱워치를 학습 도구로 재정리함.
- 학점계산기 입력 흐름과 localStorage 스키마를 개선함.
- 학점 그래프와 CSV 다운로드 기능을 정리함.
- 개인정보가 외부 서버로 전송되지 않는 구조를 문서와 구현에서 일치시킴.

### Phase 5: Web/PWA/APK

- PWA manifest와 아이콘을 정리함.
- 모바일 화면과 터치 사용성을 최적화함.
- 웹/PWA 배포 구조를 먼저 안정화함.
- Capacitor 기반 APK 패키징을 준비함.
- 웹뷰 권한, 외부 링크 열기, API base URL 정책을 점검함.

### 0단계. 프로젝트 기반 정리

- `AGENTS.md`, `docs/roadmap.md`, AI 시뮬레이션 로그 규칙을 유지함.
- README를 `cwnu-campus-hub` 기준으로 재작성함.
- 기존 레포 URL, 과제 보고서 문구, 중고장터/분실물 중심 설명을 새 방향에 맞게 분리함.
- 환경변수 목록과 로컬 실행 방법을 문서화함.

### 1단계. 중고장터/분실물센터 제거 또는 후순위화

- 홈 서비스 카드에서 중고장터/분실물센터를 제거하거나 비활성/후순위 영역으로 이동함.
- `/market`, `/lost` 라우트를 숨기거나 제거함.
- `MarketPage.jsx`, `LostPage.jsx`, 관련 README와 screenshot 참조를 정리함.
- 백엔드 `/api/market`, `/api/lost` 제거 여부와 기존 MongoDB 데이터 보존 여부를 별도 결정함.

### 2단계. 캠퍼스 링크 허브 구조 도입

- 학교 링크를 파일 기반 레지스트리로 분리함.
- 전자출석, e캠퍼스, 와글, 도서관, 학사일정, 수강신청, 장학재단, 드림캐치, 이뤄드림 등 주요 링크를 카테고리화함.
- 사용자 학과 기반 즐겨찾기 기본값을 제공함.
- 링크 변경 시 컴포넌트 수정 없이 데이터만 수정하는 구조로 만듦.

### 3단계. 홈 대시보드 개선

- 학식, 주요 링크, 개인 즐겨찾기, 오늘 할 일 요약을 모바일 우선 레이아웃으로 재구성함.
- 학식 패널은 빈 데이터, 주말, 크롤링 실패, 알레르기 정보를 명확히 표시함.
- 날씨/미세먼지는 실패해도 학식 렌더링을 막지 않게 유지함.

### 4단계. ToDo와 타이머 개선

- ToDo와 timer/stopwatch 상태 소유권을 재정의함.
- 마감일, 우선순위, 완료 상태, 검색/정렬/뷰 전환을 유지하며 모바일 조작성을 개선함.
- AI 비서 의존도를 낮추고 핵심 일정 관리 기능을 먼저 안정화함.

### 5단계. 학점계산기 개선

- CSV 다운로드 로직을 안전하게 정리하고 파일명, escaping, 빈 값 처리를 개선함.
- 학점 그래프를 학기별 평점, 전체 평점, 전공 평점 관점으로 더 명확히 시각화함.
- localStorage 데이터 스키마 버전과 마이그레이션 정책을 추가함.

### 6단계. 다크모드와 다국어 개선

- 분산된 번역 객체를 `src/i18n` 계층으로 분리함.
- 한국어/영어/중국어 베타 언어 키를 정리함.
- 다크모드 색상 토큰을 통일하고 컴포넌트별 대비 문제를 점검함.

### 7단계. PWA 및 APK 패키징 준비

- PWA manifest, 아이콘, service worker 전략을 추가함.
- Capacitor 초기 설정을 추가하고 Android 빌드 경로를 검증함.
- 웹과 APK에서 API 호출, 외부 링크 열기, 뒤로가기 동작을 구분해 점검함.

### 8단계. 테스트와 배포 품질 강화

- 최소 단위 테스트 또는 smoke test를 추가함.
- Vercel 배포 설정을 새 프로젝트 URL 기준으로 정리함.
- 학식 API, GPA CSV, 라우팅 fallback, 다크모드, 언어 전환을 배포 전 체크리스트로 관리함.

## 다음 우선 작업

1. README를 새 프로젝트 기준으로 재작성함.
2. 중고장터/분실물센터 제거 범위 Issue를 생성함.
3. 링크 레지스트리와 학과 즐겨찾기 설계를 추가함.
4. 학식 패널 실패 상태와 주말 안내를 개선함.
5. PWA/Capacitor 도입 전 빌드와 배포 경로를 점검함.
