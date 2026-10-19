// 릴리스 PR 을 만든다. 머지되면 release 워크플로가 태그와 GitHub Release 를 만든다.
//
//   pnpm release              # 마지막 태그 이후 머지된 PR 라벨 중 가장 큰 bump
//   pnpm release minor        # bump 를 직접 지정
//   pnpm release --dry-run    # 아무것도 바꾸지 않고 계산 결과만 출력
//
// 로컬에서 도는 이유: GITHUB_TOKEN 으로 만든 PR 에는 워크플로가 돌지 않아
// PR 제목 검사 같은 체크가 붙지 않는다. 사람 토큰(gh)으로 만들면 다른 PR 과 똑같이 검사된다.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

import {
  bumpVersion,
  cutRelease,
  labelForTitle,
  maxBump,
  releaseSection,
  unreleasedBody,
  VERSION_LABELS,
} from "./lib.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const forced = args.find((arg) => ["major", "minor", "patch"].includes(arg));

const sh = (cmd, ...rest) =>
  execFileSync(cmd, rest, { encoding: "utf8" }).trim();
const fail = (message) => {
  console.error(`✖ ${message}`);
  process.exit(1);
};

// 1. main 이 원격과 같고 깨끗한지
if (sh("git", "branch", "--show-current") !== "main") fail("main 에서 실행한다");
if (sh("git", "status", "--porcelain")) fail("커밋하지 않은 변경이 있다");
sh("git", "fetch", "--quiet", "--tags", "origin", "main");
if (sh("git", "rev-parse", "HEAD") !== sh("git", "rev-parse", "origin/main")) {
  fail("main 이 origin/main 과 다르다. git pull 먼저");
}

// 2. 마지막 태그와 package.json 이 맞는지
const lastTag = sh("git", "describe", "--tags", "--abbrev=0", "--match", "v*");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (`v${pkg.version}` !== lastTag) {
  fail(`package.json(${pkg.version})과 마지막 태그(${lastTag})가 다르다`);
}

// 3. 태그 이후 커밋의 라벨을 모은다. squash 커밋 제목 끝의 (#N) 으로 PR 을 찾고,
//    PR 이 없는 커밋(PR 도입 전 직접 push)은 제목에서 라벨을 계산한다.
const subjects = sh("git", "log", `${lastTag}..HEAD`, "--format=%s")
  .split("\n")
  .filter(Boolean);
if (subjects.length === 0) fail(`${lastTag} 이후 커밋이 없다`);

const rows = subjects.map((subject) => {
  const pr = /\(#(\d+)\)$/.exec(subject)?.[1];
  if (!pr) return { subject, label: labelForTitle(subject), from: "title" };
  const labels = JSON.parse(
    sh("gh", "pr", "view", pr, "--json", "labels", "--jq", "[.labels[].name]")
  ).filter((name) => VERSION_LABELS.includes(name));
  // 라벨이 없으면(워크플로 실패 등) 제목으로 대신한다
  return labels.length
    ? { subject, label: maxBump(labels), from: `#${pr}` }
    : { subject, label: labelForTitle(subject), from: `#${pr} 제목` };
});

for (const row of rows) {
  console.log(`  ${row.label.padEnd(10)} ${row.from.padEnd(8)} ${row.subject}`);
}

const bump = forced ?? maxBump(rows.map((row) => row.label));
if (bump === "no-release") {
  fail("소비하는 쪽에 영향 있는 변경이 없다. AGENTS.md: 갤러리만 바뀌었다면 태그하지 않는다");
}

// 4. CHANGELOG 와 package.json 갱신
const changelog = readFileSync("CHANGELOG.md", "utf8");
if (!unreleasedBody(changelog)) fail("CHANGELOG.md 의 [Unreleased] 가 비어 있다");

const version = bumpVersion(pkg.version, bump);
const repoUrl = sh("gh", "repo", "view", "--json", "url", "--jq", ".url");
const date = new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD, 로컬 시간대
const nextChangelog = cutRelease(changelog, {
  version,
  previous: pkg.version,
  date,
  repoUrl,
});
const title = `chore(release): v${version} 릴리스`;

console.log(`\n${bump}: ${pkg.version} → ${version}`);
if (dryRun) {
  console.log(`\n--- 릴리스 노트 ---\n${releaseSection(nextChangelog, version)}`);
  process.exit(0);
}

writeFileSync("CHANGELOG.md", nextChangelog);
writeFileSync(
  "package.json",
  readFileSync("package.json", "utf8").replace(
    `"version": "${pkg.version}"`,
    `"version": "${version}"`
  )
);

// 5. 브랜치 · 커밋 · PR
const branch = `release/v${version}`;
sh("git", "checkout", "-b", branch);
sh("git", "add", "CHANGELOG.md", "package.json");
sh("git", "commit", "-m", title);
sh("git", "push", "-u", "origin", branch);
const body = [
  `머지하면 \`release\` 워크플로가 \`v${version}\` 태그와 GitHub Release 를 만든다.`,
  "",
  "## 릴리스 노트",
  "",
  releaseSection(nextChangelog, version),
].join("\n");
console.log(sh("gh", "pr", "create", "--base", "main", "--title", title, "--body", body));
