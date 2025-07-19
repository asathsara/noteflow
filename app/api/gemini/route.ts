import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    // ✅ your generateText usage — perfectly fine here
    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: question,
    })

    return NextResponse.json({ answer: text })
  } catch (err) {
    console.error("Gemini error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
