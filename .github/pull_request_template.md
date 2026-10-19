<!--
제목: <type>(<scope>): <subject>   예) feat(patterns): add SearchInput
  scope  ui · patterns · tokens → 소비하는 쪽 영향, 버전 라벨이 붙는다
         gallery → 갤러리 전용 / docs · deps · repo · release
  breaking change 는 type 뒤에 ! → feat(ui)!: rename Button size prop
버전 라벨(major · minor · patch · no-release)은 제목을 보고 자동으로 붙는다. 틀리면 손으로 바꾼다.
-->

## 왜

## 소비하는 쪽이 할 일

<!-- 없으면 "없음". ui · patterns · tokens 변경이면 CHANGELOG.md [Unreleased] 에도 같은 내용을 적는다 -->

## 확인

- [ ] `pnpm exec tsc --noEmit`
- [ ] 브라우저에서 light / dark 확인 (UI 변경 시)
