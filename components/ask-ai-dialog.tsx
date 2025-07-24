"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Textarea } from "./ui/textarea"

interface AskAIDialogProps {
  onAnswer: (response: string) => void
}

export function AskAIDialog({ onAnswer }: AskAIDialogProps) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAskAI = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      const data = await response.json()
      if (data.answer) {
        onAnswer(data.answer)
        setQuestion("")
        setOpen(false)
      }
    } catch (error) {
      console.error("Error fetching AI response:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">
          <Sparkles className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask AI</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          //onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
          disabled={loading}
        />
        <Button
          className="mt-2 cursor-pointer"
          onClick={handleAskAI}
          disabled={loading || !question}
        >
          {loading ? "Thinking..." : "Get Answer"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
