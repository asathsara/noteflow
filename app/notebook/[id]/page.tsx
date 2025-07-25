"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { NoteEditor } from "@/components/note-editor"
import { useNotebooks } from "@/context/notebook-context"
import type { Notebook } from "@/types/notebook"

export default function NotebookPage() {
  const { id } = useParams()
  const { notebooks, refresh } = useNotebooks()
  const [notebook, setNotebook] = useState<Notebook | null>(null)

  useEffect(() => {

    if (notebooks.length === 0) {
      refresh()
      return
    }

    if (id === "new") {
      setNotebook(null)
    } else {
      const found = notebooks.find((notebook) => notebook.id == id) ?? null
      setNotebook(found)
    }
  }, [id, notebooks, refresh])

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {id === "new" ? "New Note" : "Edit Note"}
      </h1>
      <NoteEditor initialNotebook={notebook ?? undefined} />
    </main>
  )
}
