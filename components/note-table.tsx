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
import { Edit, Trash } from "lucide-react"
import { loadNotebooks, Notebook, saveNotebooks } from "@/lib/local-storage"
import Link from "next/link"
import { DeleteAlertDialog } from "./delete-dialog"

export function NoteTable() {
  const [notes, setNotes] = useState<Notebook[]>([])

  useEffect(() => {
    const storedNotes = loadNotebooks()
    setNotes(storedNotes)
  }, [])

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    saveNotebooks(updatedNotes)
  }

  if (notes.length === 0) {
    return <p className="text-center text-gray-500">No notes yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-left">Title</TableHead>
            <TableHead className="w-1/4 text-left">Created At</TableHead>
            <TableHead className="w-1/4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell className="align-middle">{note.title}</TableCell>
              <TableCell className="align-middle text-gray-500">
                {note.createdAt}
              </TableCell>
              <TableCell className="align-middle">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/notebook/${note.id}`}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                  </Button>
                  <DeleteAlertDialog
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <Trash className="w-4 h-4" />
                          <span>Delete</span>
                        </div>
                      </Button>
                    }
                    title="Delete Note"
                    description="Are you sure you want to delete this note? This action cannot be undone."
                    onConfirm={() => handleDelete(note.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
