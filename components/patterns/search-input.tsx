"use client";

import * as React from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * 검색 입력. 왼쪽에 돋보기, 값이 있을 때만 오른쪽에 지우기 아이콘 버튼이 붙고,
 * Esc로도 지운다.
 *
 * `type="search"`의 브라우저 기본 지우기 버튼은 엔진마다 모양이 다르고
 * Firefox에는 아예 없어서 숨기고 직접 그린다.
 *
 * 나머지 props는 감싸는 div가 아니라 안쪽 `<input>`에 그대로 붙는다. 그래서
 * Base UI 입력 프리미티브의 `render`에 넘길 수 있다.
 *
 * ```tsx
 * <ComboboxPrimitive.Input render={<SearchInput onValueChange={setQuery} />} />
 * ```
 */
export type SearchInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  /** 입력할 때와 지울 때 모두 불린다. 제어 컴포넌트로 쓰려면 이걸로 값을 갱신한다. */
  onValueChange?: (value: string) => void;
  /** 바깥 `InputGroup`에 붙는다. `className`은 안쪽 `<input>`에 붙는다. */
  containerClassName?: string;
  clearLabel?: string;
};

export function SearchInput({
  value,
  defaultValue = "",
  onValueChange,
  onChange,
  onKeyDown,
  disabled,
  ref,
  className,
  containerClassName,
  clearLabel = "검색어 지우기",
  ...props
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  function clear() {
    if (!isControlled && inputRef.current) {
      inputRef.current.value = "";
      setUncontrolled("");
    }
    onValueChange?.("");
    inputRef.current?.focus();
  }

  return (
    <InputGroup
      data-disabled={disabled || undefined}
      className={containerClassName}
    >
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type="search"
        // 제어일 때만 value를 건다. 비제어에서 value를 걸면 입력이 막힌다.
        {...(isControlled ? { value } : { defaultValue })}
        disabled={disabled}
        className={cn("[&::-webkit-search-cancel-button]:hidden", className)}
        onChange={(event) => {
          onChange?.(event);
          if (!isControlled) setUncontrolled(event.target.value);
          onValueChange?.(event.target.value);
        }}
        onKeyDown={(event) => {
          // 한글 조합 중의 Esc는 IME 몫이다. 지우지 않을 뿐 아니라 preventDefault도
          // 해야 한다 — type="search"는 Esc로 값을 비우는 브라우저 기본 동작이 있어서,
          // 그대로 두면 확정된 글자("한")만 지워지고 조합 중인 글자("그")가 남는다.
          // 바깥 핸들러(Base UI Combobox 등)도 조합 중 Esc를 지우기로 처리하므로 넘기지 않는다.
          // Safari는 조합 중 keydown에 isComposing 대신 keyCode 229만 준다.
          if (event.nativeEvent.isComposing || event.keyCode === 229) {
            if (event.key === "Escape") {
              event.preventDefault();
              return;
            }
            onKeyDown?.(event);
            return;
          }
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          // 값이 있을 때만 가로챈다. 빈 상태의 Esc는 다이얼로그 닫기 등
          // 바깥 동작에 그대로 넘겨야 한다.
          if (event.key === "Escape" && current) {
            event.preventDefault();
            event.stopPropagation();
            clear();
          }
        }}
      />
      {current && !disabled ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={clearLabel}
            onClick={clear}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
