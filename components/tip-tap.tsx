'use client'

import CodeBlock from "@tiptap/extension-code-block"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Heading } from "@tiptap/extension-heading"
import { Toolbar } from "./toolbar"
import { useEffect } from "react"

interface TipTapProps {
    note: string
    setNote: (value: string) => void
}


const Tiptap = ({ note, setNote }: TipTapProps) => {



    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlock.configure({
                HTMLAttributes: { class: "bg-gray-100 text-gray-800 text-sm p-4 rounded-md font-mono overflow-x-auto" }
            }),
            Heading.configure({
                levels: [1, 2, 3],
                HTMLAttributes: {
                    class: 'text-xl mb-2 text-gray-900 font-bold',
                }
            })
        ],
        content: note || '<p></p>',
        editorProps: {
            attributes: {
                class: 'rounded-md border min-h-[200px] p-4 prose',
            },
        },
        onUpdate({ editor }) {
            setNote(editor.getHTML())  // keeps  `note` state updated
        },
        immediatelyRender: false,
    })

    useEffect(() => {
        if (editor && note !== editor.getHTML()) {
            editor.commands.setContent(note)
        }
    }, [note, editor])

    return (
        <>
            {editor && <Toolbar editor={editor} />}
            <EditorContent className="mt-4" editor={editor} />
        </>
    )

}

export default Tiptap
