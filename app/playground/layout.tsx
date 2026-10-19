import { version } from "@/package.json";
import { GallerySidebar } from "@/components/playground/gallery-sidebar";
import { ThemeToggle } from "@/components/playground/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PlaygroundLayout({ children }: LayoutProps<"/playground">) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <GallerySidebar version={version} />
        <SidebarInset>
          <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
          <main className="min-w-0 flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
