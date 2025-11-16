import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: varchar("image", { length: 1000 }).notNull(),
  additionalImages: varchar("additional_images", { length: 5000 }),
  available: boolean("available").default(true).notNull(),
  shipping: varchar("shipping", { length: 50 }).default("standard").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
  popularity: integer("popularity").notNull().default(0),
  hasSizes: boolean("has_sizes").notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
}).extend({
  image: z.string().min(1, "Image URL is required"),
  additionalImages: z.array(z.string()).optional(),
  available: z.boolean().default(true),
  shipping: z.string().default("standard"),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
