/**
 * 커밋 메시지 형식: `<type>(<scope>): <subject>` — 예: `feat(gallery): ...`
 *
 * scope 로 버전 라벨이 정해진다(scripts/release/lib.mjs). ui · patterns · tokens 는
 * 소비하는 쪽에 영향이 있고, gallery 는 갤러리 전용이다.
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "style", "docs", "chore", "refactor", "revert"],
    ],
    "scope-empty": [2, "never"],
    "scope-enum": [
      2,
      "always",
      [
        "ui", // components/ui/
        "patterns", // components/patterns/
        "tokens", // app/globals.css
        "gallery", // app/, components/playground/, 예제
        "docs", // README · AGENTS · specs
        "deps", // 의존성
        "deps-dev", // 개발 의존성 (Dependabot 이 이 이름으로 쓴다)
        "repo", // 저장소 설정 · 도구
        "release", // 릴리스 커밋
      ],
    ],
    // 기본값은 소문자 강제라 "SearchInput" 같은 컴포넌트 이름을 못 쓴다.
    "subject-case": [0],
    // 기본 100자는 여러 변경을 묶은 제목에 빠듯하다.
    "header-max-length": [2, "always", 120],
  },
};
