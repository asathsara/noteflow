import { NoteButton } from "@/components/note-button"
import { NoteTable } from "@/components/note-table"

export default function HomePage() {
  return (
      <div className="mx-auto space-y-8 mt-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Notes</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Create, edit, and explore your personal notes.
            </p>
          </div>
          <NoteButton />
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-border">
          <h2 className="text-lg font-medium mb-4">Recent Notes</h2>
          <NoteTable />
        </section>

      </div>
  )
}
