// CHANGELOG.md 의 한 버전 절을 출력한다. release 워크플로가 GitHub Release 본문으로 쓴다.
//   node scripts/release/notes.mjs 0.2.0
import { readFileSync } from "node:fs";

import { releaseSection } from "./lib.mjs";

const version = process.argv[2];
if (!version) {
  console.error("사용법: node scripts/release/notes.mjs <version>");
  process.exit(1);
}
console.log(releaseSection(readFileSync("CHANGELOG.md", "utf8"), version));
