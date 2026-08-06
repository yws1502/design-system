"use client";

import * as React from "react";
import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
  /** 사용자가 그대로 입력해야 하는 문자열. 보통 삭제 대상의 이름 */
  confirmValue: string;
  title: string;
  description: React.ReactNode;
  /** 입력란 위 라벨. 기본값은 confirmValue를 안내하는 문장 */
  inputLabel?: React.ReactNode;
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
  inputLabel,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  trigger,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const inputId = React.useId();
  const [value, setValue] = React.useState("");

  // `AlertDialogAction`은 Close가 아니라 순수 Button이라 스스로 닫히지 않는다
  // (비동기 삭제를 고려한 의도적 설계). 그래서 확인 후 닫는 책임이 여기에 있고,
  // trigger만 쓰는 비제어 사용에서도 내부 상태를 들고 있어야 한다.
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const matches = value.trim() === confirmValue;
  // 아직 아무것도 안 친 상태를 오류로 표시하지 않는다. 틀린 값을 친 경우에만 알린다.
  const invalid = value.length > 0 && !matches;

  function setOpen(next: boolean) {
    if (!isControlled) {
      setInternalOpen(next);
    }
    // 닫힐 때 입력을 비운다. 다시 열었을 때 이전 입력이 남아 있으면
    // 확인 절차가 무의미해진다.
    if (!next) {
      setValue("");
    }
    onOpenChange?.(next);
  }

  function handleConfirm() {
    if (!matches) return;
    onConfirm();
    setOpen(false);
  }

  return (
    <AlertDialog open={actualOpen} onOpenChange={setOpen}>
      {trigger ? <AlertDialogTrigger render={trigger} /> : null}

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <Field data-invalid={invalid || undefined}>
          <FieldLabel htmlFor={inputId}>
            {inputLabel ?? (
              <>
                계속하려면 <span className="font-mono">{confirmValue}</span>
                {" "}을 그대로 입력하세요
              </>
            )}
          </FieldLabel>
          <Input
            id={inputId}
            value={value}
            autoComplete="off"
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? `${inputId}-error` : undefined}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleConfirm();
              }
            }}
          />
          {invalid ? (
            <FieldDescription id={`${inputId}-error`} className="text-destructive">
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
