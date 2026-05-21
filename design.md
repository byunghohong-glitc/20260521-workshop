# Design Guide — Multi-Agent Orchestration Dashboard

> 시각 방향 정의서 (Visual Direction Spec).
> 이후 프론트엔드 구현 에이전트는 이 문서의 토큰과 원칙을 기준으로 작업한다.

---

## 1. 디자인 철학

**한 줄 요약**: "콘솔(console)처럼 차분하고, 페이퍼처럼 읽힌다."

레퍼런스 톤은 Linear, Vercel Dashboard, GitHub Actions, Stripe Workbench 같은 *작업용 대시보드*의 공통 문법을 따른다. 이들은 화려한 그라데이션 대신 **타이포그래피 위계**와 **공백 리듬**, **단호한 1px 보더**로 정보를 정리한다.

### 의도적으로 피하는 것

| 안티 패턴 | 이유 |
|---|---|
| 보라색 그라데이션 + 흰 배경 | AI 데모 사이트의 시그니처. 즉시 "생성형" 인상을 준다 |
| 형광 네온 (라임/시안/마젠타) | 작업용 화면에서 눈이 쉽게 지친다 |
| 깊은 drop-shadow + 큰 radius | 게임/SaaS 랜딩 톤. 콘솔 톤과 어긋난다 |
| Inter / Roboto / 시스템 산세리프만 사용 | 무난하지만 캐릭터가 없다 |
| 카드마다 다른 컬러 헤더 | 정보가 평등해져 위계가 무너진다 |

### 한 가지만 기억한다면

**"색은 상태를 말한다. 나머지는 회색이다."**
인터페이스의 90%는 뉴트럴 그레이. 색은 오직 *에이전트 상태*와 *상호작용 포인트*에만 쓴다.

---

## 2. 컬러 팔레트

### 2.1 라이트 모드

차가운 슬레이트(slate) 베이스. 약간의 푸른 기를 머금은 회색으로 "차트지/모눈지" 느낌을 낸다. 순백(`#FFFFFF`)은 카드 표면에만, 배경은 한 톤 낮춰 카드가 살짝 떠 보이게 한다.

| 토큰 | Hex | 용도 |
|---|---|---|
| `--color-bg` | `#F6F7F9` | 페이지 배경 (페이퍼 그레이) |
| `--color-surface` | `#FFFFFF` | 카드/패널 표면 |
| `--color-surface-muted` | `#F1F3F6` | 입력창, 코드 블록, 비활성 배경 |
| `--color-border` | `#E3E6EC` | 1px 디바이더, 카드 외곽선 |
| `--color-border-strong` | `#CBD1DA` | 포커스/구분이 필요한 보더 |
| `--color-text` | `#0F1729` | 본문 (잉크 슬레이트) |
| `--color-text-muted` | `#52606D` | 보조 텍스트, 메타 정보 |
| `--color-text-subtle` | `#8A95A5` | 캡션, placeholder |
| `--color-primary` | `#2F4DD0` | 액션, 링크, 포커스 링 (잉크 블루) |
| `--color-primary-soft` | `#E6ECFB` | primary 배경 톤 (배지, 호버) |

### 2.2 다크 모드

검정이 아니라 **짙은 잉크(`#0B0E14`)**. 순흑은 OLED 대비가 너무 강해 텍스트가 깜빡인다. 표면은 배경보다 *밝게* 올려 카드가 "떠오르는" 인상을 만든다 (라이트 모드와 반대).

| 토큰 | Hex | 용도 |
|---|---|---|
| `--color-bg` | `#0B0E14` | 페이지 배경 |
| `--color-surface` | `#141821` | 카드/패널 표면 |
| `--color-surface-muted` | `#1B2030` | 입력창, 코드 블록 |
| `--color-border` | `#252B38` | 1px 디바이더 |
| `--color-border-strong` | `#363D4D` | 포커스/구분 |
| `--color-text` | `#E6E9F0` | 본문 (오프-화이트, 순백 금지) |
| `--color-text-muted` | `#9AA3B2` | 보조 |
| `--color-text-subtle` | `#646C7D` | 캡션 |
| `--color-primary` | `#7B95FF` | 액션 (밝기 보정된 잉크 블루) |
| `--color-primary-soft` | `#1E2540` | primary 배경 톤 |

### 2.3 에이전트 상태 색상 (라이트 / 다크 공용 시맨틱)

상태 색은 **점(dot) + 라벨 + 옅은 배경 칩(chip)** 세 가지 표현을 갖는다. dot 색은 채도 높게, 배경 칩은 채도를 낮춰 텍스트와 분리되게 한다.

| 상태 | 의미 | `--color-*` (light) | `--color-*` (dark) | `--color-*-soft` (light bg) | `--color-*-soft` (dark bg) |
|---|---|---|---|---|---|
| `idle` | 대기 / 미할당 | `#8A95A5` | `#7C8696` | `#EEF0F4` | `#1E2330` |
| `running` | 실행 중 | `#2F6FE0` | `#5A8CFF` | `#E5EEFB` | `#15233F` |
| `done` | 완료 | `#1F9D55` | `#3DD17A` | `#E3F4EA` | `#0F2A1C` |
| `error` | 오류 / 중단 | `#D24545` | `#F46B6B` | `#FAE6E6` | `#3A1414` |

> **운영 규칙**: `running` 상태의 dot은 `1.4s` 정도의 *부드러운* opacity 펄스만 허용. 깜빡임/회전 스피너 금지 — 콘솔 톤을 깬다.

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

웹폰트 의존을 최소화하되, 시스템 폰트만 쓰지 않는다. **Pretendard**(한국어/영문 모두 균질)를 본문에, **JetBrains Mono**를 코드/ID/타임스탬프에 쓴다. 둘 다 무료/오픈소스이고 캐릭터가 분명하다.

```
--font-sans: "Pretendard Variable", Pretendard, -apple-system,
             "Segoe UI", "Helvetica Neue", "Apple SD Gothic Neo",
             "Noto Sans KR", sans-serif;

--font-mono: "JetBrains Mono", "SF Mono", "Cascadia Code",
             Consolas, "D2Coding", monospace;
```

### 3.2 사이즈 스케일

1.125배(major second) 비율. 작은 화면 정보 밀도가 핵심이므로 base는 14px로 잡는다.

| 토큰 | 크기 | line-height | 용도 |
|---|---|---|---|
| `--text-xs` | 11px | 1.4 | 메타 (timestamp, count, badge inner) |
| `--text-sm` | 12px | 1.5 | 캡션, 보조 라벨 |
| `--text-base` | 14px | 1.55 | 본문 기본 |
| `--text-lg` | 16px | 1.45 | 패널 제목 (h2) |
| `--text-xl` | 20px | 1.3 | 대시보드 헤더 (h1) |
| `--text-2xl` | 26px | 1.2 | 페이지 타이틀 (필요 시) |

### 3.3 굵기

`400` (regular), `500` (medium), `600` (semibold) 세 단계만 쓴다. `700`(bold)는 거의 안 쓴다 — 콘솔 톤에서 너무 강하다. 제목 강조는 굵기 대신 **크기**와 **letter-spacing**으로 한다.

- 본문: `400`
- 라벨, 패널 제목: `500`
- 헤더, 강조 숫자: `600`
- 메타 라벨 (uppercase 캡션): `500` + `letter-spacing: 0.06em` + `font-size: 11px`

---

## 4. 카드 / 컴포넌트 스타일

### 4.1 카드 (Panel)

대시보드의 기본 단위. 4개 패널(에이전트 카드, 작업 목록, 로그/메모, 전략 체크리스트)이 모두 같은 토큰을 공유한다.

- **border-radius**: `10px` — 둥글지도 각지지도 않은 중립값. (8보다 살짝 더, 12보다 살짝 덜)
- **border**: `1px solid var(--color-border)` — *shadow보다 border 우선*. shadow는 거의 보이지 않을 정도로만.
- **box-shadow**: `0 1px 0 rgba(15, 23, 41, 0.02), 0 1px 3px rgba(15, 23, 41, 0.03)` (light) — 종이가 살짝 떠 있는 정도. dark는 shadow 거의 0.
- **padding**: 내부 `20px ~ 24px`. 헤더/푸터 분리 시 `16px 20px`.
- **hover**: border 색만 `--color-border-strong`으로. transform/scale 금지.

### 4.2 카드 좌측 액센트 (Border-Left Accent)

에이전트 카드와 로그 항목은 **좌측 3px border**로 상태를 표현한다. 이건 GitHub Actions의 잡 카드, Vercel의 deployment 로그가 공유하는 패턴 — 색을 점이 아닌 *선*으로 보여줘 스캔 속도가 빨라진다.

```
.card[data-state="idle"]    → border-left: 3px solid var(--color-idle)
.card[data-state="running"] → border-left: 3px solid var(--color-running)
.card[data-state="done"]    → border-left: 3px solid var(--color-done)
.card[data-state="error"]   → border-left: 3px solid var(--color-error)
```

좌측 액센트가 있으면 카드 좌측 padding을 `padding-left: calc(20px - 3px)` 식으로 보정해 텍스트 정렬을 맞춘다.

### 4.3 배지 (Badge / Chip)

상태 라벨, 전략 태그, 카운트 표시.

- **border-radius**: `4px` (네모에 가깝게 — pill 모양은 토이스러워진다)
- **padding**: `2px 8px`
- **font**: `--font-mono`, `--text-xs`, weight `500`, uppercase
- **배경**: `--color-{state}-soft`, **글자**: `--color-{state}`
- **border**: 없음. soft 배경만으로 분리.

### 4.4 버튼

- **Primary**: 배경 `--color-primary`, 글자 흰색, radius `8px`, padding `8px 14px`, weight `500`.
- **Ghost**: 배경 투명, 보더 `1px solid var(--color-border)`, 글자 `--color-text`.
- **호버**: primary는 5% 어둡게, ghost는 배경 `--color-surface-muted`.
- 그라데이션, 그림자 강조 금지.

### 4.5 다크 모드 토글

오른쪽 상단 헤더에 위치. 아이콘 토글(☀ / ☾) 형태. Ghost 버튼 스타일을 따른다. transition은 `background-color 120ms ease, border-color 120ms ease` 정도로만 — 페이지 전체 fade 금지(눈이 피곤하다).

---

## 5. 전략 유형 아이콘

전략 카테고리는 **이모지 1자 + 한글 라벨 + 영문 키**로 표기한다. 이모지는 컬러풀해도 되지만, 옆 배경은 항상 `--color-surface-muted`로 잡아 *시스템적*으로 보이게 한다.

| 키 | 이모지 | 한글 라벨 | 의미 |
|---|---|---|---|
| `committee` | 🗳 | 위원회형 | 다수 에이전트 투표/합의로 결정 |
| `leader` | 👑 | 리더형 | 단일 리더가 분배·결정 |
| `pipeline` | 🔗 | 파이프라인형 | 순차 인계, 단계별 산출물 |
| `expert` | 🎯 | 전문가형 | 도메인 전문가가 단독 수행 |
| `pair` | 👥 | 페어형 | 2인 교차 검증 (선택) |
| `tournament` | 🏆 | 토너먼트형 | 경쟁/베스트 선택 (선택) |

> 필수 4종은 `committee / leader / pipeline / expert`. 나머지는 확장 슬롯.

이모지 렌더링은 OS에 따라 차이가 나므로, 라벨 텍스트가 항상 함께 노출되어야 한다. 이모지 단독 사용 금지.

---

## 6. 레이아웃 원칙 (2×2 그리드)

- **그리드**: 데스크탑 기준 `grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;` — 4개 패널이 동등한 시각 비중을 가진다.
- **gap**: `16px` (좁다고 느낄 만큼, 정보 밀도를 살린다).
- **최대 너비**: 1440px 정도에서 중앙 정렬. 그 이상은 좌우 여백.
- **헤더**: 그리드 위 고정 영역. 높이 56px 정도. 타이틀 + 필터 + 다크 모드 토글.
- **반응형**: 1024px 이하에서 `1fr` 단일 컬럼으로 떨어지고, 패널은 세로 스택. 본 과제는 데스크탑 우선이므로 모바일은 *깨지지만 않으면* 된다.
- **패널 내부**: 헤더 / 본문 / (선택)푸터 3단 구조. 헤더에는 패널 타이틀 + 카운트 배지 + 필터 토글.

### 정보 밀도

- 한 카드 내에 *최소 8행* 정보를 보여주는 것을 가정하고 line-height와 padding을 잡는다.
- 빈 상태(empty state)도 의도적으로 디자인한다 — "아직 작업 없음" 같은 옅은 텍스트 + 작은 아이콘.

---

## 7. 모션

- 모든 상태 전이: `120ms ~ 180ms`, `cubic-bezier(0.2, 0, 0, 1)` (ease-out 계열).
- `running` dot 펄스: `opacity: 1 ↔ 0.5`, `1400ms`, ease-in-out, 무한 반복.
- 카드 등장: `opacity 0 → 1` + `translateY(4px → 0)`, 페이지 로드 시 100ms stagger.
- 다크 모드 토글: 전역 페이드 금지. 변수 바꿔치기로 즉시 전환되되, 색 transition 120ms.
- 호버 transform / scale / rotate **금지**.

---

## 8. CSS 변수 종합 레퍼런스

구현 에이전트는 아래 표를 단일 진실로 본다. 이름은 그대로, 값만 모드에 따라 오버라이드한다.

| 변수명 | 라이트 모드 | 다크 모드 |
|---|---|---|
| `--color-bg` | `#F6F7F9` | `#0B0E14` |
| `--color-surface` | `#FFFFFF` | `#141821` |
| `--color-surface-muted` | `#F1F3F6` | `#1B2030` |
| `--color-border` | `#E3E6EC` | `#252B38` |
| `--color-border-strong` | `#CBD1DA` | `#363D4D` |
| `--color-text` | `#0F1729` | `#E6E9F0` |
| `--color-text-muted` | `#52606D` | `#9AA3B2` |
| `--color-text-subtle` | `#8A95A5` | `#646C7D` |
| `--color-primary` | `#2F4DD0` | `#7B95FF` |
| `--color-primary-soft` | `#E6ECFB` | `#1E2540` |
| `--color-idle` | `#8A95A5` | `#7C8696` |
| `--color-idle-soft` | `#EEF0F4` | `#1E2330` |
| `--color-running` | `#2F6FE0` | `#5A8CFF` |
| `--color-running-soft` | `#E5EEFB` | `#15233F` |
| `--color-done` | `#1F9D55` | `#3DD17A` |
| `--color-done-soft` | `#E3F4EA` | `#0F2A1C` |
| `--color-error` | `#D24545` | `#F46B6B` |
| `--color-error-soft` | `#FAE6E6` | `#3A1414` |

### 타이포 / 형태 토큰

| 변수명 | 값 |
|---|---|
| `--font-sans` | `"Pretendard Variable", Pretendard, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif` |
| `--font-mono` | `"JetBrains Mono", "SF Mono", Consolas, "D2Coding", monospace` |
| `--text-xs` / `--text-sm` / `--text-base` / `--text-lg` / `--text-xl` | `11px / 12px / 14px / 16px / 20px` |
| `--radius-sm` | `4px` (배지) |
| `--radius-md` | `8px` (버튼, 입력) |
| `--radius-lg` | `10px` (카드/패널) |
| `--space-1` ~ `--space-6` | `4 / 8 / 12 / 16 / 20 / 24 px` |

---

## 9. 적용 체크리스트 (프론트엔드 인계용)

- [ ] `:root`에 라이트 모드 변수, `[data-theme="dark"]`에 다크 모드 변수 정의
- [ ] 모든 색은 변수 참조. 하드코딩 hex 금지
- [ ] 에이전트 카드는 `data-state="..."` 속성으로 좌측 액센트 + dot 색 동시 제어
- [ ] 전략 태그는 이모지 + 라벨 + `data-strategy` 키 함께 표기
- [ ] 다크 모드 토글은 `localStorage`에 선호 저장 (FOUC 방지)
- [ ] 포커스 링은 `--color-primary` 2px outline + 2px offset
- [ ] 폰트 로딩 실패해도 fallback이 읽힌다 — 시스템 폰트 스택 필수

---

## 10. "AI처럼 보이지 않게" 만드는 마지막 점검

배포 직전, 디자이너가 직접 본다는 가정으로 본다:

1. **보라/핑크 그라데이션이 있는가?** → 있으면 제거.
2. **카드마다 색이 다른가?** → 상태색만 좌측 라인으로. 나머지 회색.
3. **둥근 모서리가 14px 이상인가?** → 10px로 줄임.
4. **드롭 섀도우가 보이는가?** → 거의 안 보일 정도로 약화.
5. **모든 텍스트가 회색 톤인가?** → 본문은 잉크 슬레이트, 메타만 회색.
6. **이모지가 단독으로 의미를 전달하는가?** → 항상 라벨 동반.
7. **호버에 transform이 있는가?** → 색 변화로만 표현.

이 7가지가 모두 통과하면 디자인 방향은 합격.
