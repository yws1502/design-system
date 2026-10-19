// PR 제목 → 버전 라벨 (major | minor | patch | no-release). pull-request 워크플로가 쓴다.
//   node scripts/release/label.mjs "feat(ui): add Foo"            → minor
//   node scripts/release/label.mjs --needs-changelog "<title>"    → true | false
import { labelForTitle, needsChangelog } from "./lib.mjs";

const args = process.argv.slice(2);
if (args[0] === "--needs-changelog") {
  console.log(needsChangelog(args[1] ?? ""));
} else {
  console.log(labelForTitle(args[0] ?? ""));
}
