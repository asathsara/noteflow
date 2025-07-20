"use client"

import { Button } from "@/components/ui/button"
import { QuestionBlock } from "./question-block"
import { AskAIQuestionDialog } from "./ask-ai-question-dialog" 

interface QuestionBlock {
  question: string
  answer: string
}

interface QuestionTabProps {
  questionBlocks: QuestionBlock[]
  setQuestionBlocks: (blocks: QuestionBlock[]) => void
}

export function QuestionTab({
  questionBlocks,
  setQuestionBlocks,
}: QuestionTabProps) {
  const handleQuestionBlock = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...questionBlocks]
    updated[index][field] = value
    setQuestionBlocks(updated)
  }

  const addQuestionBlock = () => {
    setQuestionBlocks([...questionBlocks, { question: "", answer: "" }])
  }

  const deleteQuestionBlock = (index: number) => {
    const updated = [...questionBlocks]
    updated.splice(index, 1)
    setQuestionBlocks(updated)
  }

  return (
    <>
      {questionBlocks.map((block, i) => (
        <QuestionBlock
          key={i}
          question={block.question}
          answer={block.answer}
          onChange={(field, value) => handleQuestionBlock(i, field, value)}
          onDelete={() => deleteQuestionBlock(i)}
        />
      ))}

      <div className="flex gap-2 mt-2">
        <Button variant="outline" onClick={addQuestionBlock}>
          + Add Question Block
        </Button>

        <AskAIQuestionDialog
          onBlocksGenerated={(blocks) => {
            setQuestionBlocks([...questionBlocks, ...blocks])
          }}
        />
      </div>
    </>
  )
}
