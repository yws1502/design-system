import { Trash2Icon } from "lucide-react";

import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

/**
 * destructive 두 단계. 최종 확인은 `destructive`(Solid), 목록·인라인처럼
 * 반복되거나 확인 단계로 들어가는 진입점은 `destructive-soft`.
 */
export default function ButtonDestructiveDemo() {
  return (
    <ExampleWrapper>
      <Example title="destructive — 최종 확인">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="destructive">삭제</Button>
          <Button variant="destructive">
            <Trash2Icon data-icon="inline-start" />
            삭제
          </Button>
          <Button variant="destructive" size="icon" aria-label="삭제">
            <Trash2Icon />
          </Button>
          <Button variant="destructive" disabled>
            삭제
          </Button>
        </div>
        <div className="flex w-full justify-end gap-2 border-t pt-4">
          <Button variant="ghost">취소</Button>
          <Button variant="destructive">저장소 삭제</Button>
        </div>
      </Example>
      <Example title="destructive-soft — 목록 · 진입점">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="destructive-soft">삭제</Button>
          <Button variant="destructive-soft">
            <Trash2Icon data-icon="inline-start" />
            삭제
          </Button>
          <Button variant="destructive-soft" size="icon" aria-label="삭제">
            <Trash2Icon />
          </Button>
          <Button variant="destructive-soft" disabled>
            삭제
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {["김하늘", "이도윤"].map((name) => (
            <Item key={name} variant="outline" size="sm">
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>Member</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="destructive-soft" size="sm">
                  제거
                </Button>
              </ItemActions>
            </Item>
          ))}
        </div>
      </Example>
    </ExampleWrapper>
  );
}
