import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  uploadedAt: true,
});

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;
