"use client";

import * as React from "react";

import { Example, ExampleWrapper } from "@/components/example";
import { ConfirmDeleteDialog } from "@/components/patterns/confirm-delete-dialog";
import { ConfirmDeletePopover } from "@/components/patterns/confirm-delete-popover";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { toast } from "@/components/ui/toast";

function TriggerBased() {
  return (
    <Example title="트리거로 열기">
      <ConfirmDeleteDialog
        confirmValue="design-system 삭제"
        title="저장소를 삭제할까요?"
        description="저장소와 모든 이슈, 커밋 기록, 릴리스가 영구히 삭제됩니다."
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
        확인 문자열은 대상 이름에 &quot;삭제&quot;를 붙인 형태다. 이름만
        요구하면 무심코 복사해 붙여넣기 쉬운데, 동사가 붙으면 무엇을 하는지 한 번
        더 읽게 된다.
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
        confirmValue={target ? `${target.name} 삭제` : ""}
        title="멤버를 제거할까요?"
        description={
          <>
            {target?.name}님의 접근 권한과 활동 기록이 모두 사라집니다.
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
        확인 문자열이 행마다 달라진다. 다이얼로그는 열림 상태를 밖에서 받는다.
      </p>
    </Example>
  );
}

const FILES = [
  { id: "f_1", name: "report-2026-q1.pdf", meta: "PDF · 2.4 MB" },
  { id: "f_2", name: "logo-mark.svg", meta: "SVG · 12 KB" },
  { id: "f_3", name: "meeting-notes.md", meta: "Markdown · 4 KB" },
];

function LightweightPopover() {
  const [files, setFiles] = React.useState(FILES);

  return (
    <Example title="가벼운 삭제 — Popover">
      <div className="flex w-full flex-col gap-2">
        {files.map((file) => (
          <Item key={file.id} variant="outline">
            <ItemContent>
              <ItemTitle>{file.name}</ItemTitle>
              <ItemDescription>{file.meta}</ItemDescription>
            </ItemContent>
            <ConfirmDeletePopover
              description={`${file.name}을 목록에서 제거합니다.`}
              trigger={
                <Button variant="ghost" size="sm">
                  삭제
                </Button>
              }
              onConfirm={() => {
                setFiles((prev) => prev.filter((f) => f.id !== file.id));
                toast.add({
                  type: "success",
                  title: "파일을 삭제했습니다",
                  description: file.name,
                });
              }}
            />
          </Item>
        ))}
        {files.length === 0 ? (
          <div className="flex items-center justify-between gap-2">
            <p className="text-muted-foreground text-sm">파일이 없습니다.</p>
            <Button variant="outline" size="sm" onClick={() => setFiles(FILES)}>
              되돌리기
            </Button>
          </div>
        ) : null}
      </div>
      <p className="text-muted-foreground text-sm">
        확인이 버튼 자리에서 뜨므로 마우스가 화면 중앙까지 이동하지 않는다.
        되돌릴 수 있거나 영향 범위가 작은 삭제에 쓴다.
      </p>
    </Example>
  );
}

export default function ConfirmDeleteDemo() {
  return (
    <ExampleWrapper>
      <TriggerBased />
      <ControlledFromList />
      <LightweightPopover />
    </ExampleWrapper>
  );
}
