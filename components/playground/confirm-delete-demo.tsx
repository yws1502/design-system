"use client";

import * as React from "react";

import { Example, ExampleWrapper } from "@/components/example";
import { ConfirmDeleteDialog } from "@/components/patterns/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { toast } from "@/components/ui/toast";

function TriggerBased() {
  return (
    <Example title="트리거로 열기">
      <ConfirmDeleteDialog
        confirmValue="design-system"
        title="저장소를 삭제할까요?"
        description="이 작업은 되돌릴 수 없습니다. 저장소와 모든 이슈, 커밋 기록이 영구히 삭제됩니다."
        trigger={<Button variant="destructive">저장소 삭제</Button>}
        onConfirm={() =>
          toast.add({
            type: "success",
            title: "저장소를 삭제했습니다",
            description: "design-system",
          })
        }
      />
      <p className="text-muted-foreground text-sm">
        입력값이 <span className="font-mono">design-system</span>과 정확히
        일치해야 삭제 버튼이 활성화됩니다.
      </p>
    </Example>
  );
}

const MEMBERS = [
  { id: "u_1", name: "김우상", email: "woosang@example.com" },
  { id: "u_2", name: "이서연", email: "seoyeon@example.com" },
];

function ControlledFromList() {
  const [target, setTarget] = React.useState<(typeof MEMBERS)[number] | null>(
    null
  );

  return (
    <Example title="목록에서 제어하기">
      <div className="flex w-full flex-col gap-2">
        {MEMBERS.map((member) => (
          <Item key={member.id} variant="outline">
            <ItemContent>
              <ItemTitle>{member.name}</ItemTitle>
              <ItemDescription>{member.email}</ItemDescription>
            </ItemContent>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTarget(member)}
            >
              삭제
            </Button>
          </Item>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={target !== null}
        onOpenChange={(next) => {
          if (!next) setTarget(null);
        }}
        confirmValue={target?.email ?? ""}
        title="멤버를 제거할까요?"
        description={
          <>
            {target?.name}님이 이 워크스페이스의 모든 리소스에 접근할 수 없게
            됩니다.
          </>
        }
        inputLabel={
          <>
            확인을 위해 <span className="font-mono">{target?.email}</span>{" "}
            을 입력하세요
          </>
        }
        confirmLabel="멤버 제거"
        onConfirm={() => {
          toast.add({
            type: "success",
            title: "멤버를 제거했습니다",
            description: target?.email,
          });
          setTarget(null);
        }}
      />

      <p className="text-muted-foreground text-sm">
        확인 문자열이 대상마다 다릅니다. 다이얼로그는 열림 상태를 밖에서 받습니다.
      </p>
    </Example>
  );
}

export default function ConfirmDeleteDemo() {
  return (
    <ExampleWrapper>
      <TriggerBased />
      <ControlledFromList />
    </ExampleWrapper>
  );
}
