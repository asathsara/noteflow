// components/AskAIDialog.tsx
"use client"

import { useState } from "react"
import { buildGeminiPrompt, parseGeminiResponse } from "@/lib/utils"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

interface AskAIDialogProps {
    onBlocksGenerated: (blocks: { question: string; answer: string }[]) => void
}

export function AskAIQuestionDialog({ onBlocksGenerated }: AskAIDialogProps) {
    const [open, setOpen] = useState(false)
    const [topic, setTopic] = useState("")
    const [count, setCount] = useState("5")
    const [type, setType] = useState("qna") // "qna" or "q"
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const prompt = buildGeminiPrompt(topic, parseInt(count), type)
            console.log(prompt);
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: prompt }),

            })



            const data = await response.json()
            const blocks = parseGeminiResponse(data.answer, type)
            onBlocksGenerated(blocks)
            setOpen(false)
            setTopic("")
            setCount("5")
            setType("qna")
        } catch (error) {
            console.error("Error fetching AI response:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Sparkles className="mr-2 h-4 w-4" /> Ask AI
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Questions with Gemini</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <div>
                        <Label>Topic</Label>
                        <Input
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. React, JavaScript"
                        />
                    </div>

                    <div>
                        <Label>Number of Questions</Label>
                        <Input
                            type="number"
                            min={1}
                            max={50}
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="qna">Questions & Answers</SelectItem>
                                <SelectItem value="q">Questions Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !topic || !count}
                    >
                        {loading ? "Generating..." : "Generate"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}



