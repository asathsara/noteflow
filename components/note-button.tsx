import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function NoteButton() {
  return (
    <Link href="/notebook/new">
      <Button variant="default" className="flex items-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4" />
        New Note
      </Button>
    </Link>
  )
}
