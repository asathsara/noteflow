"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { NoteTab } from "./note-tab"
import { QATab } from "./qa-tab"

export function NoteEditor() {
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [qaBlocks, setQaBlocks] = useState([{ question: "", answer: "" }])

  const triggerAI = () => {
    console.log("Triggering AI chat...")
  }

  return (
    <div className="space-y-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className="text-xl font-semibold"
      />

      <Tabs defaultValue="write" className="w-full">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="qa">Q & A</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <NoteTab note={note} setNote={setNote} onTriggerAI={triggerAI} />
        </TabsContent>

        <TabsContent value="qa">
          <QATab qaBlocks={qaBlocks} setQaBlocks={setQaBlocks} onTriggerAI={triggerAI} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
