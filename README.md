# CWNU Campus Hub

창원대학교 학생을 위한 개인화 캠퍼스 허브 웹앱임. 흩어진 학교 서비스 링크와 학업 도구를 한 화면에서 사용할 수 있도록 구성함.

## 프로젝트 배경

* 기존 소프트웨어공학 개인과제였던 CWNU Smart Portal을 기반으로 분리한 독립 프로젝트임.
* 기존 과제 레포는 평가용으로 보존함.
* 현재 레포에서는 실사용성과 제품화 방향에 맞게 기능을 재구성함.
* 기존 평가용 레포는 아래 링크에서 확인 가능함.
* https://github.com/jeongiryang/todo-app-mini-project-20222017.git

## 주요 목표

* 창원대학교 주요 서비스 접근성을 개선함.
* 학생이 자주 쓰는 링크를 한 화면에서 관리함.
* 학식, ToDo, 타이머, 스톱워치, 학점계산기 기능을 통합함.
* 학점 그래프 시각화와 CSV 다운로드 기능을 제공함.
* 웹버전과 PWA/APK 버전을 모두 고려함.

## 주요 기능

* 캠퍼스 링크 허브
* 학식
* ToDo List
* 스톱워치
* 타이머
* 명언 표시 기능
* 학점계산기
* 학점 그래프 시각화
* CSV 다운로드
* 다크모드
* 다국어
* 학과별 즐겨찾기 예정

## 기술 스택

### Frontend

* React 19
* Vite 8
* React Router 7
* Tailwind CSS 4
* Chart.js
* react-chartjs-2

### Backend

* Express 5
* Mongoose / MongoDB Atlas
* cheerio 기반 학식 데이터 처리
* Gemini API 중계 기능

### Deployment

* Vercel 배포 고려
* 향후 PWA와 Capacitor 기반 APK 패키징 준비

## 실행 방법

루트에는 통합 `package.json`이 없음. 프론트엔드와 백엔드는 각각의 하위 폴더에서 의존성을 설치하고 실행함.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

사용 가능한 주요 스크립트:

* `npm run dev`: Vite 개발 서버 실행함.
* `npm run build`: 정적 빌드 생성함.
* `npm run lint`: ESLint 검사 실행함.
* `npm run preview`: 빌드 결과 미리보기 실행함.

### Backend

```bash
cd backend
npm install
npm run dev
```

사용 가능한 주요 스크립트:

* `npm run dev`: nodemon으로 개발 서버 실행함.
* `npm start`: Node.js로 서버 실행함.
* `npm test`: 현재 기본 placeholder이며 실제 테스트는 아직 없음.

백엔드는 `MONGODB_URI`, `GEMINI_API_KEY` 환경변수를 사용함. 로컬 실행 시 `backend/.env` 파일에 필요한 값을 설정함.

## 개발 방향

### Phase 1: Legacy Audit

* 기존 기능과 파일 구조를 분석함.
* 유지/삭제/개선 후보를 분류함.
* 레거시 커뮤니티 기능 제거 영향을 분석함.

### Phase 2: Feature Pruning

* 운영자가 필요한 커뮤니티성 기능을 현재 앱 기능에서 제외함.
* 사용하지 않는 API와 모델을 정리함.
* README와 screenshots를 현재 기능 기준으로 정리함.

### Phase 3: Campus Hub Core

* 주요 링크 레지스트리를 구축함.
* 학과별 즐겨찾기를 추가함.
* 학식 패널을 개선함.
* 홈 대시보드를 재설계함.

### Phase 4: Study Tools

* ToDo 기능을 개선함.
* 타이머와 스톱워치를 개선함.
* 학점계산기를 개선함.
* 그래프와 CSV 기능을 정리함.

### Phase 5: Web/PWA/APK

* PWA 설정을 추가함.
* 모바일 UI를 최적화함.
* Capacitor 기반 APK 패키징을 준비함.

## 레거시 기능 처리 방향

이 레포는 기존 소공 개인과제 코드를 기반으로 시작했지만, 기존 기능을 무조건 보존하지 않음. CWNU Campus Hub의 실사용 가치 기준으로 유지, 제거, 개선 여부를 재평가함.

유지 또는 개선 대상:

* 주요 학교 링크 기능
* 학식 확인 기능
* ToDo List
* 스톱워치와 타이머
* 학점계산기
* 학점 그래프 시각화
* CSV 다운로드
* 다크모드
* 다국어
* Vite, React, Tailwind, Vercel 배포 설정

정리된 또는 후순위 처리 대상:

* 운영자가 필요한 커뮤니티성 기능
* 사용하지 않는 라우트와 컴포넌트
* 사용하지 않는 API 엔드포인트
* 기존 과제 설명에만 필요한 문서와 오래된 스크린샷

## 작업 규칙

커밋 메시지는 아래 형식을 사용함.

```text
[type] - 한글 내용 - 한글 내용
```

예시:

```text
[docs] - README 프로젝트 방향 정리 - Campus Hub 소개 반영
[refactor] - 레거시 기능 제거 - 라우팅 및 API 정리
[ui] - 홈 대시보드 개선 - 모바일 중심 카드 레이아웃 적용
```

큰 기능 추가, 구조 변경, 많은 파일 변경은 별도 브랜치와 PR로 진행함. 작은 문서 수정이나 오타 수정은 main에 직접 커밋할 수 있음.

## AI 작업 로그

Codex 작업 단위마다 아래 경로에 AI 시뮬레이션 로그를 남김.

```text
docs/ai-simulation-logs/
```

각 로그에는 사용자 프롬프트 요약, Codex 응답 요약, 변경 파일, 검증 내용, 커밋 메시지 제안, 다음 작업을 기록함.
