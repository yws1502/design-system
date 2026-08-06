# design-system

shadcn/ui(Base UI) 컴포넌트 60개와 자체 조합 패턴을 담은 디자인 시스템. 다른 레포에서 **서브모듈로 소스를 가져다 쓰는 것**을 전제로 한다. npm 패키지로 배포하지 않는다.

`/playground`는 모든 컴포넌트와 공식 예제를 눈으로 검수하기 위한 갤러리다. 소비하는 쪽에서 가져갈 필요는 없다.

## 무엇을 가져가는가

| 경로 | 내용 | 가져가나 |
|---|---|---|
| `components/ui/` | shadcn 컴포넌트 60개 | ✅ |
| `components/patterns/` | 이 레포에서 조합한 재사용 컴포넌트 2개 | ✅ |
| `lib/utils.ts` | `cn()` | ✅ (`components/ui/`가 참조) |
| `hooks/use-mobile.ts` | Sidebar가 참조 | ✅ |
| `components/*-example.tsx` | shadcn 공식 예제 61개 | ❌ 갤러리 전용 |
| `components/playground/` | 갤러리 셸·검색·데모 | ❌ |
| `app/` | 갤러리 라우트 | ❌ |

## 서브모듈로 붙이기

```bash
git submodule add <이 레포 URL> vendor/design-system
git submodule update --init
```

`tsconfig.json`에서 경로를 잡거나 필요한 폴더만 복사해 쓴다. 서브모듈로 두면 `git submodule update --remote`로 갱신할 수 있다.

## 소비하는 쪽에 필요한 것

### 1. 의존성

```bash
pnpm add @base-ui/react class-variance-authority clsx tailwind-merge lucide-react
```

아래는 해당 컴포넌트를 쓸 때만 필요하다.

| 컴포넌트 | 패키지 |
|---|---|
| Calendar | `react-day-picker` |
| Carousel | `embla-carousel-react` |
| Chart | `recharts` |
| Command | `cmdk` |
| Message Scroller | `@shadcn/react` |
| Input OTP | `input-otp` |
| Resizable | `react-resizable-panels` |
| Sonner | `sonner` |
| 테마 전환 | `next-themes` |

### 2. Tailwind v4 + 토큰

`app/globals.css`의 `@theme inline` 블록과 `:root` / `.dark` 토큰을 가져간다. Tailwind v3는 지원하지 않는다.

**`--success`와 `--warning`은 shadcn 기본 프리셋에 없다.** 이 레포에서 추가한 토큰이고 `alert.tsx` · `badge.tsx` · `toast.tsx` · `sonner.tsx`가 참조하므로, 빠뜨리면 해당 variant가 무색으로 렌더된다.

```css
--success: oklch(0.52 0.145 163.225);   /* dark: oklch(0.723 0.149 163.223) */
--warning: oklch(0.56 0.163 72.5);      /* dark: oklch(0.789 0.154 78.5) */
```

명도는 눈대중이 아니라 WCAG 대비를 실측해 골랐다. 근거는 스펙 문서에 있다.

> `app/globals.css`에는 `style-vega:` 같은 커스텀 variant와 `<html data-style="vega">`도 있지만 **`components/ui/`는 이걸 한 곳도 쓰지 않는다(0건).** 갤러리가 shadcn 공식 예제를 렌더하기 위한 장치이므로 가져갈 필요 없다.

### 3. Base UI 기반이다

Radix가 아니라 [Base UI](https://base-ui.com)를 쓴다. 트리거에 `asChild`가 아니라 `render`를 넘긴다.

```tsx
<DropdownMenuTrigger render={<Button variant="outline" />}>열기</DropdownMenuTrigger>
```

### 4. Provider 마운트

| 컴포넌트 | 필요한 것 |
|---|---|
| `toast` | 루트 레이아웃에 `<Toaster />` (`components/ui/toast`) |
| `sonner` | 루트 레이아웃에 `<Toaster />` (`components/ui/sonner`) — `next-themes`의 `useTheme`을 쓰므로 `ThemeProvider` 안쪽에 둔다 |
| `Sidebar` | `<SidebarProvider>`. `SidebarMenuButton`의 `tooltip`을 쓴다면 `<TooltipProvider>`도 |

`Toaster`를 안 붙이면 `toast()`가 호출은 되지만 **아무것도 뜨지 않는다.** 에러도 안 난다.

## stock shadcn과 다른 점

`components/ui/`는 원본을 그대로 두는 것이 원칙이지만 아래는 의도적으로 바꿨다. upstream 갱신 시 충돌 지점이다.

| 파일 | 변경 |
|---|---|
| `sheet.tsx` | `SheetHeader`·`SheetFooter` padding `p-4` → `p-6`, 닫기 버튼 `top-5 right-5` |
| `alert.tsx` | `warning` · `success` variant 추가 |
| `badge.tsx` | `warning` · `success` variant 추가 |
| `toast.tsx` · `sonner.tsx` | success·warning 아이콘에 상태 색 적용 |

## 갤러리 실행

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

카테고리 12개 라우트에 공식 예제 61개가 배치돼 있다. 사이드바 검색은 컴포넌트뿐 아니라 **서브 예제 제목까지** 찾는다 — `Mul`을 치면 여러 컴포넌트의 Multiple 변형이 한 번에 나온다. 영문 검색만 지원한다.

## 문서

| | |
|---|---|
| `docs/superpowers/specs/` | 설계 결정과 근거. **원본에서 벗어난 지점**과 그 이유가 여기 있다 |
| `docs/superpowers/notes/` | 레지스트리 조사 결과 |
| `AGENTS.md` | 이 레포에서 작업할 때의 규칙 |
| `CHANGELOG.md` | 버전별 변경 이력. **소비하는 쪽에 영향 있는 변경**을 따로 묶어 둔다 |
