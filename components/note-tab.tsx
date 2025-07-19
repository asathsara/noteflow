"use client"

import Tiptap from "./tip-tap"
import { AskAIDialog } from "./ask-ai-dialog"
import { convertMarkdownToHTML } from "@/lib/utils"

interface NoteTabProps {
    note: string
    setNote: (value: string) => void
    onTriggerAI: () => void

}

export function NoteTab({ note, setNote }: NoteTabProps) {
    const  handleAIResponse = async (response: string) => {
        const html =  await convertMarkdownToHTML(response)
        setNote(`${note}<hr />${html}`)
    }

    return (
        <>
            <Tiptap note={note} setNote={setNote} />
            <AskAIDialog onAnswer={handleAIResponse} />

        </>
    )
}
