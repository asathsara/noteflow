"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface QA {
  question: string
  answer: string
}

interface QATabProps {
  qaBlocks: QA[]
  setQaBlocks: (blocks: QA[]) => void
  onTriggerAI: () => void
}

export function QATab({ qaBlocks, setQaBlocks, onTriggerAI }: QATabProps) {
  const handleQaChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...qaBlocks]
    updated[index][field] = value
    setQaBlocks(updated)
  }

  const addQaBlock = () => {
    setQaBlocks([...qaBlocks, { question: "", answer: "" }])
  }

  return (
    <>
      {qaBlocks.map((block, i) => (
        <div key={i} className="space-y-2 border p-4 rounded-xl bg-muted/30">
          <Input
            value={block.question}
            onChange={(e) => handleQaChange(i, "question", e.target.value)}
            placeholder="Question"
          />
          <Textarea
            value={block.answer}
            onChange={(e) => handleQaChange(i, "answer", e.target.value)}
            placeholder="Answer"
            rows={4}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <Button variant="outline" onClick={addQaBlock}>
          + Add Q&A Block
        </Button>
        <Button onClick={onTriggerAI}>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </div>
    </>
  )
}
