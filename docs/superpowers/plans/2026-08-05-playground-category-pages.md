# Playground 카테고리 페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이미 설치된 61개 공식 예제를 카테고리별 라우트에 배치해 playground 갤러리를 완성한다.

**Architecture:** 각 카테고리는 `app/playground/<slug>/page.tsx` 하나와 `components/playground/categories.ts`의 항목 하나로 구성된다. 페이지는 설치된 예제를 default import해서 `Section`으로 감싸 나열할 뿐이며, 예제 파일은 절대 수정하지 않는다. 사이드바는 `categories.ts`만 읽으므로 셸은 건드리지 않는다. 자체 `SidebarProvider`를 렌더하는 sidebar 예제만 셸 밖 `app/showcase/` 라우트로 분리한다.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui (Base UI, `base-vega`), lucide-react, pnpm

## Global Constraints

- 패키지 매니저는 **pnpm**. 새 의존성을 추가하지 않는다. 필요한 것은 전부 설치되어 있다.
- **`components/ui/**` 와 `components/*-example.tsx` 는 절대 수정하지 않는다.** shadcn 원본이며 부모 레포 공유 대상이다. 예제가 이상해 보여도 고치지 않는다.
- 예제는 **default import**로 가져온다. 파일 내부의 named export나 export 이름에 의존하지 않는다. (예: `marker-example.tsx`의 default export명은 `MarkerExamples`지만 default import이므로 무관하다.)
- 새 컴포넌트를 `shadcn add`로 추가하지 않는다. 예제가 참조하는 컴포넌트는 모두 설치되어 있다.
- **`Section`의 `id`와 `categories.ts`의 `items[].name`은 반드시 같은 문자열**이어야 한다. 사이드바 앵커가 이걸로 연결된다.
- 각 Task의 검증은 **`pnpm build` 통과**다. 테스트 프레임워크는 없다.
- 스타일링은 Tailwind 시맨틱 토큰만 쓴다 (`bg-muted`, `text-muted-foreground`). 원시 색상값(`bg-blue-500`)이나 수동 `dark:` 색 오버라이드를 쓰지 않는다.
- 세로 간격은 `space-y-*`가 아니라 `flex flex-col gap-*`를 쓴다. 너비·높이가 같으면 `size-*`를 쓴다.
- 커밋 메시지는 Conventional Commits.

**참조 스펙:** `docs/superpowers/specs/2026-08-05-shadcn-playground-design.md`
**레지스트리 조사:** `docs/superpowers/notes/2026-08-05-registry-inventory.md`

## 기존 코드에서 알아야 할 것

`components/playground/categories.ts`는 현재 이렇다:

```ts
import { PaletteIcon, type LucideIcon } from "lucide-react"

export type Category = {
  slug: string
  title: string
  icon: LucideIcon
  items: { name: string; title: string }[]
}

export const categories: Category[] = [
  {
    slug: "tokens",
    title: "Theme Tokens",
    icon: PaletteIcon,
    items: [
      { name: "colors", title: "Colors" },
      { name: "typography", title: "Typography" },
    ],
  },
]
```

각 Task는 이 배열 **끝에 항목 하나를 append**하고 필요한 아이콘을 import에 추가한다. 기존 항목을 수정하거나 순서를 바꾸지 않는다.

`app/playground/layout.tsx`가 `SidebarProvider` + `TooltipProvider`로 감싸고 있으므로, 카테고리 페이지는 provider를 다시 렌더하지 않는다.

---

### Task 1: `Section` 컴포넌트와 Form 카테고리

**Files:**
- Create: `components/playground/section.tsx`
- Create: `app/playground/form/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Produces: `Section` — `{ id: string; title: string; children: React.ReactNode }`. 이후 모든 Task가 이걸 쓴다.

- [ ] **Step 1: `Section` 작성**

공식 `ExampleWrapper`가 `bg-muted dark:bg-background` + `min-h-screen` + 자체 max-width 컨테이너를 이미 갖고 있다. `Section`은 그 위에 앵커와 제목만 얹는다. 배경 클래스를 동일하게 맞춰야 제목과 예제가 이어져 보인다.

```tsx
// components/playground/section.tsx
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-muted dark:bg-background scroll-mt-14"
    >
      <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Form 페이지 작성**

12개 예제를 아래 순서 그대로 배치한다. `id`는 표의 `id` 열을 그대로 쓴다.

| id | 제목 | import 경로 |
|---|---|---|
| `button` | Button | `@/components/button-example` |
| `button-group` | Button Group | `@/components/button-group-example` |
| `input` | Input | `@/components/input-example` |
| `label` | Label | `@/components/label-example` |
| `textarea` | Textarea | `@/components/textarea-example` |
| `native-select` | Native Select | `@/components/native-select-example` |
| `select` | Select | `@/components/select-example` |
| `checkbox` | Checkbox | `@/components/checkbox-example` |
| `radio-group` | Radio Group | `@/components/radio-group-example` |
| `switch` | Switch | `@/components/switch-example` |
| `toggle` | Toggle | `@/components/toggle-example` |
| `toggle-group` | Toggle Group | `@/components/toggle-group-example` |

```tsx
// app/playground/form/page.tsx
import ButtonExample from "@/components/button-example";
import ButtonGroupExample from "@/components/button-group-example";
import CheckboxExample from "@/components/checkbox-example";
import InputExample from "@/components/input-example";
import LabelExample from "@/components/label-example";
import NativeSelectExample from "@/components/native-select-example";
import RadioGroupExample from "@/components/radio-group-example";
import SelectExample from "@/components/select-example";
import SwitchExample from "@/components/switch-example";
import TextareaExample from "@/components/textarea-example";
import ToggleExample from "@/components/toggle-example";
import ToggleGroupExample from "@/components/toggle-group-example";
import { Section } from "@/components/playground/section";

export default function FormPage() {
  return (
    <>
      <Section id="button" title="Button">
        <ButtonExample />
      </Section>
      <Section id="button-group" title="Button Group">
        <ButtonGroupExample />
      </Section>
      <Section id="input" title="Input">
        <InputExample />
      </Section>
      <Section id="label" title="Label">
        <LabelExample />
      </Section>
      <Section id="textarea" title="Textarea">
        <TextareaExample />
      </Section>
      <Section id="native-select" title="Native Select">
        <NativeSelectExample />
      </Section>
      <Section id="select" title="Select">
        <SelectExample />
      </Section>
      <Section id="checkbox" title="Checkbox">
        <CheckboxExample />
      </Section>
      <Section id="radio-group" title="Radio Group">
        <RadioGroupExample />
      </Section>
      <Section id="switch" title="Switch">
        <SwitchExample />
      </Section>
      <Section id="toggle" title="Toggle">
        <ToggleExample />
      </Section>
      <Section id="toggle-group" title="Toggle Group">
        <ToggleGroupExample />
      </Section>
    </>
  );
}
```

- [ ] **Step 3: `categories.ts`에 등록**

import 줄에 `SquarePenIcon`을 추가하고, 배열 끝에 append한다.

```ts
  {
    slug: "form",
    title: "Form",
    icon: SquarePenIcon,
    items: [
      { name: "button", title: "Button" },
      { name: "button-group", title: "Button Group" },
      { name: "input", title: "Input" },
      { name: "label", title: "Label" },
      { name: "textarea", title: "Textarea" },
      { name: "native-select", title: "Native Select" },
      { name: "select", title: "Select" },
      { name: "checkbox", title: "Checkbox" },
      { name: "radio-group", title: "Radio Group" },
      { name: "switch", title: "Switch" },
      { name: "toggle", title: "Toggle" },
      { name: "toggle-group", title: "Toggle Group" },
    ],
  },
```

- [ ] **Step 4: 빌드 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

기대: 성공. 라우트 목록에 `/playground/form`이 나타난다.

- [ ] **Step 5: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "feat: add Section component and Form category page"
```

---

### Task 2: Form Advanced 카테고리

**Files:**
- Create: `app/playground/form-advanced/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section` (Task 1)

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라.** 그 파일이 이 페이지의 패턴이다: 예제를 default import하고, 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순으로 정렬하고 `Section` import를 마지막에 둔다. 그 파일과 다른 구조를 만들지 않는다.

| id | 제목 | import 경로 |
|---|---|---|
| `field` | Field | `@/components/field-example` |
| `input-group` | Input Group | `@/components/input-group-example` |
| `input-otp` | Input OTP | `@/components/input-otp-example` |
| `combobox` | Combobox | `@/components/combobox-example` |
| `calendar` | Calendar | `@/components/calendar-example` |
| `slider` | Slider | `@/components/slider-example` |

컴포넌트 이름은 `FormAdvancedPage`.

- [ ] **Step 2: `categories.ts`에 등록**

import에 `ListChecksIcon` 추가, 배열 끝에 append.

```ts
  {
    slug: "form-advanced",
    title: "Form Advanced",
    icon: ListChecksIcon,
    items: [
      { name: "field", title: "Field" },
      { name: "input-group", title: "Input Group" },
      { name: "input-otp", title: "Input OTP" },
      { name: "combobox", title: "Combobox" },
      { name: "calendar", title: "Calendar" },
      { name: "slider", title: "Slider" },
    ],
  },
```

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Form Advanced category page"
```

---

### Task 3: Data Display 카테고리

**Files:**
- Create: `app/playground/data-display/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `DataDisplayPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `card` | Card | `@/components/card-example` |
| `table` | Table | `@/components/table-example` |
| `badge` | Badge | `@/components/badge-example` |
| `avatar` | Avatar | `@/components/avatar-example` |
| `separator` | Separator | `@/components/separator-example` |
| `skeleton` | Skeleton | `@/components/skeleton-example` |
| `item` | Item | `@/components/item-example` |
| `empty` | Empty | `@/components/empty-example` |
| `kbd` | Kbd | `@/components/kbd-example` |
| `spinner` | Spinner | `@/components/spinner-example` |
| `progress` | Progress | `@/components/progress-example` |
| `aspect-ratio` | Aspect Ratio | `@/components/aspect-ratio-example` |

- [ ] **Step 2: `categories.ts`에 등록**

import에 `TableIcon` 추가, 배열 끝에 append. `slug: "data-display"`, `title: "Data Display"`, `items`는 위 표의 id/제목을 같은 순서로.

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Data Display category page"
```

---

### Task 4: Overlay 카테고리

**Files:**
- Create: `app/playground/overlay/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `OverlayPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `dialog` | Dialog | `@/components/dialog-example` |
| `alert-dialog` | Alert Dialog | `@/components/alert-dialog-example` |
| `sheet` | Sheet | `@/components/sheet-example` |
| `drawer` | Drawer | `@/components/drawer-example` |
| `popover` | Popover | `@/components/popover-example` |
| `tooltip` | Tooltip | `@/components/tooltip-example` |
| `hover-card` | Hover Card | `@/components/hover-card-example` |

이 페이지의 예제들은 오버레이를 띄운다. `app/playground/layout.tsx`가 이미 `TooltipProvider`를 제공하므로 페이지에서 provider를 추가하지 않는다.

- [ ] **Step 2: `categories.ts`에 등록**

import에 `LayersIcon` 추가, 배열 끝에 append. `slug: "overlay"`, `title: "Overlay"`.

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Overlay category page"
```

---

### Task 5: Menu 카테고리

**Files:**
- Create: `app/playground/menu/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `MenuPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `dropdown-menu` | Dropdown Menu | `@/components/dropdown-menu-example` |
| `context-menu` | Context Menu | `@/components/context-menu-example` |
| `menubar` | Menubar | `@/components/menubar-example` |
| `command` | Command | `@/components/command-example` |

- [ ] **Step 2: `categories.ts`에 등록**

import에 `MenuIcon` 추가, 배열 끝에 append. `slug: "menu"`, `title: "Menu"`.

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Menu category page"
```

---

### Task 6: Navigation 카테고리

**Files:**
- Create: `app/playground/navigation/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `NavigationPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `tabs` | Tabs | `@/components/tabs-example` |
| `accordion` | Accordion | `@/components/accordion-example` |
| `collapsible` | Collapsible | `@/components/collapsible-example` |
| `breadcrumb` | Breadcrumb | `@/components/breadcrumb-example` |
| `navigation-menu` | Navigation Menu | `@/components/navigation-menu-example` |
| `pagination` | Pagination | `@/components/pagination-example` |

- [ ] **Step 2: `categories.ts`에 등록**

import에 `CompassIcon` 추가, 배열 끝에 append. `slug: "navigation"`, `title: "Navigation"`.

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Navigation category page"
```

---

### Task 7: Feedback과 Layout 카테고리

두 페이지를 만든다. 둘 다 예제가 3개씩이라 한 Task로 묶는다.

**Files:**
- Create: `app/playground/feedback/page.tsx`
- Create: `app/playground/layout-components/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

**주의:** Layout 카테고리의 라우트 세그먼트는 `layout`이 아니라 **`layout-components`**다. Next.js App Router에서 `app/playground/layout/page.tsx`는 동작하지만 디렉터리명이 `layout.tsx` 규약과 혼동을 일으키므로 피한다.

- [ ] **Step 1: Feedback 페이지 작성**

컴포넌트 이름은 `FeedbackPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `alert` | Alert | `@/components/alert-example` |
| `toast` | Toast | `@/components/toast-example` |
| `sonner` | Sonner | `@/components/sonner-example` |

- [ ] **Step 2: Layout 페이지 작성**

컴포넌트 이름은 `LayoutComponentsPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `scroll-area` | Scroll Area | `@/components/scroll-area-example` |
| `resizable` | Resizable | `@/components/resizable-example` |
| `carousel` | Carousel | `@/components/carousel-example` |

- [ ] **Step 3: `categories.ts`에 두 항목 등록**

import에 `BellIcon`, `LayoutGridIcon` 추가. 배열 끝에 Feedback, Layout 순으로 append.

```ts
  {
    slug: "feedback",
    title: "Feedback",
    icon: BellIcon,
    items: [
      { name: "alert", title: "Alert" },
      { name: "toast", title: "Toast" },
      { name: "sonner", title: "Sonner" },
    ],
  },
  {
    slug: "layout-components",
    title: "Layout",
    icon: LayoutGridIcon,
    items: [
      { name: "scroll-area", title: "Scroll Area" },
      { name: "resizable", title: "Resizable" },
      { name: "carousel", title: "Carousel" },
    ],
  },
```

- [ ] **Step 4: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Feedback and Layout category pages"
```

---

### Task 8: Chat 카테고리

**Files:**
- Create: `app/playground/chat/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

**배경:** `message-example`과 `message-scroller-example`은 shadcn 사이트 내부 모듈(`@/lib/ai`, `@/components/message-parts`)에 의존해 빌드가 불가능하므로 설치 단계에서 제외됐다. `Message` / `MessageScroller` 컴포넌트 소스 자체는 `components/ui/`에 있다. **이 두 예제를 되살리려 하지 말 것.** 남은 3개만 배치한다.

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `ChatPage`.

| id | 제목 | import 경로 |
|---|---|---|
| `attachment` | Attachment | `@/components/attachment-example` |
| `bubble` | Bubble | `@/components/bubble-example` |
| `marker` | Marker | `@/components/marker-example` |

- [ ] **Step 2: `categories.ts`에 등록**

import에 `MessageCircleIcon` 추가, 배열 끝에 append. `slug: "chat"`, `title: "Chat"`.

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Chat category page"
```

---

### Task 9: Sidebar 카테고리와 showcase 라우트

Sidebar 예제 4개는 각자 자기 `SidebarProvider`를 렌더하는 **전체 페이지 레이아웃**이다. 갤러리 셸(`app/playground/layout.tsx`)이 이미 `SidebarProvider`를 렌더하므로 그 안에 넣으면 Provider가 중첩된다. 따라서 셸 **바깥**의 별도 라우트로 뺀다.

**Files:**
- Create: `app/showcase/sidebar/page.tsx`
- Create: `app/showcase/sidebar-icon/page.tsx`
- Create: `app/showcase/sidebar-inset/page.tsx`
- Create: `app/showcase/sidebar-floating/page.tsx`
- Create: `app/playground/sidebar/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: showcase 라우트 4개 작성**

`app/showcase/`에는 layout 파일을 만들지 않는다. 루트 `app/layout.tsx`만 적용되어 셸 없이 예제가 전체 화면을 쓴다.

각 파일은 예제를 그대로 렌더한다. 예:

```tsx
// app/showcase/sidebar/page.tsx
import SidebarExample from "@/components/sidebar-example";

export default function SidebarShowcasePage() {
  return <SidebarExample />;
}
```

나머지 3개도 동일한 형태로 만든다:

| 라우트 | import 경로 | 컴포넌트 이름 |
|---|---|---|
| `app/showcase/sidebar/page.tsx` | `@/components/sidebar-example` | `SidebarShowcasePage` |
| `app/showcase/sidebar-icon/page.tsx` | `@/components/sidebar-icon-example` | `SidebarIconShowcasePage` |
| `app/showcase/sidebar-inset/page.tsx` | `@/components/sidebar-inset-example` | `SidebarInsetShowcasePage` |
| `app/showcase/sidebar-floating/page.tsx` | `@/components/sidebar-floating-example` | `SidebarFloatingShowcasePage` |

- [ ] **Step 2: Sidebar 카테고리 페이지 작성 — 링크 카드**

이 페이지는 예제를 직접 렌더하지 않고 showcase 라우트로 가는 링크를 보여준다. `Section` 안에 카드 4장을 넣는다. 설치된 `Card` 컴포넌트를 쓴다.

```tsx
// app/playground/sidebar/page.tsx
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

import { Section } from "@/components/playground/section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SHOWCASES = [
  {
    href: "/showcase/sidebar",
    title: "Sidebar",
    description: "기본 사이드바. 그룹으로 묶인 네비게이션.",
  },
  {
    href: "/showcase/sidebar-icon",
    title: "Sidebar — Icon",
    description: "아이콘으로 접히는 사이드바.",
  },
  {
    href: "/showcase/sidebar-inset",
    title: "Sidebar — Inset",
    description: "본문이 안쪽으로 들어간 inset 변형.",
  },
  {
    href: "/showcase/sidebar-floating",
    title: "Sidebar — Floating",
    description: "떠 있는 형태의 floating 변형.",
  },
];

export default function SidebarPage() {
  return (
    <Section id="sidebar" title="Sidebar">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-12 2xl:max-w-6xl">
        <p className="text-muted-foreground mb-6 text-sm">
          Sidebar 예제는 각자 SidebarProvider를 렌더하는 전체 페이지 레이아웃이라
          갤러리 셸 안에서는 Provider가 중첩된다. 별도 라우트에서 연다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SHOWCASES.map((showcase) => (
            <Card key={showcase.href} className="transition-colors hover:bg-accent">
              <CardHeader>
                <CardTitle>
                  <Link href={showcase.href} className="flex items-center gap-2">
                    {showcase.title}
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </CardTitle>
                <CardDescription>{showcase.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

`components/ui/card.tsx`를 먼저 읽어 실제 export 목록을 확인하고, `CardHeader` / `CardTitle` / `CardDescription`이 없으면 있는 것에 맞춘다. 카드 구성은 shadcn 규칙에 따라 `CardHeader` / `CardTitle` / `CardDescription`을 쓰고 `CardContent`에 전부 밀어넣지 않는다.

- [ ] **Step 3: `categories.ts`에 등록**

import에 `PanelLeftIcon` 추가, 배열 끝에 append.

```ts
  {
    slug: "sidebar",
    title: "Sidebar",
    icon: PanelLeftIcon,
    items: [{ name: "sidebar", title: "Sidebar" }],
  },
```

- [ ] **Step 4: 빌드 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

기대: 성공. 라우트 목록에 `/playground/sidebar`와 `/showcase/sidebar`, `/showcase/sidebar-icon`, `/showcase/sidebar-inset`, `/showcase/sidebar-floating`이 나타난다.

- [ ] **Step 5: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "feat: add Sidebar category page and showcase routes"
```

---

### Task 10: Chart 카테고리

**Files:**
- Create: `app/playground/chart/page.tsx`
- Modify: `components/playground/categories.ts`

**Interfaces:**
- Consumes: `Section` from `@/components/playground/section`

- [ ] **Step 1: 페이지 작성**

**먼저 `app/playground/form/page.tsx`를 읽어라** — 그 파일이 이 페이지의 패턴이다. 예제를 default import하고 각각을 `Section`으로 감싸 표의 순서대로 나열한다. import는 알파벳순, `Section` import는 마지막. 컴포넌트 이름은 `ChartPage`. 예제는 하나다.

| id | 제목 | import 경로 |
|---|---|---|
| `chart` | Chart | `@/components/chart-example` |

- [ ] **Step 2: `categories.ts`에 등록**

import에 `ChartColumnIcon` 추가, 배열 끝에 append.

```ts
  {
    slug: "chart",
    title: "Chart",
    icon: ChartColumnIcon,
    items: [{ name: "chart", title: "Chart" }],
  },
```

- [ ] **Step 3: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add Chart category page"
```

---

## 전체 완료 기준

- [ ] `pnpm build`가 통과한다
- [ ] 라우트 12개가 존재한다: `/playground/{tokens,form,form-advanced,data-display,overlay,menu,navigation,feedback,layout-components,chat,sidebar,chart}`
- [ ] showcase 라우트 4개가 존재한다: `/showcase/{sidebar,sidebar-icon,sidebar-inset,sidebar-floating}`
- [ ] 61개 예제 중 sidebar 4개를 제외한 57개가 카테고리 페이지에 배치되어 있다 (sidebar 4개는 showcase 라우트에)
- [ ] `components/ui/**`와 `components/*-example.tsx`에 변경이 없다
- [ ] 모든 `Section`의 `id`가 대응하는 `categories.ts` 항목의 `items[].name`과 일치한다
- [ ] 사이드바에서 각 카테고리로 이동할 수 있고, light / dark 양쪽에서 정상으로 보인다
