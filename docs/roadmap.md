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

## 현재 레포 구조

### 기술 스택

- 프론트엔드: React 19, Vite 8, React Router 7, Tailwind CSS 4, Chart.js, react-chartjs-2 사용함.
- 백엔드: Node.js, Express 5, Mongoose, MongoDB Atlas, axios, cheerio, Google Gemini API 사용함.
- 배포: Vercel static build와 `@vercel/node` serverless function을 같이 사용함.
- 외부 데이터: Open-Meteo 날씨/미세먼지 API, 창원대 학식 페이지 크롤링, Gemini API를 사용함.

### 폴더 구조

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
│   │   │   └── GpaPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
├── docs/
├── screenshots/
├── README.md
└── vercel.json
```

### 주요 컴포넌트

- `frontend/src/App.jsx`: 앱 shell, 헤더, 라우팅, 언어 토글, 다크모드 토글, 시계, 타이머/스톱워치 공용 상태를 담당함.
- `frontend/src/pages/MainPage.jsx`: 홈 대시보드, 날씨/미세먼지, 학식 drawer, 공지/와글 링크, campus shortcuts, 서비스 카드 구현 위치임.
- `frontend/src/pages/TodoPage.jsx`: ToDo CRUD, 중요도, 마감일, 밀리초 카운트다운, 검색/정렬/뷰 전환, 드래그 정렬, AI 비서 구현 위치임.
- `frontend/src/pages/GpaPage.jsx`: 학점 입력, 학기 탭, localStorage 저장, 학점 계산, 학점 그래프, 목표 학점 시뮬레이터, CSV 다운로드 구현 위치임.
- `backend/index.js`: API 서버, MongoDB 연결, 학식 크롤링, ToDo 저장 모델, Gemini 중계 구현 위치임.

### 라우팅 구조

`frontend/src/main.jsx`에서 `BrowserRouter`로 `App`을 감쌈. `frontend/src/App.jsx`에서 아래 라우트를 정의함.

- `/`: `MainPage`
- `/todo`: `TodoPage`
- `/gpa`: `GpaPage`

Vercel 배포에서는 `vercel.json`의 마지막 catch-all route가 SPA 새로고침을 `frontend/index.html`로 돌림.

## 기능별 구현 위치

### 캠퍼스 허브 홈

- `frontend/src/pages/MainPage.jsx`: 주요 링크, 날씨/미세먼지, 학식 패널, 서비스 카드 구현 위치임.
- 학식 패널은 `fetchFood`, `renderFoodCard`, 봉림관/사림관 drawer UI, 알레르기 토글을 포함함.

### ToDo와 학습 도구

- `frontend/src/pages/TodoPage.jsx`: ToDo 화면과 주요 로직 구현 위치임.
- `frontend/src/App.jsx`: timer/stopwatch 상태를 `TodoPage`로 props 전달함.
- `backend/index.js`: `/api/todo`, `/api/items/:id`, `/api/ai/generate`가 ToDo 저장과 수정, 삭제, AI 응답에 사용됨.

### 학점계산기

- `frontend/src/pages/GpaPage.jsx`: 학점계산기 전체 구현 위치임.
- 학점 데이터는 `localStorage`의 `cwnu_gpa_data_v2` 키에 저장됨.
- 백엔드 DB에 성적 데이터가 저장되지 않는 client-side only 구조임.
- Chart.js와 `react-chartjs-2`로 학기별 그래프를 렌더링함.
- `handleDownload` 함수가 BOM을 붙인 `text/csv;charset=utf-8` Blob을 만들고 `CWNU_GPA_Export.csv` 파일명으로 다운로드함.

### 다크모드와 다국어

- `frontend/tailwind.config.js`에서 `darkMode: 'class'`를 사용함.
- `frontend/src/index.css`에서 Tailwind import와 dark variant를 설정함.
- `frontend/src/App.jsx`에서 `cwnu_dark_mode` localStorage 값을 읽고 `document.documentElement.classList`에 `dark`를 추가/제거함.
- `frontend/src/App.jsx`, `MainPage.jsx`, `TodoPage.jsx`, `GpaPage.jsx`에 로컬 번역 객체가 분산되어 있음.
- 현재 앱 전역 언어는 `cwnu_lang` localStorage에 저장되며 `ko`와 `en` 중심임.
- 중국어 베타 지원 전 문자열 레지스트리 분리와 fallback 정책이 필요함.

### 백엔드와 배포

- `backend/index.js`의 `/api/food`가 창원대 학식 페이지를 axios와 cheerio로 크롤링함.
- `backend/index.js`의 `/api/ai/generate`가 Gemini API를 중계함.
- 루트 `vercel.json`에서 `backend/index.js`를 `@vercel/node`로 빌드함.
- `/api/(.*)`는 백엔드 serverless 함수로 전달함.
- `/proxy/weather`, `/proxy/dust`는 외부 Open-Meteo 계열 API로 전달함.
- 정적 asset과 SPA fallback route를 설정함.

## 정리 완료된 레거시 범위

- 운영자가 필요한 커뮤니티성 기능은 현재 앱의 런타임 라우팅과 홈 카드에서 제외함.
- 관련 프론트엔드 페이지 컴포넌트와 백엔드 API는 제품 방향에 맞게 정리함.
- 관련 스크린샷 파일은 현재 기능 기준 문서와 혼동되지 않도록 제거함.
- 영향 분석 기록은 별도 레거시 감사 문서와 AI 시뮬레이션 로그에 보존함.

## 리팩토링 시 주의할 점

- `backend/index.js`가 여러 책임을 한 파일에서 처리함. 라우터 분리 시 Vercel serverless export를 유지해야 함.
- `Item` 모델은 현재 ToDo 중심으로 사용함. 기존 데이터에 레거시 type 값이 남아 있을 수 있으므로 데이터 마이그레이션 정책은 별도로 결정해야 함.
- `App.jsx`가 전역 상태와 라우팅을 동시에 처리함. 타이머 상태를 유지할지 Todo 내부로 옮길지 먼저 결정해야 함.
- 다국어 문자열이 파일마다 분산되어 있어 중국어 추가 전 i18n 구조 정리가 필요함.
- 학식 크롤링은 외부 HTML 구조 변경에 취약함. selector와 빈 데이터 처리 테스트가 필요함.
- `frontend/src/App.css`는 현재 import되지 않는 템플릿 잔여 파일로 보임. 추후 정리 가능함.
- PWA/Capacitor 작업 전 API base URL, SPA route, asset path, manifest, icon, Android 권한을 함께 확인해야 함.

## 리팩토링 로드맵

### Phase 1: Legacy Audit

- 기존 기능과 파일 구조를 분석함.
- 유지/삭제/개선 후보를 분류함.
- 운영자가 필요한 커뮤니티성 기능의 제거 영향 범위를 분석함.
- 라우팅, API, MongoDB 모델, README, screenshots 참조 위치를 함께 확인함.
- 판단이 애매한 파일은 `deprecate candidate`로 기록함.

### Phase 2: Feature Pruning

- 커뮤니티성 기능을 현재 앱에서 제거함.
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

## 다음 우선 작업

1. 홈 대시보드 UI/UX를 모바일 중심으로 현대화함.
2. 주요 캠퍼스 링크 레지스트리를 구축함.
3. 학과별 즐겨찾기 기본값을 추가함.
4. 학식 패널 실패 상태와 주말 안내를 개선함.
5. PWA/Capacitor 도입 전 빌드와 배포 경로를 점검함.
