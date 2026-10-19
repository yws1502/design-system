import { ArrowRightIcon } from "lucide-react";

import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";

/**
 * 공식 button-example 에 disabled 케이스가 없어 따로 전시한다.
 * 예제 원본은 upstream diff 로 갱신해야 하므로 손대지 않는다.
 */
const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "destructive-soft",
  "link",
] as const;

export default function ButtonDisabledDemo() {
  return (
    <ExampleWrapper className="lg:grid-cols-1 2xl:grid-cols-1">
      <Example title="Variants">
        <div className="flex flex-wrap items-center gap-2">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant[0].toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </Example>
      <Example title="With Icon">
        <div className="flex flex-wrap items-center gap-2">
          <Button disabled>
            Continue <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="outline" size="icon" disabled aria-label="다음">
            <ArrowRightIcon />
          </Button>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
