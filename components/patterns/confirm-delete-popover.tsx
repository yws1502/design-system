"use client";

import * as React from "react";
import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * 삭제 버튼 자리에서 바로 확인받는 가벼운 팝오버.
 *
 * 되돌릴 수 있거나 영향 범위가 작은 삭제에 쓴다. 중앙 모달은 마우스를 화면
 * 한가운데까지 옮기게 만들고 배경까지 가리는데, 목록에서 항목 하나 지우는 데
 * 그만한 무게는 필요 없다.
 *
 * 되돌릴 수 없는 삭제라면 `ConfirmDeleteDialog`를 쓴다. 그쪽은 확인 문자열을
 * 직접 입력하게 해서 무심코 지나칠 수 없게 만든다.
 */
export type ConfirmDeletePopoverProps = {
  title?: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /**
   * 트리거. Base UI의 `render`에 그대로 넘기므로 단일 엘리먼트여야 한다.
   * 팝오버가 이 요소에 붙으므로 보통 그 자리의 삭제 버튼을 넘긴다.
   */
  trigger: React.ReactElement;
  side?: React.ComponentProps<typeof PopoverContent>["side"];
  align?: React.ComponentProps<typeof PopoverContent>["align"];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
};

export function ConfirmDeletePopover({
  title = "삭제할까요?",
  description,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  trigger,
  side = "top",
  align = "end",
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDeletePopoverProps) {
  // Popover에는 Close 프리미티브가 없다. 확인·취소 후 닫으려면 열림 상태를
  // 여기서 들고 있어야 한다. ConfirmDeleteDialog와 같은 이유다.
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  function setOpen(next: boolean) {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  }

  return (
    <Popover open={actualOpen} onOpenChange={setOpen}>
      <PopoverTrigger render={trigger} />
      <PopoverContent side={side} align={align} className="w-64">
        <PopoverHeader>
          <PopoverTitle className="flex items-center gap-2">
            <TriangleAlertIcon className="text-destructive size-4 shrink-0" />
            {title}
          </PopoverTitle>
          {description ? (
            <PopoverDescription>{description}</PopoverDescription>
          ) : null}
        </PopoverHeader>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
