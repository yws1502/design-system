# Playground 0회차 — 스캐폴딩 & 갤러리 셸 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js + shadcn(Base UI) 프로젝트를 세우고, 이후 모든 회차가 얹힐 Sidebar 기반 갤러리 셸과 Theme Tokens 페이지를 동작하는 상태로 만든다.

**Architecture:** `app/playground/layout.tsx`가 shadcn `Sidebar` 컴포넌트로 셸을 구성하고, `components/playground/categories.ts`의 메타 배열을 읽어 네비게이션을 생성한다. 이후 회차는 카테고리 페이지 파일 하나와 `categories.ts` 항목 하나만 추가하며 셸은 다시 건드리지 않는다. 공식 예제는 무수정 보존이 원칙이므로, 예제가 참조하는 사이트 내부 파일(`icon-placeholder`)은 동일 경로에 shim으로 채운다.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind, shadcn CLI, Base UI (`@base-ui/react`), lucide-react, next-themes, pnpm

## Global Constraints

- 패키지 매니저는 **pnpm**. 모든 명령은 `pnpm` / `pnpm dlx`로 실행한다.
- `components.json`의 `style`은 **`base-*` 중 하나**여야 한다 (Base UI). `radix-*` / `aria-*` / `default` / `new-york`이면 안 된다.
- `components.json`의 `iconLibrary`는 **`lucide`**.
- `components/ui/`에는 **shadcn 원본만** 둔다. playground 전용 코드를 넣지 않는다. 부모 레포가 이 폴더만 가져가면 되어야 한다.
- 설치된 공식 예제 소스는 **수정하지 않는다**. 깨지면 예제를 고치는 대신 주변(shim, alias, 래퍼)을 맞춘다.
- 테스트 프레임워크는 두지 않는다. 각 Task의 검증은 **`pnpm build` 통과 + 브라우저에서 light / dark 양쪽 육안 확인**이다.
- RTL 관련 항목(`Direction`)은 제외한다.
- `.gitignore`는 새 산출물(빌드 캐시, 로그, 에디터 파일 등)이 생길 때마다 갱신한다.
- 커밋 메시지는 Conventional Commits.

**참조 스펙:** `docs/superpowers/specs/2026-08-05-shadcn-playground-design.md`

---

### Task 1: Next.js 스캐폴딩과 git 초기화

**Files:**
- Create: 프로젝트 루트 전체 (`package.json`, `tsconfig.json`, `next.config.ts`, `app/`, `.gitignore`)
- Modify: `.gitignore`

현재 디렉터리에는 `.claude/`, `.agents/`, `skills-lock.json`, `.mcp.json`, `docs/`가 이미 있다. `create-next-app`을 빈 디렉터리가 아닌 곳에 돌려야 하므로 `.` 타깃으로 실행하고 충돌 여부를 확인한다.

**Interfaces:**
- Produces: `pnpm dev` / `pnpm build` 스크립트, `@/*` → 프로젝트 루트 alias, `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: 현재 디렉터리 상태 확인**

```bash
cd /Users/woosang/Desktop/workspace/design-system && ls -a
```

기대: `.agents`, `.claude`, `.mcp.json`, `docs`, `skills-lock.json`만 존재. `package.json`이 이미 있으면 중단하고 사용자에게 보고.

- [ ] **Step 2: Next.js 스캐폴딩**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm dlx create-next-app@latest . \
  --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-pnpm --yes
```

기존 파일이 있어 진행 여부를 묻거나 실패하면, 프롬프트에 따라 진행하되 **기존 `docs/`, `.claude/`, `.agents/`, `.mcp.json`, `skills-lock.json`을 덮어쓰지 않는지 확인**한다. 덮어쓸 것 같으면 중단하고 보고.

- [ ] **Step 3: git 초기화 확인**

```bash
git -C /Users/woosang/Desktop/workspace/design-system rev-parse --is-inside-work-tree
```

`create-next-app`이 자동으로 `git init`을 한다. 실패하면(`not a git repository`) 직접 실행:

```bash
git -C /Users/woosang/Desktop/workspace/design-system init
```

- [ ] **Step 4: `.gitignore` 갱신**

`create-next-app`이 만든 `.gitignore` 끝에 다음 블록을 추가한다. 이미 있는 항목은 중복 추가하지 않는다.

```gitignore

# editor / OS
.DS_Store
*.swp
.idea/
.vscode/*
!.vscode/extensions.json

# logs
*.log
npm-debug.log*
pnpm-debug.log*

# local env
.env
.env.local
.env.*.local
```

`.claude/`, `.agents/`, `.mcp.json`, `skills-lock.json`은 **ignore하지 않는다** — 프로젝트 설정이므로 커밋 대상이다.

- [ ] **Step 5: 빌드 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

기대: 성공. 실패하면 원인을 보고하고 중단.

- [ ] **Step 6: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "chore: scaffold Next.js app with TypeScript and Tailwind"
```

---

### Task 2: shadcn 초기화와 Base UI style 확정

**Files:**
- Create: `components.json`, `lib/utils.ts`, `components/ui/` (초기 항목)
- Modify: `app/globals.css`, `package.json`

**Interfaces:**
- Consumes: Task 1의 Next.js 프로젝트
- Produces: `components.json` (`style`, `iconLibrary`, `aliases`), `cn()` from `@/lib/utils`

- [ ] **Step 1: preset으로 init**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm dlx shadcn@latest init --preset bIkeymG
```

대화형 프롬프트가 뜨면 기본값을 따르되, 아래 Step 2의 제약(`style`, `iconLibrary`)에 어긋나는 선택지는 고르지 않는다.

- [ ] **Step 2: `components.json` 확인 — 이 회차의 핵심 분기**

```bash
cd /Users/woosang/Desktop/workspace/design-system && cat components.json
```

확인할 것:

| 필드 | 기대값 | 아니면 |
|---|---|---|
| `style` | `base-vega` 등 `base-` 접두사 | `radix-*` / `aria-*`이면 접두사만 `base-`로 바꾼다 (예: `radix-vega` → `base-vega`). `default` / `new-york`이면 `base-vega`로 설정 |
| `iconLibrary` | `lucide` | `lucide`로 수정 |
| `aliases.ui` | `@/components/ui` | 그대로 |
| `aliases.utils` | `@/lib/utils` | 그대로 |

`style`을 수동으로 바꿨다면 preset이 주입한 CSS 토큰이 그 style과 맞는지 확인해야 한다. **사용자에게 preset이 실제로 무엇을 지정했는지와, 변경했다면 무엇을 바꿨는지 보고한다.**

- [ ] **Step 3: 의존성 확인**

```bash
cd /Users/woosang/Desktop/workspace/design-system && cat package.json
```

`@base-ui/react`, `lucide-react`, `class-variance-authority`, `tailwind-merge`가 있어야 한다. 없으면:

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm add @base-ui/react lucide-react class-variance-authority tailwind-merge
```

- [ ] **Step 4: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "chore: init shadcn with Base UI style preset"
```

---

### Task 3: 레지스트리 조사 — 이후 회차의 입력 확정

이 Task는 코드를 거의 만들지 않는다. 산출물은 **문서**다. 이후 모든 회차의 컴포넌트 배정이 여기서 나온 목록에 의존한다.

**Files:**
- Create: `docs/superpowers/notes/2026-08-05-registry-inventory.md`
- Modify: `docs/superpowers/specs/2026-08-05-shadcn-playground-design.md` (미결 사항 해소)

**Interfaces:**
- Consumes: Task 2의 `components.json`
- Produces: 레지스트리 전체 항목 목록 문서, `registry:example` 설치 경로 확정

- [ ] **Step 1: MCP로 레지스트리 항목 전체 열거**

MCP 도구 `mcp__shadcn__list_items_in_registries`를 `{ registries: ["@shadcn"], limit: 0 }`로 호출한다. `components.json`이 생겼으므로 이제 동작한다.

- [ ] **Step 2: 예제 항목 열거**

같은 도구를 `{ registries: ["@shadcn"], types: ["registry:example"], limit: 0 }`로 호출한다. 실패하거나 비면 `mcp__shadcn__search_items_in_registries`를 `{ query: "example", limit: 0 }`로 호출한다.

- [ ] **Step 3: 설치 경로 확정 — 실제로 하나 설치해본다**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm dlx shadcn@latest add button-example
```

그 다음 어디에 떨어졌는지 확인:

```bash
cd /Users/woosang/Desktop/workspace/design-system && git status --porcelain
```

기대: `components/ui/button.tsx`, `components/ui/example.tsx`(또는 유사 경로), 그리고 `button-example.tsx`가 어딘가에 생성됨.

**판단 규칙:**
- 예제 파일이 `components/ui/` 안에 떨어졌다면 → `components/ui/`는 원본 전용이라는 경계가 깨진다. `components.json`에 예제용 alias가 있으면 `@/components/playground/examples`로 지정한다. alias가 없으면 **경계를 지키는 쪽으로 규칙을 수정**한다: 설치 후 예제 파일만 `components/playground/examples/`로 옮기고 import 경로를 고치는 대신, `components/ui/` 하위에 예제가 섞이는 것을 허용하지 않기 위해 `components/examples/`를 기본 위치로 삼는다. 최종 결정을 문서에 기록한다.
- 예제가 `@/app/(create)/components/icon-placeholder`를 import하고 있는지 확인한다 (Task 4의 입력).

- [ ] **Step 4: 조사 결과 문서화**

`docs/superpowers/notes/2026-08-05-registry-inventory.md`에 다음을 기록한다:

1. `components.json`의 최종 `style` 값과 preset이 원래 지정한 값
2. `registry:ui` 항목 전체 목록
3. `registry:example` 항목 전체 목록
4. `registry:example` / `registry:component` 파일의 실제 설치 경로와 채택한 규칙
5. 스펙의 회차 계획(2~12회차)에 있는 컴포넌트 중 **레지스트리에 없는 것**과 **계획에 없는데 레지스트리에 있는 것**
6. Toast / Sonner, Typography의 실제 항목명

- [ ] **Step 5: 스펙의 미결 사항 갱신**

스펙 파일의 "0회차에서 확정할 미결 사항" 3개 항목을 확정된 답으로 교체하고, 회차 계획 표의 컴포넌트 배정을 실제 목록에 맞게 조정한다.

- [ ] **Step 6: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "docs: record shadcn registry inventory and resolve spec open questions"
```

- [ ] **Step 7: 사용자에게 보고 후 대기**

조사 결과 중 스펙과 달라진 부분(누락 컴포넌트, 설치 경로 규칙 변경, style 값)을 요약해서 보고한다. 회차 계획이 크게 바뀌어야 하면 진행 전에 확인받는다.

---

### Task 4: `icon-placeholder` shim

공식 예제가 `@/app/(create)/components/icon-placeholder`를 import하는데 이 파일은 레지스트리에 없다. 동일 경로에 shim을 두어 예제를 무수정으로 유지한다.

**Files:**
- Create: `app/(create)/components/icon-placeholder.tsx`

**Interfaces:**
- Consumes: Task 3에서 확인한 실제 import 경로와 사용 형태
- Produces: `IconPlaceholder` — `React.ComponentProps<"svg">`를 받는 SVG 컴포넌트

- [ ] **Step 1: 실제 사용 형태 확인**

```bash
cd /Users/woosang/Desktop/workspace/design-system && grep -rn "icon-placeholder\|IconPlaceholder" --include=*.tsx .
```

import 경로가 스펙에 적힌 것과 다르면 **실제 경로에 맞춘다**. 예제를 고치지 않는다.

- [ ] **Step 2: shim 작성**

Step 1에서 확인한 경로에 아래 파일을 만든다 (경로가 다르면 그 경로로).

```tsx
// app/(create)/components/icon-placeholder.tsx
export function IconPlaceholder({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="m3 3 18 18" />
    </svg>
  )
}
```

`lucide-react` 아이콘과 동일한 관례(`currentColor` stroke, `size-4` 같은 유틸리티 클래스로 크기 제어)를 따르므로 예제의 클래스가 그대로 먹는다.

- [ ] **Step 3: 빌드 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

기대: `Module not found: @/app/(create)/components/icon-placeholder` 에러가 사라짐.

- [ ] **Step 4: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "feat: add IconPlaceholder shim for official shadcn examples"
```

---

### Task 5: 다크모드 — ThemeProvider와 토글

**Files:**
- Create: `components/playground/theme-provider.tsx`, `components/playground/theme-toggle.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `components/ui/button.tsx`(Task 3에서 설치됨), `components/ui/dropdown-menu.tsx`
- Produces: `<ThemeProvider>` 래퍼, `<ThemeToggle />` — 인자 없음

- [ ] **Step 1: 의존성 설치**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm add next-themes && pnpm dlx shadcn@latest add dropdown-menu button
```

- [ ] **Step 2: ThemeProvider 작성**

```tsx
// components/playground/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 3: `app/layout.tsx`에 연결**

`<body>` 안을 `ThemeProvider`로 감싸고, `<html>`에 `suppressHydrationWarning`을 추가한다. 이게 없으면 next-themes가 서버/클라이언트 클래스 불일치로 hydration 경고를 낸다.

```tsx
// app/layout.tsx (핵심 부분)
import { ThemeProvider } from "@/components/playground/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={/* 기존 폰트 클래스 유지 */ ""}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

`create-next-app`이 생성한 폰트 변수 클래스는 그대로 유지한다.

- [ ] **Step 4: ThemeToggle 작성**

```tsx
// components/playground/theme-toggle.tsx
"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <SunIcon className="size-4 dark:hidden" />
        <MoonIcon className="hidden size-4 dark:block" />
        <span className="sr-only">테마 전환</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**주의:** Base UI의 `DropdownMenuTrigger`는 Radix의 `asChild` 대신 `render` prop을 쓸 수 있다. 설치된 `components/ui/dropdown-menu.tsx`를 먼저 읽고 실제 API에 맞춘다. `asChild`를 쓰면 `<DropdownMenuTrigger asChild><Button …>…</Button></DropdownMenuTrigger>` 형태로 바꾼다.

- [ ] **Step 5: 빌드 검증 및 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build && git add -A && git commit -m "feat: add theme provider and toggle"
```

---

### Task 6: 카테고리 메타와 Sidebar 갤러리 셸

**Files:**
- Create: `components/playground/categories.ts`, `components/playground/gallery-sidebar.tsx`, `app/playground/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `components/ui/sidebar.tsx`, `<ThemeToggle />`
- Produces:
  - `type Category = { slug: string; title: string; items: { name: string; title: string }[] }`
  - `export const categories: Category[]`
  - `<GallerySidebar />` — 인자 없음

- [ ] **Step 1: Sidebar 설치와 API 확인**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm dlx shadcn@latest add sidebar
```

설치된 `components/ui/sidebar.tsx`의 export 목록을 확인한다:

```bash
cd /Users/woosang/Desktop/workspace/design-system && grep -n "^export" components/ui/sidebar.tsx
```

Base UI 변형은 Radix 버전과 prop 이름이 다를 수 있다. 아래 코드는 표준 API 기준이므로, 실제 export와 다르면 실제 쪽에 맞춘다.

- [ ] **Step 2: 카테고리 메타 작성**

0회차 시점에는 `tokens` 하나만 등록한다. 이후 회차가 여기에 항목을 추가한다.

```ts
// components/playground/categories.ts
export type Category = {
  slug: string
  title: string
  items: { name: string; title: string }[]
}

export const categories: Category[] = [
  {
    slug: "tokens",
    title: "Theme Tokens",
    items: [
      { name: "colors", title: "Colors" },
      { name: "typography", title: "Typography" },
    ],
  },
]
```

- [ ] **Step 3: GallerySidebar 작성**

```tsx
// components/playground/gallery-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { categories } from "@/components/playground/categories"
import { ThemeToggle } from "@/components/playground/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function GallerySidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold group-data-[collapsible=icon]:hidden">
          Design System
        </div>
      </SidebarHeader>
      <SidebarContent>
        {categories.map((category) => {
          const href = `/playground/${category.slug}`
          return (
            <SidebarGroup key={category.slug}>
              <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    tooltip={category.title}
                  >
                    <Link href={href}>{category.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
```

`SidebarMenuButton`이 `asChild`를 지원하지 않으면(Base UI 변형) `render={<Link href={href} />}` 형태로 바꾼다. Step 1에서 확인한 실제 API를 따른다.

- [ ] **Step 4: playground 레이아웃 작성**

```tsx
// app/playground/layout.tsx
import { GallerySidebar } from "@/components/playground/gallery-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <GallerySidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

`SidebarTrigger`가 `cmd+b` / `ctrl+b` 단축키를 제공한다 (`SidebarProvider`에 내장). Step 6에서 실제로 확인한다.

- [ ] **Step 5: 루트 리다이렉트**

```tsx
// app/page.tsx
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/playground/tokens")
}
```

- [ ] **Step 6: 빌드 및 육안 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

그 다음 `pnpm dev`로 띄우고 `http://localhost:3000` 확인:

- `/playground/tokens`로 리다이렉트되는가 (Task 7 전이므로 404가 뜰 수 있다 — 그 경우 사이드바 셸이 보이는지만 확인)
- `SidebarTrigger` 클릭 시 아이콘 모드로 접히는가
- `cmd+b`(macOS)로 접히고 펴지는가
- 접힌 상태에서 메뉴에 hover하면 tooltip이 뜨는가
- 테마 토글로 light / dark 전환이 되는가

- [ ] **Step 7: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "feat: add sidebar gallery shell with category navigation"
```

---

### Task 7: Theme Tokens 페이지

preset이 주입한 색 토큰과 타이포그래피를 눈으로 확인하는 페이지. 이후 회차에서 컴포넌트 색이 이상할 때 원인을 토큰 단위로 좁힐 수 있게 한다.

**Files:**
- Create: `app/playground/tokens/page.tsx`, `components/playground/token-swatch.tsx`

**Interfaces:**
- Consumes: Task 6의 playground 레이아웃
- Produces: 없음 (말단 페이지)

- [ ] **Step 1: 실제 토큰 목록 확인**

```bash
cd /Users/woosang/Desktop/workspace/design-system && grep -n "^\s*--" app/globals.css | head -80
```

preset이 정의한 CSS 변수 이름을 확인한다. 아래 Step 2의 목록과 다르면 **실제 목록에 맞춘다**.

- [ ] **Step 2: TokenSwatch 작성**

```tsx
// components/playground/token-swatch.tsx
export function TokenSwatch({
  name,
  className,
}: {
  name: string
  className: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`size-10 shrink-0 rounded-md border ${className}`}
        aria-hidden="true"
      />
      <code className="truncate text-xs text-muted-foreground">{name}</code>
    </div>
  )
}
```

- [ ] **Step 3: 페이지 작성**

```tsx
// app/playground/tokens/page.tsx
import { TokenSwatch } from "@/components/playground/token-swatch"

const COLORS = [
  { name: "--background", className: "bg-background" },
  { name: "--foreground", className: "bg-foreground" },
  { name: "--card", className: "bg-card" },
  { name: "--popover", className: "bg-popover" },
  { name: "--primary", className: "bg-primary" },
  { name: "--secondary", className: "bg-secondary" },
  { name: "--muted", className: "bg-muted" },
  { name: "--accent", className: "bg-accent" },
  { name: "--destructive", className: "bg-destructive" },
  { name: "--border", className: "bg-border" },
  { name: "--input", className: "bg-input" },
  { name: "--ring", className: "bg-ring" },
]

export default function TokensPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-12 p-6 lg:p-12">
      <section id="colors" className="flex flex-col gap-4 scroll-mt-20">
        <h2 className="text-lg font-semibold">Colors</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((token) => (
            <TokenSwatch key={token.name} {...token} />
          ))}
        </div>
      </section>

      <section id="typography" className="flex flex-col gap-4 scroll-mt-20">
        <h2 className="text-lg font-semibold">Typography</h2>
        <div className="flex flex-col gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Heading 1
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Heading 2
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Heading 3
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Heading 4
          </h4>
          <p className="leading-7">
            본문 텍스트입니다. The quick brown fox jumps over the lazy dog.
            0123456789
          </p>
          <p className="text-sm text-muted-foreground">
            보조 텍스트입니다. muted-foreground 색을 씁니다.
          </p>
          <blockquote className="border-l-2 pl-6 italic">
            인용문입니다.
          </blockquote>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            inline code
          </code>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: 빌드 및 육안 검증**

```bash
cd /Users/woosang/Desktop/workspace/design-system && pnpm build
```

`pnpm dev`로 `/playground/tokens` 확인:

- 색 스와치가 전부 렌더되는가. 보이지 않는 스와치(배경과 같은 색)는 테두리로 구분되는가
- light / dark 양쪽에서 스와치 색이 실제로 바뀌는가
- 루트 `/`가 이 페이지로 리다이렉트되는가

- [ ] **Step 5: `.gitignore` 점검**

이번 회차에서 새로 생긴 산출물(`.next/`, `node_modules/`, `next-env.d.ts` 등)이 적절히 처리되는지 확인한다. `next-env.d.ts`는 커밋 대상이다.

```bash
cd /Users/woosang/Desktop/workspace/design-system && git status --porcelain
```

`.next/`나 `node_modules/`가 목록에 나오면 `.gitignore`에 추가한다.

- [ ] **Step 6: 커밋**

```bash
cd /Users/woosang/Desktop/workspace/design-system && git add -A && git commit -m "feat: add theme tokens page with color swatches and typography"
```

---

## 0회차 완료 기준

- [ ] `pnpm build`가 통과한다
- [ ] `components.json`의 `style`이 `base-*`이고 `iconLibrary`가 `lucide`다
- [ ] `/`가 `/playground/tokens`로 리다이렉트된다
- [ ] 사이드바가 `SidebarTrigger`와 `cmd+b`로 아이콘 모드 접힘/펼침이 동작한다
- [ ] light / dark 전환이 동작하고 양쪽에서 토큰 페이지가 정상으로 보인다
- [ ] `docs/superpowers/notes/2026-08-05-registry-inventory.md`에 레지스트리 전체 목록과 설치 경로 규칙이 기록되어 있다
- [ ] 스펙의 "0회차에서 확정할 미결 사항" 3개가 해소되어 있다
- [ ] 모든 변경이 커밋되어 있다

## 다음 회차

Task 3의 조사 결과를 반영해 1회차(첫 컴포넌트 카테고리) 계획을 별도 문서로 작성한다. 컴포넌트 배정과 회차 수는 그 목록에 따라 확정된다.
