# npm audit 보안 점검

## 점검 목적

- frontend와 backend 의존성의 보안 취약점 상태를 확인함.
- 자동 수정 전에 영향 범위를 파악함.
- 이번 문서는 점검 결과 기록용이며, 의존성 수정은 수행하지 않음.

## 점검 기준

- frontend: `npm --prefix frontend audit`
- backend: `npm --prefix backend audit`
- JSON 확인: `npm --prefix frontend audit --json`, `npm --prefix backend audit --json`
- `npm audit fix`는 실행하지 않음.
- `npm audit fix --force`는 실행하지 않음.
- `npm update`는 실행하지 않음.
- `package.json`과 `package-lock.json`은 수정하지 않음.

## frontend 점검 결과

- 실행 명령: `npm --prefix frontend audit`
- 결과: 취약점 6건 확인함.
- 심각도: moderate 3건, high 3건, critical 0건임.
- JSON metadata: `{"info":0,"low":0,"moderate":3,"high":3,"critical":0,"total":6}`

주요 패키지:

- `axios`: high, `1.0.0 - 1.15.1`, SSRF, prototype pollution, header injection 계열 advisory가 포함됨.
- `brace-expansion`: moderate, `<1.1.13`, zero-step sequence로 인한 hang 및 memory exhaustion advisory가 포함됨.
- `follow-redirects`: moderate, `<=1.15.11`, cross-domain redirect 시 custom authentication header leak advisory가 포함됨.
- `picomatch`: high, `4.0.0 - 4.0.3`, glob matching method injection 및 ReDoS advisory가 포함됨.
- `postcss`: moderate, `<8.5.10`, CSS stringify 과정의 XSS advisory가 포함됨.
- `vite`: high, `8.0.0 - 8.0.4`, dev server path traversal, deny bypass, WebSocket 기반 file read advisory가 포함됨.

`npm audit` 출력은 모든 항목에 대해 `npm audit fix`로 수정 가능하다고 안내함. 단, 이번 작업에서는 lockfile과 의존성 버전을 바꾸지 않음.

## backend 점검 결과

- 실행 명령: `npm --prefix backend audit`
- 결과: 취약점 5건 확인함.
- 심각도: moderate 2건, high 3건, critical 0건임.
- JSON metadata: `{"info":0,"low":0,"moderate":2,"high":3,"critical":0,"total":5}`

주요 패키지:

- `axios`: high, `1.0.0 - 1.15.1`, SSRF, prototype pollution, header injection 계열 advisory가 포함됨.
- `brace-expansion`: moderate, `4.0.0 - 5.0.4`, zero-step sequence로 인한 hang 및 memory exhaustion advisory가 포함됨.
- `follow-redirects`: moderate, `<=1.15.11`, cross-domain redirect 시 custom authentication header leak advisory가 포함됨.
- `path-to-regexp`: high, `8.0.0 - 8.3.0`, optional group 및 wildcard 기반 ReDoS advisory가 포함됨.
- `picomatch`: high, `<=2.3.1`, glob matching method injection 및 ReDoS advisory가 포함됨.

`npm audit` 출력은 모든 항목에 대해 `npm audit fix`로 수정 가능하다고 안내함. 단, 이번 작업에서는 lockfile과 의존성 버전을 바꾸지 않음.

## 자동 수정하지 않은 이유

- `npm audit fix`는 `package-lock.json`과 의존성 버전을 변경할 수 있음.
- frontend와 backend의 build, dev server, Vercel 배포 동작에 영향이 있을 수 있음.
- 일부 취약점은 transitive dependency 업데이트로 해결되며, 상위 패키지의 호환성 확인이 필요함.
- 따라서 별도 Issue에서 안전 업데이트 계획을 세운 뒤 진행함.

## 후속 작업 제안

- 취약점이 있는 패키지별 영향 범위를 분석함.
- patch/minor 업데이트로 해결 가능한 항목을 우선 검토함.
- frontend의 `vite`, `postcss`, `axios` 업데이트 영향을 확인함.
- backend의 `express` 계열 transitive dependency와 `axios` 업데이트 영향을 확인함.
- breaking change 가능성이 있는 항목은 별도 PR로 분리함.
- 수정 후 `npm --prefix frontend run build`와 `node --check backend/index.js`를 수행함.
