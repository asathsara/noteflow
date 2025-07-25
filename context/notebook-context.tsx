"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { Notebook, NotebookContextType } from "@/types/notebook"

const NotebookContext = createContext<NotebookContextType | null>(null);


export const useNotebooks = () => {
  const context = useContext(NotebookContext)
  if (!context) throw new Error("useNotebooks must be inside NotebookProvider")
  return context
}


// Function to fetch notebooks from the API
const getNotebooks = async (): Promise<Notebook[]> => {
  const res = await fetch("/api/notebooks");
  if (!res.ok) throw new Error("Failed to fetch notebooks");
  return res.json();
};

export function NotebookProvider({ children }: { children: React.ReactNode }) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])

  // Function to refresh the notebooks list
  // useCallback is used to memoize the function so it doesn't change on every render
  const refresh = useCallback(async () => {
    const data = await getNotebooks();
    setNotebooks(data);
  }, []);


  useEffect(() => {

    refresh();

    // Refresh notebooks when the window gains focus means when the user returns to the tab
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);


  // Function to add a new notebook without id, createdAt, and updatedAt fields
  const addNotebook = async (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">): Promise<Notebook> => {

    const res = await fetch("/api/notebooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
    });

    if (!res.ok) throw new Error("Failed to add notebook");

    const data: Notebook = await res.json();
    refresh();
    return data;
  }

  // Function to update an existing notebook
  const updateNotebook = async (notebook: Notebook) => {
    const res = await fetch(`/api/notebooks/${notebook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notebook),
    });
    if (!res.ok) throw new Error("Failed to update notebook");
    refresh();
  };

  // Function to delete a notebook by its ID
  const deleteById = async (id: string) => {
    const res = await fetch(`/api/notebooks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to delete notebook");
    refresh();
  };

  return (
    <NotebookContext.Provider value={{ notebooks, refresh, addNotebook, updateNotebook, deleteById }}>
      {children}
    </NotebookContext.Provider>
  )
}
