import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked"


export async function convertMarkdownToHTML(markdown: string): Promise<string> {
  return await marked.parse(markdown)
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
