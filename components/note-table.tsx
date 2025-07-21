"use client"

import { useEffect, useState } from "react"
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
import { loadNotebooks, Notebook } from "@/lib/local-storage"
import Link from "next/link"

export function NoteTable() {
  const [notes, setNotes] = useState<Notebook[]>([])

  useEffect(() => {
    const storedNotes = loadNotebooks()
    setNotes(storedNotes)
  }, [])

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
            <TableCell>{new Date(note.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <Link href={`/notebook/${note.id}`}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
