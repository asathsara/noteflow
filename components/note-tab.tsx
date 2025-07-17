"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface NoteTabProps {
    note: string
    setNote: (value: string) => void
    onTriggerAI: () => void
}

export function NoteTab({ note, setNote, onTriggerAI }: NoteTabProps) {
    return (
        <>
            <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Start writing your note..."
                rows={10}
            />
            <Button className="mt-4" onClick={onTriggerAI}>
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI
            </Button>
        </>
    )
}
