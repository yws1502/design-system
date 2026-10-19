/**
 * 릴리스 자동화가 공유하는 규칙. 커밋 메시지 · PR 제목 · 버전 라벨 · 릴리스 노트가
 * 모두 여기 정의를 따른다. 형식 자체(type · scope 목록)는 commitlint.config.mjs 가 검사한다.
 */

/** 소비하는 쪽에 영향이 있는 scope. 이 scope 의 변경만 버전을 올린다. */
export const CONSUMER_SCOPES = ["ui", "patterns", "tokens"];

export const VERSION_LABELS = ["major", "minor", "patch", "no-release"];

const BUMP_RANK = { "no-release": 0, patch: 1, minor: 2, major: 3 };

/**
 * `feat(ui)!: subject (#12)` → { type, scope, breaking }.
 * 형식이 틀리면 null. 형식 검사는 commitlint 몫이고 여기선 분류만 한다.
 */
export function parseTitle(title) {
  const match = /^(\w+)\(([\w-]+)\)(!)?: /.exec(title.trim());
  if (!match) return null;
  return { type: match[1], scope: match[2], breaking: Boolean(match[3]) };
}

/** PR 제목에서 버전 라벨을 정한다. AGENTS.md 의 "버전 태그" 표를 코드로 옮긴 것. */
export function labelForTitle(title) {
  const parsed = parseTitle(title);
  if (!parsed) return "no-release";
  if (parsed.breaking) return "major";
  if (!CONSUMER_SCOPES.includes(parsed.scope)) return "no-release";
  return parsed.type === "feat" ? "minor" : "patch";
}

/**
 * 소비하는 쪽 scope 의 PR 은 본문 "해야 할 일"을 채워야 한다. 릴리스 노트는 PR 제목
 * 목록뿐이라, 소비하는 쪽이 무엇을 해야 하는지는 노트의 PR 링크를 따라가 본문에서 읽는다.
 */
export function needsImpactNote(title) {
  const parsed = parseTitle(title);
  return Boolean(parsed && (parsed.breaking || CONSUMER_SCOPES.includes(parsed.scope)));
}

/** PR 템플릿의 `- **해야 할 일**: …` 이 채워져 있는지. "없음"도 채운 것으로 본다. */
export function impactNoteFilled(body) {
  const match = /\*\*해야 할 일\*\*\s*:[ \t]*(.*)/.exec(body ?? "");
  const value = match?.[1].replace(/<!--.*?-->/g, "").trim();
  return Boolean(value);
}

/** 라벨 여러 개 중 가장 큰 bump. */
export function maxBump(labels) {
  return labels.reduce(
    (max, label) => (BUMP_RANK[label] > BUMP_RANK[max] ? label : max),
    "no-release"
  );
}

export function bumpVersion(version, bump) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  throw new Error(`올릴 수 없는 bump: ${bump}`);
}

/**
 * GitHub 자동 생성 노트(`releases/generate-notes`)를 CHANGELOG 절로 다듬는다.
 * 맨 위의 설정 파일 주석과 `## What's Changed` 제목은 `## [버전]` 아래에서 군더더기라 빼고(묶음 제목 `###`이 바로
 * 그 아래 단계가 된다), 1인 레포라 매번 붙는 "New Contributors"도 뺀다.
 */
export function formatNotes(body) {
  return body
    .replace(/^<!--.*-->\n/gm, "")
    .replace(/^## What's Changed\n/m, "")
    .replace(/^## New Contributors\n[\s\S]*?(?=^\*\*Full Changelog|^## |(?![\s\S]))/m, "")
    // 묶음 사이에 빈 줄이 없어 목록과 제목이 붙어 보인다
    .replace(/\n+(?=^### )/gm, "\n\n")
    .trim();
}

/** 첫 버전 절 앞에 새 절을 넣는다. 제목의 버전은 이전 태그와의 비교 링크다. */
export function insertRelease(changelog, { version, previous, date, repoUrl, notes }) {
  const first = changelog.search(/^## \[/m);
  if (first === -1) throw new Error("CHANGELOG.md 에 ## [버전] 절이 없다");
  const section =
    `## [${version}](${repoUrl}/compare/v${previous}...v${version}) - ${date}\n\n${notes}\n\n`;
  return changelog.slice(0, first) + section + changelog.slice(first);
}

/** `## [version]` 절의 본문. GitHub Release 노트로 쓴다. */
export function releaseSection(changelog, version) {
  const heading = new RegExp(`^## \\[${version.replaceAll(".", "\\.")}\\].*$`, "m");
  const match = heading.exec(changelog);
  if (!match) throw new Error(`CHANGELOG.md 에 ## [${version}] 가 없다`);
  const rest = changelog.slice(match.index + match[0].length);
  const end = rest.search(/^## \[/m);
  return (end === -1 ? rest : rest.slice(0, end))
    // 가장 오래된 절 뒤에는 하단 비교 링크가 붙어 있다
    .replace(/^\[[^\]]+\]: https?:\/\/\S+$/gm, "")
    .trim();
}
