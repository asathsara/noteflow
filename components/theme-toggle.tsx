import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"


export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const[mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const isDark = theme === "dark"

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="flex items-center gap-2 cursor-pointer">
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span>Theme</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-36">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}