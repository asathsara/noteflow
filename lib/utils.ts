import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked"

// Gemini prompt builder
export function buildGeminiPrompt(topic: string, count: number, type: string) {
  if (type === "qna") {
    return `Generate ${count} questions and answers about ${topic}. Format:
Q: What is X?
A: X is Y.
\nReturn only the Q/A pairs.`
  }
  return `Generate ${count} questions about ${topic}. Return each question prefixed by Q:`
}

// Gemini response parser
export function parseGeminiResponse(text: string, type: string) {
  const blocks: { question: string; answer: string }[] = []

  if (type === "qna") {
    const regex = /Q:\s*(.*?)\s*A:\s*(.*?)(?=\nQ:|$)/gs
    let match
    while ((match = regex.exec(text)) !== null) {
      blocks.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      })
    }
  } else {
    const regex = /Q:\s*(.*)/g
    let match
    while ((match = regex.exec(text)) !== null) {
      blocks.push({ question: match[1].trim(), answer: "" })
    }
  }

  return blocks
}

export async function convertMarkdownToHTML(markdown: string): Promise<string> {
  return await marked.parse(markdown)
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
