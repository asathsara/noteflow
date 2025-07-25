import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { eq } from "drizzle-orm"; 

export async function POST(req: Request) {

  // Ensure the user is authenticated
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // get the notebook data from the request body
  const body = await req.json();

  const result = await db
    .insert(notebooks)
    .values({
      userId,
      title: body.title,
      note: body.note,
      questionBlocks: JSON.stringify(body.questionBlocks),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return Response.json(result[0]);
}

export async function GET() {

  // Ensure the user is authenticated
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const result = await db
    .select()
    .from(notebooks)
    .where(eq(notebooks.userId, userId));

  return Response.json(result);
}

// Function to delete all notebooks for the authenticated user
export async function DELETE() {
  // Ensure the user is authenticated
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const result = await db
    .delete(notebooks)
    .where(eq(notebooks.userId, userId))
    .returning();

  return Response.json(result);
}
