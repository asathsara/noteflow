import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function NewNoteButton() {
  return (
    <Button variant="default" className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
      New Note
    </Button>
  )
}
