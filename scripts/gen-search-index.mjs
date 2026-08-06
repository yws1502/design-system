// 갤러리 검색 인덱스를 생성한다.
//
// 서브 예제 제목(`<Example title="...">`)은 벤더 예제 파일의 JSX 안에만 있어서
// 브라우저에서 읽을 수 없다. 그래서 빌드 전에 뽑아 타입 있는 모듈로 떨군다.
//
// 실행: pnpm gen:search-index  (predev / prebuild 에 걸려 자동으로 돈다)

import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"

const ROOT = process.cwd()
const CATEGORIES = join(ROOT, "components/playground/categories.ts")
const OUT = join(ROOT, "components/playground/search-index.ts")

/** categories.ts 를 정규식으로 읽는다. lucide 아이콘 import 때문에 그냥 import 할 수 없다. */
function readCategories() {
  const source = readFileSync(CATEGORIES, "utf8")
  // items 배열이 한 줄로 쓰인 카테고리(sidebar, chart)도 잡아야 하므로
  // 닫는 대괄호 앞에 줄바꿈을 요구하지 않는다. item 안에는 `]` 가 없다.
  const blocks = source.matchAll(
    /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*icon:\s*\w+,\s*items:\s*\[([\s\S]*?)\]/g
  )

  const categories = []
  for (const [, slug, title, itemsBlock] of blocks) {
    const items = [...itemsBlock.matchAll(/name:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)].map(
      ([, name, itemTitle]) => ({ name, title: itemTitle })
    )
    categories.push({ slug, title, items })
  }
  return categories
}

/** `<Example title="...">` 을 등장 순서대로 뽑는다. */
function readExampleTitles(file) {
  const source = readFileSync(file, "utf8")
  return [...source.matchAll(/<Example\s+title="([^"]+)"/g)].map(([, title]) => title)
}

function collectSourceFiles() {
  const files = []
  for (const name of readdirSync(join(ROOT, "components"))) {
    if (name.endsWith("-example.tsx")) files.push(join(ROOT, "components", name))
  }
  for (const name of readdirSync(join(ROOT, "components/playground"))) {
    if (name.endsWith("-demo.tsx")) files.push(join(ROOT, "components/playground", name))
  }
  return files.sort()
}

const categories = readCategories()

// item name -> 소속 카테고리
const byItemName = new Map()
for (const category of categories) {
  for (const item of category.items) {
    byItemName.set(item.name, { category, item })
  }
}

const entries = []

// 1) 컴포넌트 자체
for (const category of categories) {
  for (const item of category.items) {
    entries.push({
      key: `${category.slug}#${item.name}`,
      component: item.title,
      example: null,
      category: category.title,
      href: `/playground/${category.slug}#${item.name}`,
    })
  }
}

// 2) 서브 예제
const skipped = []
for (const file of collectSourceFiles()) {
  const itemName = basename(file).replace(/-(example|demo)\.tsx$/, "")
  const owner = byItemName.get(itemName)
  if (!owner) {
    skipped.push(basename(file))
    continue
  }
  for (const title of readExampleTitles(file)) {
    entries.push({
      key: `${owner.category.slug}#${owner.item.name}::${title}`,
      component: owner.item.title,
      example: title,
      category: owner.category.title,
      href: `/playground/${owner.category.slug}#${owner.item.name}`,
    })
  }
}

const banner = `// 이 파일은 scripts/gen-search-index.mjs 가 생성한다. 직접 고치지 말 것.
// 갱신: pnpm gen:search-index

export type SearchEntry = {
  key: string
  /** 컴포넌트 이름. 예: "Combobox" */
  component: string
  /** 서브 예제 제목. 컴포넌트 자체를 가리키는 항목은 null */
  example: string | null
  category: string
  href: string
}

`

writeFileSync(
  OUT,
  banner +
    `export const searchIndex: SearchEntry[] = ${JSON.stringify(entries, null, 2)}\n`
)

const withExample = entries.filter((e) => e.example).length
console.log(
  `search-index: ${entries.length} entries (${entries.length - withExample} components, ${withExample} examples)`
)
if (skipped.length) {
  console.log(`  categories.ts 에 대응 항목이 없어 건너뜀: ${skipped.join(", ")}`)
}
