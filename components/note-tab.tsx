"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

import Tiptap from "./tip-tap"
import { AskAIDialog } from "./ask-ai-dialog"

interface NoteTabProps {
    note: string
    setNote: (value: string) => void
    onTriggerAI: () => void
}

export function NoteTab({ note, setNote, onTriggerAI }: NoteTabProps) {
    const handleAIResponse = (response: string) => {
        setNote(note + "\n\n" + response)
    }

    return (
        <>
            <Tiptap note={note} setNote={setNote} />
            <AskAIDialog onAnswer={handleAIResponse} />
        </>
    )
}
