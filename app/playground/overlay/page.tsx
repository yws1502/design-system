import AlertDialogExample from "@/components/alert-dialog-example";
import DialogExample from "@/components/dialog-example";
import DrawerExample from "@/components/drawer-example";
import HoverCardExample from "@/components/hover-card-example";
import PopoverExample from "@/components/popover-example";
import SheetExample from "@/components/sheet-example";
import TooltipExample from "@/components/tooltip-example";
import ConfirmDeleteDemo from "@/components/playground/confirm-delete-demo";
import { Section } from "@/components/playground/section";

export default function OverlayPage() {
  return (
    <>
      <Section id="dialog" title="Dialog">
        <DialogExample />
      </Section>
      <Section id="alert-dialog" title="Alert Dialog">
        <AlertDialogExample />
      </Section>
      <Section
        id="confirm-delete"
        title="Confirm Delete"
        description="되돌릴 수 없는 삭제에 쓰는 패턴. 대상 이름을 정확히 입력해야 삭제 버튼이 열린다. shadcn 원본이 아니라 이 레포에서 조합한 것으로, components/patterns/에 있다."
      >
        <ConfirmDeleteDemo />
      </Section>
      <Section id="sheet" title="Sheet">
        <SheetExample />
      </Section>
      <Section id="drawer" title="Drawer">
        <DrawerExample />
      </Section>
      <Section id="popover" title="Popover">
        <PopoverExample />
      </Section>
      <Section id="tooltip" title="Tooltip">
        <TooltipExample />
      </Section>
      <Section id="hover-card" title="Hover Card">
        <HoverCardExample />
      </Section>
    </>
  );
}
