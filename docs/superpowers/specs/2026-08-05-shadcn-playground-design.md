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
| Toast / Sonner | 권장 관계에 대한 서술이 두 번 틀렸다. **최종 확인**: `/docs/components/base/toast`와 `/docs/components/base/sonner` 어디에도 deprecated 표기나 상호 권장 문구가 **없다**. "Base UI는 `toast`, Radix / Aria는 `sonner`"는 이 레포에 번들된 shadcn 에이전트 가이드(`.claude/skills/shadcn/SKILL.md:67-69`)의 규칙이지 문서 사이트의 서술이 아니다 | 둘 다 전시하고, 각 섹션 설명에 출처를 명시. 둘 다 정상 동작한다 |
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

## 구현 결과 (2026-08-05 완료)

라우트 16개가 모두 동작한다. 카테고리 12개(`/playground/*`)와 showcase 4개(`/showcase/sidebar*`).

예제 61개 중 57개가 카테고리 페이지에, 4개(sidebar 계열)가 showcase 라우트에 배치됐다. 누락 0건.

계획과 달라진 점:

- **`message-example` / `message-scroller-example` 제외.** shadcn 사이트 내부 모듈(`@/lib/ai`, `@/components/message-parts`)에 의존해 컴파일이 불가능하다. 레지스트리에 없는 코드를 우리가 추측해 shim으로 채우면 그건 공식 예제가 아니라 우리 근사치가 되므로 제외를 택했다. `Message` / `MessageScroller` 컴포넌트 소스 자체는 `components/ui/`에 있으므로 부모 레포 공유에는 영향이 없다.
- **Layout 카테고리의 라우트 세그먼트는 `layout-components`.** `app/playground/layout/`은 Next.js의 `layout.tsx` 규약과 혼동을 부른다. 표시 제목은 `Layout` 그대로다.
- **`next.config.ts`에 `images.remotePatterns` 추가.** 공식 예제가 `avatar.vercel.sh`와 `images.unsplash.com`을 `next/image`로 로드하는데 호스트가 등록되지 않아 두 라우트가 런타임 500을 냈다. `next build`는 렌더링을 하지 않으므로 이 결함을 잡지 못한다 — 회차마다 실제로 페이지를 열어봐야 한다는 뜻이다. 예제 무수정 원칙에 따라 config로 해결했다.
- **`Section`에 `description?: string` 추가.** Feedback 페이지에서 Toast를 권장으로, Sonner를 Radix / React Aria용으로 표기하기 위해서다.
- **`style-*` custom variant를 `app/globals.css`에 정의.** 공식 예제는 `style-vega:p-6`처럼 스타일별 조건부 유틸리티를 쓰는데, 이 variant들은 shadcn 문서 사이트가 스타일 전환기를 위해 자체 보유한 것이라 `shadcn/tailwind.css` 패키지에 들어 있지 않다. 정의하지 않으면 `border` 같은 무조건부 클래스만 살아남아 padding·radius·min-height가 통째로 빠진 채 렌더된다 — Dialog의 Chat Settings 예제가 각진 테두리에 콘텐츠가 붙은 형태로 깨져 보였다. 예제 18개 265곳이 영향받는다. 8개 스타일의 variant를 모두 정의하고 `<html data-style="vega">`로 매칭시켰다. 프리셋을 바꾸면 그 속성값만 바꾸면 된다.

## 원본에서 의도적으로 벗어난 지점

카테고리 페이지 구축이 끝날 때까지 `components/ui/**`와 `components/*-example.tsx`는 변경 0건이었다. 이후 아래 두 곳을 의도적으로 수정했다. **upstream 갱신 시 충돌 지점이므로 여기서 관리한다.**

| 파일 | 변경 | 이유 |
|---|---|---|
| `components/ui/sheet.tsx` | `SheetHeader` / `SheetFooter` `p-4` → `p-6`, 닫기 버튼 `top-4 right-4` → `top-5 right-5` | 전체 높이 패널에 16px는 답답하다는 판단. 부모 레포도 이 값을 가져간다 |
| `components/sheet-example.tsx` | 본문 div 2곳의 `style-vega:px-4` → `px-6` | 위 변경으로 헤더·푸터가 24px가 되어 본문만 16px로 어긋났다. vega 토큰만 손대고 다른 스타일 토큰은 upstream 그대로 뒀다 |
| `app/globals.css` | `--success` / `--warning` 토큰 추가 (light·dark, `@theme inline` 등록 포함) | preset(neutral)에는 상태 색이 `--destructive` 하나뿐이라 toast의 success·warning을 색으로 구분할 수 없었다. `--destructive`와 같은 명도 규칙을 따른다 — light는 진하게, dark는 밝게 |
| `components/ui/toast.tsx` | `ToastIcon`의 success → `text-success`, warning → `text-warning` | 원본은 error만 `text-destructive`로 칠하고 나머지는 기본 텍스트색이었다 |
| `components/ui/sonner.tsx` | success·warning·error 아이콘에 대응 색 클래스 추가 | 두 구현의 상태 색을 일치시키기 위해서다 |
| `components/ui/alert.tsx` | `warning` · `success` variant 추가 | 원본은 `default`와 `destructive`뿐이었다. destructive 정의를 그대로 미러링 |
| `components/ui/badge.tsx` | `warning` · `success` variant 추가 | 위와 같음 |
| `components/ui/button.tsx` | `destructive`를 Solid(`bg-destructive text-white`, dark `bg-destructive/60`)로 바꾸고, 기존 tint 모양을 `destructive-soft` variant로 옮김 | 원본 tint는 확인 다이얼로그 푸터에서 비활성처럼 보였다. 최종 확인은 Solid, 목록·진입점은 soft로 무게를 나눈다. Solid 값은 shadcn new-york 계열의 destructive와 같다 |
| `app/globals.css` | `@layer base`에 `button` · `[role=button\|checkbox\|radio\|switch]`(`:disabled` · `aria-disabled` 제외) `cursor: pointer` 추가, `:where()`로 특이도 0 | Tailwind v4 preflight가 버튼의 pointer 커서를 뺐고 shadcn 컴포넌트도 `cursor-pointer`를 달지 않았다. Tailwind 권장 스니펫은 `button`만 잡는데, Base UI의 Checkbox·Radio·Switch는 role을 단 `<span>`이고 비활성도 `aria-disabled`로 표시해서 넓혔다 |

**light 모드 토큰 명도는 실측으로 잡았다.** 처음 눈대중으로 넣은 값(success L 0.596 / warning L 0.646)은 destructive보다 밝아서 대비가 모자랐다 — Alert 제목 기준 success 3.65 / warning 3.35로, destructive 4.77과 WCAG AA 4.5 모두에 못 미쳤다. 브라우저에서 명도를 스캔해 destructive 이상이 되는 지점을 골랐다.

| | Alert 제목 | Badge 라벨 |
|---|---|---|
| destructive (원본) | 4.77 | 3.97 |
| success `L 0.52` | 4.93 | 4.29 |
| warning `L 0.56` | 4.78 | 4.19 |

dark는 기존 값이 이미 destructive(6.21)보다 여유로워(success 7.81 / warning 9.05) 그대로 뒀다. Badge가 4.5에 못 미치는 것은 원본 destructive(3.97)부터 그렇다 — 우리 두 색은 그보다는 높다.

### 갤러리 전역 검색

사이드바 헤더의 Combobox가 컴포넌트·서브 예제·카테고리를 한 번에 검색한다. "Mul"만 쳐도 Accordion / Calendar / Carousel / Combobox / Select / Slider / Tabs의 Multiple 변형 11개가 한 번에 올라온다.

**인덱스는 생성물이다.** 서브 예제 제목(`<Example title="...">`)은 벤더 예제 파일의 JSX 안에만 있어 브라우저에서 읽을 수 없다. `scripts/gen-search-index.mjs`가 `components/*-example.tsx`와 `components/playground/*-demo.tsx`를 훑어 `components/playground/search-index.ts`를 만든다 (482건 = 컴포넌트 62 + 서브 예제 420). `predev` / `prebuild`에 걸어두어 낡을 일이 없다.

**서브 예제로 정확히 이동한다.** 벤더 예제에는 앵커 id가 없지만 `Example`이 `data-slot="example"`을 붙인다. 카테고리 페이지로 이동한 뒤 제목이 일치하는 블록을 DOM에서 찾아 스크롤하므로 예제 파일을 420번 고칠 필요가 없다.

검색어는 **영문 기준**이다. 서브 예제 제목이 전부 영문이라 한글로는 걸리지 않는다. 별칭 맵은 두지 않기로 했다.

### `components/patterns/` — 우리가 조합한 패턴

shadcn 원본도 playground 전용도 아닌, 이 레포에서 만든 재사용 컴포넌트가 사는 곳이다. 부모 레포는 `components/ui/`와 함께 이 폴더를 가져간다.

| 파일 | 내용 |
|---|---|
| `confirm-delete-dialog.tsx` | 확인 문자열을 정확히 입력해야 삭제 버튼이 열리는 다이얼로그. 되돌릴 수 없는 삭제용. 제어·비제어 모두 지원 |
| `confirm-delete-popover.tsx` | 삭제 버튼 자리에 뜨는 가벼운 확인 팝오버. 되돌릴 수 있거나 영향 범위가 작은 삭제용 |

**두 패턴은 위험도로 나뉜다.** 중앙 모달은 마우스를 화면 한가운데까지 옮기게 만들고 배경을 가린다 — 목록에서 항목 하나 지우는 데는 과한 무게다. 반대로 되돌릴 수 없는 삭제를 팝오버로 처리하면 너무 쉽게 통과한다. `Popover`에도 `Close` 프리미티브가 없어 열림 상태는 컴포넌트가 들고 있다 (`AlertDialogAction`과 같은 이유).

**확인 문자열은 `"<대상 이름> 삭제"` 형태를 쓴다.** 이름만 요구하면 화면에서 복사해 붙여넣기 쉬운데, 동사가 붙으면 무엇을 하는 중인지 한 번 더 읽게 된다.

**안내 문장을 `<label>`로 만들지 않는다.** `Label`에는 `select-none`이 걸려 있고, 무엇보다 label 안의 텍스트는 클릭이 연결된 컨트롤로 넘어가면서 선택이 취소된다 — 확인 문자열을 드래그하거나 복사할 수 없게 된다. 문단에 id를 주고 `aria-labelledby`로 접근성 이름을 잇는다.

**설계 근거 하나.** `AlertDialogAction`은 `Close`가 아니라 순수 `Button`이라 스스로 닫히지 않는다 (비동기 삭제를 고려한 shadcn의 의도적 설계). 따라서 확인 후 닫는 책임이 소비자에게 있고, `trigger`만 넘기는 비제어 사용에서도 이 컴포넌트가 내부 열림 상태를 들고 있어야 한다.

`info`와 `loading`은 의도적으로 중립색을 유지한다. 주의를 끌 이유가 없는 상태이고, 색을 늘릴수록 상태 간 위계가 흐려진다.

`components/ui/`는 부모 레포 공유 대상이므로, 여기를 손대는 것은 곧 부모의 소스를 바꾸는 것이다. 이후 커스터마이징도 같은 기준으로 판단하고 이 표에 기록한다. 예제 파일은 부모와 공유되지 않으므로 비용이 더 낮다 — upstream diff 충실도만 잃는다.

## 블록(`registry:block`)은 다루지 않는다

레지스트리에는 블록 30개가 있다 — `sidebar-01`~`16`, `login-01`~`05`, `signup-01`~`05`, `dashboard-01`, `preview` 3종. **의도적으로 설치하지 않는다.**

블록은 로그인 페이지·대시보드 같은 **앱 스캐폴드**지 디자인 시스템 컴포넌트가 아니다. 부모 레포는 `components/ui/`를 라이브러리로 소비하지만 블록은 한 번 복사해 쓰는 시작점이라, 이 갤러리의 목적(컴포넌트 검수)과 결이 다르다.

기술적으로도 그냥 넣을 수 없다. `--dry-run`으로 실측한 결과:

**1. 우리 커스터마이징을 덮어쓴다.**

| 블록 | 덮어쓰는 파일 |
|---|---|
| `sidebar-*` 전부 | `components/ui/sheet.tsx` |
| `dashboard-01` | `components/ui/sheet.tsx`, `badge.tsx`, `sonner.tsx` |

위 "원본에서 의도적으로 벗어난 지점" 6건 중 3건이 조용히 되돌아간다.

**2. 블록끼리 같은 경로를 쓴다.** `sidebar-01`~`16`과 `dashboard-01`이 모두 `app/dashboard/page.tsx`를, `login-01`~`05`가 모두 `app/login/page.tsx`를 쓴다. 순차 설치하면 마지막 것만 남는다.

**3. 컴포넌트 이름도 충돌한다.** `components/app-sidebar.tsx`, `nav-main.tsx`, `nav-user.tsx`를 여러 블록이 서로 다른 내용으로 쓴다.

격리 설치 스크립트로 우회할 수는 있으나(레지스트리 JSON을 직접 받아 블록별 디렉터리에 넣고 import를 재작성), 그러면 "공식 원본 그대로"라는 이 레포의 원칙이 깨진다.

### `shadcn add` 실행 시 항상 확인할 것

블록만의 문제가 아니다. **앞으로 어떤 컴포넌트를 추가하든, 그 의존성에 우리가 손댄 파일이 끼어 있으면 CLI가 덮어쓴다.** 예를 들어 `sheet`를 의존하는 컴포넌트를 추가하면 Sheet padding이 원복된다.

```bash
pnpm dlx shadcn@latest add <item> --dry-run   # 먼저 overwrite 목록 확인
pnpm dlx shadcn@latest add <item>
git diff components/ui/                        # 되돌아간 커스터마이징이 없는지 확인
```

## 범위 밖

- 스크린샷 회귀 테스트 — 카테고리가 충분히 쌓인 뒤 필요하면 추가한다.
- 코드 스니펫 표시 / 복사 버튼.
- npm 패키지 배포, 자체 registry 서버.
- 컴포넌트 커스터마이징. 이번 작업은 원본을 있는 그대로 보여주는 것이 목적이다.
