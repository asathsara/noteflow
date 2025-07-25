// Type for question block
export type QuestionBlock = {
  question: string
  answer: string
}

// Type for Notebook
// This type is used to define the structure of a notebook object
export type Notebook = {
  id: string | number // server will use number
  title: string
  note: string
  questionBlocks: QuestionBlock[]
  createdAt?: string
  updatedAt: string
}

// Context type for NotebookProvider
export type NotebookContextType = {
  notebooks: Notebook[];
  refresh: () => void;
  addNotebook: (data: Omit<Notebook, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateNotebook: (notebook: Notebook) => Promise<void>;
  deleteById: (id: string) => Promise<void>;
};

