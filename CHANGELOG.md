# Changelog

이 레포는 다른 레포에서 서브모듈로 **소스를 가져다 쓴다.** 따라서 이 문서에서 가장 중요한 것은 `components/ui/`와 `components/patterns/`, 그리고 토큰의 변화다. 갤러리(`app/`, `components/playground/`) 변경은 소비하는 쪽에 영향이 없으므로 따로 묶어 둔다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르고, 버전은 [유의적 버전](https://semver.org/lang/ko/)을 따른다.

## [Unreleased]

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

[Unreleased]: https://github.com/yws1502/design-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yws1502/design-system/releases/tag/v0.1.0
