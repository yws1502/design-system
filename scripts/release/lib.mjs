/**
 * 릴리스 자동화가 공유하는 규칙. 커밋 메시지 · PR 제목 · 버전 라벨 · CHANGELOG 가
 * 모두 여기 정의를 따른다. 형식 자체(type · scope 목록)는 commitlint.config.mjs 가 검사한다.
 */

/** 소비하는 쪽에 영향이 있는 scope. 이 scope 의 변경만 버전을 올린다. */
export const CONSUMER_SCOPES = ["ui", "patterns", "tokens"];

/** CHANGELOG 항목을 요구하는 scope. 갤러리는 버전은 안 올리지만 기록은 남긴다. */
export const CHANGELOG_SCOPES = [...CONSUMER_SCOPES, "gallery"];

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

export function needsChangelog(title) {
  const parsed = parseTitle(title);
  return Boolean(parsed && CHANGELOG_SCOPES.includes(parsed.scope));
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

const UNRELEASED = "## [Unreleased]\n";

/** `[Unreleased]` 아래 내용. 비어 있으면 빈 문자열. */
export function unreleasedBody(changelog) {
  const start = changelog.indexOf(UNRELEASED);
  if (start === -1) throw new Error("CHANGELOG.md 에 ## [Unreleased] 가 없다");
  const rest = changelog.slice(start + UNRELEASED.length);
  const end = rest.search(/^## \[/m);
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

/**
 * `[Unreleased]` 를 `[version] - date` 로 바꾸고 빈 `[Unreleased]` 를 위에 새로 둔다.
 * 하단 비교 링크도 함께 갱신한다.
 */
export function cutRelease(changelog, { version, previous, date, repoUrl }) {
  let next = changelog.replace(
    UNRELEASED,
    `${UNRELEASED}\n## [${version}] - ${date}\n`
  );
  const unreleasedLink = `[Unreleased]: ${repoUrl}/compare/v${previous}...HEAD\n`;
  if (!next.includes(unreleasedLink)) {
    throw new Error(`CHANGELOG.md 하단에 이 링크가 없다:\n${unreleasedLink}`);
  }
  next = next.replace(
    unreleasedLink,
    `[Unreleased]: ${repoUrl}/compare/v${version}...HEAD\n` +
      `[${version}]: ${repoUrl}/compare/v${previous}...v${version}\n`
  );
  return next;
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
