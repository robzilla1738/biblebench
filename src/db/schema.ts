import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer"),
  tier: text("tier").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  tradition: text("tradition"),
  references: text("references"),
  rationale: text("rationale"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailSignups = pgTable("email_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
