import { BellIcon, CompassIcon, LayoutGridIcon, LayersIcon, ListChecksIcon, MenuIcon, PaletteIcon, SquarePenIcon, TableIcon, type LucideIcon } from "lucide-react"

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
  {
    slug: "form",
    title: "Form",
    icon: SquarePenIcon,
    items: [
      { name: "button", title: "Button" },
      { name: "button-group", title: "Button Group" },
      { name: "input", title: "Input" },
      { name: "label", title: "Label" },
      { name: "textarea", title: "Textarea" },
      { name: "native-select", title: "Native Select" },
      { name: "select", title: "Select" },
      { name: "checkbox", title: "Checkbox" },
      { name: "radio-group", title: "Radio Group" },
      { name: "switch", title: "Switch" },
      { name: "toggle", title: "Toggle" },
      { name: "toggle-group", title: "Toggle Group" },
    ],
  },
  {
    slug: "form-advanced",
    title: "Form Advanced",
    icon: ListChecksIcon,
    items: [
      { name: "field", title: "Field" },
      { name: "input-group", title: "Input Group" },
      { name: "input-otp", title: "Input OTP" },
      { name: "combobox", title: "Combobox" },
      { name: "calendar", title: "Calendar" },
      { name: "slider", title: "Slider" },
    ],
  },
  {
    slug: "data-display",
    title: "Data Display",
    icon: TableIcon,
    items: [
      { name: "card", title: "Card" },
      { name: "table", title: "Table" },
      { name: "badge", title: "Badge" },
      { name: "avatar", title: "Avatar" },
      { name: "separator", title: "Separator" },
      { name: "skeleton", title: "Skeleton" },
      { name: "item", title: "Item" },
      { name: "empty", title: "Empty" },
      { name: "kbd", title: "Kbd" },
      { name: "spinner", title: "Spinner" },
      { name: "progress", title: "Progress" },
      { name: "aspect-ratio", title: "Aspect Ratio" },
    ],
  },
  {
    slug: "overlay",
    title: "Overlay",
    icon: LayersIcon,
    items: [
      { name: "dialog", title: "Dialog" },
      { name: "alert-dialog", title: "Alert Dialog" },
      { name: "sheet", title: "Sheet" },
      { name: "drawer", title: "Drawer" },
      { name: "popover", title: "Popover" },
      { name: "tooltip", title: "Tooltip" },
      { name: "hover-card", title: "Hover Card" },
    ],
  },
  {
    slug: "menu",
    title: "Menu",
    icon: MenuIcon,
    items: [
      { name: "dropdown-menu", title: "Dropdown Menu" },
      { name: "context-menu", title: "Context Menu" },
      { name: "menubar", title: "Menubar" },
      { name: "command", title: "Command" },
    ],
  },
  {
    slug: "navigation",
    title: "Navigation",
    icon: CompassIcon,
    items: [
      { name: "tabs", title: "Tabs" },
      { name: "accordion", title: "Accordion" },
      { name: "collapsible", title: "Collapsible" },
      { name: "breadcrumb", title: "Breadcrumb" },
      { name: "navigation-menu", title: "Navigation Menu" },
      { name: "pagination", title: "Pagination" },
    ],
  },
  {
    slug: "feedback",
    title: "Feedback",
    icon: BellIcon,
    items: [
      { name: "alert", title: "Alert" },
      { name: "toast", title: "Toast" },
      { name: "sonner", title: "Sonner" },
    ],
  },
  {
    slug: "layout-components",
    title: "Layout",
    icon: LayoutGridIcon,
    items: [
      { name: "scroll-area", title: "Scroll Area" },
      { name: "resizable", title: "Resizable" },
      { name: "carousel", title: "Carousel" },
    ],
  },
]
