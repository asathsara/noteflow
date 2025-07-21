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


// Generates a unique ID for each notebook
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

export const loadNotebooks = (): Notebook[] => {
  const raw = localStorage.getItem(NOTEBOOKS_KEY)
  return raw ? JSON.parse(raw) : []
}

export const saveNotebooks = (notebooks: Notebook[]) => {
  localStorage.setItem(NOTEBOOKS_KEY, JSON.stringify(notebooks))
}


// Formats date to a more readable format
const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
    .toUpperCase() 
}


export const addNotebook = (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">) => {

  // load existing notebooks
  const notebooks = loadNotebooks()

  // create new notebook with generated ID and timestamps
  const newNotebook: Notebook = {
    ...notebook,
    id: generateId(),
    createdAt: formatDate(new Date()),
    updatedAt: formatDate(new Date())
  }

  saveNotebooks([...notebooks, newNotebook])
  return newNotebook

}

export const updateNotebook = (updated: Notebook) => {

  // load existing notebooks
  const notebooks = loadNotebooks()

  const next = notebooks.map(notebook =>
    notebook.id === updated.id ? {
      ...updated,
      createdAt: notebook.createdAt,
      updatedAt: formatDate(new Date())
    } : notebook
  )

  saveNotebooks(next)
}
