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
  updatedAt?: string
}

// Context type for NotebookProvider
export type NotebookContextType = {
  notebooks: Notebook[];
  loading: boolean;
  refresh: () => Promise<void>;
  addNotebook: (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">) => Promise<Notebook>;
  updateNotebook: (notebook: Notebook) => Promise<void>;
  deleteById: (id: string) => Promise<void>;
  deleteAll: () => Promise<void>;
};

