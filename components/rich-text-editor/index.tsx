"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import MenuBar from "./menu-bar"
import { useEffect } from "react"
import { Skeleton } from "../ui/skeleton"

interface RichTextEditorProps {
  note: string
  setNote: (value: string) => void
}

export default function RichTextEditor({ note, setNote }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: "list-disc ml-6",
        },
      },
      codeBlock: {
        HTMLAttributes: { class: "text-sm p-4 rounded-md font-mono overflow-x-auto" }
      },
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      },
    })],
    content: note || '<p>Start writing your note here</p>',
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[200px] p-4  focus:outline-none focus:ring-3 focus:ring-neutral-800",
      },
    },
    onUpdate: ({ editor }) => {
      setNote(editor.getHTML());
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && note !== editor.getHTML()) {
      editor.commands.setContent(note)
    }
  }, [note, editor])

  
  if (!editor) {
    return (
      <div className="space-y-4 mt-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-[200px] w-full rounded-md" />
      </div>
    )
  }

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
