import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  name: z.string(),
  price: z.string(),
  image: z.string(),
  sizeId: z.string().optional(),
  sizeName: z.string().optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
