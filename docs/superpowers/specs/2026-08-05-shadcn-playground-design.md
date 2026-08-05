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

### `icon-placeholder` — 해소됨

레지스트리 원본은 `@/app/(create)/components/icon-placeholder`를 import하지만, **CLI가 설치 시 실제 lucide 아이콘으로 치환한다.** shim은 필요 없다. 0회차에서 실측 확인했다.

### 설치 경로 — 확정됨

CLI 기본값을 그대로 쓴다. 상세는 `docs/superpowers/notes/2026-08-05-registry-inventory.md` 참조.

```
components/ui/<name>.tsx        registry:ui        원본, 수정 금지, 부모 레포 공유 대상
components/<name>-example.tsx   registry:example   공식 예제, 수정 금지
components/example.tsx          registry:component Example / ExampleWrapper
components/playground/          이 레포 전용 코드
```

## 페이지 구조

`ExampleWrapper`가 페이지 전체를 쓰는 전제이므로 단일 스크롤 페이지는 성립하지 않는다. 60개를 쌓으면 스크롤이 60화면이 되고 chart / calendar / data-table까지 전부 마운트된다.

**카테고리별 라우트**로 나눈다. `/playground/form`, `/playground/overlay` 처럼 카테고리당 페이지 하나, 페이지당 컴포넌트 5~10개.

```
app/
  layout.tsx                          ThemeProvider(next-themes) + 폰트
  page.tsx                            /playground/tokens 로 리다이렉트
  playground/
    layout.tsx                        Sidebar 셸
    <category>/page.tsx               카테고리별 예제 페이지
    showcase/<name>/page.tsx          페이지 점유형 블록 예제 (sidebar-07 등)
components/
  ui/                                 shadcn 원본. 수정 금지. 부모 레포가 가져갈 대상
  <name>-example.tsx                  공식 예제. CLI가 넣어줌. 수정 금지
  example.tsx                         공식 Example / ExampleWrapper
  playground/
    gallery-sidebar.tsx               카테고리 메타로 네비 생성
    theme-toggle.tsx
    theme-provider.tsx
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
| Direction | RTL 컴포넌트 | 제외. `init --no-rtl`로 config 레벨에서도 반영됨 |
| Form | `form-example`이 존재하지 않음 | 제외. Base UI에서는 `field`가 폼 레이아웃을 담당하므로 `field-example`로 대체 |
| Sidebar 블록 예제 | 페이지 전체 점유, 중첩 Provider | `playground/showcase/sidebar-*` 전용 라우트 |
| Chart | recharts 의존 | 전용 회차 (12회차) |
| Toast | ~~deprecated, Sonner 권장~~ **정정**: Base UI 프로젝트는 `toast`가 정답이고 Sonner는 Radix / Aria용이다 | 둘 다 전시하되 `toast`를 권장으로 표기 |
| Data Table | UI 항목도 example도 없음 (Table + TanStack 조합 문서일 뿐) | 계획에서 제외 |
| Date Picker | UI 항목도 example도 없음 (Calendar + Popover 조합 문서) | 제외. `calendar-example`이 커버 |
| Typography | 컴포넌트가 아니라 스타일 가이드 | Theme Tokens 페이지에 수동 작성 |

## 회차 계획

레지스트리 실측(0회차)으로 확정된 배정이다. 예제 63개.

| 회차 | 라우트 | 예제 | 개수 |
|---|---|---|---|
| 0 | — | Next.js init, `--preset bIkeymG --base base --no-rtl`, ThemeProvider, Sidebar 셸 | — |
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
| 11 | `/playground/sidebar` | sidebar, sidebar-icon, sidebar-inset, sidebar-floating + 블록 16개 showcase | 4 |
| 12 | `/playground/chart` | chart | 1 |

`component-example` 1개는 성격 미확인 상태로, 내용 확인 후 배정한다.

## 0회차 미결 사항 — 전부 해소됨

조사 결과는 `docs/superpowers/notes/2026-08-05-registry-inventory.md`에 있다.

1. **preset이 지정하는 style** → `vega`. preset은 base를 인코딩하지 않으므로 `--base base`를 명시해 `base-vega`로 확정했다.
2. **설치 경로** → CLI 기본값 채택. `components/ui/`(원본), `components/*-example.tsx`(예제), `components/playground/`(전용 코드).
3. **레지스트리 전체 목록** → ui 62 / example 64 / block 30 / component 1. 회차 계획에 반영 완료.

## 범위 밖

- 스크린샷 회귀 테스트 — 카테고리가 충분히 쌓인 뒤 필요하면 추가한다.
- 코드 스니펫 표시 / 복사 버튼.
- npm 패키지 배포, 자체 registry 서버.
- 컴포넌트 커스터마이징. 이번 작업은 원본을 있는 그대로 보여주는 것이 목적이다.
