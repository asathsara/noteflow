"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NoteTab } from "./note-tab"
import { QuestionTab } from "./question-tab"
import { Notebook } from "@/lib/local-storage"
import { useNotebooks } from "@/context/notes-context"

type Props = {
  initialNotebook?: Notebook
}

export function NoteEditor({ initialNotebook }: Props) {
  const [title, setTitle] = useState(initialNotebook?.title || "")
  const [note, setNote] = useState(initialNotebook?.note || "")
  const [questionBlocks, setQuestionBlocks] = useState(
    initialNotebook?.questionBlocks || [{ question: "", answer: "" }]
  )
  const [notebookId, setNotebookId] = useState(initialNotebook?.id || null)

  const { addNotebook, updateNotebook } = useNotebooks()

  useEffect(() => {
    if (!initialNotebook) return
    setTitle(initialNotebook.title || "")
    setNote(initialNotebook.note || "")
    setQuestionBlocks(initialNotebook.questionBlocks || [{ question: "", answer: "" }])
    setNotebookId(initialNotebook.id || null)
  }, [initialNotebook])

  useEffect(() => {
    if (
      !title.trim() &&
      !note.trim() &&
      questionBlocks.length === 1 &&
      !questionBlocks[0].question
    )
      return

    const timeout = setTimeout(() => {
      if (notebookId) {
        updateNotebook({
          id: notebookId,
          title,
          note,
          questionBlocks,
          updatedAt: "",
        })
      } else {
        const saved = addNotebook({ title, note, questionBlocks })
        setNotebookId(saved.id)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [title, note, questionBlocks, notebookId, addNotebook, updateNotebook])

  return (
    <div className="space-y-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className="text-xl font-semibold"
      />

      <Tabs defaultValue="write" className="w-full">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="question">Question</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <NoteTab note={note} setNote={setNote} />
        </TabsContent>

        <TabsContent value="question">
          <QuestionTab questionBlocks={questionBlocks} setQuestionBlocks={setQuestionBlocks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
