"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { NoteEditor } from "@/components/note-editor"
import { loadNotebooks, Notebook } from "@/lib/local-storage"

export default function NotebookPage() {
  const { id } = useParams()
  const [notebook, setNotebook] = useState<Notebook | null>(null)

  useEffect(() => {
    if (id === "new") {
      setNotebook(null) // new note, no data loaded
    } else {
      const notebooks = loadNotebooks()
      const found = notebooks.find((nb) => nb.id === id)
      setNotebook(found ?? null)
    }
  }, [id])

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {id === "new" ? "New Note" : "Edit Note"}
      </h1>
      <NoteEditor initialNotebook={notebook ?? undefined} />
    </main>
  )
}
