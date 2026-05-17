# npm 취약점 안전 업데이트 계획

## 계획 목적

- npm audit 결과에서 확인된 취약점을 안전하게 수정하기 위한 계획을 정리함.
- 이번 문서는 수정 계획용이며, 의존성 변경은 수행하지 않음.
- npm audit fix는 자동 실행하지 않음.

## 현재 점검 결과 요약

- frontend 취약점 수: 6건 확인함.
- frontend 심각도: moderate 3건, high 3건, critical 0건임.
- backend 취약점 수: 5건 확인함.
- backend 심각도: moderate 2건, high 3건, critical 0건임.
- `npm audit` 명령은 취약점이 있으면 exit code 1을 반환할 수 있음. 이번 점검에서 exit code 1은 취약점 존재로 인한 예상 가능한 결과임.

## frontend 취약점 정리

| 패키지 | 심각도 | 영향 범위 | fix available | 계획 |
| --- | --- | --- | --- | --- |
| `axios` | high | SSRF, prototype pollution, header injection 계열 advisory가 포함됨. | 있음 | frontend에서 직접 사용 중인지 확인하고 patch/minor 업데이트 가능성을 우선 검토함. |
| `vite` | high | dev server path traversal, deny bypass, WebSocket 기반 file read advisory가 포함됨. | 있음 | Vite 8 patch 업데이트 후보로 검토함. build와 dev server 동작 확인 필요함. |
| `picomatch` | high | glob matching method injection 및 ReDoS advisory가 포함됨. | 있음 | transitive dependency일 가능성이 높으므로 상위 패키지 업데이트 경로를 확인함. |
| `postcss` | moderate | CSS stringify 과정의 XSS advisory가 포함됨. | 있음 | Tailwind/PostCSS toolchain과 호환되는 patch 업데이트를 우선 검토함. |
| `follow-redirects` | moderate | cross-domain redirect 시 custom authentication header leak advisory가 포함됨. | 있음 | axios 업데이트로 함께 해결되는지 확인함. |
| `brace-expansion` | moderate | zero-step sequence로 인한 hang 및 memory exhaustion advisory가 포함됨. | 있음 | transitive dependency 경로를 확인하고 lockfile 업데이트 영향 범위를 분리 검토함. |

breaking change 가능성:

- `npm audit fix`만으로 해결 가능하다고 표시되지만 실제 변경 버전과 lockfile diff 확인 전에는 breaking change 가능성을 단정하지 않음.
- `vite`와 build toolchain 업데이트는 dev server, Vercel build, Tailwind 빌드에 영향을 줄 수 있으므로 별도 frontend PR에서 검증함.

## backend 취약점 정리

| 패키지 | 심각도 | 영향 범위 | fix available | 계획 |
| --- | --- | --- | --- | --- |
| `axios` | high | SSRF, prototype pollution, header injection 계열 advisory가 포함됨. | 있음 | 학식 크롤링 요청에 사용하므로 patch/minor 업데이트 후 `/api/food` 동작 확인이 필요함. |
| `path-to-regexp` | high | optional group 및 wildcard 기반 ReDoS advisory가 포함됨. | 있음 | Express 라우팅 transitive dependency일 가능성이 있어 Express 호환성 확인이 필요함. |
| `picomatch` | high | glob matching method injection 및 ReDoS advisory가 포함됨. | 있음 | nodemon 또는 관련 dev dependency 경로를 확인함. |
| `follow-redirects` | moderate | cross-domain redirect 시 custom authentication header leak advisory가 포함됨. | 있음 | axios 업데이트로 함께 해결되는지 확인함. |
| `brace-expansion` | moderate | zero-step sequence로 인한 hang 및 memory exhaustion advisory가 포함됨. | 있음 | transitive dependency 경로를 확인하고 dev dependency 영향 여부를 구분함. |

breaking change 가능성:

- backend는 Express 5와 Mongoose 9를 사용하므로 transitive dependency 업데이트가 라우팅 또는 서버 실행에 영향을 줄 수 있음.
- `axios` 업데이트 후 학식 크롤링, 외부 요청 헤더, timeout 처리 영향을 확인해야 함.

## 업데이트 우선순위

- high 취약점을 우선 검토함.
- patch/minor 업데이트로 해결 가능한 항목을 먼저 처리함.
- major 업데이트 또는 force fix가 필요한 항목은 별도 PR로 분리함.
- frontend와 backend를 한 PR에 섞지 않고 가능하면 분리함.
- lockfile 변경량이 큰 경우 패키지별로 더 작게 나눔.

## 후속 작업 제안

- Issue A: frontend 취약점 안전 업데이트
- Issue B: backend 취약점 안전 업데이트
- Issue C: 번들 크기 경고 개선
- Issue D: 정기 보안 점검 문서화

## 후속 PR 검증 기준

- `git status --short --branch`
- `git diff --check`
- `npm --prefix frontend install`
- `npm --prefix backend install`
- `npm --prefix frontend run build`
- `node --check backend/index.js`
- `npm --prefix frontend audit`
- `npm --prefix backend audit`
- 앱 주요 화면 수동 확인

## 자동 수정 보류 이유

- `npm audit fix`는 package-lock.json과 의존성을 변경할 수 있음.
- `npm audit fix --force`는 breaking change를 유발할 수 있음.
- 현재 프로젝트는 기능 안정성이 우선이므로, 패키지별 영향 분석 후 별도 PR에서 수정함.
