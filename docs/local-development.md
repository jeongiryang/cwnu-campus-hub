# 로컬 개발 및 테스트 가이드

## 개요

* 이 문서는 cwnu-campus-hub를 로컬에서 실행하고 검증하는 방법을 정리함.
* 현재 레포는 frontend와 backend가 분리된 구조임.
* 루트 package.json이 없으므로 frontend와 backend 명령을 각각 실행함.
* 프론트엔드와 백엔드를 함께 확인하려면 터미널을 2개 사용하는 것을 권장함.

## 기본 준비

* Node.js 설치 필요함.
* npm 사용함.
* Git 사용함.
* 민감정보는 `.env`에만 저장하고 Git에 커밋하지 않음.
* MongoDB Atlas URL, Gemini API Key 등 실제 값은 문서에 작성하지 않음.

## 레포 이동

사용자 로컬 경로 예시:

```bash
cd ~/Desktop/GitHub\ Repository/cwnu-campus-hub
```

Windows PowerShell 경로 예시:

```powershell
cd "C:\Users\USER\Desktop\GitHub Repository\cwnu-campus-hub"
```

## 프론트엔드 설치

```bash
npm --prefix frontend install
```

## 프론트엔드 개발 서버 실행

```bash
npm --prefix frontend run dev
```

실행 후 브라우저에서 확인함:

```text
http://localhost:5173
```

## 프론트엔드 빌드 검증

```bash
npm --prefix frontend run build
```

Vite 번들 크기 경고가 출력될 수 있음. 빌드가 성공하면 기능 검증 자체는 통과한 것으로 봄. 번들 크기 최적화는 별도 성능 개선 Issue에서 다룸.

## 백엔드 설치

```bash
npm --prefix backend install
```

## 백엔드 개발 서버 실행

```bash
npm --prefix backend run dev
```

## 백엔드 일반 실행

```bash
npm --prefix backend start
```

또는 backend 폴더 안에서 실행함:

```bash
node index.js
```

백엔드는 기본적으로 아래 주소에서 실행됨:

```text
http://localhost:5000
```

## 프론트엔드와 백엔드 함께 실행하기

터미널 1:

```bash
cd ~/Desktop/GitHub\ Repository/cwnu-campus-hub
npm --prefix backend run dev
```

터미널 2:

```bash
cd ~/Desktop/GitHub\ Repository/cwnu-campus-hub
npm --prefix frontend run dev
```

프론트엔드만 실행한 상태에서 `/api/food` 요청이 발생하면 Vite proxy error `ECONNREFUSED`가 출력될 수 있음. 이 오류는 백엔드 서버가 켜져 있지 않아 발생하는 연결 거부 오류임. 백엔드를 먼저 실행하거나 함께 실행하면 해결됨.

## MONGODB_URI 경고

백엔드 실행 시 아래와 같은 경고가 출력될 수 있음.

```text
MONGODB_URI 환경변수가 없습니다.
```

이 경고는 `backend/.env` 또는 실행 환경에 MongoDB 연결 문자열이 없다는 뜻임. DB를 사용하는 기능은 제한될 수 있음. 단, DB를 사용하지 않는 API는 코드 구조에 따라 동작할 수 있음. 실제 MongoDB URI는 README나 문서에 작성하지 않음.

## 백엔드 문법 검사

레포 루트에서 실행할 때:

```bash
node --check backend/index.js
```

backend 폴더 안에서 실행할 때:

```bash
node --check index.js
```

backend 폴더 안에서 `node --check backend/index.js`를 실행하면 `backend/backend/index.js`를 찾게 되어 `MODULE_NOT_FOUND` 오류가 발생함.

## 환경변수 주의사항

* `.env`는 Git에 커밋하지 않음.
* MongoDB Atlas URL, Gemini API Key 등 민감정보는 코드나 README에 직접 적지 않음.
* `.env.example`이 있으면 예시 변수명만 작성함.
* 실제 키 값은 작성하지 않음.

## npm audit 경고

`npm install` 후 vulnerabilities 경고가 출력될 수 있음. `npm audit fix`는 의존성 버전을 변경할 수 있으므로 자동으로 실행하지 않음. 취약점 점검은 별도 Issue에서 audit 결과 분석 후 안전하게 진행함.

## PR 검증 체크리스트

* `git status --short --branch`
* `git diff --check`
* `npm --prefix frontend run build`
* `node --check backend/index.js`
* 필요 시 관련 키워드 `rg` 검색

## 자주 발생하는 문제

* 루트에서 `npm install`을 실행하면 실패할 수 있음.
* frontend와 backend 각각에서 의존성을 설치해야 함.
* 프론트엔드만 실행하면 `/api/food` proxy error가 발생할 수 있음.
* 포트 충돌이 발생하면 터미널 출력에 따라 다른 포트를 사용함.
* 환경변수가 없으면 backend 일부 기능이 정상 동작하지 않을 수 있음.
* `node --check` 명령은 현재 위치에 따라 경로를 다르게 입력해야 함.
