// 이 파일은 scripts/gen-search-index.mjs 가 생성한다. 직접 고치지 말 것.
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

export const searchIndex: SearchEntry[] = [
  {
    "key": "tokens#colors",
    "component": "Colors",
    "example": null,
    "category": "Theme Tokens",
    "href": "/playground/tokens#colors"
  },
  {
    "key": "tokens#typography",
    "component": "Typography",
    "example": null,
    "category": "Theme Tokens",
    "href": "/playground/tokens#typography"
  },
  {
    "key": "form#button",
    "component": "Button",
    "example": null,
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button-group",
    "component": "Button Group",
    "example": null,
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#input",
    "component": "Input",
    "example": null,
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#label",
    "component": "Label",
    "example": null,
    "category": "Form",
    "href": "/playground/form#label"
  },
  {
    "key": "form#textarea",
    "component": "Textarea",
    "example": null,
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "form#native-select",
    "component": "Native Select",
    "example": null,
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#select",
    "component": "Select",
    "example": null,
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#checkbox",
    "component": "Checkbox",
    "example": null,
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#radio-group",
    "component": "Radio Group",
    "example": null,
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#switch",
    "component": "Switch",
    "example": null,
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "form#toggle",
    "component": "Toggle",
    "example": null,
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle-group",
    "component": "Toggle Group",
    "example": null,
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form-advanced#field",
    "component": "Field",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#input-group",
    "component": "Input Group",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-otp",
    "component": "Input OTP",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#combobox",
    "component": "Combobox",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#calendar",
    "component": "Calendar",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#slider",
    "component": "Slider",
    "example": null,
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "data-display#card",
    "component": "Card",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#table",
    "component": "Table",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#badge",
    "component": "Badge",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#avatar",
    "component": "Avatar",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#separator",
    "component": "Separator",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#separator"
  },
  {
    "key": "data-display#skeleton",
    "component": "Skeleton",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "data-display#item",
    "component": "Item",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#empty",
    "component": "Empty",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#kbd",
    "component": "Kbd",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#spinner",
    "component": "Spinner",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "data-display#progress",
    "component": "Progress",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#progress"
  },
  {
    "key": "data-display#aspect-ratio",
    "component": "Aspect Ratio",
    "example": null,
    "category": "Data Display",
    "href": "/playground/data-display#aspect-ratio"
  },
  {
    "key": "overlay#dialog",
    "component": "Dialog",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#alert-dialog",
    "component": "Alert Dialog",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#confirm-delete",
    "component": "Confirm Delete",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#confirm-delete"
  },
  {
    "key": "overlay#sheet",
    "component": "Sheet",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#sheet"
  },
  {
    "key": "overlay#drawer",
    "component": "Drawer",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#popover",
    "component": "Popover",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "overlay#tooltip",
    "component": "Tooltip",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#hover-card",
    "component": "Hover Card",
    "example": null,
    "category": "Overlay",
    "href": "/playground/overlay#hover-card"
  },
  {
    "key": "menu#dropdown-menu",
    "component": "Dropdown Menu",
    "example": null,
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#context-menu",
    "component": "Context Menu",
    "example": null,
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#menubar",
    "component": "Menubar",
    "example": null,
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#command",
    "component": "Command",
    "example": null,
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "navigation#tabs",
    "component": "Tabs",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#accordion",
    "component": "Accordion",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "navigation#collapsible",
    "component": "Collapsible",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#collapsible"
  },
  {
    "key": "navigation#breadcrumb",
    "component": "Breadcrumb",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#breadcrumb"
  },
  {
    "key": "navigation#navigation-menu",
    "component": "Navigation Menu",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#navigation-menu"
  },
  {
    "key": "navigation#pagination",
    "component": "Pagination",
    "example": null,
    "category": "Navigation",
    "href": "/playground/navigation#pagination"
  },
  {
    "key": "feedback#alert",
    "component": "Alert",
    "example": null,
    "category": "Feedback",
    "href": "/playground/feedback#alert"
  },
  {
    "key": "feedback#toast",
    "component": "Toast",
    "example": null,
    "category": "Feedback",
    "href": "/playground/feedback#toast"
  },
  {
    "key": "feedback#sonner",
    "component": "Sonner",
    "example": null,
    "category": "Feedback",
    "href": "/playground/feedback#sonner"
  },
  {
    "key": "feedback#toast-status",
    "component": "Toast — 상태",
    "example": null,
    "category": "Feedback",
    "href": "/playground/feedback#toast-status"
  },
  {
    "key": "layout-components#scroll-area",
    "component": "Scroll Area",
    "example": null,
    "category": "Layout",
    "href": "/playground/layout-components#scroll-area"
  },
  {
    "key": "layout-components#resizable",
    "component": "Resizable",
    "example": null,
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#carousel",
    "component": "Carousel",
    "example": null,
    "category": "Layout",
    "href": "/playground/layout-components#carousel"
  },
  {
    "key": "chat#attachment",
    "component": "Attachment",
    "example": null,
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#bubble",
    "component": "Bubble",
    "example": null,
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#marker",
    "component": "Marker",
    "example": null,
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "sidebar#sidebar",
    "component": "Sidebar",
    "example": null,
    "category": "Sidebar",
    "href": "/playground/sidebar#sidebar"
  },
  {
    "key": "chart#chart",
    "component": "Chart",
    "example": null,
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "navigation#accordion::Basic",
    "component": "Accordion",
    "example": "Basic",
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "navigation#accordion::Multiple",
    "component": "Accordion",
    "example": "Multiple",
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "navigation#accordion::With Borders",
    "component": "Accordion",
    "example": "With Borders",
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "navigation#accordion::In Card",
    "component": "Accordion",
    "example": "In Card",
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "navigation#accordion::With Disabled",
    "component": "Accordion",
    "example": "With Disabled",
    "category": "Navigation",
    "href": "/playground/navigation#accordion"
  },
  {
    "key": "overlay#alert-dialog::Basic",
    "component": "Alert Dialog",
    "example": "Basic",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#alert-dialog::Small",
    "component": "Alert Dialog",
    "example": "Small",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#alert-dialog::With Media",
    "component": "Alert Dialog",
    "example": "With Media",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#alert-dialog::Small With Media",
    "component": "Alert Dialog",
    "example": "Small With Media",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#alert-dialog::Destructive",
    "component": "Alert Dialog",
    "example": "Destructive",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "overlay#alert-dialog::In Dialog",
    "component": "Alert Dialog",
    "example": "In Dialog",
    "category": "Overlay",
    "href": "/playground/overlay#alert-dialog"
  },
  {
    "key": "feedback#alert::Basic",
    "component": "Alert",
    "example": "Basic",
    "category": "Feedback",
    "href": "/playground/feedback#alert"
  },
  {
    "key": "feedback#alert::With Icons",
    "component": "Alert",
    "example": "With Icons",
    "category": "Feedback",
    "href": "/playground/feedback#alert"
  },
  {
    "key": "feedback#alert::Destructive",
    "component": "Alert",
    "example": "Destructive",
    "category": "Feedback",
    "href": "/playground/feedback#alert"
  },
  {
    "key": "feedback#alert::With Actions",
    "component": "Alert",
    "example": "With Actions",
    "category": "Feedback",
    "href": "/playground/feedback#alert"
  },
  {
    "key": "data-display#aspect-ratio::16:9",
    "component": "Aspect Ratio",
    "example": "16:9",
    "category": "Data Display",
    "href": "/playground/data-display#aspect-ratio"
  },
  {
    "key": "data-display#aspect-ratio::1:1",
    "component": "Aspect Ratio",
    "example": "1:1",
    "category": "Data Display",
    "href": "/playground/data-display#aspect-ratio"
  },
  {
    "key": "data-display#aspect-ratio::9:16",
    "component": "Aspect Ratio",
    "example": "9:16",
    "category": "Data Display",
    "href": "/playground/data-display#aspect-ratio"
  },
  {
    "key": "data-display#aspect-ratio::21:9",
    "component": "Aspect Ratio",
    "example": "21:9",
    "category": "Data Display",
    "href": "/playground/data-display#aspect-ratio"
  },
  {
    "key": "chat#attachment::Files",
    "component": "Attachment",
    "example": "Files",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Content Only",
    "component": "Attachment",
    "example": "Content Only",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::States",
    "component": "Attachment",
    "example": "States",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Images",
    "component": "Attachment",
    "example": "Images",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Image States",
    "component": "Attachment",
    "example": "Image States",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Sizes",
    "component": "Attachment",
    "example": "Sizes",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Scrollable Group",
    "component": "Attachment",
    "example": "Scrollable Group",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "chat#attachment::Triggers",
    "component": "Attachment",
    "example": "Triggers",
    "category": "Chat",
    "href": "/playground/chat#attachment"
  },
  {
    "key": "data-display#avatar::Sizes",
    "component": "Avatar",
    "example": "Sizes",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::Badge",
    "component": "Avatar",
    "example": "Badge",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::Badge with Icon",
    "component": "Avatar",
    "example": "Badge with Icon",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::Group",
    "component": "Avatar",
    "example": "Group",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::Group with Count",
    "component": "Avatar",
    "example": "Group with Count",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::Group with Icon Count",
    "component": "Avatar",
    "example": "Group with Icon Count",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#avatar::In Empty",
    "component": "Avatar",
    "example": "In Empty",
    "category": "Data Display",
    "href": "/playground/data-display#avatar"
  },
  {
    "key": "data-display#badge::Variants",
    "component": "Badge",
    "example": "Variants",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::Icon Left",
    "component": "Badge",
    "example": "Icon Left",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::Icon Right",
    "component": "Badge",
    "example": "Icon Right",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::With Spinner",
    "component": "Badge",
    "example": "With Spinner",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::asChild",
    "component": "Badge",
    "example": "asChild",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::Long Text",
    "component": "Badge",
    "example": "Long Text",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "data-display#badge::Custom Colors",
    "component": "Badge",
    "example": "Custom Colors",
    "category": "Data Display",
    "href": "/playground/data-display#badge"
  },
  {
    "key": "navigation#breadcrumb::Basic",
    "component": "Breadcrumb",
    "example": "Basic",
    "category": "Navigation",
    "href": "/playground/navigation#breadcrumb"
  },
  {
    "key": "navigation#breadcrumb::With Dropdown",
    "component": "Breadcrumb",
    "example": "With Dropdown",
    "category": "Navigation",
    "href": "/playground/navigation#breadcrumb"
  },
  {
    "key": "navigation#breadcrumb::With Link",
    "component": "Breadcrumb",
    "example": "With Link",
    "category": "Navigation",
    "href": "/playground/navigation#breadcrumb"
  },
  {
    "key": "chat#bubble::Variants",
    "component": "Bubble",
    "example": "Variants",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Sizes",
    "component": "Bubble",
    "example": "Sizes",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Grouped",
    "component": "Bubble",
    "example": "Grouped",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Collapsible",
    "component": "Bubble",
    "example": "Collapsible",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Reaction Placement",
    "component": "Bubble",
    "example": "Reaction Placement",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Reactions Buttons",
    "component": "Bubble",
    "example": "Reactions Buttons",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Alignment",
    "component": "Bubble",
    "example": "Alignment",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "chat#bubble::Button & Links",
    "component": "Bubble",
    "example": "Button & Links",
    "category": "Chat",
    "href": "/playground/chat#bubble"
  },
  {
    "key": "form#button::Variants & Sizes",
    "component": "Button",
    "example": "Variants & Sizes",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button::Icon Right",
    "component": "Button",
    "example": "Icon Right",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button::Icon Left",
    "component": "Button",
    "example": "Icon Left",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button::Icon Only",
    "component": "Button",
    "example": "Icon Only",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button::Examples",
    "component": "Button",
    "example": "Examples",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button::Invalid States",
    "component": "Button",
    "example": "Invalid States",
    "category": "Form",
    "href": "/playground/form#button"
  },
  {
    "key": "form#button-group::Basic",
    "component": "Button Group",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Input",
    "component": "Button Group",
    "example": "With Input",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Text",
    "component": "Button Group",
    "example": "With Text",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Dropdown",
    "component": "Button Group",
    "example": "With Dropdown",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Select",
    "component": "Button Group",
    "example": "With Select",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Icons",
    "component": "Button Group",
    "example": "With Icons",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Input Group",
    "component": "Button Group",
    "example": "With Input Group",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Fields",
    "component": "Button Group",
    "example": "With Fields",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Like",
    "component": "Button Group",
    "example": "With Like",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::With Select and Input",
    "component": "Button Group",
    "example": "With Select and Input",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Nested",
    "component": "Button Group",
    "example": "Nested",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Pagination",
    "component": "Button Group",
    "example": "Pagination",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Pagination Split",
    "component": "Button Group",
    "example": "Pagination Split",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Navigation",
    "component": "Button Group",
    "example": "Navigation",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Text Alignment",
    "component": "Button Group",
    "example": "Text Alignment",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Vertical",
    "component": "Button Group",
    "example": "Vertical",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form#button-group::Vertical Nested",
    "component": "Button Group",
    "example": "Vertical Nested",
    "category": "Form",
    "href": "/playground/form#button-group"
  },
  {
    "key": "form-advanced#calendar::In Card",
    "component": "Calendar",
    "example": "In Card",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::In Popover",
    "component": "Calendar",
    "example": "In Popover",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Single",
    "component": "Calendar",
    "example": "Single",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Multiple",
    "component": "Calendar",
    "example": "Multiple",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Range",
    "component": "Calendar",
    "example": "Range",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Range Multiple Months",
    "component": "Calendar",
    "example": "Range Multiple Months",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Booked Dates",
    "component": "Calendar",
    "example": "Booked Dates",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::With Time",
    "component": "Calendar",
    "example": "With Time",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Custom Days",
    "component": "Calendar",
    "example": "Custom Days",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::With Presets",
    "component": "Calendar",
    "example": "With Presets",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Date Picker Simple",
    "component": "Calendar",
    "example": "Date Picker Simple",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Date Picker Range",
    "component": "Calendar",
    "example": "Date Picker Range",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Date Picker with Dropdowns",
    "component": "Calendar",
    "example": "Date Picker with Dropdowns",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "form-advanced#calendar::Week Numbers",
    "component": "Calendar",
    "example": "Week Numbers",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#calendar"
  },
  {
    "key": "data-display#card::Content Edge to Edge",
    "component": "Card",
    "example": "Content Edge to Edge",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Custom Spacing",
    "component": "Card",
    "example": "Custom Spacing",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Login",
    "component": "Card",
    "example": "Login",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Meeting Notes",
    "component": "Card",
    "example": "Meeting Notes",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::With Image",
    "component": "Card",
    "example": "With Image",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::With Image (Small)",
    "component": "Card",
    "example": "With Image (Small)",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Header with Border",
    "component": "Card",
    "example": "Header with Border",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Footer with Border",
    "component": "Card",
    "example": "Footer with Border",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Default Size",
    "component": "Card",
    "example": "Default Size",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Small Size",
    "component": "Card",
    "example": "Small Size",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Header with Border (Small)",
    "component": "Card",
    "example": "Header with Border (Small)",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "data-display#card::Footer with Border (Small)",
    "component": "Card",
    "example": "Footer with Border (Small)",
    "category": "Data Display",
    "href": "/playground/data-display#card"
  },
  {
    "key": "layout-components#carousel::Basic",
    "component": "Carousel",
    "example": "Basic",
    "category": "Layout",
    "href": "/playground/layout-components#carousel"
  },
  {
    "key": "layout-components#carousel::Multiple",
    "component": "Carousel",
    "example": "Multiple",
    "category": "Layout",
    "href": "/playground/layout-components#carousel"
  },
  {
    "key": "layout-components#carousel::With Gap",
    "component": "Carousel",
    "example": "With Gap",
    "category": "Layout",
    "href": "/playground/layout-components#carousel"
  },
  {
    "key": "chart#chart::Area Chart",
    "component": "Chart",
    "example": "Area Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "chart#chart::Bar Chart",
    "component": "Chart",
    "example": "Bar Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "chart#chart::Line Chart",
    "component": "Chart",
    "example": "Line Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "chart#chart::Pie Chart",
    "component": "Chart",
    "example": "Pie Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "chart#chart::Radar Chart",
    "component": "Chart",
    "example": "Radar Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "chart#chart::Radial Chart",
    "component": "Chart",
    "example": "Radial Chart",
    "category": "Chart",
    "href": "/playground/chart#chart"
  },
  {
    "key": "form#checkbox::Basic",
    "component": "Checkbox",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::With Description",
    "component": "Checkbox",
    "example": "With Description",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::Invalid",
    "component": "Checkbox",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::Disabled",
    "component": "Checkbox",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::With Title",
    "component": "Checkbox",
    "example": "With Title",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::In Table",
    "component": "Checkbox",
    "example": "In Table",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "form#checkbox::Group",
    "component": "Checkbox",
    "example": "Group",
    "category": "Form",
    "href": "/playground/form#checkbox"
  },
  {
    "key": "navigation#collapsible::File Tree",
    "component": "Collapsible",
    "example": "File Tree",
    "category": "Navigation",
    "href": "/playground/navigation#collapsible"
  },
  {
    "key": "navigation#collapsible::Settings",
    "component": "Collapsible",
    "example": "Settings",
    "category": "Navigation",
    "href": "/playground/navigation#collapsible"
  },
  {
    "key": "form-advanced#combobox::Basic",
    "component": "Combobox",
    "example": "Basic",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Sides",
    "component": "Combobox",
    "example": "Sides",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Disabled",
    "component": "Combobox",
    "example": "Disabled",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Disabled Items",
    "component": "Combobox",
    "example": "Disabled Items",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Invalid",
    "component": "Combobox",
    "example": "Invalid",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Clear Button",
    "component": "Combobox",
    "example": "With Clear Button",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Groups",
    "component": "Combobox",
    "example": "With Groups",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Groups and Separator",
    "component": "Combobox",
    "example": "With Groups and Separator",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Form with Combobox",
    "component": "Combobox",
    "example": "Form with Combobox",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Large List (100 items)",
    "component": "Combobox",
    "example": "Large List (100 items)",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Auto Highlight",
    "component": "Combobox",
    "example": "With Auto Highlight",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Icon Addon",
    "component": "Combobox",
    "example": "With Icon Addon",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox in Popup",
    "component": "Combobox",
    "example": "Combobox in Popup",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox Multiple",
    "component": "Combobox",
    "example": "Combobox Multiple",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox Multiple Disabled",
    "component": "Combobox",
    "example": "Combobox Multiple Disabled",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox Multiple Invalid",
    "component": "Combobox",
    "example": "Combobox Multiple Invalid",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox Multiple (No Remove)",
    "component": "Combobox",
    "example": "Combobox Multiple (No Remove)",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Custom Item Rendering",
    "component": "Combobox",
    "example": "With Custom Item Rendering",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::Combobox in Dialog",
    "component": "Combobox",
    "example": "Combobox in Dialog",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "form-advanced#combobox::With Other Inputs",
    "component": "Combobox",
    "example": "With Other Inputs",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#combobox"
  },
  {
    "key": "menu#command::Inline",
    "component": "Command",
    "example": "Inline",
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "menu#command::Basic",
    "component": "Command",
    "example": "Basic",
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "menu#command::With Shortcuts",
    "component": "Command",
    "example": "With Shortcuts",
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "menu#command::With Groups",
    "component": "Command",
    "example": "With Groups",
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "menu#command::Many Groups & Items",
    "component": "Command",
    "example": "Many Groups & Items",
    "category": "Menu",
    "href": "/playground/menu#command"
  },
  {
    "key": "menu#context-menu::Basic",
    "component": "Context Menu",
    "example": "Basic",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Icons",
    "component": "Context Menu",
    "example": "With Icons",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Shortcuts",
    "component": "Context Menu",
    "example": "With Shortcuts",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Submenu",
    "component": "Context Menu",
    "example": "With Submenu",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Groups, Labels & Separators",
    "component": "Context Menu",
    "example": "With Groups, Labels & Separators",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Checkboxes",
    "component": "Context Menu",
    "example": "With Checkboxes",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Radio Group",
    "component": "Context Menu",
    "example": "With Radio Group",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Destructive Items",
    "component": "Context Menu",
    "example": "With Destructive Items",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Sides",
    "component": "Context Menu",
    "example": "With Sides",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::In Dialog",
    "component": "Context Menu",
    "example": "In Dialog",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "menu#context-menu::With Inset",
    "component": "Context Menu",
    "example": "With Inset",
    "category": "Menu",
    "href": "/playground/menu#context-menu"
  },
  {
    "key": "overlay#dialog::With Form",
    "component": "Dialog",
    "example": "With Form",
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#dialog::Scrollable Content",
    "component": "Dialog",
    "example": "Scrollable Content",
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#dialog::With Sticky Footer",
    "component": "Dialog",
    "example": "With Sticky Footer",
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#dialog::No Close Button",
    "component": "Dialog",
    "example": "No Close Button",
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#dialog::Chat Settings",
    "component": "Dialog",
    "example": "Chat Settings",
    "category": "Overlay",
    "href": "/playground/overlay#dialog"
  },
  {
    "key": "overlay#drawer::Demo",
    "component": "Drawer",
    "example": "Demo",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Swipe Handle",
    "component": "Drawer",
    "example": "Swipe Handle",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Custom Width and Height",
    "component": "Drawer",
    "example": "Custom Width and Height",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Position",
    "component": "Drawer",
    "example": "Position",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Scrollable Content",
    "component": "Drawer",
    "example": "Scrollable Content",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Snap Points",
    "component": "Drawer",
    "example": "Snap Points",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Nested",
    "component": "Drawer",
    "example": "Nested",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "overlay#drawer::Non Modal",
    "component": "Drawer",
    "example": "Non Modal",
    "category": "Overlay",
    "href": "/playground/overlay#drawer"
  },
  {
    "key": "menu#dropdown-menu::Basic",
    "component": "Dropdown Menu",
    "example": "Basic",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::Sides",
    "component": "Dropdown Menu",
    "example": "Sides",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Icons",
    "component": "Dropdown Menu",
    "example": "With Icons",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Shortcuts",
    "component": "Dropdown Menu",
    "example": "With Shortcuts",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Submenu",
    "component": "Dropdown Menu",
    "example": "With Submenu",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Checkboxes",
    "component": "Dropdown Menu",
    "example": "With Checkboxes",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Radio Group",
    "component": "Dropdown Menu",
    "example": "With Radio Group",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::Checkboxes with Icons",
    "component": "Dropdown Menu",
    "example": "Checkboxes with Icons",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::Radio with Icons",
    "component": "Dropdown Menu",
    "example": "Radio with Icons",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Destructive Items",
    "component": "Dropdown Menu",
    "example": "With Destructive Items",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Avatar",
    "component": "Dropdown Menu",
    "example": "With Avatar",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::In Dialog",
    "component": "Dropdown Menu",
    "example": "In Dialog",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::With Inset",
    "component": "Dropdown Menu",
    "example": "With Inset",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "menu#dropdown-menu::Complex",
    "component": "Dropdown Menu",
    "example": "Complex",
    "category": "Menu",
    "href": "/playground/menu#dropdown-menu"
  },
  {
    "key": "data-display#empty::Basic",
    "component": "Empty",
    "example": "Basic",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#empty::With Muted Background",
    "component": "Empty",
    "example": "With Muted Background",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#empty::With Border",
    "component": "Empty",
    "example": "With Border",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#empty::With Icon",
    "component": "Empty",
    "example": "With Icon",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#empty::With Muted Background Alt",
    "component": "Empty",
    "example": "With Muted Background Alt",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "data-display#empty::In Card",
    "component": "Empty",
    "example": "In Card",
    "category": "Data Display",
    "href": "/playground/data-display#empty"
  },
  {
    "key": "form-advanced#field::Input Fields",
    "component": "Field",
    "example": "Input Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Textarea Fields",
    "component": "Field",
    "example": "Textarea Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Select Fields",
    "component": "Field",
    "example": "Select Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Native Select Fields",
    "component": "Field",
    "example": "Native Select Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Checkbox Fields",
    "component": "Field",
    "example": "Checkbox Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Radio Fields",
    "component": "Field",
    "example": "Radio Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Switch Fields",
    "component": "Field",
    "example": "Switch Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Slider Fields",
    "component": "Field",
    "example": "Slider Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::OTP Input Fields",
    "component": "Field",
    "example": "OTP Input Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "form-advanced#field::Horizontal Fields",
    "component": "Field",
    "example": "Horizontal Fields",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#field"
  },
  {
    "key": "overlay#hover-card::Sides",
    "component": "Hover Card",
    "example": "Sides",
    "category": "Overlay",
    "href": "/playground/overlay#hover-card"
  },
  {
    "key": "overlay#hover-card::In Dialog",
    "component": "Hover Card",
    "example": "In Dialog",
    "category": "Overlay",
    "href": "/playground/overlay#hover-card"
  },
  {
    "key": "form#input::Basic",
    "component": "Input",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::Invalid",
    "component": "Input",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::With Label",
    "component": "Input",
    "example": "With Label",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::With Description",
    "component": "Input",
    "example": "With Description",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::Disabled",
    "component": "Input",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::Input Types",
    "component": "Input",
    "example": "Input Types",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::With Select",
    "component": "Input",
    "example": "With Select",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::With Button",
    "component": "Input",
    "example": "With Button",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::With Native Select",
    "component": "Input",
    "example": "With Native Select",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form#input::Form",
    "component": "Input",
    "example": "Form",
    "category": "Form",
    "href": "/playground/form#input"
  },
  {
    "key": "form-advanced#input-group::Basic",
    "component": "Input Group",
    "example": "Basic",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::With Addons",
    "component": "Input Group",
    "example": "With Addons",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::With Buttons",
    "component": "Input Group",
    "example": "With Buttons",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::With Tooltip, Dropdown, Popover",
    "component": "Input Group",
    "example": "With Tooltip, Dropdown, Popover",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::With Kbd",
    "component": "Input Group",
    "example": "With Kbd",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::In Card",
    "component": "Input Group",
    "example": "In Card",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-group::Textarea",
    "component": "Input Group",
    "example": "Textarea",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-group"
  },
  {
    "key": "form-advanced#input-otp::Simple",
    "component": "Input OTP",
    "example": "Simple",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::Digits Only",
    "component": "Input OTP",
    "example": "Digits Only",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::With Separator",
    "component": "Input OTP",
    "example": "With Separator",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::Alphanumeric",
    "component": "Input OTP",
    "example": "Alphanumeric",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::Disabled",
    "component": "Input OTP",
    "example": "Disabled",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::4 Digits",
    "component": "Input OTP",
    "example": "4 Digits",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::Invalid State",
    "component": "Input OTP",
    "example": "Invalid State",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "form-advanced#input-otp::Form",
    "component": "Input OTP",
    "example": "Form",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#input-otp"
  },
  {
    "key": "data-display#item::Default",
    "component": "Item",
    "example": "Default",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline",
    "component": "Item",
    "example": "Outline",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted",
    "component": "Item",
    "example": "Muted",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Small",
    "component": "Item",
    "example": "Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - Small",
    "component": "Item",
    "example": "Outline - Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted - Small",
    "component": "Item",
    "example": "Muted - Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Extra Small",
    "component": "Item",
    "example": "Extra Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - Extra Small",
    "component": "Item",
    "example": "Outline - Extra Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted - Extra Small",
    "component": "Item",
    "example": "Muted - Extra Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::asChild",
    "component": "Item",
    "example": "asChild",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - asChild",
    "component": "Item",
    "example": "Outline - asChild",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted - asChild",
    "component": "Item",
    "example": "Muted - asChild",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::ItemGroup",
    "component": "Item",
    "example": "ItemGroup",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - ItemGroup",
    "component": "Item",
    "example": "Outline - ItemGroup",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted - ItemGroup",
    "component": "Item",
    "example": "Muted - ItemGroup",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::ItemSeparator",
    "component": "Item",
    "example": "ItemSeparator",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::ItemHeader",
    "component": "Item",
    "example": "ItemHeader",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::ItemFooter",
    "component": "Item",
    "example": "ItemFooter",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::ItemHeader + ItemFooter",
    "component": "Item",
    "example": "ItemHeader + ItemFooter",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Default - ItemMedia image",
    "component": "Item",
    "example": "Default - ItemMedia image",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - ItemMedia image",
    "component": "Item",
    "example": "Outline - ItemMedia image",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - ItemMedia image - Small",
    "component": "Item",
    "example": "Outline - ItemMedia image - Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Outline - ItemMedia image - Extra Small",
    "component": "Item",
    "example": "Outline - ItemMedia image - Extra Small",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#item::Muted - ItemMedia image",
    "component": "Item",
    "example": "Muted - ItemMedia image",
    "category": "Data Display",
    "href": "/playground/data-display#item"
  },
  {
    "key": "data-display#kbd::Basic",
    "component": "Kbd",
    "example": "Basic",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::Modifier Keys",
    "component": "Kbd",
    "example": "Modifier Keys",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::KbdGroup",
    "component": "Kbd",
    "example": "KbdGroup",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::Arrow Keys",
    "component": "Kbd",
    "example": "Arrow Keys",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::With Icons",
    "component": "Kbd",
    "example": "With Icons",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::With Icons and Text",
    "component": "Kbd",
    "example": "With Icons and Text",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::InputGroup",
    "component": "Kbd",
    "example": "InputGroup",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::Tooltip",
    "component": "Kbd",
    "example": "Tooltip",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "data-display#kbd::With samp",
    "component": "Kbd",
    "example": "With samp",
    "category": "Data Display",
    "href": "/playground/data-display#kbd"
  },
  {
    "key": "form#label::With Checkbox",
    "component": "Label",
    "example": "With Checkbox",
    "category": "Form",
    "href": "/playground/form#label"
  },
  {
    "key": "form#label::With Input",
    "component": "Label",
    "example": "With Input",
    "category": "Form",
    "href": "/playground/form#label"
  },
  {
    "key": "form#label::Disabled",
    "component": "Label",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#label"
  },
  {
    "key": "form#label::With Textarea",
    "component": "Label",
    "example": "With Textarea",
    "category": "Form",
    "href": "/playground/form#label"
  },
  {
    "key": "chat#marker::Markers",
    "component": "Marker",
    "example": "Markers",
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "chat#marker::Border",
    "component": "Marker",
    "example": "Border",
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "chat#marker::Separator",
    "component": "Marker",
    "example": "Separator",
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "chat#marker::Accordion",
    "component": "Marker",
    "example": "Accordion",
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "chat#marker::Drawer",
    "component": "Marker",
    "example": "Drawer",
    "category": "Chat",
    "href": "/playground/chat#marker"
  },
  {
    "key": "menu#menubar::Basic",
    "component": "Menubar",
    "example": "Basic",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::Sides",
    "component": "Menubar",
    "example": "Sides",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Submenu",
    "component": "Menubar",
    "example": "With Submenu",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Checkboxes",
    "component": "Menubar",
    "example": "With Checkboxes",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Radio",
    "component": "Menubar",
    "example": "With Radio",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Icons",
    "component": "Menubar",
    "example": "With Icons",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Shortcuts",
    "component": "Menubar",
    "example": "With Shortcuts",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::Format",
    "component": "Menubar",
    "example": "Format",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::Insert",
    "component": "Menubar",
    "example": "Insert",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::Destructive",
    "component": "Menubar",
    "example": "Destructive",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::In Dialog",
    "component": "Menubar",
    "example": "In Dialog",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "menu#menubar::With Inset",
    "component": "Menubar",
    "example": "With Inset",
    "category": "Menu",
    "href": "/playground/menu#menubar"
  },
  {
    "key": "form#native-select::Basic",
    "component": "Native Select",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#native-select::With Groups",
    "component": "Native Select",
    "example": "With Groups",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#native-select::Sizes",
    "component": "Native Select",
    "example": "Sizes",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#native-select::With Field",
    "component": "Native Select",
    "example": "With Field",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#native-select::Disabled",
    "component": "Native Select",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "form#native-select::Invalid",
    "component": "Native Select",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#native-select"
  },
  {
    "key": "navigation#navigation-menu::Basic",
    "component": "Navigation Menu",
    "example": "Basic",
    "category": "Navigation",
    "href": "/playground/navigation#navigation-menu"
  },
  {
    "key": "navigation#pagination::Basic",
    "component": "Pagination",
    "example": "Basic",
    "category": "Navigation",
    "href": "/playground/navigation#pagination"
  },
  {
    "key": "navigation#pagination::Simple",
    "component": "Pagination",
    "example": "Simple",
    "category": "Navigation",
    "href": "/playground/navigation#pagination"
  },
  {
    "key": "navigation#pagination::With Select",
    "component": "Pagination",
    "example": "With Select",
    "category": "Navigation",
    "href": "/playground/navigation#pagination"
  },
  {
    "key": "overlay#confirm-delete::트리거로 열기",
    "component": "Confirm Delete",
    "example": "트리거로 열기",
    "category": "Overlay",
    "href": "/playground/overlay#confirm-delete"
  },
  {
    "key": "overlay#confirm-delete::목록에서 제어하기",
    "component": "Confirm Delete",
    "example": "목록에서 제어하기",
    "category": "Overlay",
    "href": "/playground/overlay#confirm-delete"
  },
  {
    "key": "overlay#confirm-delete::가벼운 삭제 — Popover",
    "component": "Confirm Delete",
    "example": "가벼운 삭제 — Popover",
    "category": "Overlay",
    "href": "/playground/overlay#confirm-delete"
  },
  {
    "key": "feedback#toast-status::Base UI Toast — 상태",
    "component": "Toast — 상태",
    "example": "Base UI Toast — 상태",
    "category": "Feedback",
    "href": "/playground/feedback#toast-status"
  },
  {
    "key": "feedback#toast-status::Sonner — 상태",
    "component": "Toast — 상태",
    "example": "Sonner — 상태",
    "category": "Feedback",
    "href": "/playground/feedback#toast-status"
  },
  {
    "key": "overlay#popover::Basic",
    "component": "Popover",
    "example": "Basic",
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "overlay#popover::Sides",
    "component": "Popover",
    "example": "Sides",
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "overlay#popover::With Form",
    "component": "Popover",
    "example": "With Form",
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "overlay#popover::Alignments",
    "component": "Popover",
    "example": "Alignments",
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "overlay#popover::In Dialog",
    "component": "Popover",
    "example": "In Dialog",
    "category": "Overlay",
    "href": "/playground/overlay#popover"
  },
  {
    "key": "data-display#progress::Progress Bar",
    "component": "Progress",
    "example": "Progress Bar",
    "category": "Data Display",
    "href": "/playground/data-display#progress"
  },
  {
    "key": "data-display#progress::With Label",
    "component": "Progress",
    "example": "With Label",
    "category": "Data Display",
    "href": "/playground/data-display#progress"
  },
  {
    "key": "data-display#progress::Controlled",
    "component": "Progress",
    "example": "Controlled",
    "category": "Data Display",
    "href": "/playground/data-display#progress"
  },
  {
    "key": "data-display#progress::File Upload List",
    "component": "Progress",
    "example": "File Upload List",
    "category": "Data Display",
    "href": "/playground/data-display#progress"
  },
  {
    "key": "form#radio-group::Basic",
    "component": "Radio Group",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#radio-group::With Descriptions",
    "component": "Radio Group",
    "example": "With Descriptions",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#radio-group::With FieldSet",
    "component": "Radio Group",
    "example": "With FieldSet",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#radio-group::Grid Layout",
    "component": "Radio Group",
    "example": "Grid Layout",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#radio-group::Disabled",
    "component": "Radio Group",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "form#radio-group::Invalid",
    "component": "Radio Group",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#radio-group"
  },
  {
    "key": "layout-components#resizable::Horizontal",
    "component": "Resizable",
    "example": "Horizontal",
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#resizable::Vertical",
    "component": "Resizable",
    "example": "Vertical",
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#resizable::With Handle",
    "component": "Resizable",
    "example": "With Handle",
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#resizable::Nested",
    "component": "Resizable",
    "example": "Nested",
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#resizable::Controlled",
    "component": "Resizable",
    "example": "Controlled",
    "category": "Layout",
    "href": "/playground/layout-components#resizable"
  },
  {
    "key": "layout-components#scroll-area::Vertical",
    "component": "Scroll Area",
    "example": "Vertical",
    "category": "Layout",
    "href": "/playground/layout-components#scroll-area"
  },
  {
    "key": "layout-components#scroll-area::Horizontal",
    "component": "Scroll Area",
    "example": "Horizontal",
    "category": "Layout",
    "href": "/playground/layout-components#scroll-area"
  },
  {
    "key": "form#select::Basic",
    "component": "Select",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Sides",
    "component": "Select",
    "example": "Sides",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::With Icons",
    "component": "Select",
    "example": "With Icons",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::With Groups & Labels",
    "component": "Select",
    "example": "With Groups & Labels",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Large List",
    "component": "Select",
    "example": "Large List",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Sizes",
    "component": "Select",
    "example": "Sizes",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::With Button",
    "component": "Select",
    "example": "With Button",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Item Aligned",
    "component": "Select",
    "example": "Item Aligned",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::With Field",
    "component": "Select",
    "example": "With Field",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Invalid",
    "component": "Select",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Inline with Input & NativeSelect",
    "component": "Select",
    "example": "Inline with Input & NativeSelect",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Disabled",
    "component": "Select",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Subscription Plan",
    "component": "Select",
    "example": "Subscription Plan",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::Multiple Selection",
    "component": "Select",
    "example": "Multiple Selection",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "form#select::In Dialog",
    "component": "Select",
    "example": "In Dialog",
    "category": "Form",
    "href": "/playground/form#select"
  },
  {
    "key": "data-display#separator::Horizontal",
    "component": "Separator",
    "example": "Horizontal",
    "category": "Data Display",
    "href": "/playground/data-display#separator"
  },
  {
    "key": "data-display#separator::Vertical",
    "component": "Separator",
    "example": "Vertical",
    "category": "Data Display",
    "href": "/playground/data-display#separator"
  },
  {
    "key": "data-display#separator::Vertical Menu",
    "component": "Separator",
    "example": "Vertical Menu",
    "category": "Data Display",
    "href": "/playground/data-display#separator"
  },
  {
    "key": "data-display#separator::In List",
    "component": "Separator",
    "example": "In List",
    "category": "Data Display",
    "href": "/playground/data-display#separator"
  },
  {
    "key": "overlay#sheet::With Form",
    "component": "Sheet",
    "example": "With Form",
    "category": "Overlay",
    "href": "/playground/overlay#sheet"
  },
  {
    "key": "overlay#sheet::No Close Button",
    "component": "Sheet",
    "example": "No Close Button",
    "category": "Overlay",
    "href": "/playground/overlay#sheet"
  },
  {
    "key": "overlay#sheet::Sides",
    "component": "Sheet",
    "example": "Sides",
    "category": "Overlay",
    "href": "/playground/overlay#sheet"
  },
  {
    "key": "data-display#skeleton::Avatar",
    "component": "Skeleton",
    "example": "Avatar",
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "data-display#skeleton::Card",
    "component": "Skeleton",
    "example": "Card",
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "data-display#skeleton::Text",
    "component": "Skeleton",
    "example": "Text",
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "data-display#skeleton::Form",
    "component": "Skeleton",
    "example": "Form",
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "data-display#skeleton::Table",
    "component": "Skeleton",
    "example": "Table",
    "category": "Data Display",
    "href": "/playground/data-display#skeleton"
  },
  {
    "key": "form-advanced#slider::Basic",
    "component": "Slider",
    "example": "Basic",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "form-advanced#slider::Range",
    "component": "Slider",
    "example": "Range",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "form-advanced#slider::Multiple Thumbs",
    "component": "Slider",
    "example": "Multiple Thumbs",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "form-advanced#slider::Vertical",
    "component": "Slider",
    "example": "Vertical",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "form-advanced#slider::Controlled",
    "component": "Slider",
    "example": "Controlled",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "form-advanced#slider::Disabled",
    "component": "Slider",
    "example": "Disabled",
    "category": "Form Advanced",
    "href": "/playground/form-advanced#slider"
  },
  {
    "key": "feedback#sonner::Basic",
    "component": "Sonner",
    "example": "Basic",
    "category": "Feedback",
    "href": "/playground/feedback#sonner"
  },
  {
    "key": "feedback#sonner::With Description",
    "component": "Sonner",
    "example": "With Description",
    "category": "Feedback",
    "href": "/playground/feedback#sonner"
  },
  {
    "key": "data-display#spinner::Basic",
    "component": "Spinner",
    "example": "Basic",
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "data-display#spinner::In Buttons",
    "component": "Spinner",
    "example": "In Buttons",
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "data-display#spinner::In Badges",
    "component": "Spinner",
    "example": "In Badges",
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "data-display#spinner::In Input Group",
    "component": "Spinner",
    "example": "In Input Group",
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "data-display#spinner::In Empty State",
    "component": "Spinner",
    "example": "In Empty State",
    "category": "Data Display",
    "href": "/playground/data-display#spinner"
  },
  {
    "key": "form#switch::Basic",
    "component": "Switch",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "form#switch::With Label",
    "component": "Switch",
    "example": "With Label",
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "form#switch::With Description",
    "component": "Switch",
    "example": "With Description",
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "form#switch::Disabled",
    "component": "Switch",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "form#switch::Sizes",
    "component": "Switch",
    "example": "Sizes",
    "category": "Form",
    "href": "/playground/form#switch"
  },
  {
    "key": "data-display#table::Basic",
    "component": "Table",
    "example": "Basic",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::With Footer",
    "component": "Table",
    "example": "With Footer",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::Simple",
    "component": "Table",
    "example": "Simple",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::With Badges",
    "component": "Table",
    "example": "With Badges",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::With Actions",
    "component": "Table",
    "example": "With Actions",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::With Select",
    "component": "Table",
    "example": "With Select",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "data-display#table::With Input",
    "component": "Table",
    "example": "With Input",
    "category": "Data Display",
    "href": "/playground/data-display#table"
  },
  {
    "key": "navigation#tabs::Basic",
    "component": "Tabs",
    "example": "Basic",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Line",
    "component": "Tabs",
    "example": "Line",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Variants Alignment",
    "component": "Tabs",
    "example": "Variants Alignment",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Disabled",
    "component": "Tabs",
    "example": "Disabled",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::With Icons",
    "component": "Tabs",
    "example": "With Icons",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Icon Only",
    "component": "Tabs",
    "example": "Icon Only",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Multiple",
    "component": "Tabs",
    "example": "Multiple",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::With Content",
    "component": "Tabs",
    "example": "With Content",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Line With Content",
    "component": "Tabs",
    "example": "Line With Content",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Line Disabled",
    "component": "Tabs",
    "example": "Line Disabled",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::With Dropdown",
    "component": "Tabs",
    "example": "With Dropdown",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::Vertical",
    "component": "Tabs",
    "example": "Vertical",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "navigation#tabs::With Input and Button",
    "component": "Tabs",
    "example": "With Input and Button",
    "category": "Navigation",
    "href": "/playground/navigation#tabs"
  },
  {
    "key": "form#textarea::Basic",
    "component": "Textarea",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "form#textarea::Invalid",
    "component": "Textarea",
    "example": "Invalid",
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "form#textarea::With Label",
    "component": "Textarea",
    "example": "With Label",
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "form#textarea::With Description",
    "component": "Textarea",
    "example": "With Description",
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "form#textarea::Disabled",
    "component": "Textarea",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#textarea"
  },
  {
    "key": "feedback#toast::Basic",
    "component": "Toast",
    "example": "Basic",
    "category": "Feedback",
    "href": "/playground/feedback#toast"
  },
  {
    "key": "feedback#toast::With Action",
    "component": "Toast",
    "example": "With Action",
    "category": "Feedback",
    "href": "/playground/feedback#toast"
  },
  {
    "key": "feedback#toast::Promise",
    "component": "Toast",
    "example": "Promise",
    "category": "Feedback",
    "href": "/playground/feedback#toast"
  },
  {
    "key": "form#toggle::Basic",
    "component": "Toggle",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::Outline",
    "component": "Toggle",
    "example": "Outline",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::Sizes",
    "component": "Toggle",
    "example": "Sizes",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::With Button Text",
    "component": "Toggle",
    "example": "With Button Text",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::With Button Icon",
    "component": "Toggle",
    "example": "With Button Icon",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::With Button Icon + Text",
    "component": "Toggle",
    "example": "With Button Icon + Text",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::Disabled",
    "component": "Toggle",
    "example": "Disabled",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle::With Icon",
    "component": "Toggle",
    "example": "With Icon",
    "category": "Form",
    "href": "/playground/form#toggle"
  },
  {
    "key": "form#toggle-group::Basic",
    "component": "Toggle Group",
    "example": "Basic",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Outline",
    "component": "Toggle Group",
    "example": "Outline",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Outline With Icons",
    "component": "Toggle Group",
    "example": "Outline With Icons",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Sizes",
    "component": "Toggle Group",
    "example": "Sizes",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::With Spacing",
    "component": "Toggle Group",
    "example": "With Spacing",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::With Icons",
    "component": "Toggle Group",
    "example": "With Icons",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Filter",
    "component": "Toggle Group",
    "example": "Filter",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Date Range",
    "component": "Toggle Group",
    "example": "Date Range",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Sort",
    "component": "Toggle Group",
    "example": "Sort",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::With Input and Select",
    "component": "Toggle Group",
    "example": "With Input and Select",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Vertical",
    "component": "Toggle Group",
    "example": "Vertical",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Vertical Outline",
    "component": "Toggle Group",
    "example": "Vertical Outline",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Vertical Outline With Icons",
    "component": "Toggle Group",
    "example": "Vertical Outline With Icons",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Font Weight Selector",
    "component": "Toggle Group",
    "example": "Font Weight Selector",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "form#toggle-group::Vertical With Spacing",
    "component": "Toggle Group",
    "example": "Vertical With Spacing",
    "category": "Form",
    "href": "/playground/form#toggle-group"
  },
  {
    "key": "overlay#tooltip::Basic",
    "component": "Tooltip",
    "example": "Basic",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::Sides",
    "component": "Tooltip",
    "example": "Sides",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::With Icon",
    "component": "Tooltip",
    "example": "With Icon",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::Long Content",
    "component": "Tooltip",
    "example": "Long Content",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::Disabled",
    "component": "Tooltip",
    "example": "Disabled",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::With Keyboard Shortcut",
    "component": "Tooltip",
    "example": "With Keyboard Shortcut",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::On Link",
    "component": "Tooltip",
    "example": "On Link",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  },
  {
    "key": "overlay#tooltip::Formatted Content",
    "component": "Tooltip",
    "example": "Formatted Content",
    "category": "Overlay",
    "href": "/playground/overlay#tooltip"
  }
]
