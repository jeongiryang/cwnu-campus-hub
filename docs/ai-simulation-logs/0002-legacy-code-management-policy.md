# AI Simulation Log

## 작업 요약

- 기존 소공 과제 기반 레포에서 레거시 코드 관리 기준을 문서화함.

## 사용자 프롬프트 요약

- 사용자가 기존 소공 레포 전체를 가져온 상태이므로, 앞으로 필요한 파일과 필요 없는 파일을 Codex가 판단하고 정리할 수 있도록 규칙 추가를 요청함.

## Codex 응답 요약

- AGENTS.md에 레거시 코드 관리 기준을 추가함.
- docs/roadmap.md에 정리 단계 로드맵을 추가함.
- 코드 기능 변경은 하지 않음.

## 변경 파일

- AGENTS.md
- docs/roadmap.md
- docs/ai-simulation-logs/0002-legacy-code-management-policy.md

## 주요 변경 내용

- 유지할 기능과 제거할 기능의 기준을 문서화함.
- 큰 삭제 작업은 브랜치와 PR로 진행하도록 명시함.
- 판단이 애매한 파일은 바로 삭제하지 않고 deprecate candidate로 문서화하도록 명시함.
- 기존 과제 보존이 아니라 CWNU Campus Hub 제품화 기준으로 재평가하도록 명시함.

## 검증 내용

- `git diff --check` 실행함. 출력 없음.
- `git status --short` 실행함. `AGENTS.md`와 `docs/`가 untracked 상태로 표시됨.
- 코드 기능 변경이 없으므로 빌드 검증은 생략함.

## 커밋 메시지 제안

```text
[docs] - 레거시 코드 관리 기준 추가 - 정리 로드맵 문서화
```

## 다음 작업

- 중고장터/분실물센터 제거 영향 분석 Issue를 생성함.
- 이후 별도 브랜치에서 제거 작업을 PR로 진행함.
