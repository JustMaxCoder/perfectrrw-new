// Main export file for all database schemas
export * from './users.schema';
export * from './products.schema';
export * from './sizes.schema';
export * from './orders.schema';
export * from './gallery.schema';
export * from './settings.schema';
export * from './reviews.schema';
export * from './wishlist.schema';

// Export db connection
export { db } from '../db';

// Extended types
import type { Product } from './products.schema';
import type { ProductSize } from './sizes.schema';
import type { Size } from './sizes.schema';

export type ProductWithSizes = Product & {
  sizes?: (ProductSize & { size: Size })[];
};
