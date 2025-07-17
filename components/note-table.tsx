import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function NoteTable() {
  const notes = [
    { id: 1, title: "First Note", createdAt: "2025-07-16" },
    { id: 2, title: "Meeting Summary", createdAt: "2025-07-15" },
  ]

  if (notes.length === 0) {
    return <p className="text-center text-gray-500">No notes yet.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell>{note.title}</TableCell>
            <TableCell>{note.createdAt}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
