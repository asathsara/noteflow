"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Notebook } from "@/lib/local-storage"
import {
  loadNotebooks,
  saveNotebooks,
  deleteAllNotebooks as clearStorage,
} from "@/lib/local-storage"

type NotebookContextType = {
  notebooks: Notebook[]
  addNotebook: (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">) => Notebook
  updateNotebook: (notebook: Notebook) => void
  deleteById: (id: string) => void
  deleteAll: () => void
}

const NotebookContext = createContext<NotebookContextType | null>(null)

export const useNotebooks = () => {
  const context = useContext(NotebookContext)
  if (!context) throw new Error("useNotebooks must be used inside NotebookProvider")
  return context
}

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase()

export function NotebookProvider({ children }: { children: React.ReactNode }) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])

  useEffect(() => {
    setNotebooks(loadNotebooks())

    // sync when window regains focus
    const syncOnFocus = () => {
      setNotebooks(loadNotebooks())
    }
    window.addEventListener("focus", syncOnFocus)
    return () => window.removeEventListener("focus", syncOnFocus)
  }, [])

  const addNotebook = (
    notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">
  ): Notebook => {
    const newNotebook: Notebook = {
      ...notebook,
      id: generateId(),
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    }
    const updated = [...notebooks, newNotebook]
    setNotebooks(updated)
    saveNotebooks(updated)
    return newNotebook
  }

  const updateNotebook = (updated: Notebook) => {
    const updatedList = notebooks.map((n) =>
      n.id === updated.id
        ? {
            ...updated,
            createdAt: n.createdAt,
            updatedAt: formatDate(new Date()),
          }
        : n
    )
    setNotebooks(updatedList)
    saveNotebooks(updatedList)
  }

  const deleteById = (id: string) => {
    const filtered = notebooks.filter((n) => n.id !== id)
    setNotebooks(filtered)
    saveNotebooks(filtered)
  }

  const deleteAll = () => {
    clearStorage()
    setNotebooks([])
  }

  return (
    <NotebookContext.Provider
      value={{ notebooks, addNotebook, updateNotebook, deleteById, deleteAll }}
    >
      {children}
    </NotebookContext.Provider>
  )
}
