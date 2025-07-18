"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

import Tiptap from "./tip-tap"

interface NoteTabProps {
    note: string
    setNote: (value: string) => void
    onTriggerAI: () => void
}

export function NoteTab({ note, setNote, onTriggerAI }: NoteTabProps) {

    return (
        <>

            <Tiptap note={note} setNote={setNote} />
            <Button className="mt-4" onClick={onTriggerAI}>
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI
            </Button>
        </>
    )
}
