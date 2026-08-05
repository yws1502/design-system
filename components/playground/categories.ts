import { PaletteIcon, type LucideIcon } from "lucide-react"

/**
 * 갤러리 네비게이션의 단일 소스.
 *
 * 회차마다 여기에 카테고리 하나를 추가하고 대응하는
 * `app/playground/<slug>/page.tsx`를 만든다. 사이드바는 이 배열만 읽으므로
 * 셸은 다시 건드리지 않는다.
 */
export type Category = {
  /** 라우트 세그먼트. `/playground/<slug>` */
  slug: string
  title: string
  icon: LucideIcon
  /** 페이지 내 앵커. `name`은 해당 섹션의 `id`와 일치해야 한다. */
  items: { name: string; title: string }[]
}

export const categories: Category[] = [
  {
    slug: "tokens",
    title: "Theme Tokens",
    icon: PaletteIcon,
    items: [
      { name: "colors", title: "Colors" },
      { name: "typography", title: "Typography" },
    ],
  },
]
