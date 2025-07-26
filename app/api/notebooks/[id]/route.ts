import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { notebooks } from "@/db/schema";
import { eq, and } from "drizzle-orm";

type Params = Promise<{id: string}>;

export async function PUT(req: Request, { params }: { params: Params}) {
  // Ensure the user is authenticated
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // get the notebook ID from the request parameters
  const { id } = await params;
  const body = await req.json();

  const result = await db
    .update(notebooks)
    .set({
      title: body.title,
      note: body.note,
      questionBlocks: JSON.stringify(body.questionBlocks),
      updatedAt: new Date(),
    })
    .where(and(eq(notebooks.id, Number(id)), eq(notebooks.userId, userId))) 
    .returning();

  // Check if the notebook was found and updated
  if (!result.length) return new Response("Not Found or Unauthorized", { status: 404 });

  // Return the updated notebook
  return Response.json(result[0]);
}

export async function DELETE(req: Request, { params }: { params: Params }) {

  // Ensure the user is authenticated
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // get the notebook ID from the request parameters
  const { id } = await params;

  const result = await db
    .delete(notebooks)
    .where(and(eq(notebooks.id, Number(id)), eq(notebooks.userId, userId)))
    .returning();

  if (!result.length) return new Response("Not Found or Unauthorized", { status: 404 });

  return new Response("Deleted", { status: 200 });
}
