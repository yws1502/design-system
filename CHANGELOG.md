# Changelog

이 레포는 다른 레포에서 서브모듈로 **소스를 가져다 쓴다.** 따라서 이 문서에서 가장 중요한 것은 `components/ui/`와 `components/patterns/`, 그리고 토큰의 변화다. 갤러리(`app/`, `components/playground/`) 변경은 소비하는 쪽에 영향이 없으므로 따로 묶어 둔다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르고, 버전은 [유의적 버전](https://semver.org/lang/ko/)을 따른다.

## [Unreleased]

### 갤러리 전용

#### Added

- 커밋 메시지 검사(husky + commitlint). `<type>(<scope>): <subject>` 형식과 scope를 강제한다. 이 레포에서 `pnpm install`할 때만 훅이 설치되므로 서브모듈로 가져다 쓰는 쪽에는 영향이 없다.
- PR · 릴리스 자동화. `main`은 squash merge PR로만 바꾸고, PR 제목을 commitlint로 검사하고, 제목에서 버전 라벨(`major` · `minor` · `patch` · `no-release`)을 붙인다. `pnpm release`가 릴리스 PR을 만들고 머지되면 태그와 GitHub Release가 생긴다. 릴리스 노트는 이 CHANGELOG의 해당 절이다. 소비하는 쪽은 앞으로 GitHub Releases에서도 변경을 볼 수 있다.
- 사이드바 제목 옆에 현재 버전(`package.json`의 `version`) 표시.

#### Fixed

- 사이드바 검색에서 Tab으로 지우기 버튼에 가면 검색어가 지워지고 포커스가 사라지던 문제. 선택값이 없는 Combobox는 팝업이 닫힐 때 입력을 빈 선택값으로 되돌리는데, 그 순간 지우기 버튼이 사라지면서 포커스도 잃었다. 입력값을 `SearchInput`의 `onValueChange`로만 바꾸고 Combobox의 되돌리기는 받지 않는다. 그 결과 Esc는 Combobox 표준대로 첫 번째에 목록을 닫고 두 번째에 지운다.

## [0.2.0] - 2026-10-20

### 소비하는 쪽에 영향 있음

#### Added

- **`SearchInput` 패턴** (`components/patterns/search-input.tsx`). 왼쪽 돋보기, 값이 있을 때만 오른쪽에 나타나는 지우기 아이콘 버튼, Esc로 지우기를 묶었다. `type="search"`의 브라우저 기본 지우기 버튼은 엔진마다 모양이 다르고 Firefox에는 없어서 숨기고 직접 그린다. 값이 비어 있을 때의 Esc는 가로채지 않으므로 다이얼로그 안에서 써도 Esc 닫기가 그대로 동작한다.
  - 비제어(`defaultValue`)·제어(`value` + `onValueChange`) 둘 다 된다. 지우기도 `onValueChange("")`로 알린다.
  - 나머지 props는 바깥 div가 아니라 안쪽 `<input>`에 붙는다. 그래서 Base UI 입력의 `render`에 넘길 수 있다 — `<ComboboxPrimitive.Input render={<SearchInput onValueChange={setQuery} />} />`. 이때 Combobox 루트의 `inputValue`를 같은 상태로 제어해야 지우기 버튼이 먹는다. 실제 사용 예는 갤러리 사이드바(`components/playground/gallery-search.tsx`).

#### Fixed

- **클릭할 수 있는 컴포넌트에 `cursor: pointer` 복원** (`app/globals.css`). Tailwind v4 preflight가 버튼의 pointer 커서를 빼서 Button·Select 트리거 등이 화살표 커서로 나왔다. Base UI의 Checkbox·Radio·Switch는 `<button>`이 아니라 `role`을 단 `<span>`이므로 `button`, `[role="button"]`, `[role="checkbox"]`, `[role="radio"]`, `[role="switch"]`를 함께 잡는다. 비활성은 `:disabled`와 `[aria-disabled="true"]` 둘 다 제외한다(Base UI는 span에 `disabled` 속성을 달 수 없어 `aria-disabled`를 쓴다). `:where()`로 감싸 특이도가 0이므로 `cursor-*` 유틸리티로 언제든 덮어쓸 수 있다. 소비하는 앱에 같은 규칙이 이미 있으면 지워도 된다.

### 갤러리 전용

#### Added

- 사이드바 검색창을 `SearchInput`으로 교체. 돋보기·지우기 버튼·Esc 지우기가 생겼다. 팝업은 입력 그룹 전체 폭에 맞춘다.
- Form에 **Search Input** 섹션 추가 — 비제어·제어·기본값·비활성.
- Form에 **Button — Disabled** 섹션 추가. 공식 `button-example`에 disabled 케이스가 없어 비활성 모습을 확인할 수 없었다. 예제 원본은 두고 `components/playground/button-disabled-demo.tsx`로 따로 전시한다.

#### Fixed

- 섹션 제목과 예제 카드 사이의 큰 빈 공간을 없앴다. `ExampleWrapper`의 `min-h-screen`이 예제 하나가 한 화면을 다 쓰는 shadcn 사이트를 전제로 해서, 섹션을 쌓는 갤러리에서는 카드가 블록 세로 중앙으로 밀려 내려갔다. 원본 `example.tsx`는 그대로 두고 `Section`에서 `min-h-0`으로 덮어쓴다.

## [0.1.0] - 2026-08-06

첫 구축. shadcn/ui 컴포넌트 60개와 이를 검수하는 갤러리를 세웠다.

### 소비하는 쪽에 영향 있음

#### Added

- **shadcn/ui 컴포넌트 60개** (`components/ui/`). Base UI 기반, `base-vega` 스타일. 트리거는 `asChild`가 아니라 `render`를 받는다.
- **`components/patterns/`** — 이 레포에서 조합한 재사용 컴포넌트.
  - `ConfirmDeleteDialog` — 되돌릴 수 없는 삭제. 확인 문자열(`"<대상> 삭제"`)을 정확히 입력해야 삭제 버튼이 열린다.
  - `ConfirmDeletePopover` — 가벼운 삭제. 삭제 버튼 자리에서 확인받는다.
- **상태 토큰 `--success` / `--warning`** (light·dark). `neutral` 프리셋에는 `--destructive`뿐이라 추가했다. 명도는 WCAG 대비를 실측해 골랐다 — Alert 제목 기준 success 4.93, warning 4.78로 stock destructive(4.77) 이상.
- `Alert`과 `Badge`에 **`warning` · `success` variant**. 원본은 `default`와 `destructive`뿐이었다.
- `Toast`와 `Sonner`의 success·warning 아이콘에 상태 색 적용.

#### Changed

stock shadcn과 달라진 지점. upstream 갱신 시 충돌한다.

- `sheet.tsx` — `SheetHeader`·`SheetFooter` padding `p-4` → `p-6`, 닫기 버튼 `top-4 right-4` → `top-5 right-5`. 전체 높이 패널에 16px는 답답했다.

### 갤러리 전용

#### Added

- 카테고리 12개 라우트에 공식 예제 61개 배치. showcase 라우트 4개(Sidebar 변형).
- 사이드바 셸 — 아이콘 접힘(`cmd+B`), 테마 토글, 프로젝트 블록.
- **전역 검색** — 컴포넌트뿐 아니라 서브 예제 제목까지 찾는다(482건). 인덱스는 `scripts/gen-search-index.mjs`가 생성하며 `predev`/`prebuild`에 걸려 있다. 영문 검색만 지원.
- Theme Tokens 페이지 — 색·radius·타이포그래피·상태 토큰 스와치.

#### Fixed

빌드는 통과했지만 실제로는 깨져 있던 것들. 전부 브라우저에서 열어보고 발견했다.

- **`style-*` custom variant 미정의** — shadcn 문서 사이트가 스타일 전환기용으로 자체 보유한 variant라 패키지에 없다. 정의하지 않아 예제 18개 265곳에서 padding·radius·min-height가 통째로 빠진 채 렌더됐다.
- **`next/image` 원격 호스트 미등록** — 라우트 2개가 런타임 500. `next build`는 렌더링을 하지 않아 잡지 못한다.
- **`Toaster` 미마운트** — `toast()`가 호출은 되지만 렌더할 곳이 없어 아무것도 뜨지 않았다. 에러도 나지 않는다.

### 범위 밖으로 결정

- **레지스트리 블록 30개.** 앱 스캐폴드지 컴포넌트가 아니고, 서로 같은 라우트·컴포넌트 이름을 쓰며, 설치 시 우리가 손댄 `components/ui/` 파일을 덮어쓴다. 한 번 넣었다가 되돌렸다(`31f5e1c`) — 다시 시도할 때 참고할 만한 것이 그 히스토리에 남아 있다.
- **`message` / `message-scroller` 예제.** shadcn 사이트 내부 모듈(`@/lib/ai`, `@/components/message-parts`)에 의존해 컴파일 불가. 컴포넌트 소스 자체는 `components/ui/`에 있다.
- **테스트 프레임워크.** 시각적 쇼케이스라 유닛 테스트의 가치가 낮다. 검증은 `tsc --noEmit` + 브라우저 확인.

[Unreleased]: https://github.com/yws1502/design-system/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/yws1502/design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yws1502/design-system/releases/tag/v0.1.0
