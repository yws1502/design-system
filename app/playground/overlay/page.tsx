import AlertDialogExample from "@/components/alert-dialog-example";
import DialogExample from "@/components/dialog-example";
import DrawerExample from "@/components/drawer-example";
import HoverCardExample from "@/components/hover-card-example";
import PopoverExample from "@/components/popover-example";
import SheetExample from "@/components/sheet-example";
import TooltipExample from "@/components/tooltip-example";
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
