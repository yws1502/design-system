import { cn } from "@/lib/utils"

export type ColorToken = {
  /** CSS 변수명. 표시 전용 */
  name: string
  /** 배경으로 칠할 Tailwind 유틸리티 */
  className: string
  /** 대응하는 전경색 유틸리티. 있으면 칩 안에 "Aa"를 그린다 */
  foregroundClassName?: string
  foregroundName?: string
}

export function TokenSwatch({
  name,
  className,
  foregroundClassName,
  foregroundName,
}: ColorToken) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div
        className={cn(
          "flex h-16 items-center justify-center rounded-lg border",
          className
        )}
      >
        {foregroundClassName ? (
          <span className={cn("text-sm font-medium", foregroundClassName)}>
            Aa
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col">
        <code className="truncate text-xs">{name}</code>
        {foregroundName ? (
          <code className="text-muted-foreground truncate text-xs">
            {foregroundName}
          </code>
        ) : null}
      </div>
    </div>
  )
}

export function TokenGrid({
  tokens,
  className,
}: {
  tokens: ColorToken[]
  /** 기본 2열. 이름이 짧은 그룹은 `sm:grid-cols-3`을 넘겨 밀도를 높인다 */
  className?: string
}) {
  return (
    <div className={cn("grid w-full grid-cols-2 gap-4", className)}>
      {tokens.map((token) => (
        <TokenSwatch key={token.name} {...token} />
      ))}
    </div>
  )
}
