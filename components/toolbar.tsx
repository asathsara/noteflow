
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading2,
    Eraser
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
}


export function Toolbar({ editor }: Props) {

    return (
        <div className="flex gap-2 border border-input bg-transparent rounded-md mt-4 p-2">

            <Toggle
                size="sm"
                pressed={editor?.isActive("heading")}
                onPressedChange={() => {
                    editor?.chain().focus().toggleHeading({ level: 2 }).run();
                }}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("bold")}
                onPressedChange={() => {
                    editor?.chain().focus().toggleBold().run();
                }}>
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("italic")}
                onPressedChange={() => {
                    editor?.chain().focus().toggleItalic().run();
                }}>
                <Italic className="h-4 w-4" /></Toggle>

            <Toggle
                size="sm"
                pressed={editor?.isActive("strike")}
                onPressedChange={() => {
                    editor?.chain().focus().toggleStrike().run();
                }}>
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor?.isActive("codeBlock")}
                onPressedChange={() => {
                    editor?.chain().focus().toggleCodeBlock().run();
                }}>
                <Code className="h-4 w-4" />
            </Toggle>

            <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                    editor?.commands.clearContent();
                }}
            >
                <Eraser className="h-4 w-4" />
            </button>


        </div>
    )
}