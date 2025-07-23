import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import MenuBar from "./menu-bar"
import { useEffect } from "react"

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
        class: "rounded-md border min-h-[200px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      setNote(editor.getHTML());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && note !== editor.getHTML()) {
      editor.commands.setContent(note);
    }
  }, [note, editor])

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}