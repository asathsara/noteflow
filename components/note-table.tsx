"use client"

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
import Link from "next/link"
import { DeleteAlertDialog } from "./delete-dialog"
import { useNotebooks } from "@/context/notebook-context"
import { NoNotebooks } from "./no-notebooks"
import { LoadingTable } from "./loading-table"

export function NoteTable() {
  const { notebooks, deleteById, loading } = useNotebooks()

  if (loading) {
    return <LoadingTable />
  }

  if (notebooks.length === 0) {
    return <NoNotebooks />
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
          {notebooks.map((note) => (
            <TableRow key={note.id}>
              <TableCell className="align-middle">{note.title}</TableCell>
              <TableCell className="align-middle">
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleDateString("en-GB")
                  : "N/A"}
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
                        className="text-destructive"
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </Button>
                    }
                    title="Delete Note"
                    description="Are you sure you want to delete this note? This action cannot be undone."
                    onConfirm={() => deleteById(note.id.toString())}
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
