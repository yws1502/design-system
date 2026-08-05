"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { categories } from "@/components/playground/categories"
import { SidebarUser } from "@/components/playground/sidebar-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function GallerySidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-8 items-center px-2 text-sm font-semibold group-data-[collapsible=icon]:hidden">
          Design System
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const href = `/playground/${category.slug}`
                const isActive = pathname === href

                return (
                  <SidebarMenuItem key={category.slug}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={category.title}
                      render={<Link href={href} />}
                    >
                      <category.icon />
                      <span>{category.title}</span>
                    </SidebarMenuButton>

                    {isActive && category.items.length > 0 ? (
                      <SidebarMenuSub>
                        {category.items.map((item) => (
                          <SidebarMenuSubItem key={item.name}>
                            <SidebarMenuSubButton
                              render={<Link href={`${href}#${item.name}`} />}
                            >
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
