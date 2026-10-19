// 소비하는 쪽 scope 의 PR 이 본문 "해야 할 일"을 채웠는지. pull-request 워크플로가 쓴다.
//   PR_TITLE=... PR_BODY=... node scripts/release/check-impact.mjs
import { impactNoteFilled, needsImpactNote } from "./lib.mjs";

const title = process.env.PR_TITLE ?? "";
if (!needsImpactNote(title)) {
  console.log("scope 가 ui · patterns · tokens 가 아니라 건너뛴다");
  process.exit(0);
}
if (!impactNoteFilled(process.env.PR_BODY)) {
  console.log(
    "::error::PR 본문의 \"소비하는 쪽 영향 → 해야 할 일\"을 채운다. 할 일이 없으면 \"없음\". " +
      "릴리스 노트는 PR 제목 목록이라, 소비하는 쪽은 이 PR 본문에서 할 일을 읽는다."
  );
  process.exit(1);
}
console.log("해야 할 일: 채워짐");
