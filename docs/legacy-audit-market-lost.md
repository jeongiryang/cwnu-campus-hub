# 중고장터 및 분실물센터 제거 영향 분석

## 분석 목적

* 중고장터와 분실물센터 기능 제거 전 영향 범위를 분석함.
* 실제 삭제 작업에서 수정해야 할 파일과 검증 항목을 정리함.
* 이번 작업에서는 실제 기능 삭제나 코드 변경을 하지 않음.

## 현재 기능 위치

### frontend 라우팅 위치

* `frontend/src/App.jsx:4`에서 `MarketPage`를 import함.
* `frontend/src/App.jsx:7`에서 `LostPage`를 import함.
* `frontend/src/App.jsx:178`에서 `/market` 네비게이션 링크를 렌더링함.
* `frontend/src/App.jsx:179`에서 `/lost` 네비게이션 링크를 렌더링함.
* `frontend/src/App.jsx:250`에서 `/market` route를 정의함.
* `frontend/src/App.jsx:251`에서 `/lost` route를 정의함.
* `frontend/src/App.jsx:157-158`의 언어 객체에 `market`, `lost` 라벨이 있음.

### 홈 서비스 카드 위치

* `frontend/src/pages/MainPage.jsx:97`의 가이드 문구가 중고마켓과 분실물을 핵심 서비스로 설명함.
* `frontend/src/pages/MainPage.jsx:102`의 한국어 서비스 배열에 중고 마켓 카드가 있음.
* `frontend/src/pages/MainPage.jsx:103`의 한국어 서비스 배열에 분실물 센터 카드가 있음.
* `frontend/src/pages/MainPage.jsx:132`의 영어 서비스 배열에 Flea Market 카드가 있음.
* `frontend/src/pages/MainPage.jsx:133`의 영어 서비스 배열에 Lost & Found 카드가 있음.

### MarketPage 관련 파일

* `frontend/src/pages/MarketPage.jsx`가 중고장터 화면 전체를 담당함.
* `frontend/src/pages/MarketPage.jsx:63`에서 `MarketPage` 컴포넌트를 정의함.
* `frontend/src/pages/MarketPage.jsx:99`에서 `/api/market`과 `/api/items`를 사용함.
* `frontend/src/pages/MarketPage.jsx:249-343` 범위에서 Gemini 기반 판매글 AI 폼 자동완성 로직을 사용함.
* `frontend/src/pages/MarketPage.jsx:779`에서 컴포넌트를 export함.

### LostPage 관련 파일

* `frontend/src/pages/LostPage.jsx`가 분실물센터 화면 전체를 담당함.
* `frontend/src/pages/LostPage.jsx:43`에서 `LostPage` 컴포넌트를 정의함.
* `frontend/src/pages/LostPage.jsx:78`에서 `/api/lost`와 `/api/items`를 사용함.
* `frontend/src/pages/LostPage.jsx:217-303` 범위에서 Gemini 기반 분실/습득글 AI 폼 자동완성 로직을 사용함.
* `frontend/src/pages/LostPage.jsx:661`에서 컴포넌트를 export함.

### backend API와 모델 위치

* `backend/index.js:32-42`에 공용 `Item` schema가 있음.
* `backend/index.js:36`에서 `type` enum이 `todo`, `market`, `lost`를 모두 포함함.
* `backend/index.js:160`에서 `GET /api/market` endpoint를 정의함.
* `backend/index.js:162`에서 `GET /api/lost` endpoint를 정의함.
* `backend/index.js:163`에서 `POST /api/market` endpoint를 정의함.
* `backend/index.js:165`에서 `POST /api/lost` endpoint를 정의함.
* `backend/index.js:166`의 `PATCH /api/items/:id/like`는 market/lost에서 사용하지만 공용 item API임.
* `backend/index.js:167`의 `PUT /api/items/:id`는 todo/market/lost가 함께 사용함.
* `backend/index.js:168`의 `DELETE /api/items/:id`는 todo/market/lost가 함께 사용함.

### README와 screenshots 영향 범위

* `README.md:100`에서 중고장터와 분실물센터 제거 영향 분석을 로드맵에 언급함.
* `README.md:105`에서 분실물센터 제거를 Phase 2 항목으로 언급함.
* `README.md:148-149`에서 제거 또는 후순위 처리 대상으로 중고장터와 분실물센터를 명시함.
* `screenshots/gifs/2026-03-28/미리보기/중고장터_2026-03-28 015216.gif`가 중고장터 미리보기 자료임.
* `screenshots/gifs/2026-03-28/미리보기/분실물센터_2026-03-28 015341.gif`가 분실물센터 미리보기 자료임.
* `screenshots/gifs/2026-03-28/기능/기능 2/` 아래에 중고장터 기능 자료가 있음.
* `screenshots/gifs/2026-03-28/기능/기능 3/` 아래에 분실물센터 기능 자료가 있음.

## 제거 대상 후보

* `frontend/src/pages/MarketPage.jsx`: 중고장터 전용 페이지로 삭제 가능성이 높음.
* `frontend/src/pages/LostPage.jsx`: 분실물센터 전용 페이지로 삭제 가능성이 높음.
* `frontend/src/App.jsx`의 `MarketPage`, `LostPage` import.
* `frontend/src/App.jsx`의 `/market`, `/lost` route.
* `frontend/src/App.jsx`의 `/market`, `/lost` 네비게이션 링크.
* `frontend/src/pages/MainPage.jsx`의 중고 마켓, 분실물 센터 서비스 카드.
* `backend/index.js`의 `/api/market`, `/api/lost` GET/POST endpoint.
* `backend/index.js`의 `Item.type` enum 중 `market`, `lost` 값.
* 중고장터/분실물센터 전용 screenshot 파일.

## 수정 대상 후보

* `frontend/src/App.jsx`: 라우팅 제거, 네비게이션 링크 제거, 언어 객체 라벨 정리 필요함.
* `frontend/src/pages/MainPage.jsx`: 홈 카드 제거 또는 캠퍼스 링크/학식/학업 도구 카드로 대체 필요함.
* `backend/index.js`: market/lost endpoint 제거와 `Item` enum 정리 필요함.
* `README.md`: 제거 완료 시 "예정" 문구를 "제거함" 또는 현 상태에 맞게 수정 필요함.
* `docs/roadmap.md`: 실제 제거 후 Phase 2 진행 상태 갱신 필요함.
* `screenshots/`: README에서 더 이상 참조하지 않는 과제용 이미지 보관 또는 삭제 정책 결정 필요함.
* AI 시뮬레이션 로그: 실제 제거 PR에서 삭제 사유와 검증 결과 기록 필요함.

## 보류 또는 확인 필요 대상

* `backend/index.js`의 공용 `Item` 모델은 ToDo가 계속 사용하므로 전체 삭제하면 안 됨.
* `backend/index.js`의 `PUT /api/items/:id`, `DELETE /api/items/:id`는 ToDo에서도 사용하므로 유지해야 함.
* `backend/index.js`의 `PATCH /api/items/:id/like`는 현재 market/lost 중심 기능으로 보이나 다른 기능 재사용 가능성이 있는지 확인 필요함. deprecate candidate임.
* `Item` schema의 `price`, `studentId`, `sellerName`, `phone`, `location`, `description`, `likes` 필드는 market/lost 전용 성격이 강하지만 기존 DB 문서와 ToDo 저장 구조 영향을 확인해야 함. deprecate candidate임.
* MongoDB Atlas에 기존 `type: market`, `type: lost` 데이터가 남아 있을 수 있음. 데이터 삭제, 보존, 무시 정책을 별도 결정해야 함.
* Gemini `/api/ai/generate`는 ToDo AI 비서에서도 사용하므로 유지해야 함.
* screenshots는 용량과 문서 참조 여부를 기준으로 삭제 여부를 결정해야 함. deprecate candidate임.

## 삭제 후 검증 계획

* `cd frontend && npm run build`로 프론트엔드 빌드 검증함.
* `cd frontend && npm run lint`로 사용하지 않는 import와 lint 오류를 확인함.
* `node -c backend/index.js` 또는 백엔드 실행으로 문법 오류를 확인함.
* `/market`, `/lost` 접근 시 의도한 fallback 또는 404 정책이 동작하는지 확인함.
* 홈 화면에서 중고장터/분실물센터 카드가 사라지고 레이아웃이 깨지지 않는지 확인함.
* `/api/market`, `/api/lost`가 더 이상 노출되지 않는지 확인함.
* `/api/todo`, `/api/items/:id` 기반 ToDo CRUD가 계속 동작하는지 확인함.
* README와 docs에서 오래된 링크나 이미지 참조가 남지 않았는지 확인함.

## 실제 제거 PR 작업 목록

* `App.jsx`에서 `MarketPage`, `LostPage` import 제거함.
* `App.jsx`에서 `/market`, `/lost` route 제거함.
* `App.jsx`에서 중고장터/분실물센터 네비게이션 링크와 언어 라벨 제거함.
* `MainPage.jsx`에서 중고장터/분실물센터 서비스 카드 제거 또는 대체함.
* `MarketPage.jsx`, `LostPage.jsx` 삭제함.
* `backend/index.js`에서 `/api/market`, `/api/lost` endpoint 제거함.
* `backend/index.js`에서 `Item.type` enum의 `market`, `lost` 제거 여부를 결정하고 반영함.
* market/lost 전용 schema 필드의 deprecate 여부를 결정함.
* screenshots 정리 정책을 결정하고 필요 시 과제용 이미지 제거함.
* README와 docs를 실제 제거 상태에 맞게 갱신함.
* 프론트엔드 빌드와 lint, 백엔드 문법 검증을 수행함.
