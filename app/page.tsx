import { NewNoteButton } from "@/components/NoteButton"
import { NoteTable } from "@/components/NoteTable"

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <NewNoteButton />
      </div>

      <NoteTable />
    </main>
  )
}
