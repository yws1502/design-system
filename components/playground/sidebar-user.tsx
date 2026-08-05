"use client";

import { ChevronsUpDownIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * 사이드바 푸터의 프로젝트 블록.
 *
 * 공식 sidebar 예제의 SidebarFooter 패턴(Avatar + 라벨 + ChevronsUpDown →
 * DropdownMenu)을 그대로 따른다. 아이콘 모드로 접히면 SidebarMenuButton이
 * size-8로 줄고 overflow-hidden이라 아바타만 남는다.
 */
const PROJECT = {
  name: "Design System",
  detail: "base-vega · Base UI",
  initials: "DS",
};

const LINKS = [
  { label: "shadcn/ui 문서", href: "https://ui.shadcn.com/docs" },
  { label: "Base UI 문서", href: "https://base-ui.com" },
];

export function SidebarUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="rounded-lg">
              <AvatarFallback className="rounded-lg">
                {PROJECT.initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{PROJECT.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {PROJECT.detail}
              </span>
            </div>
            <ChevronsUpDownIcon />
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <Item size="xs">
                  <ItemMedia>
                    <Avatar className="rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {PROJECT.initials}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{PROJECT.name}</ItemTitle>
                    <ItemDescription>{PROJECT.detail}</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  render={
                    <a href={link.href} target="_blank" rel="noreferrer" />
                  }
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
