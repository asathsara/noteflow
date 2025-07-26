import { pgTable, text, timestamp, serial, jsonb } from "drizzle-orm/pg-core";

export const notebooks = pgTable("notebooks", {
  id: serial("id").primaryKey(), // Auto-incremented ID
  userId: text("user_id").notNull(), // Clerk user ID
  title: text("title").notNull(),
  note: text("note").notNull(),
  questionBlocks: jsonb("question_blocks").notNull().default([]), // Array of Q&A blocks
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
