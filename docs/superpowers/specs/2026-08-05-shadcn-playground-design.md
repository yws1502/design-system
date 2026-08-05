# shadcn/ui Playground 설계

작성일: 2026-08-05

## 목표

shadcn/ui 공식 문서(`https://ui.shadcn.com/docs/components`)에 있는 컴포넌트 대부분과, 각 컴포넌트의 공식 예제(스토리)를 전부 담은 playground를 만든다. RTL 관련 항목은 제외한다.

이 레포는 다른 레포지토리의 서브 레포로 소비된다. 소비 형태는 **독립 앱 + 소스 공유** — playground는 이 레포에서 독립 실행하고, 부모 레포는 `components/ui/`를 submodule 또는 복사로 가져간다.

## 결정 사항

| 항목 | 결정 | 근거 |
|---|---|---|
| 프레임워크 | Next.js (App Router) + TypeScript | 부모 스택 미정. shadcn의 canonical 타깃이고 `"use client"` 전제가 보존됨. Vite로 옮길 때 손실이 없는 방향 |
| 패키지 매니저 | pnpm | |
| 스타일 프리셋 | `--preset bIkeymG` | 사용자 지정 |
| 베이스 라이브러리 | **Base UI** (`components.json`의 `style: "base-*"`) | 사용자 지정 |
| 아이콘 | **lucide-react** | `base-*` 스타일 정의의 `dependencies`에 명시되어 있음 (검증 완료) |
| 다크모드 | `next-themes` | preset이 light/dark 토큰을 모두 정의하므로 양쪽 검수가 필요 |
| 페이지 구조 | 카테고리별 라우트 | 공식 예제가 페이지 전체를 전제로 만들어져 있음 (아래 참조) |
| 테스트 | 없음 | 시각적 쇼케이스라 유닛 테스트의 가치가 낮다. 회차마다 `pnpm build` 통과 + light/dark 육안 확인을 완료 기준으로 삼는다 |

## 레지스트리 조사 결과

설계의 근거가 되는 사실들이다. 모두 실제 엔드포인트로 확인했다.

### `style` 값이 베이스 라이브러리를 결정한다

`components.json` 스키마의 `style` enum:

```
default | new-york
radix-{vega,nova,maia,lyra,mira,luma,sera,rhea}
base-{vega,nova,maia,lyra,mira,luma,sera,rhea}
aria-{vega,nova,maia,lyra,mira,luma,sera,rhea}
```

접두사가 베이스 라이브러리(Radix / Base UI / React Aria), 접미사가 비주얼 스타일이다. Base UI를 쓰려면 `base-*` 중 하나여야 한다.

`base-vega` 스타일 정의:

```json
{
  "dependencies": ["class-variance-authority", "lucide-react", "@base-ui/react"],
  "devDependencies": ["tw-animate-css", "shadcn"],
  "registryDependencies": ["utils"],
  "type": "registry:style"
}
```

### 예제는 컴포넌트당 하나이며, 그 안에 모든 스토리가 들어 있다

구형 `new-york-v4`는 예제가 잘게 쪼개져 있다 (`button-demo`, `button-secondary`, `button-outline`, …). **`base-*` 스타일은 컴포넌트당 `<name>-example` 하나**로 통합되어 있고, 그 안에 스토리가 전부 들어 있다.

`button-example`의 실제 구조:

```tsx
export default function ButtonExample() {
  return (
    <ExampleWrapper>
      <ButtonVariantsAndSizes />   {/* xs/sm/default/lg × 6 variants */}
      <ButtonIconRight />
      <ButtonIconLeft />
      <ButtonIconOnly />
      <ButtonInvalidStates />
      <ButtonExamples />
    </ExampleWrapper>
  )
}
```

따라서 설치 대상은 250~350개가 아니라 **컴포넌트당 1개, 총 60개 남짓**이다.

확인된 사항:
- `base-vega/button-example.json` → 200, `base-vega/button-demo.json` → 404 (구형 이름은 없음)
- `base-vega/button-variants-example.json` → 404 (스토리별 분리 항목은 없음)
- 블록 예제는 별도로 존재 — `base-vega/sidebar-07.json` → 200

### `example`은 갤러리 프리미티브를 제공하는 registry 컴포넌트다

`registry:component` 타입의 `example` 항목이 `Example` / `ExampleWrapper`를 제공한다. 자체 섹션 래퍼를 만들 필요가 없다. `ExampleWrapper`는 `min-h-screen` + 자체 그리드 + `bg-muted` 배경을 가진 **전체 페이지 전제**의 컨테이너다.

### 알려진 걸림돌: `icon-placeholder`

예제들이 `@/app/(create)/components/icon-placeholder`를 import하는데, 이 항목은 레지스트리에 없다 (404). shadcn 사이트 내부 파일이다.

**대응**: 우리 앱의 동일 경로 `app/(create)/components/icon-placeholder.tsx`에 같은 시그니처의 shim을 만든다. 그러면 설치된 예제 소스를 한 줄도 고치지 않고 그대로 쓸 수 있다. `(create)`는 라우트 그룹이라 URL에 영향을 주지 않는다.

## 페이지 구조

`ExampleWrapper`가 페이지 전체를 쓰는 전제이므로 단일 스크롤 페이지는 성립하지 않는다. 60개를 쌓으면 스크롤이 60화면이 되고 chart / calendar / data-table까지 전부 마운트된다.

**카테고리별 라우트**로 나눈다. `/playground/form`, `/playground/overlay` 처럼 카테고리당 페이지 하나, 페이지당 컴포넌트 5~10개.

```
app/
  layout.tsx                          ThemeProvider(next-themes) + 폰트
  page.tsx                            /playground/tokens 로 리다이렉트
  (create)/components/
    icon-placeholder.tsx              공식 예제용 shim
  playground/
    layout.tsx                        Sidebar 셸
    <category>/page.tsx               카테고리별 예제 페이지
    showcase/<name>/page.tsx          페이지 점유형 블록 예제 (sidebar-07 등)
components/
  ui/                                 shadcn 원본. 수정 금지. 부모 레포가 가져갈 대상
  playground/
    examples/                         공식 예제 소스. CLI가 넣어줌. 수정 금지
    example.tsx                       공식 Example / ExampleWrapper
    gallery-sidebar.tsx               카테고리 메타로 네비 생성
    theme-toggle.tsx
    categories.ts                     카테고리 메타 배열
lib/utils.ts
```

**핵심 경계는 세 가지다.**

1. `components/ui/` — shadcn 원본 그대로. 부모 레포가 "이 폴더만 가져가면 된다"가 성립해야 한다. playground 전용 코드가 이 안으로 새어들어가면 계약이 깨진다.
2. `components/playground/examples/` — 공식 예제 원본 그대로. 수정하지 않는다. upstream이 바뀌었을 때 diff로 갱신할 수 있어야 한다.
3. `components/playground/` 나머지 — 이 레포 전용. 부모는 가져가지 않는다.

## 갤러리 셸

`app/playground/layout.tsx`의 사이드바를 shadcn `Sidebar` 컴포넌트로 구현한다. 공식 문서 예시의 레이아웃을 그대로 지킨다:

- `SidebarProvider` + `Sidebar collapsible="icon"` + `SidebarInset`
- `SidebarTrigger`로 열고 닫기, `cmd+b` / `ctrl+b` 단축키
- `SidebarHeader`(타이틀), `SidebarContent`(카테고리 그룹 네비), `SidebarFooter`(테마 토글)

이렇게 하면 셸 자체가 Sidebar의 살아있는 데모가 된다. `sidebar-01` ~ `sidebar-16` 같은 전체 페이지 블록 예제는 중첩 `SidebarProvider` 문제가 있으므로 `playground/showcase/`의 전용 라우트로 분리하고, Sidebar 카테고리 페이지에 링크 카드를 둔다.

## 카테고리 계약

```ts
// components/playground/categories.ts
export type Category = {
  slug: string                      // 라우트 세그먼트
  title: string
  items: { name: string; title: string }[]   // 컴포넌트 목록 (페이지 내 앵커)
}

export const categories: Category[] = [ /* ... */ ]
```

사이드바 네비는 이 배열만 읽는다. 회차마다 수정할 파일은 **새 카테고리 페이지 + `categories.ts` 한 항목**뿐이다. 셸은 0회차 이후 다시 건드리지 않는다.

## 회차 진행 절차

1. MCP `list_items_in_registries` / `search_items_in_registries`로 해당 카테고리의 컴포넌트와 `<name>-example` 존재 여부를 확인한다.
2. `pnpm dlx shadcn@latest add <component>-example ...` 로 컴포넌트 + 예제를 설치한다 (예제의 `registryDependencies`가 컴포넌트를 함께 끌어온다).
3. `app/playground/<category>/page.tsx`를 작성한다 (예제 import + 앵커 배치).
4. `categories.ts`에 등록한다.
5. `pnpm build` 통과 + 브라우저에서 light / dark 양쪽 확인.

## 특수 처리 대상

| 항목 | 문제 | 처리 |
|---|---|---|
| Direction | RTL 컴포넌트 | 제외 |
| Sidebar 블록 예제 | 페이지 전체 점유, 중첩 Provider | `playground/showcase/sidebar-*` 전용 라우트 |
| Data Table | tanstack-table 의존, 예제 코드가 김 | 전용 라우트 |
| Chart | recharts 의존 | 전용 라우트 |
| Toast | 문서상 deprecated, Sonner 권장 | 0회차에 `base-*` 레지스트리의 실제 항목명 확인 후 확정 |
| Typography | 컴포넌트가 아니라 스타일 가이드 | 예제 항목이 없으면 수동 작성 |

## 회차 계획

| 회차 | 라우트 | 대상 |
|---|---|---|
| 0 | — | Next.js init, `--preset bIkeymG`, `style: base-*` 확정, ThemeProvider, `example` + `sidebar` 설치, Sidebar 셸, `icon-placeholder` shim |
| 1 | `/playground/tokens` | Theme Tokens 패널, Typography |
| 2 | `/playground/form` | button, button-group, input, label, textarea, native-select, select, checkbox, radio-group, switch, toggle, toggle-group |
| 3 | `/playground/form-advanced` | field, input-group, input-otp, combobox, calendar, date-picker, slider |
| 4 | `/playground/data-display` | card, table, badge, avatar, separator, skeleton, item, empty, kbd, spinner, progress, aspect-ratio |
| 5 | `/playground/overlay` | dialog, alert-dialog, sheet, drawer, popover, tooltip, hover-card |
| 6 | `/playground/menu` | dropdown-menu, context-menu, menubar, command |
| 7 | `/playground/navigation` | tabs, accordion, collapsible, breadcrumb, navigation-menu, pagination |
| 8 | `/playground/feedback` | alert, sonner |
| 9 | `/playground/layout` | scroll-area, resizable, carousel |
| 10 | `/playground/ai` | attachment, bubble, message, message-scroller, marker |
| 11 | `/playground/sidebar` | sidebar 블록 예제 + showcase 라우트 |
| 12 | `/playground/heavy` | data-table, chart + showcase 라우트 |

카테고리별 컴포넌트 배정은 `base-*` 레지스트리의 실제 항목 목록을 확인하면서 조정될 수 있다.

## 0회차에서 확정할 미결 사항

1. **`bIkeymG` preset이 지정하는 style 값.** `base-*` 중 하나가 아니면 `base-*`로 맞춘다. preset은 로컬 실행 전에는 조회가 불가능하다 (공개 조회 엔드포인트 없음).
2. **`registry:example` / `registry:component` 파일의 설치 경로.** CLI가 예제 파일(`button-example`)과 갤러리 프리미티브(`example`)를 어느 디렉터리에 떨구는지 실제로 하나 설치해서 확인한다. 위 디렉터리 구조와 다르면 `components.json`의 alias로 조정하거나, 구조를 CLI 기본값에 맞춘다. 어느 쪽이든 `components/ui/`가 shadcn 원본만 담는다는 경계는 유지한다.
3. **`base-*` 레지스트리의 전체 항목 목록.** MCP `list_items_in_registries`로 열거해서 회차 계획의 컴포넌트 배정을 확정한다. Toast / Sonner, Typography의 실제 항목명 포함.

## 범위 밖

- 스크린샷 회귀 테스트 — 카테고리가 충분히 쌓인 뒤 필요하면 추가한다.
- 코드 스니펫 표시 / 복사 버튼.
- npm 패키지 배포, 자체 registry 서버.
- 컴포넌트 커스터마이징. 이번 작업은 원본을 있는 그대로 보여주는 것이 목적이다.
