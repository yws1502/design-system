"use client";

import { toast as sonner } from "sonner";

import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

/**
 * 상태별 toast 케이스.
 *
 * 두 구현 모두 success / info / warning / error / loading 타입을 내장하고
 * 아이콘을 붙여준다. 공식 예제(`toast-example`, `sonner-example`)는 기본형만
 * 보여주므로 상태 케이스는 여기서 따로 전시한다.
 *
 * 색은 `--destructive` / `--success` / `--warning` 토큰을 쓰고, info와 loading은
 * 의도적으로 중립색을 유지한다 — 주의를 끌 이유가 없는 상태다.
 */
type StatusCase = {
  type: "success" | "info" | "warning" | "error";
  label: string;
  title: string;
  description: string;
};

const CASES: StatusCase[] = [
  {
    type: "success",
    label: "Success",
    title: "변경사항을 저장했습니다",
    description: "3개 항목이 업데이트되었습니다.",
  },
  {
    type: "info",
    label: "Info",
    title: "새 버전이 있습니다",
    description: "v2.1.0으로 업데이트할 수 있습니다.",
  },
  {
    type: "warning",
    label: "Warning",
    title: "저장 공간이 부족합니다",
    description: "남은 용량이 10% 미만입니다.",
  },
  {
    type: "error",
    label: "Error",
    title: "저장에 실패했습니다",
    description: "서버에 연결할 수 없습니다.",
  },
];

function BaseUiStatuses() {
  return (
    <Example title="Base UI Toast — 상태">
      <div className="flex w-full flex-wrap gap-2">
        {CASES.map((item) => (
          <Button
            key={item.type}
            variant="outline"
            onClick={() =>
              toast.add({
                type: item.type,
                title: item.title,
                description: item.description,
              })
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => {
            const id = toast.add({
              type: "loading",
              title: "업로드 중…",
              description: "파일을 전송하고 있습니다.",
            });
            window.setTimeout(() => {
              toast.close(id);
              toast.add({
                type: "success",
                title: "업로드 완료",
                description: "report.pdf · 2.4 MB",
              });
            }, 1800);
          }}
        >
          Loading → Success
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const id = toast.add({
              type: "error",
              title: "결제에 실패했습니다",
              description: "카드가 거절되었습니다.",
              actionProps: {
                children: "다시 시도",
                onClick() {
                  toast.close(id);
                  toast.add({
                    type: "success",
                    title: "결제가 완료되었습니다",
                    description: "영수증을 메일로 보냈습니다.",
                  });
                },
              },
            });
          }}
        >
          Error + 재시도
        </Button>
      </div>
    </Example>
  );
}

function SonnerStatuses() {
  return (
    <Example title="Sonner — 상태">
      <div className="flex w-full flex-wrap gap-2">
        {CASES.map((item) => (
          <Button
            key={item.type}
            variant="outline"
            onClick={() =>
              sonner[item.type](item.title, { description: item.description })
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            sonner.promise(
              new Promise((resolve) => window.setTimeout(resolve, 1800)),
              {
                loading: "업로드 중…",
                success: "업로드 완료",
                error: "업로드에 실패했습니다",
              }
            )
          }
        >
          Loading → Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            sonner.error("결제에 실패했습니다", {
              description: "카드가 거절되었습니다.",
              action: {
                label: "다시 시도",
                onClick: () => sonner.success("결제가 완료되었습니다"),
              },
            })
          }
        >
          Error + 재시도
        </Button>
      </div>
    </Example>
  );
}

export default function ToastStatusDemo() {
  return (
    <ExampleWrapper>
      <BaseUiStatuses />
      <SonnerStatuses />
    </ExampleWrapper>
  );
}
