"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { PenTool, Settings, Trash2, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { title: "Settings", icon: Settings, action: "settings" },
  { title: "Delete All", icon: Trash2, action: "delete", className: "text-destructive" },
  { title: "User", icon: User, action: "user" },
]

export function AppSidebar() {
  const handleClick = (action: string) => {
    switch (action) {
      case "settings":
        console.log("Settings clicked")
        break
      case "delete":
        console.log("Delete clicked")
        break
      case "user":
        console.log("User clicked")
        break
      default:
        console.warn("Unknown action:", action)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center py-8">
        <span className="bg-black rounded-full p-3 mb-3 shadow-lg">
          <PenTool className="w-8 h-8 text-white" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">NoteFlow</h1>
        <p className="text-sm mt-1 text-center">Where ideas and AI flow together.</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleClick(item.action)}
                    className={`flex items-center cursor-pointer gap-2 ${item.className ?? ""}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <ThemeToggle />
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-col items-center gap-2 pb-4">
        <p className="text-xs text-muted-foreground text-center w-full">© 2025 NoteFlow</p>
      </SidebarFooter>
    </Sidebar>
  )
}
