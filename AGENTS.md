<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# design-system 작업 규칙

shadcn/ui(**Base UI**, `base-vega`) 컴포넌트를 담은 디자인 시스템이다. 다른 레포가 서브모듈로 **소스를 가져다 쓴다.** 개요는 `README.md`, 결정 근거는 `docs/superpowers/specs/`에 있다.

## 디렉터리 경계

여기를 어기면 부모 레포와의 계약이 깨진다.

| 경로 | 성격 | 수정 |
|---|---|---|
| `components/ui/` | shadcn 원본. **부모 레포 공유 대상** | 원칙적으로 금지. 아래 "커스터마이징" 참조 |
| `components/*-example.tsx` | shadcn 공식 예제 61개 | 금지가 원칙. upstream diff로 갱신할 수 있어야 한다 |
| `components/patterns/` | 이 레포에서 조합한 재사용 컴포넌트. 부모도 가져간다 | 자유 |
| `components/playground/` | 갤러리 전용 | 자유 |
| `app/` | 갤러리 라우트 | 자유 |

예제가 이상해 보여도 예제를 고치지 않는다. 주변(토큰·variant·shim)을 맞춘다. 지금까지 예제를 고친 것은 `sheet-example.tsx` 한 건뿐이고, `components/ui/sheet.tsx` padding을 바꾸면서 정렬이 어긋나 불가피했다 — 스펙에 기록돼 있다.

## 빌드 통과는 동작을 뜻하지 않는다

이 레포에서 실제로 잡은 결함 중 다수가 **`next build` 통과 상태**였다. 빌드는 렌더링을 하지 않는다.

- `style-*` variant 미정의 → 예제 18개 265곳이 padding 없이 렌더
- 이미지 호스트 미등록 → 라우트 2개가 런타임 500
- `Toaster` 미마운트 → 토스트 버튼이 무반응
- `AlertDialogAction`이 안 닫힘 → 확인 후 오버레이가 페이지를 잠금

**UI를 건드렸으면 반드시 브라우저에서 열고 눌러본다.** 타입체크와 라우트 200만으로 완료를 주장하지 않는다.

```bash
pnpm dev
curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/playground/<라우트>
```

## 검증 명령

패키지 매니저는 **pnpm**.

```bash
pnpm exec tsc --noEmit    # 타입체크. dev 서버가 떠 있어도 안전하다
pnpm build                # dev 서버와 .next 를 공유하므로 함께 돌리지 않는다
```

dev 서버를 띄운 채 작업할 때는 `pnpm build` 대신 `tsc --noEmit`을 쓴다.

## `shadcn add` 는 우리 파일을 덮어쓴다

추가하려는 항목의 의존성에 우리가 손댄 파일이 끼면 CLI가 덮어쓰기를 제안한다. **`--yes`로는 그 질문을 넘길 수 없다.**

```bash
pnpm dlx shadcn@latest add <item> --dry-run   # overwrite 목록 먼저 확인
yes n | pnpm dlx shadcn@latest add <item>     # 덮어쓰기 전부 거절
git diff --stat components/ui/                # 비어 있어야 한다
```

## `components/ui/` 커스터마이징

원칙은 원본 유지지만, 필요하면 바꾸되 **반드시 스펙의 "원본에서 의도적으로 벗어난 지점" 표에 기록한다.** 여기를 고치는 것은 곧 부모 레포의 소스를 바꾸는 것이다.

현재 등재된 것은 `components/ui/` 5개(`sheet` · `alert` · `badge` · `toast` · `sonner`), 예제 1개(`sheet-example`), 토큰 1건(`globals.css`).

```bash
git log --diff-filter=M --format="" --name-only -- components/ui 'components/*-example.tsx' | sort -u
```

## 검색 인덱스는 생성물이다

`components/playground/search-index.ts`를 직접 고치지 않는다. `scripts/gen-search-index.mjs`가 만들고 `predev` / `prebuild`에 걸려 있다.

```bash
pnpm gen:search-index
```

## Base UI 관용구

Radix가 아니다. 트리거에 `asChild`가 아니라 `render`를 넘긴다.

```tsx
<DropdownMenuTrigger render={<Button variant="outline" />}>열기</DropdownMenuTrigger>
```

`AlertDialogAction`과 `Popover`에는 Close 프리미티브가 없다 — 확인 후 닫으려면 열림 상태를 컴포넌트가 직접 들어야 한다. `components/patterns/confirm-delete-dialog.tsx`가 그 예다.

## 범위 밖

- **레지스트리 블록(`registry:block`) 30개.** 서로 같은 라우트·컴포넌트 이름을 쓰고, 설치 시 우리 `components/ui/` 파일을 덮어쓴다. 근거는 스펙에 있다.
- `message-example` / `message-scroller-example`. shadcn 사이트 내부 모듈에 의존해 컴파일 불가.
- 테스트 프레임워크. 시각적 쇼케이스라 두지 않는다.

## 갤러리에 컴포넌트 추가하기

1. `pnpm dlx shadcn@latest add <name>-example` (위 덮어쓰기 절차 준수)
2. `app/playground/<category>/page.tsx`에 `Section`으로 감싸 배치
3. `components/playground/categories.ts`에 항목 추가 — **`Section`의 `id`와 `items[].name`이 같아야** 사이드바 앵커가 연결된다
4. `tsc --noEmit` + 브라우저에서 light/dark 양쪽 확인
