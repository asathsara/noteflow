"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { QuestionBlock } from "./question-block"

interface QuestionBlock {
  question: string
  answer: string
}

interface QuestionTabProps {
  questionBlocks: QuestionBlock[]
  setQuestionBlocks: (blocks: QuestionBlock[]) => void
  onTriggerAI: () => void
}

export function QuestionTab(
  { questionBlocks, setQuestionBlocks, onTriggerAI }: QuestionTabProps) {

  const handleQuestionBlock = (index: number, field: "question" | "answer", value: string) => {

    
    const updated = [...questionBlocks]

    // update the specific field of the block at the given index
    updated[index][field] = value
    setQuestionBlocks(updated)
  }

  // Function to add a new question block
  const addQuestionBlock = () => {
    setQuestionBlocks([...questionBlocks, { question: "", answer: "" }])
  }

  return (
    <>
      {questionBlocks.map((block, i) => (
        <QuestionBlock
          key={i}
          question={block.question}
          answer={block.answer}
          onChange={(field, value) => handleQuestionBlock(i, field, value)}
        />
      ))}

      <div className="flex gap-2 mt-2">
        <Button variant="outline" onClick={addQuestionBlock}>
          + Add Question Block
        </Button>
        <Button onClick={onTriggerAI}>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </div>
    </>
  )
}
