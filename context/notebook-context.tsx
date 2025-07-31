"use client";

import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Notebook, NotebookContextType } from "@/types/notebook";

const NotebookContext = createContext<NotebookContextType | null>(null);

export const useNotebooks = () => {
  const context = useContext(NotebookContext);
  if (!context) throw new Error("useNotebooks must be inside NotebookProvider");
  return context;
};

const getNotebooks = async (userId: string): Promise<Notebook[]> => {
  const res = await fetch(`/api/notebooks?userId=${userId}`);
  if (!res.ok) return [];
  return await res.json();
};

export function NotebookProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    if (!userId) {
      setNotebooks([]); // Clear notebooks if no userId
      return;
    }
    setLoading(true);
    try {
      const data = await getNotebooks(userId);
      setNotebooks(data);
    } catch {
      setNotebooks([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);


  useEffect(() => {
    if (!isLoaded) return; // Wait for auth to load

    refresh();

    let timeoutId: NodeJS.Timeout;

    const onFocus = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => refresh(), 200);
    };

    window.addEventListener("focus", onFocus);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("focus", onFocus);
    };
  }, [isLoaded, refresh]);

  // CRUD functions
  
  // Function to add a new notebook
  const addNotebook = async (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt">
  ): Promise<Notebook> => {

    const res = await fetch("/api/notebooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook),
    });

    if (!res.ok) throw new Error("Failed to add notebook");
    const data: Notebook = await res.json();

    await refresh();

    return data;
  };

  // Function to update an existing notebook
  const updateNotebook = async (notebook: Notebook) => {

    const res = await fetch(`/api/notebooks/${notebook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook),
    });

    if (!res.ok) throw new Error("Failed to update notebook");

    setNotebooks(prev =>
      prev.map(item => (
        (item.id == notebook.id ? notebook : item) 
    )))
    
  };

  // Function to delete a notebook by ID
  const deleteById = async (id: string) => {

    const res = await fetch(`/api/notebooks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete notebook");

    await refresh();
  };

  // Function to delete all notebooks for the authenticated user
  const deleteAll = async () => {

    const res = await fetch("/api/notebooks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete all notebooks");

    await refresh();
  };

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        loading,
        refresh,
        addNotebook,
        updateNotebook,
        deleteById,
        deleteAll,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
