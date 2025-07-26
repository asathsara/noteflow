"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { NoteTab } from "./note-tab"
import { QuestionTab } from "./question-tab"
import { Notebook } from "@/types/notebook"
import { useNotebooks } from "@/context/notebook-context"
import { useDebouncedEffect } from "@/hooks/use-debounce"
import { isEditorContentEmpty } from "@/lib/utils"
  import { useRef } from "react";



type Props = {
  initialNotebook?: Notebook
}

export function NoteEditor({ initialNotebook }: Props) {
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [questionBlocks, setQuestionBlocks] = useState([{ question: "", answer: "" }]
  )
  const [notebookId, setNotebookId] = useState(initialNotebook?.id || null)

  const { addNotebook, updateNotebook } = useNotebooks()
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (!initialNotebook) return
    setTitle(initialNotebook.title || "")
    setNote(initialNotebook.note || "")
    setQuestionBlocks(initialNotebook.questionBlocks || [{ question: "", answer: "" }])
    setNotebookId(initialNotebook.id || null)
  }, [initialNotebook])



useDebouncedEffect(() => {
  const isNoteEmpty = isEditorContentEmpty(note);
  const isQuestionBlocksEmpty =
    (questionBlocks.length === 1 &&
      !questionBlocks[0].question.trim() &&
      !questionBlocks[0].answer.trim()) ||
    questionBlocks.length === 0;

  if (!title.trim() && isNoteEmpty && isQuestionBlocksEmpty) return;

  if (isSavingRef.current) return; // prevent double trigger

  isSavingRef.current = true;

  (async () => {
    if (notebookId) {
      await updateNotebook({
        id: notebookId,
        title,
        note,
        questionBlocks,
        updatedAt: "",
      });
    } else {
      const saved = await addNotebook({ title, note, questionBlocks });
      setNotebookId(saved.id);
    }

    isSavingRef.current = false;
  })();
}, [title, note, questionBlocks, notebookId], 500);



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
          <QuestionTab
            questionBlocks={questionBlocks}
            setQuestionBlocks={setQuestionBlocks}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
