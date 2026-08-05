# shadcn 레지스트리 조사 결과 (0회차)

조사일: 2026-08-05
조사 방법: `pnpm dlx shadcn@latest search @shadcn` (MCP 서버는 `components.json` 생성 전에 기동되어 구형 `new-york-v4` 레지스트리를 캐시하고 있었음 — 다음 세션 재시작 시 정상화)

## 1. 프로젝트 설정 확정값

`preset bIkeymG`를 디코드한 결과:

```
style        vega
baseColor    neutral
theme        neutral
chartColor   neutral
iconLibrary  lucide
font         inter
fontHeading  inherit
radius       default
menuAccent   subtle
menuColor    default
```

**preset 코드는 base(radix / base / aria)를 인코딩하지 않는다.** `--base base`를 명시적으로 넘겨야 Base UI가 된다.

실행한 명령:

```bash
pnpm dlx shadcn@latest init --preset bIkeymG --base base --no-rtl --no-monorepo --yes
```

결과 `components.json`:

| 필드 | 값 |
|---|---|
| `style` | `base-vega` |
| `iconLibrary` | `lucide` |
| `rtl` | `false` |
| `tailwind.baseColor` | `neutral` |
| `aliases.ui` | `@/components/ui` |
| `aliases.components` | `@/components` |

`--no-rtl` 플래그가 RTL 제외 요구사항을 config 레벨에서 처리한다.

설치 환경: Next.js 16.3.0, React 19.2.8, Tailwind 4.3.3, `@base-ui/react` ^1.7.0, `lucide-react` ^1.28.0, pnpm 10.22.0.

## 2. 설치 경로 (실측)

`pnpm dlx shadcn@latest add @shadcn/button-example` 실행 결과:

```
components/ui/button.tsx        ← registry:ui
components/example.tsx          ← registry:component (Example / ExampleWrapper)
components/button-example.tsx   ← registry:example
```

**채택한 규칙: CLI 기본값을 그대로 쓴다.**

| 위치 | 내용 | 규칙 |
|---|---|---|
| `components/ui/` | shadcn 원본 컴포넌트 | 수정 금지. 부모 레포가 가져갈 대상 |
| `components/*-example.tsx` | 공식 예제 | 수정 금지 |
| `components/example.tsx` | `Example` / `ExampleWrapper` 프리미티브 | 수정 금지 |
| `components/playground/` | 이 레포 전용 코드 | 자유 |

스펙 초안은 예제를 `components/playground/examples/`에 두려 했으나, alias를 바꾸면 향후 다른 non-ui 항목의 위치까지 함께 움직인다. `components/ui/`가 원본만 담는다는 핵심 경계는 CLI 기본값으로도 유지되므로 기본값을 따른다. 대신 `components/` 루트에 `*-example.tsx`가 60여 개 쌓인다 — 접미사가 일관되어 구분에 문제 없다.

## 3. `icon-placeholder` shim은 불필요

레지스트리 원본은 `@/app/(create)/components/icon-placeholder`를 import하지만, **CLI가 설치 시 실제 lucide 아이콘으로 치환한다.**

설치된 `components/button-example.tsx`:

```tsx
import { Example, ExampleWrapper } from "@/components/example"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRightIcon, ArrowLeftCircleIcon } from "lucide-react"
```

계획의 Task 4(shim 작성)는 폐기한다.

## 4. 레지스트리 항목

### `registry:ui` — 62개

accordion, alert, alert-dialog, aspect-ratio, attachment, avatar, badge, breadcrumb, bubble, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, dialog, direction, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, item, kbd, label, marker, menubar, message, message-scroller, native-select, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip

### `registry:example` — 64개

컴포넌트당 `<name>-example` 하나. 그 안에 모든 스토리(variants, sizes, states, 조합 예시)가 들어 있다.

**UI 항목이 있으나 example이 없는 것 (2개):**

| 항목 | 처리 |
|---|---|
| `direction` | RTL 컴포넌트. 제외 (요구사항) |
| `form` | example 없음. Base UI에서는 `field`가 폼 레이아웃을 담당한다. `field-example`로 대체 |

**UI 항목이 아닌데 example이 있는 것 (4개):**

| 항목 | 성격 |
|---|---|
| `sidebar-icon-example` | Sidebar 아이콘 접힘 변형 |
| `sidebar-inset-example` | Sidebar inset 변형 |
| `sidebar-floating-example` | Sidebar floating 변형 |
| `component-example` | 성격 미확인. 해당 회차에서 내용 확인 후 편입 여부 결정 |

### `registry:block` — 30개

- `preview`, `preview-02`, `preview-03`
- `login-01` ~ `login-05`, `signup-01` ~ `signup-05`
- `dashboard-01`
- `sidebar-01` ~ `sidebar-16`

블록은 전체 페이지를 점유하므로 갤러리 안에 넣지 않고 별도 라우트로 뺀다.

### `registry:component` — 1개

`example` — `Example` / `ExampleWrapper` 제공.

## 5. 스펙 계획과의 차이

| 스펙에 있었으나 레지스트리에 없는 것 | 사실 | 처리 |
|---|---|---|
| `data-table` | UI 항목도 example도 없음. Table + TanStack Table 조합을 설명하는 문서 페이지일 뿐 | 회차 계획에서 제외 |
| `date-picker` | 없음. Calendar + Popover 조합 문서 | 제외. `calendar-example`이 대신 커버 |
| `typography` | 없음. 스타일 가이드 문서 | Theme Tokens 페이지에 수동 작성 |

**Toast 관련 정정.** 스펙은 "Toast deprecated → Sonner"로 적었으나 shadcn 스킬 규칙은 반대다: **Base UI 프로젝트는 `toast` 컴포넌트의 `toast`를 쓰고, Sonner는 Radix / React Aria 프로젝트용**이다. 이 프로젝트는 Base UI이므로 `toast`가 정답이다. 다만 `toast-example`과 `sonner-example`이 모두 존재하므로 Feedback 회차에서 둘 다 전시하되 `toast`를 권장으로 표기한다.

## 6. 확정된 회차 계획

예제 63개를 카테고리별 라우트에 배정한다 (`component-example` 1개는 성격 확인 후 배정).

| 회차 | 라우트 | 예제 | 개수 |
|---|---|---|---|
| 1 | `/playground/tokens` | (수동) 색 토큰, Typography | — |
| 2 | `/playground/form` | button, button-group, input, label, textarea, native-select, select, checkbox, radio-group, switch, toggle, toggle-group | 12 |
| 3 | `/playground/form-advanced` | field, input-group, input-otp, combobox, calendar, slider | 6 |
| 4 | `/playground/data-display` | card, table, badge, avatar, separator, skeleton, item, empty, kbd, spinner, progress, aspect-ratio | 12 |
| 5 | `/playground/overlay` | dialog, alert-dialog, sheet, drawer, popover, tooltip, hover-card | 7 |
| 6 | `/playground/menu` | dropdown-menu, context-menu, menubar, command | 4 |
| 7 | `/playground/navigation` | tabs, accordion, collapsible, breadcrumb, navigation-menu, pagination | 6 |
| 8 | `/playground/feedback` | alert, toast, sonner | 3 |
| 9 | `/playground/layout` | scroll-area, resizable, carousel | 3 |
| 10 | `/playground/chat` | attachment, bubble, message, message-scroller, marker | 5 |
| 11 | `/playground/sidebar` | sidebar, sidebar-icon, sidebar-inset, sidebar-floating + 블록 16개 showcase 라우트 | 4 |
| 12 | `/playground/chart` | chart | 1 |

합계 63개. `direction`(RTL)과 `form`(example 없음)은 제외.
