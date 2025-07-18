import { DeleteAlertDialog } from "./delete-dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Trash } from "lucide-react"

interface QuestionBlockProps {
    question: string
    answer: string
    onChange: (field: "question" | "answer", value: string) => void
    onDelete: () => void
}

export function QuestionBlock({ question, answer, onChange, onDelete }: QuestionBlockProps) {
    return (
        <div className="space-y-2 border p-4 rounded-xl bg-muted/30 mt-4">
            <div className="flex justify-end items-center">

                <Input
                    value={question}
                    onChange={(e) => onChange("question", e.target.value)}
                    placeholder="Question"
                />
                <DeleteAlertDialog
                    onConfirm={onDelete}
                    title="Delete Question Block?"
                    description="This will permanently delete this question block."
                    trigger={
                        <button
                            type="button"
                            className="flex text-destructive ml-2 hover:text-red-600 cursor-pointer"
                            aria-label="Delete question block"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    }
                />


            </div>


            <Textarea
                value={answer}
                onChange={(e) => onChange("answer", e.target.value)}
                placeholder="Answer"
                rows={4}
            />
        </div>
    )
}
