import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface QuestionBlockProps {
    question: string;
    answer: string;
    onChange: (field: "question" | "answer", value: string) => void;

}

export function QuestionBlock({ question, answer, onChange }: QuestionBlockProps) {
    return (<div className="space-y-2 border p-4 rounded-xl bg-muted/30">
        <Input
            value={question}
            onChange={(e) => onChange("question", e.target.value)}
            placeholder="Question"
        />
        <Textarea
            value={answer}
            onChange={(e) => onChange("answer", e.target.value)}
            placeholder="Answer"
            rows={4}
        />
    </div>);
}