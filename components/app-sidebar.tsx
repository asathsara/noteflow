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
import { PenTool, Settings, Trash, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { title: "Settings", icon: Settings, action: "settings" },
  { title: "Guest", icon: User, action: "user" },
]

import { DeleteAlertDialog } from "./delete-dialog"
import { Button } from "./ui/button"
import { useNotebooks } from "@/context/notes-context"

export function AppSidebar() {
  const handleClick = (action: string) => {
    switch (action) {
      case "settings":
        console.log("Settings clicked")
        break
      case "user":
        console.log("User clicked")
        break
      default:
        console.warn("Unknown action:", action)
    }
  }

  const { deleteAll } = useNotebooks()

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
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <DeleteAlertDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive w-full justify-start hover:bg-destructive/10"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                  }
                  title="Delete All Notes"
                  description="Are you sure you want to delete all notebooks? This action cannot be undone."
                  onConfirm={deleteAll}
                />
              </SidebarMenuItem>
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