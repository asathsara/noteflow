import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked"


export async function convertMarkdownToHTML(markdown: string): Promise<string> {
  return await marked.parse(markdown)
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to check if the editor content is empty
// It first strips all HTML tags and then checks if the remaining text is empty
export function isEditorContentEmpty(html: string): boolean {
  const stripped = html.replace(/<[^>]+>/g, "").trim(); // removes tags
  return stripped === "";
}
