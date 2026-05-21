# 멀티 에이전트 오케스트레이션 대시보드

## TL;DR

> **Quick Summary**: 백엔드/API 없이 순수 바닐라 HTML+CSS+JS로, 데스크탑 우선 2×2 그리드 레이아웃의 멀티 에이전트 오케스트레이션 대시보드를 제작한다.
>
> **Deliverables**:
> - `index.html` — 4패널 2×2 그리드 뼈대
> - `style.css` — 디자인 시스템 + 다크 모드
> - `app.js` — 더미 데이터 + 렌더링 로직 + 필터 + localStorage
> - `design.md` — 디자이너 에이전트 산출 (Task 0)
>
> **Estimated Effort**: Medium (~35분)
> **Parallel Execution**: YES — 4 waves (Wave 0 → Wave 1 → Wave 2 → Wave 3 → FINAL)
> **Critical Path**: Task 0(~10분) → Task 1+2 병렬(~10분) → Task 3-6 병렬(~10분) → Task 7(~10분) → F1-F4

---

## Context

### Original Request
멀티 에이전트 오케스트레이션 대시보드 (HTML+CSS+JS). 4대 패널: 에이전트 카드, 작업 상태 목록, 로그/메모 패널, 모델 사용 전략 체크리스트.

### Interview Summary
**Key Discussions**:
- 스택: 바닐라 HTML+CSS+JS, 빌드 도구 없음
- 파일 구조: `index.html` + `style.css` + `app.js` (분리)
- 반응형: 데스크탑 우선
- 추가 기능: 다크 모드 토글, 에이전트 상태 필터
- 패널 레이아웃: 2×2 그리드
- 에이전트 카드 상태: 정적 표시만 (클릭 토글 없음)
- 메모/로그 저장: localStorage
- design.md: Task 0으로 디자이너 에이전트 먼저 실행

**Research Findings**:
- `agents/*.md` 9개 파일 존재 (더미 데이터 소스로 활용)
- `agent-team.md`에 9개 에이전트 팀 운영 흐름 정의 (전략 체크리스트 데이터 소스)

### Metis Review
**Identified Gaps** (addressed):
- Core Objective 문장 명시 → 드래프트에 추가 완료
- design.md 단계 명확화 → Task 0으로 확정
- 메모 저장 위치 → localStorage 확정
- 에이전트 카드 상태 변경 방식 → 정적 표시만으로 확정
- 패널 레이아웃 → 2×2 그리드 확정

---

## Work Objectives

### Core Objective
백엔드/API 연동 없이 순수 바닐라 HTML+CSS+JS로, 데스크탑 우선 2×2 그리드 레이아웃의 멀티 에이전트 오케스트레이션 대시보드를 제작한다.

### Concrete Deliverables
- `design.md` — 디자이너 에이전트 시각 방향 정의서
- `index.html` — 4패널 레이아웃 뼈대
- `style.css` — CSS 변수, 다크 모드, 그리드, 컴포넌트 스타일
- `app.js` — 더미 데이터, 렌더링, 필터, localStorage, 다크 모드 토글

### Definition of Done
- [ ] 브라우저에서 `index.html` 직접 열어도 에러 없이 렌더링됨
- [ ] 4개 패널이 2×2 그리드로 배치됨
- [ ] 에이전트 카드 상태 필터 동작 (idle/running/done/error 선택 시 카드 숨김/표시)
- [ ] 다크 모드 토글 동작 (클릭 시 전체 테마 전환)
- [ ] 메모 입력 후 새로고침해도 내용 유지 (localStorage)
- [ ] 로그 추가 버튼 클릭 시 타임스탬프와 함께 로그 항목 추가

### Must Have
- 4개 패널 모두 구현 (에이전트 카드, 작업 목록, 로그/메모, 전략 체크리스트)
- 더미 데이터로 에이전트 9개 반영 (`agents/*.md` 기반)
- 에이전트 상태 필터 (idle/running/done/error)
- 다크 모드 토글
- localStorage 메모/로그 저장

### Must NOT Have (Guardrails)
- 실제 API 연동 없음 (fetch/XMLHttpRequest 없음)
- `setInterval` 자동 로그 없음 (버튼 클릭으로만)
- 에이전트 카드 클릭 상태 토글 없음 (정적 표시만)
- 빌드 도구/번들러/npm 없음 (CDN 외부 라이브러리도 최소화)
- 모바일 반응형 불필요 (데스크탑 우선)
- 백엔드 코드 없음

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification은 에이전트가 직접 실행.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: 없음
- **Agent-Executed QA**: Playwright 시나리오 (모든 태스크 필수)

### QA Policy
- Frontend/UI: Playwright — 브라우저 열기, 클릭, DOM 확인, 스크린샷
- Evidence: `.omo/evidence/task-{N}-{scenario}.png`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (즉시 시작 — 디자인 정의):
└── Task 0: design.md (디자이너 에이전트) [visual-engineering]

Wave 1 (Task 0 완료 후 — HTML/CSS 뼈대):
├── Task 1: index.html 뼈대 + 2×2 그리드 구조 [quick]
└── Task 2: style.css 기반 (CSS 변수, 리셋, 그리드, 다크 모드 변수) [quick]

Wave 2 (Task 1+2 완료 후 — 패널별 HTML 템플릿 + CSS, 4개 병렬):
├── Task 3: 에이전트 카드 패널 HTML 템플릿 + CSS [quick]
├── Task 4: 작업 목록 패널 HTML 템플릿 + CSS [quick]
├── Task 5: 로그/메모 패널 HTML 템플릿 + CSS [quick]
└── Task 6: 전략 체크리스트 패널 HTML 템플릿 + CSS [quick]

Wave 3 (Task 3-6 완료 후 — app.js 완전체 단일 작성, ~10분):
└── Task 7: app.js 완전체 [quick]
    (더미 데이터 + 에이전트 카드 + 작업 목록 + 로그/localStorage + 전략 체크리스트 + 필터 + 다크 모드 토글)

Wave FINAL (Task 7 완료 후):
├── F1: Plan Compliance Audit (oracle)
├── F2: Code Quality Review (unspecified-high)
├── F3: Real QA (unspecified-high + playwright skill)
└── F4: Scope Fidelity Check (deep)
→ 결과 발표 → 사용자 명시적 승인
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 0 | — | 1, 2 |
| 1 | 0 | 3, 4, 5, 6 |
| 2 | 0 | 3, 4, 5, 6 |
| 3 | 1, 2 | 7 |
| 4 | 1, 2 | 7 |
| 5 | 1, 2 | 7 |
| 6 | 1, 2 | 7 |
| 7 | 3, 4, 5, 6 | F1-F4 |

### Agent Dispatch Summary

- **Wave 0**: 1 task — T0 `visual-engineering`
- **Wave 1**: 2 tasks — T1, T2 `quick`
- **Wave 2**: 4 tasks — T3, T4, T5, T6 `quick` (병렬, ~10분)
- **Wave 3**: 1 task — T7 `quick` (app.js 완전체 단일 작성, ~10분)
- **FINAL**: 4 tasks — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high` + `playwright`, F4 `deep`

---

## TODOs

- [x] 0. design.md — 대시보드 시각 방향 정의

  **What to do**:
  - `agents/designer.md` 역할 카드를 참고한다
  - 대시보드의 색감, 분위기, 타이포그래피, 카드 스타일, 상태 색상 팔레트를 정의한다
  - 다크 모드와 라이트 모드의 CSS 변수명 제안 포함
  - 에이전트 상태별 색상 (idle: 회색, running: 파랑, done: 초록, error: 빨강)
  - 전략 유형별 아이콘/이모지 제안 (위원회형, 리더형, 파이프라인형)

  **Must NOT do**:
  - HTML/CSS/JS 코드 작성 금지
  - 구현 세부사항 지시 금지 (CSS 값이 아닌 방향성만)

  **Recommended Agent Profile**:
  > 디자인 방향성 문서 작성
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 0 (단독)
  - **Blocks**: Task 1, Task 2
  - **Blocked By**: 없음 (즉시 시작)

  **References**:
  - `agents/designer.md` — 디자이너 에이전트 역할 및 완료 기준
  - `agents/project-design-lead.md` — 프로젝트 설계 리더가 기대하는 산출물 맥락
  - `agent-team.md` — 전체 에이전트 팀 구성 및 분위기 참고

  **Acceptance Criteria**:
  - [ ] `design.md` 파일 생성됨
  - [ ] 색상 팔레트 (라이트/다크 각 최소 5색) 정의됨
  - [ ] 에이전트 상태 4종 색상 명시됨
  - [ ] 전략 유형 3종 이상 아이콘/이모지 포함됨

  **QA Scenarios**:
  ```
  Scenario: design.md 파일 생성 및 내용 확인
    Tool: Bash (Read)
    Steps:
      1. Read design.md 파일 경로 확인
      2. 파일 존재 여부 확인
      3. "색상" 또는 "color" 키워드 포함 여부 확인
      4. 에이전트 상태(idle, running, done, error) 색상 정의 포함 여부
    Expected Result: 파일 존재, 색상 팔레트 및 상태 색상 포함
    Evidence: .omo/evidence/task-0-design-md.txt
  ```

  **Commit**: YES (Commit 1)
  - Message: `docs: add design.md for dashboard visual direction`
  - Files: `design.md`

---

- [x] 1. index.html — 4패널 2×2 그리드 HTML 뼈대

  **What to do**:
  - `index.html` 파일 생성
  - `<head>`: charset, viewport, title("멀티 에이전트 오케스트레이션 대시보드"), `style.css` 링크, `app.js` defer 로드
  - `<body>` 최상위 구조:
    - `<header>`: 타이틀 + 다크 모드 토글 버튼(`id="darkModeToggle"`)
    - `<main class="dashboard-grid">`: 4개 `<section>` (class: `panel panel--agents`, `panel--tasks`, `panel--logs`, `panel--strategy`)
    - 각 `<section>` 안에 `<h2>` 제목과 콘텐츠 래퍼(`<div class="panel__body">`)만 배치
  - 시맨틱 HTML 사용 (section, header, h2, article 등)

  **Must NOT do**:
  - 인라인 스타일 금지
  - JS 로직 금지 (뼈대만)
  - 더미 데이터 하드코딩 금지 (JS로 삽입 예정)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 2와 병렬)
  - **Parallel Group**: Wave 1 (Task 2와 동시)
  - **Blocks**: Task 3, 4, 5, 6
  - **Blocked By**: Task 0

  **References**:
  - `design.md` (Task 0 산출) — 섹션 이름, 분위기 참고
  - `agent-team.md:29-41` — 9개 에이전트 목록 (패널 제목 결정에 참고)

  **Acceptance Criteria**:
  - [ ] `index.html` 생성됨
  - [ ] `style.css`, `app.js` 링크 포함
  - [ ] 4개 `<section>` 존재 (panel--agents, panel--tasks, panel--logs, panel--strategy)
  - [ ] `id="darkModeToggle"` 버튼 존재

  **QA Scenarios**:
  ```
  Scenario: index.html 브라우저 열기 기본 구조 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. 콘솔 에러 없음 확인
      3. expect(page.locator('.panel--agents')).toBeVisible()
      4. expect(page.locator('.panel--tasks')).toBeVisible()
      5. expect(page.locator('.panel--logs')).toBeVisible()
      6. expect(page.locator('.panel--strategy')).toBeVisible()
      7. expect(page.locator('#darkModeToggle')).toBeVisible()
    Expected Result: 4개 패널 섹션 및 토글 버튼 존재
    Evidence: .omo/evidence/task-1-html-structure.png
  ```

  **Commit**: YES (Commit 2, Task 2와 묶음)
  - Message: `feat: add HTML skeleton and CSS design system`

---

- [x] 2. style.css — CSS 기반 설계 (변수, 리셋, 그리드, 다크 모드)

  **What to do**:
  - `style.css` 파일 생성
  - CSS 변수 (`--color-bg`, `--color-surface`, `--color-text`, `--color-primary`, 상태별: `--color-idle`, `--color-running`, `--color-done`, `--color-error`)
  - `[data-theme="dark"]` 셀렉터로 다크 모드 변수 오버라이드
  - 기본 리셋 (`*, *::before, *::after { box-sizing: border-box; }`, margin/padding 초기화)
  - `.dashboard-grid`: CSS Grid, `grid-template-columns: 1fr 1fr`, `grid-template-rows: 1fr 1fr`, `min-height: 100vh`
  - `.panel`: `background: var(--color-surface)`, `border-radius`, `padding`, `overflow: hidden`
  - `<header>` 기본 스타일 (flex, space-between)
  - `design.md` 색상 팔레트를 CSS 변수로 구현

  **Must NOT do**:
  - 패널 내부 컴포넌트 스타일 금지 (Task 3-6에서 담당)
  - 미디어 쿼리 모바일 반응형 금지 (데스크탑 우선)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 1과 병렬)
  - **Parallel Group**: Wave 1 (Task 1과 동시)
  - **Blocks**: Task 3, 4, 5, 6
  - **Blocked By**: Task 0

  **References**:
  - `design.md` (Task 0 산출) — 색상 팔레트, 타이포그래피, 라이트/다크 변수명 참고

  **Acceptance Criteria**:
  - [ ] `style.css` 생성됨
  - [ ] CSS 변수 `--color-bg`, `--color-surface`, `--color-text` 존재
  - [ ] 상태 색상 변수 4종 (`--color-idle`, `--color-running`, `--color-done`, `--color-error`) 존재
  - [ ] `[data-theme="dark"]` 블록 존재
  - [ ] `.dashboard-grid` CSS Grid 규칙 존재

  **QA Scenarios**:
  ```
  Scenario: 그리드 레이아웃 시각 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. const grid = await page.locator('.dashboard-grid').boundingBox()
      3. 패널 4개의 위치 확인 — 상단 2개 y값 동일, 하단 2개 y값 동일
    Expected Result: 2×2 그리드 배치 확인
    Evidence: .omo/evidence/task-2-grid-layout.png

  Scenario: CSS 변수 존재 확인
    Tool: Bash (grep)
    Steps:
      1. grep "--color-idle" style.css → 결과 있음
      2. grep "[data-theme=\"dark\"]" style.css → 결과 있음
    Expected Result: 필수 CSS 변수 존재
    Evidence: .omo/evidence/task-2-css-vars.txt
  ```

  **Commit**: YES (Commit 2, Task 1과 묶음)

---

- [x] 3. 에이전트 카드 패널 — HTML 템플릿 + CSS

  **What to do**:
  - `index.html`의 `.panel--agents` 안에 다음 구조 추가:
    - 필터 바: `<div class="agent-filter">` — 상태 버튼 5개 (`all`, `idle`, `running`, `done`, `error`)
    - 카드 컨테이너: `<div class="agent-cards" id="agentCards">` (JS가 카드를 삽입할 목표 DOM)
  - `style.css`에 에이전트 카드 CSS 추가:
    - `.agent-card`: flex, 카드 테두리, `border-left: 4px solid var(--color-idle)` (상태별 색상은 JS가 클래스로 부여)
    - `.agent-card--idle`, `.agent-card--running`, `.agent-card--done`, `.agent-card--error`: 각각 border-left 색상 변수 참조
    - `.agent-filter button`: 필터 버튼 스타일, 활성 상태 `.active` 클래스 스타일
    - `.agent-cards`: CSS Grid 또는 flex-wrap으로 카드 격자 배치

  **Must NOT do**:
  - JS 로직 금지
  - 하드코딩 에이전트 데이터 금지 (JS로 삽입 예정)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 4, 5, 6과 병렬)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `index.html` (Task 1 산출) — `.panel--agents` 위치
  - `style.css` (Task 2 산출) — CSS 변수 및 기반 스타일
  - `design.md` (Task 0 산출) — 카드 디자인 방향
  - `agents/*.md` — 에이전트 이름/역할 (카드 구조 참고)

  **Acceptance Criteria**:
  - [ ] `id="agentCards"` 컨테이너 존재
  - [ ] `.agent-filter` 버튼 5개 (all, idle, running, done, error) 존재
  - [ ] `.agent-card--idle` 등 CSS 클래스 4종 존재

  **QA Scenarios**:
  ```
  Scenario: 에이전트 필터 버튼 렌더링 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. expect(page.locator('.agent-filter button')).toHaveCount(5)
      3. screenshot of .panel--agents
    Expected Result: 5개 필터 버튼 표시
    Evidence: .omo/evidence/task-3-agent-panel.png
  ```

  **Commit**: YES (Commit 3, Task 3-6 완료 후)

---

- [x] 4. 작업 목록 패널 — HTML 템플릿 + CSS

  **What to do**:
  - `index.html`의 `.panel--tasks` 안에:
    - `<ul id="taskList" class="task-list">` (JS가 `<li>` 삽입)
  - `style.css`에 작업 목록 CSS:
    - `.task-list`: 리스트 리셋 (padding 0, list-style none)
    - `.task-item`: flex row, 상태 배지 + 작업명 + 배정 에이전트
    - `.task-badge`: 상태별 배경색 (`.task-badge--pending`, `.task-badge--in-progress`, `.task-badge--done`, `.task-badge--blocked`)
    - `.task-item__agent`: 배정 에이전트 이름, 작은 폰트, muted 색상

  **Must NOT do**:
  - JS 로직 금지
  - 하드코딩 작업 데이터 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 3, 5, 6과 병렬)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `index.html` (Task 1) — `.panel--tasks` 위치
  - `style.css` (Task 2) — CSS 변수
  - `design.md` (Task 0) — 정보 밀도, 색상 참고

  **Acceptance Criteria**:
  - [ ] `id="taskList"` 존재
  - [ ] `.task-badge--pending`, `.task-badge--in-progress`, `.task-badge--done`, `.task-badge--blocked` CSS 존재

  **QA Scenarios**:
  ```
  Scenario: 작업 목록 컨테이너 존재 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. expect(page.locator('#taskList')).toBeVisible()
      3. screenshot of .panel--tasks
    Expected Result: 작업 목록 컨테이너 존재
    Evidence: .omo/evidence/task-4-task-panel.png
  ```

  **Commit**: YES (Commit 3)

---

- [x] 5. 로그/메모 패널 — HTML 템플릿 + CSS

  **What to do**:
  - `index.html`의 `.panel--logs` 안에:
    - 탭 또는 섹션 헤더: "로그" / "메모" 전환 (선택사항 — 단순 구현 시 분리된 두 영역)
    - `<div id="logList" class="log-list">` (JS가 로그 항목 삽입)
    - `<button id="addLogBtn">로그 추가</button>`
    - `<textarea id="memoInput" placeholder="메모를 입력하세요...">` + `<button id="saveMemoBtn">저장</button>`
    - `<div id="memoDisplay" class="memo-display">` (저장된 메모 표시)
  - `style.css`에 로그/메모 CSS:
    - `.log-list`: `max-height: 200px`, `overflow-y: auto`, monospace 폰트
    - `.log-item`: `font-size: 0.8rem`, 타임스탬프 + 메시지 구조
    - `textarea#memoInput`: 전체 너비, resize: vertical
    - `.memo-display`: 저장된 메모 미리보기, 라이트 그레이 배경

  **Must NOT do**:
  - JS 로직 금지
  - setInterval 관련 구조 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 3, 4, 6과 병렬)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `index.html` (Task 1) — `.panel--logs` 위치
  - `style.css` (Task 2) — CSS 변수

  **Acceptance Criteria**:
  - [ ] `id="logList"`, `id="addLogBtn"`, `id="memoInput"`, `id="saveMemoBtn"`, `id="memoDisplay"` 존재
  - [ ] `.log-list` CSS에 `overflow-y: auto` 존재

  **QA Scenarios**:
  ```
  Scenario: 로그/메모 패널 UI 요소 존재 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. expect(page.locator('#addLogBtn')).toBeVisible()
      3. expect(page.locator('#memoInput')).toBeVisible()
      4. expect(page.locator('#saveMemoBtn')).toBeVisible()
    Expected Result: 버튼 2개와 textarea 존재
    Evidence: .omo/evidence/task-5-log-panel.png
  ```

  **Commit**: YES (Commit 3)

---

- [x] 6. 전략 체크리스트 패널 — HTML 템플릿 + CSS

  **What to do**:
  - `index.html`의 `.panel--strategy` 안에:
    - `<ul id="strategyList" class="strategy-list">` (JS가 항목 삽입)
    - `<div id="strategyDesc" class="strategy-desc">` (선택된 전략 설명 표시)
  - 모델 사용 전략 유형 (JS 더미 데이터에서 처리, HTML은 컨테이너만):
    - 위원회형: 여러 모델이 동일 태스크에 투표
    - 리더형: 강한 모델이 결정, 약한 모델이 실행
    - 파이프라인형: 모델이 순서대로 결과를 넘김
    - 전문가형: 도메인별 특화 모델 배치
  - `style.css`에 전략 체크리스트 CSS:
    - `.strategy-list`: 리스트 리셋
    - `.strategy-item`: flex row, 체크박스 + 이름 + 이모지
    - `.strategy-desc`: 선택 전략 설명, 카드 형태, `min-height: 60px`

  **Must NOT do**:
  - JS 로직 금지
  - 전략 내용 하드코딩 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (Task 3, 4, 5와 병렬)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 7
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `index.html` (Task 1) — `.panel--strategy` 위치
  - `agent-team.md` — 에이전트 운영 패턴 (전략 유형 맥락)
  - `design.md` (Task 0) — 전략 유형 아이콘/이모지 제안

  **Acceptance Criteria**:
  - [ ] `id="strategyList"`, `id="strategyDesc"` 존재
  - [ ] `.strategy-item`, `.strategy-desc` CSS 존재

  **QA Scenarios**:
  ```
  Scenario: 전략 패널 컨테이너 확인
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. expect(page.locator('#strategyList')).toBeVisible()
      3. expect(page.locator('#strategyDesc')).toBeVisible()
    Expected Result: 전략 목록과 설명 컨테이너 존재
    Evidence: .omo/evidence/task-6-strategy-panel.png
  ```

  **Commit**: YES (Commit 3)

---

- [x] 7. app.js — 완전체 단일 작성 (~10분)

  > **왜 단일 태스크인가**: app.js는 하나의 파일이다. 에이전트 간 병렬 편집 시 충돌이 발생하므로, 전체 기능을 처음부터 한 번에 완성된 파일로 작성한다. 35분 목표 달성을 위한 핵심 결정.

  **What to do**:
  `app.js` 파일을 새로 생성하고, 아래 모든 기능을 한 파일에 완성한다.

  **섹션 1 — 더미 데이터**:
  - `const AGENTS = [...]` (9개, `agents/*.md` 기반):
    ```js
    { id, name, role, status: 'idle'|'running'|'done'|'error', description }
    ```
    - 9개 에이전트: project-design-lead(idle), designer(done), frontend-dev(running),
      backend-python(running), tdd-agent(idle), code-reviewer(done),
      observer-diagnostic(idle), task-coordinator(error), final-checker(idle)
  - `const TASKS = [...]` (8개, `agent-team.md:57-66` 운영 흐름 기반):
    ```js
    { id, title, summary, status: 'pending'|'in-progress'|'done'|'blocked', agentId }
    ```
    - 예: "디자인 방향 결정"(designer/done), "API 계약 작성"(backend-python/in-progress),
      "화면 구현"(frontend-dev/in-progress), "테스트 초안"(tdd-agent/pending),
      "코드 리뷰"(code-reviewer/done), "로그 진단"(observer-diagnostic/pending),
      "작업 조율"(task-coordinator/blocked), "최종 점검"(final-checker/pending)
  - `const STRATEGIES = [...]` (4개):
    ```js
    { id, name, emoji, description }
    ```
    - 위원회형🗳, 리더형👑, 파이프라인형🔗, 전문가형🎯

  **섹션 2 — 에이전트 카드 렌더링**:
  - `function renderAgentCards(filter = 'all')`:
    - `#agentCards` 초기화 후 재삽입
    - 필터: `filter === 'all'` → 전체, 아니면 `agent.status === filter`인 카드만
    - 각 카드: `<article class="agent-card agent-card--{status}">이름, 역할, 상태 배지</article>`

  **섹션 3 — 작업 목록 렌더링**:
  - `function renderTasks()`:
    - `#taskList` 초기화 후 `<li class="task-item">` 삽입
    - 배정 에이전트: `AGENTS.find(a => a.id === task.agentId)?.name`
    - 상태 배지: `<span class="task-badge task-badge--{status}">`

  **섹션 4 — 로그/메모 (localStorage)**:
  - `const LOG_KEY = 'dashboard-logs'`, `const MEMO_KEY = 'dashboard-memo'`
  - `function renderLogs(logs)`: `#logList` 재생성, 자동 스크롤
  - `function addLog(msg)`: 타임스탬프 추가 → `logs.slice(-50)` → localStorage → renderLogs
  - `#addLogBtn` 클릭 → `addLog('에이전트 실행 시뮬레이션 #' + Date.now())`
  - `#saveMemoBtn` 클릭 → localStorage 저장 → `#memoDisplay` 업데이트
  - `DOMContentLoaded`에서 로그/메모 불러오기

  **섹션 5 — 전략 체크리스트**:
  - `function renderStrategies()`:
    - `#strategyList` 초기화 후 `<li class="strategy-item"><label><input type="checkbox">...`
  - 체크박스 `change` 이벤트: 체크된 전략 설명을 `#strategyDesc`에 표시

  **섹션 6 — 에이전트 상태 필터**:
  - `.agent-filter button` 클릭: 버튼에 `.active` 토글 → `renderAgentCards(filter)` 호출
  - 초기값: `all` 버튼 `.active`

  **섹션 7 — 다크 모드 토글**:
  - `const THEME_KEY = 'dashboard-theme'`
  - `#darkModeToggle` 클릭: `document.documentElement.dataset.theme` 토글 → localStorage 저장
  - 버튼 텍스트: 라이트 → "🌙 다크", 다크 → "☀️ 라이트"
  - `DOMContentLoaded`에서 저장된 테마 복원

  **섹션 8 — DOMContentLoaded 초기화 블록**:
  ```js
  document.addEventListener('DOMContentLoaded', () => {
    renderAgentCards();
    renderTasks();
    loadLogsAndMemo();
    renderStrategies();
    initFilterButtons();
    initDarkMode();
  });
  ```

  **Must NOT do**:
  - `fetch` / `XMLHttpRequest` 금지
  - `setInterval` 자동 로그 금지
  - 에이전트 카드 클릭 상태 토글 금지
  - 전략 localStorage 저장 불필요 (세션 내 상태만)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (단독 Wave 3)
  - **Parallel Group**: Wave 3 (단일 태스크)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 3, 4, 5, 6 (HTML 구조 및 DOM ID 필요)

  **References**:
  - `agents/project-design-lead.md` ~ `agents/final-checker.md` (9개) — 에이전트 이름/역할 직접 참고
  - `agent-team.md:57-66` — 더미 작업 내용 (7단계 운영 흐름)
  - `index.html` (Task 1+3+4+5+6) — 모든 DOM ID: `#agentCards`, `#taskList`, `#logList`, `#addLogBtn`, `#memoInput`, `#saveMemoBtn`, `#memoDisplay`, `#strategyList`, `#strategyDesc`, `#darkModeToggle`, `.agent-filter button`
  - `style.css` (Task 2+3+4+5+6) — 클래스명: `.agent-card--{status}`, `.task-badge--{status}`, `.strategy-item`, `[data-theme="dark"]`

  **Acceptance Criteria**:
  - [ ] 브라우저에서 `index.html` 열면 에이전트 카드 9개 렌더링
  - [ ] 에이전트 상태 필터 버튼 클릭 시 카드 필터링 동작
  - [ ] `#addLogBtn` 클릭 시 타임스탬프 포함 로그 항목 추가
  - [ ] `#saveMemoBtn` 클릭 후 새로고침해도 메모 유지 (localStorage)
  - [ ] 전략 체크박스 선택 시 `#strategyDesc` 업데이트
  - [ ] `#darkModeToggle` 클릭 시 다크 모드 전환, 새로고침 후 유지
  - [ ] 브라우저 콘솔 에러 없음

  **QA Scenarios**:
  ```
  Scenario: 전체 렌더링 스모크 테스트
    Tool: Playwright
    Steps:
      1. page.goto('file:///C:/workspace/20260521-workshop/index.html')
      2. 콘솔 에러 없음 확인
      3. expect(page.locator('.agent-card')).toHaveCount(9)
      4. expect(page.locator('.task-item')).toHaveCount(8)
      5. expect(page.locator('.strategy-item')).toHaveCount(4)
    Expected Result: 3개 컴포넌트 모두 렌더링됨
    Evidence: .omo/evidence/task-7-smoke.png

  Scenario: 에이전트 상태 필터
    Tool: Playwright
    Steps:
      1. page.click('.agent-filter button[data-filter="idle"]')
      2. 카드 수가 idle 상태 에이전트 수(5개)와 일치 확인
      3. page.click('.agent-filter button[data-filter="all"]')
      4. expect(page.locator('.agent-card')).toHaveCount(9)
    Expected Result: 필터 정확히 동작, all 복원됨
    Evidence: .omo/evidence/task-7-filter.png

  Scenario: 메모 localStorage 유지
    Tool: Playwright
    Steps:
      1. page.fill('#memoInput', '테스트 메모 내용 123')
      2. page.click('#saveMemoBtn')
      3. page.reload()
      4. expect(page.locator('#memoDisplay')).toContainText('테스트 메모 내용 123')
    Expected Result: 새로고침 후 메모 유지
    Evidence: .omo/evidence/task-7-memo-persist.png

  Scenario: 다크 모드 전환 및 유지
    Tool: Playwright
    Steps:
      1. page.click('#darkModeToggle')
      2. expect(page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark')
      3. page.reload()
      4. expect(page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark')
    Expected Result: 다크 모드 전환 및 새로고침 후 유지
    Evidence: .omo/evidence/task-7-darkmode.png

  Scenario: 로그 추가
    Tool: Playwright
    Steps:
      1. const before = await page.locator('.log-item').count()
      2. page.click('#addLogBtn')
      3. expect(page.locator('.log-item')).toHaveCount(before + 1)
    Expected Result: 로그 1개 추가
    Evidence: .omo/evidence/task-7-log.png
  ```

  **Commit**: YES (Commit 4)
  - Message: `feat: add app.js with all rendering, filters, dark mode, localStorage`
  - Files: `app.js`
  - Pre-commit: 브라우저에서 index.html 열어 에러 없음 확인

---

## Final Verification Wave

> 4개 리뷰 에이전트가 병렬 실행. 전부 APPROVE 후 사용자 명시적 승인.

- [x] F1. **Plan Compliance Audit** — `oracle`
  플랜 끝까지 읽기. Must Have 항목마다 구현 존재 여부 확인 (파일 읽기, 브라우저 열기). Must NOT Have 항목 코드베이스 검색. evidence 파일 존재 확인.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  HTML 시맨틱, CSS 일관성, JS 에러 핸들링 검토. `console.log` 프로덕션 잔존 여부. AI slop 패턴: 과도한 주석, 무의미한 변수명.
  Output: `HTML [PASS/FAIL] | CSS [PASS/FAIL] | JS [PASS/FAIL] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` + `playwright`
  Playwright로 브라우저 열기. 모든 태스크 QA 시나리오 실행. 다크 모드, 필터, 메모 새로고침 유지 검증.
  Output: `Scenarios [N/N pass] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  각 태스크 스펙 vs 실제 구현 1:1 비교. Must NOT do 준수 여부. 범위 초과 변경 플래그.
  Output: `Tasks [N/N compliant] | VERDICT`

---

## Commit Strategy

- **Commit 1** (Task 0 완료): `docs: add design.md for dashboard visual direction`
- **Commit 2** (Task 1-2 완료): `feat: add HTML skeleton and CSS design system`
- **Commit 3** (Task 3-6 완료): `feat: add panel HTML templates and component CSS`
- **Commit 4** (Task 7 완료): `feat: add app.js with all rendering, filters, dark mode, localStorage`

---

## Success Criteria

### Verification Commands
```bash
# 브라우저에서 직접 열기
start index.html  # 에러 없이 렌더링됨

# HTML 유효성
npx html-validate index.html  # 0 errors (선택사항)
```

### Final Checklist
- [ ] `design.md` 존재
- [ ] `index.html` + `style.css` + `app.js` 존재
- [ ] 4개 패널 모두 2×2 그리드로 렌더링
- [ ] 에이전트 상태 필터 동작
- [ ] 다크 모드 토글 동작
- [ ] 메모 localStorage 유지
- [ ] Must NOT Have 항목 없음 (API 연동, setInterval, 상태 토글 클릭 없음)
