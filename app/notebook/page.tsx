import { NoteEditor } from "@/components/note-editor"

export default function NewNotePage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 space-y-6">
      <h1 className="text-2xl font-bold">New Note</h1>
      <NoteEditor />
    </main>
  )
}
