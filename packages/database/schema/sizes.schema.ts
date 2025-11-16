import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sizes = pgTable("sizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const productSizes = pgTable("product_sizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull(),
  sizeId: varchar("size_id").notNull(),
  stock: integer("stock").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertSizeSchema = createInsertSchema(sizes).omit({
  id: true,
  createdAt: true,
});

export const insertProductSizeSchema = createInsertSchema(productSizes).omit({
  id: true,
  createdAt: true,
}).extend({
  stock: z.number().int().nonnegative(),
});

export type InsertSize = z.infer<typeof insertSizeSchema>;
export type Size = typeof sizes.$inferSelect;
export type InsertProductSize = z.infer<typeof insertProductSizeSchema>;
export type ProductSize = typeof productSizes.$inferSelect;
