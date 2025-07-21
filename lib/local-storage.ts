export type QuestionBlock = { question: string; answer: string }

export type Notebook = {
  id: string
  title: string
  note: string
  questionBlocks: QuestionBlock[]
  createdAt: string
  updatedAt: string
}


const NOTEBOOKS_KEY = "noteflow-notebooks"

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

export const loadNotebooks = (): Notebook[] => {
  const raw = localStorage.getItem(NOTEBOOKS_KEY)
  return raw ? JSON.parse(raw) : []
}

export const saveNotebooks = (notebooks: Notebook[]) => {
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks))
}

export const addNotebook = (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">) => {
  const notebooks = loadNotebooks()
  const newNotebook: Notebook = {
    ...notebook,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  saveNotebooks([...notebooks, newNotebook])
  return newNotebook
}
