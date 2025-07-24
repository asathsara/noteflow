"use client"

import { AskAIDialog } from "./ask-ai-dialog"
import { convertMarkdownToHTML } from "@/lib/utils"
import RichTextEditor from "./rich-text-editor"


interface NoteTabProps {
  note: string
  setNote: (value: string) => void

}


export function NoteTab({ note, setNote }: NoteTabProps) {
  const handleAIResponse = async (response: string) => {
    const html = await convertMarkdownToHTML(response)
    
    setNote(`${note}<hr />${html}`);
  }

  return (
    <>
      <RichTextEditor note={note} setNote={setNote} />
      <AskAIDialog onAnswer={handleAIResponse} />

    </>
  )
}
