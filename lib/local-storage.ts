export type QuestionBlock = { question: string; answer: string }

export type Notebook = {
  id: string
  title: string
  note: string
  questionBlocks: QuestionBlock[]
  createdAt?: string // optional for existing notebooks
  updatedAt: string
}

const NOTEBOOKS_KEY = "noteflow-notebooks"


export const loadNotebooks = (): Notebook[] => {
  const raw = localStorage.getItem(NOTEBOOKS_KEY)
  return raw ? JSON.parse(raw) : []
}

export const saveNotebooks = (notebooks: Notebook[]) => {
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks))
}

export const deleteAllNotebooks = () => {
  localStorage.removeItem(NOTEBOOKS_KEY)
}







