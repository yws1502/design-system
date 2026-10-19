"use client";

import * as React from "react";
import { TriangleAlertIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * 되돌릴 수 없는 삭제를 확인받는 다이얼로그.
 *
 * 사용자가 `confirmValue`를 정확히 입력해야 삭제 버튼이 활성화된다. 자동완성이나
 * 습관적인 클릭으로 지나칠 수 없게 만드는 게 목적이므로, 대소문자를 구분하고
 * 앞뒤 공백만 허용한다.
 *
 * shadcn 원본이 아니라 이 레포에서 조합한 패턴이다.
 */
export type ConfirmDeleteDialogProps = {
  /**
   * 사용자가 그대로 입력해야 하는 문자열.
   * 관례상 `"<대상 이름> 삭제"` 형태를 쓴다 — 이름만 요구하면 무심코 복사해
   * 붙여넣기 쉬운데, 동사가 붙으면 삭제라는 사실을 한 번 더 읽게 된다.
   */
  confirmValue: string;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /**
   * 트리거. 없으면 open/onOpenChange로 외부에서 제어한다.
   * Base UI의 `render`에 그대로 넘기므로 단일 엘리먼트여야 한다.
   */
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({
  confirmValue,
  title,
  description,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  trigger,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const inputId = React.useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const [value, setValue] = React.useState("");
  // Enter로 확정을 시도했는데 틀린 경우에만 true. 다시 입력하면 내린다.
  const [attempted, setAttempted] = React.useState(false);

  // `AlertDialogAction`은 Close가 아니라 순수 Button이라 스스로 닫히지 않는다
  // (비동기 삭제를 고려한 의도적 설계). 그래서 확인 후 닫는 책임이 여기에 있고,
  // trigger만 쓰는 비제어 사용에서도 내부 상태를 들고 있어야 한다.
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const matches = value.trim() === confirmValue;
  // 입력 중에는 오류를 띄우지 않는다. 한 글자씩 칠 때마다 "일치하지 않습니다"가
  // 나타났다 사라지면 다이얼로그 높이가 바뀌면서 삭제 버튼이 위아래로 움직이고,
  // 아직 다 치지도 않았는데 틀렸다고 말하게 된다. 입력 중에는 비활성 버튼과
  // placeholder로 충분하고, Enter로 확정하려 했는데 틀렸을 때만 알린다.
  const invalid = attempted && !matches;

  function setOpen(next: boolean) {
    if (!isControlled) {
      setInternalOpen(next);
    }
    // 닫힐 때 입력을 비운다. 다시 열었을 때 이전 입력이 남아 있으면
    // 확인 절차가 무의미해진다.
    if (!next) {
      setValue("");
      setAttempted(false);
    }
    onOpenChange?.(next);
  }

  function handleConfirm() {
    if (!matches) {
      setAttempted(true);
      return;
    }
    onConfirm();
    setOpen(false);
  }

  return (
    <AlertDialog open={actualOpen} onOpenChange={setOpen}>
      {trigger ? <AlertDialogTrigger render={trigger} /> : null}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <TriangleAlertIcon className="text-destructive size-5 shrink-0" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <Field data-invalid={invalid || undefined}>
          {/*
            안내 문장을 `<label>`로 만들지 않는다. label 안의 텍스트는 클릭이
            연결된 input으로 넘어가면서 선택이 취소돼 드래그도 복사도 되지 않는다.
            대신 문단에 id를 주고 `aria-labelledby`로 연결해 접근성 이름을 잇는다.
          */}
          <p id={hintId} className="text-destructive text-sm">
            되돌릴 수 없습니다. 확인하려면{" "}
            <strong className="font-semibold select-text">
              {confirmValue}
            </strong>
            를 입력하세요.
          </p>
          <Input
            id={inputId}
            value={value}
            // 입력할 값을 입력칸 안에도 보여 준다. 안내 문장까지 눈을 옮기지 않아도
            // 무엇을 쳐야 하는지 알 수 있다. 채워 주는 게 아니라서 확인 절차는 그대로다.
            placeholder={confirmValue}
            autoComplete="off"
            aria-labelledby={hintId}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            onChange={(event) => {
              setValue(event.target.value);
              setAttempted(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleConfirm();
              }
            }}
          />
          {invalid ? (
            <FieldDescription id={errorId} className="text-muted-foreground">
              입력한 값이 일치하지 않습니다.
            </FieldDescription>
          ) : null}
        </Field>

        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={!matches}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
