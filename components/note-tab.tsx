"use client"


import Tiptap from "./tip-tap"
import { AskAIDialog } from "./ask-ai-dialog"
import { Button } from "./ui/button"

interface NoteTabProps {
    note: string
    setNote: (value: string) => void
    onTriggerAI: () => void
}

export function NoteTab({ note, setNote }: NoteTabProps) {
    const handleAIResponse = (response: string) => {
        const newHtml = `${note}<p>${response}</p>`
        setNote(newHtml)
    }

    return (
        <>
            <Tiptap note={note} setNote={setNote} />
            <AskAIDialog onAnswer={handleAIResponse} />
            
        </>
    )
}
