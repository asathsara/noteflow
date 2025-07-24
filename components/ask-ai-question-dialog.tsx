"use client"

import { useState } from "react"
import { buildGeminiPrompt, parseGeminiResponse } from "@/lib/gemini/gemini"
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

interface AskAIQuestionDialogProps {
    onBlocksGenerated: (blocks: { question: string; answer: string }[]) => void
}

export function AskAIQuestionDialog({ onBlocksGenerated }: AskAIQuestionDialogProps) {
    const [open, setOpen] = useState(false) // Dialog state
    const [topic, setTopic] = useState("") // Topic input
    const [count, setCount] = useState("5") // Number of questions input
    const [type, setType] = useState("qna")  // Question type: "qna" or "q"
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {

        // Set loading state to true while fetching
        setLoading(true)

        try {
            // generate a prompt using user inputs for generating questions
            // lib/utils.ts
            const prompt = buildGeminiPrompt(topic, parseInt(count), type)
            
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: prompt }),

            })

            const data = await response.json()
            const blocks = parseGeminiResponse(data.answer, type)
            onBlocksGenerated(blocks)

            // Reset all fields after generation
            setOpen(false)
            setTopic("")
            setCount("5")
            setType("qna")

        } catch (error) {
            console.error("Error fetching AI response:", error)
        } finally {

            // Reset loading state
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
                    <DialogTitle>Generate Questions with AI</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <div>
                        <Label>Topic</Label>
                        <Input
                            className="mt-2"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. React, JavaScript"
                        />
                    </div>

                    <div>
                        <Label>Number of Questions</Label>
                        <Input
                            className="mt-2"
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
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="qna">Questions & Answers</SelectItem>
                                <SelectItem value="q">Questions Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full mt-4"
                        onClick={handleGenerate}
                        disabled={
                            loading ||
                            !topic ||
                            !count ||
                            parseInt(count) > 50
                        }
                    >
                        {loading ? "Generating..." : "Generate"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}



