import { Example, ExampleWrapper } from "@/components/example";
import {
  TokenGrid,
  type ColorToken,
} from "@/components/playground/token-swatch";

const SURFACE_TOKENS: ColorToken[] = [
  {
    name: "--background",
    className: "bg-background",
    foregroundClassName: "text-foreground",
    foregroundName: "--foreground",
  },
  {
    name: "--card",
    className: "bg-card",
    foregroundClassName: "text-card-foreground",
    foregroundName: "--card-foreground",
  },
  {
    name: "--popover",
    className: "bg-popover",
    foregroundClassName: "text-popover-foreground",
    foregroundName: "--popover-foreground",
  },
];

const ACCENT_TOKENS: ColorToken[] = [
  {
    name: "--primary",
    className: "bg-primary",
    foregroundClassName: "text-primary-foreground",
    foregroundName: "--primary-foreground",
  },
  {
    name: "--secondary",
    className: "bg-secondary",
    foregroundClassName: "text-secondary-foreground",
    foregroundName: "--secondary-foreground",
  },
  {
    name: "--muted",
    className: "bg-muted",
    foregroundClassName: "text-muted-foreground",
    foregroundName: "--muted-foreground",
  },
  {
    name: "--accent",
    className: "bg-accent",
    foregroundClassName: "text-accent-foreground",
    foregroundName: "--accent-foreground",
  },
  {
    name: "--destructive",
    className: "bg-destructive",
    foregroundClassName: "text-white",
    foregroundName: "(text-white)",
  },
];

const BORDER_TOKENS: ColorToken[] = [
  { name: "--border", className: "bg-border" },
  { name: "--input", className: "bg-input" },
  { name: "--ring", className: "bg-ring" },
];

const CHART_TOKENS: ColorToken[] = [
  { name: "--chart-1", className: "bg-chart-1" },
  { name: "--chart-2", className: "bg-chart-2" },
  { name: "--chart-3", className: "bg-chart-3" },
  { name: "--chart-4", className: "bg-chart-4" },
  { name: "--chart-5", className: "bg-chart-5" },
];

const SIDEBAR_TOKENS: ColorToken[] = [
  {
    name: "--sidebar",
    className: "bg-sidebar",
    foregroundClassName: "text-sidebar-foreground",
    foregroundName: "--sidebar-foreground",
  },
  {
    name: "--sidebar-primary",
    className: "bg-sidebar-primary",
    foregroundClassName: "text-sidebar-primary-foreground",
    foregroundName: "--sidebar-primary-foreground",
  },
  {
    name: "--sidebar-accent",
    className: "bg-sidebar-accent",
    foregroundClassName: "text-sidebar-accent-foreground",
    foregroundName: "--sidebar-accent-foreground",
  },
  { name: "--sidebar-border", className: "bg-sidebar-border" },
  { name: "--sidebar-ring", className: "bg-sidebar-ring" },
];

const RADII = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
];

export default function TokensPage() {
  return (
    <>
      <ExampleWrapper id="colors" className="scroll-mt-14">
        <Example title="Surfaces">
          <TokenGrid tokens={SURFACE_TOKENS} />
        </Example>

        <Example title="Accents">
          <TokenGrid tokens={ACCENT_TOKENS} />
        </Example>

        <Example title="Borders & Rings">
          <TokenGrid tokens={BORDER_TOKENS} className="sm:grid-cols-3" />
        </Example>

        <Example title="Charts">
          <TokenGrid tokens={CHART_TOKENS} className="sm:grid-cols-3" />
        </Example>

        <Example title="Sidebar">
          <TokenGrid tokens={SIDEBAR_TOKENS} />
        </Example>

        <Example title="Radius">
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {RADII.map((radius) => (
              <div key={radius.name} className="flex min-w-0 flex-col gap-2">
                <div
                  className={`bg-secondary h-16 border ${radius.className}`}
                />
                <code className="truncate text-xs">{radius.name}</code>
              </div>
            ))}
          </div>
        </Example>
      </ExampleWrapper>

      <ExampleWrapper
        id="typography"
        className="scroll-mt-14 lg:grid-cols-1 2xl:grid-cols-1"
      >
        <Example title="Headings">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Heading 1
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Heading 2
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Heading 3
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Heading 4
          </h4>
        </Example>

        <Example title="Body">
          <p className="leading-7">
            본문 텍스트입니다. The quick brown fox jumps over the lazy dog.
            0123456789
          </p>
          <p className="text-muted-foreground text-sm">
            보조 텍스트입니다. muted-foreground 색을 씁니다.
          </p>
          <blockquote className="border-l-2 pl-6 italic">
            인용문입니다. 좌측 보더는 --border 토큰을 씁니다.
          </blockquote>
          <ul className="ml-6 list-disc">
            <li>목록 항목 하나</li>
            <li>목록 항목 둘</li>
          </ul>
        </Example>

        <Example title="Inline">
          <p className="leading-7">
            문장 안의{" "}
            <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              inline code
            </code>
            와{" "}
            <a href="#colors" className="font-medium underline underline-offset-4">
              링크
            </a>
            , 그리고 <strong>강조</strong>와 <em>기울임</em>입니다.
          </p>
          <p className="font-mono text-sm">
            Mono: The quick brown fox — 0123456789
          </p>
        </Example>

        <Example title="Font Scale">
          <div className="flex w-full flex-col gap-2">
            {["text-xs", "text-sm", "text-base", "text-lg", "text-xl"].map(
              (size) => (
                <div key={size} className="flex items-baseline gap-4">
                  <code className="text-muted-foreground w-20 shrink-0 text-xs">
                    {size}
                  </code>
                  <span className={size}>Almost before we knew it</span>
                </div>
              )
            )}
          </div>
        </Example>
      </ExampleWrapper>
    </>
  );
}
