import CommandExample from "@/components/command-example";
import ContextMenuExample from "@/components/context-menu-example";
import DropdownMenuExample from "@/components/dropdown-menu-example";
import MenubarExample from "@/components/menubar-example";
import { Section } from "@/components/playground/section";

export default function MenuPage() {
  return (
    <>
      <Section id="dropdown-menu" title="Dropdown Menu">
        <DropdownMenuExample />
      </Section>
      <Section id="context-menu" title="Context Menu">
        <ContextMenuExample />
      </Section>
      <Section id="menubar" title="Menubar">
        <MenubarExample />
      </Section>
      <Section id="command" title="Command">
        <CommandExample />
      </Section>
    </>
  );
}
