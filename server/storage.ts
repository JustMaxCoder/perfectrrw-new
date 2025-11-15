import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type Gallery,
  type InsertGallery,
  type Settings,
  type InsertSettings,
  type Size,
  type InsertSize,
  type ProductSize,
  type InsertProductSize,
  type ProductWithSizes,
} from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;

  // Gallery
  getAllGalleryImages(): Promise<Gallery[]>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
  deleteGalleryImage(id: string): Promise<void>;

  // Settings
  getSetting(key: string): Promise<Settings | undefined>;
  setSetting(key: string, value: string): Promise<Settings>;
  getAllSettings(): Promise<Settings[]>;

  // Reviews
  createReview(data: any): Promise<any>;
  getProductReviews(productId: string): Promise<any[]>;
  deleteReview(id: string): Promise<void>;

  // Wishlist
  addToWishlist(userId: string, productId: string): Promise<any>;
  getUserWishlist(userId: string): Promise<any[]>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;

  // Sizes
  getAllSizes(): Promise<Size[]>;
  createSize(size: InsertSize): Promise<Size>;
  deleteSize(id: string): Promise<void>;

  // Product Sizes
  getProductSizes(productId: string): Promise<(ProductSize & { size: Size })[]>;
  getProductWithSizes(productId: string): Promise<ProductWithSizes | undefined>;
  addProductSize(productId: string, sizeId: string, stock: number): Promise<ProductSize>;
  updateProductSizeStock(productId: string, sizeId: string, stock: number): Promise<ProductSize | undefined>;
  deleteProductSize(productId: string, sizeId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private gallery: Map<string, Gallery>;
  private settings: Map<string, Settings>;
  private reviews: Map<string, any>;
  private wishlist: Map<string, any>;
  private sizes: Map<string, Size>;
  private productSizes: Map<string, ProductSize>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.gallery = new Map();
    this.settings = new Map();
    this.reviews = new Map();
    this.wishlist = new Map();
    this.sizes = new Map();
    this.productSizes = new Map();
    this.seedData();
    this.seedSettings();
    this.seedGallery();
    this.seedSizes();
    this.seedProductSizes();
  }

  private seedData() {
    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Kombinezon roboczy PROTECT",
        description:
          "Wytrzymały kombinezon roboczy z bawełny. Idealny do prac przemysłowych i warsztatowych. Wiele kieszeni funkcjonalnych.",
        price: "159.99",
        image:
          "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 45,
        popularity: 85,
      },
      {
        name: "Buty robocze BHP S3",
        description:
          "Bezpieczne buty robocze z metalowym podnoskiem. Antypoślizgowa podeszwa, odporność na przebicie. Norma S3.",
        price: "249.99",
        image:
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 32,
        popularity: 95,
      },
      {
        name: "Rękawice ochronne ULTRA",
        description:
          "Rękawice robocze z powłoką lateksową. Doskonała przyczepność i ochrona dłoni. Rozmiar uniwersalny.",
        price: "29.99",
        image:
          "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 120,
        popularity: 100,
      },
      {
        name: "Kask ochronny SAFETY",
        description:
          "Lekki kask budowlany z regulacją. Odporna skorupa ABS, wentylacja, pasek podbródkowy. Certyfikat CE.",
        price: "79.99",
        image:
          "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 67,
        popularity: 78,
      },
      {
        name: "Kamizelka odblaskowa Premium",
        description:
          "Kamizelka ostrzegawcza klasa 2. Materiał oddychający, regulowane zapięcia. Zgodna z normami UE.",
        price: "39.99",
        image:
          "https://images.unsplash.com/photo-1581574919402-5b7d733224d6?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 88,
        popularity: 90,
      },
      {
        name: "Okulary ochronne VISION",
        description:
          "Okulary ochronne z poliwęglanu. Ochrona UV, odporne na zarysowania. Regulowane zauszniki.",
        price: "49.99",
        image:
          "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 95,
        popularity: 72,
      },
      {
        name: "Spodnie robocze MASTER",
        description:
          "Wzmocnione spodnie robocze z kieszeniami na nakolanniki. Materiał stretch, wysoka wytrzymałość.",
        price: "139.99",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 54,
        popularity: 65,
      },
      {
        name: "Nauszniki ochronne PRO",
        description:
          "Profesjonalne nauszniki ochronne. Tłumienie 32 dB, miękkie poduszki, regulowany pałąk.",
        price: "89.99",
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
        category: "ochrona-sluchu",
        stock: 41,
        popularity: 55,
      },
      {
        name: "Kurtka robocza zimowa TERMO",
        description:
          "Ciepła kurtka robocza z odpinaną podpinką. Wodoodporna, elementy odblaskowe, wiele kieszeni.",
        price: "299.99",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
        category: "odziez-robocza",
        stock: 28,
        popularity: 88,
      },
      {
        name: "Półbuty robocze COMFORT",
        description:
          "Lekkie półbuty robocze S1P. Kompozytowy podnosek, oddychający materiał, podeszwa antyelektrostatyczna.",
        price: "199.99",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        category: "obuwie",
        stock: 37,
        popularity: 80,
      },
      {
        name: "Rękawice skórzane PREMIUM",
        description:
          "Wytrzymałe rękawice ze skóry bydlęcej. Doskonałe do prac ciężkich, wzmocnione szwy.",
        price: "69.99",
        image:
          "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop",
        category: "rekawice",
        stock: 73,
        popularity: 68,
      },
      {
        name: "Maska spawalnicza AUTO",
        description:
          "Automatyczna maska spawalnicza. Regulacja zaciemnienia, zasilanie słoneczne, lekka konstrukcja.",
        price: "349.99",
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop",
        category: "ochrona-glowy",
        stock: 19,
        popularity: 45,
      },
    ];

    sampleProducts.forEach((product) => {
      const id = randomUUID();
      const createdAt = new Date().toISOString();
      this.products.set(id, {
        ...product,
        id,
        stock: product.stock ?? 0,
        images: [],
        available: true,
        shipping: "standard",
        hasSizes: false,
        popularity: product.popularity ?? 0,
        createdAt,
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    // ensure required fields on User type (insertUser.isAdmin may be optional)
    const user: User = {
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin ?? false,
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    // ensure stock is present (InsertProduct.stock can be optional)
    const product: Product = {
      ...insertProduct,
      id,
      stock: insertProduct.stock ?? 0,
      images: insertProduct.images ?? [],
      available: insertProduct.available ?? true,
      shipping: insertProduct.shipping ?? "standard",
      hasSizes: insertProduct.hasSizes ?? false,
      popularity: insertProduct.popularity ?? 0,
      createdAt,
    };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    // ensure required Order fields (status/userId) have defaults matching DB defaults
    const order: Order = {
      ...insertOrder,
      id,
      createdAt,
      status: insertOrder.status ?? "pending",
      userId: insertOrder.userId ?? null,
    };
    this.orders.set(id, order);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  // Product update/delete methods
  async updateProduct(id: string, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;

    const updated: Product = {
      ...existing,
      ...productUpdate,
      images: productUpdate.images ?? existing.images,
      available: productUpdate.available ?? existing.available,
      shipping: productUpdate.shipping ?? existing.shipping,
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    this.products.delete(id);
    
    // Clean up related product-size entries
    const productSizesToDelete = Array.from(this.productSizes.values())
      .filter((ps) => ps.productId === id);
    
    productSizesToDelete.forEach((ps) => {
      this.productSizes.delete(ps.id);
    });
  }

  // Gallery methods
  async getAllGalleryImages(): Promise<Gallery[]> {
    return Array.from(this.gallery.values());
  }

  async createGalleryImage(insertGallery: InsertGallery): Promise<Gallery> {
    const id = randomUUID();
    const uploadedAt = new Date().toISOString();
    const galleryImage: Gallery = {
      ...insertGallery,
      id,
      uploadedAt,
    };
    this.gallery.set(id, galleryImage);
    return galleryImage;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    this.gallery.delete(id);
  }

  // Settings methods
  async getSetting(key: string): Promise<Settings | undefined> {
    return Array.from(this.settings.values()).find(s => s.key === key);
  }

  async setSetting(key: string, value: string): Promise<Settings> {
    const existing = await this.getSetting(key);
    if (existing) {
      existing.value = value;
      this.settings.set(existing.id, existing);
      return existing;
    }

    const id = randomUUID();
    const setting: Settings = { id, key, value };
    this.settings.set(id, setting);
    return setting;
  }

  async getAllSettings(): Promise<Settings[]> {
    return Array.from(this.settings.values());
  }

  private seedSettings() {
    // Seed default settings
    const defaultSettings = [
      { key: "siteName", value: "Sklep BHP Perfekt" },
      { key: "bannerShow", value: "true" },
      { key: "bannerText", value: "Promocja! -20% na całą odzież roboczą!" },
      { key: "bannerLink", value: "/products" },
    ];

    defaultSettings.forEach(setting => {
      const id = randomUUID();
      this.settings.set(id, { id, ...setting });
    });
  }

  private seedGallery() {
    // Seed gallery with sample images
    const sampleImages = [
      {
        filename: "bhp-workplace-safety.jpg",
        path: "https://images.unsplash.com/photo-1581574919402-5b7d733224d6?w=800&h=800&fit=crop",
      },
      {
        filename: "safety-equipment-display.jpg",
        path: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=800&fit=crop",
      },
      {
        filename: "protective-gear-collection.jpg",
        path: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop",
      },
      {
        filename: "warehouse-safety-products.jpg",
        path: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=800&fit=crop",
      },
    ];

    sampleImages.forEach(image => {
      const id = randomUUID();
      const uploadedAt = new Date().toISOString();
      this.gallery.set(id, { id, ...image, uploadedAt });
    });
  }

  // Reviews
  async createReview(data: any) {
    const review = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.reviews.set(review.id, review);
    return review;
  }

  async getProductReviews(productId: string) {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId
    );
  }

  async deleteReview(id: string) {
    this.reviews.delete(id);
  }

  // Wishlist
  async addToWishlist(userId: string, productId: string) {
    const item = {
      id: randomUUID(),
      userId,
      productId,
      createdAt: new Date().toISOString(),
    };
    this.wishlist.set(item.id, item);
    return item;
  }

  async getUserWishlist(userId: string) {
    return Array.from(this.wishlist.values()).filter(
      (item) => item.userId === userId
    );
  }

  async removeFromWishlist(userId: string, productId: string) {
    const item = Array.from(this.wishlist.values()).find(
      (w) => w.userId === userId && w.productId === productId
    );
    if (item) {
      this.wishlist.delete(item.id);
    }
  }

  // Sizes
  private seedSizes() {
    const standardSizes = [
      { name: "XS", displayOrder: 1 },
      { name: "S", displayOrder: 2 },
      { name: "M", displayOrder: 3 },
      { name: "L", displayOrder: 4 },
      { name: "XL", displayOrder: 5 },
      { name: "XXL", displayOrder: 6 },
      { name: "XXXL", displayOrder: 7 },
      { name: "36", displayOrder: 8 },
      { name: "37", displayOrder: 9 },
      { name: "38", displayOrder: 10 },
      { name: "39", displayOrder: 11 },
      { name: "40", displayOrder: 12 },
      { name: "41", displayOrder: 13 },
      { name: "42", displayOrder: 14 },
      { name: "43", displayOrder: 15 },
      { name: "44", displayOrder: 16 },
      { name: "45", displayOrder: 17 },
      { name: "46", displayOrder: 18 },
      { name: "47", displayOrder: 19 },
      { name: "48", displayOrder: 20 },
    ];

    standardSizes.forEach((size) => {
      const id = randomUUID();
      const createdAt = new Date().toISOString();
      this.sizes.set(id, { id, ...size, createdAt });
    });
  }

  private seedProductSizes() {
    // Get some products and sizes to create sample relationships
    const allProducts = Array.from(this.products.values());
    const allSizes = Array.from(this.sizes.values());

    if (allProducts.length === 0 || allSizes.length === 0) {
      return; // Nothing to seed
    }

    // Get clothing sizes (XS-XXXL) and shoe sizes (36-48)
    const clothingSizes = allSizes.filter(s => ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].includes(s.name));
    const shoeSizes = allSizes.filter(s => !['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].includes(s.name));

    // Add sizes to clothing products (first 3 products are clothing-related)
    const clothingProductNames = ['Kombinezon roboczy PROTECT', 'Spodnie robocze MASTER', 'Kurtka robocza zimowa TERMO', 'Kamizelka odblaskowa Premium'];
    allProducts.forEach(product => {
      if (clothingProductNames.some(name => product.name.includes(name))) {
        // Add clothing sizes to this product
        clothingSizes.forEach((size, index) => {
          const id = randomUUID();
          const createdAt = new Date().toISOString();
          const stock = 10 + Math.floor(Math.random() * 20); // Random stock between 10-30
          this.productSizes.set(id, {
            id,
            productId: product.id,
            sizeId: size.id,
            stock,
            createdAt,
          });
        });
        // Update product to indicate it has sizes
        product.hasSizes = true;
        this.products.set(product.id, product);
      }
    });

    // Add sizes to shoe products
    const shoeProductNames = ['Buty robocze BHP S3', 'Półbuty robocze COMFORT'];
    allProducts.forEach(product => {
      if (shoeProductNames.some(name => product.name.includes(name))) {
        // Add shoe sizes to this product
        shoeSizes.forEach((size, index) => {
          const id = randomUUID();
          const createdAt = new Date().toISOString();
          const stock = 5 + Math.floor(Math.random() * 15); // Random stock between 5-20
          this.productSizes.set(id, {
            id,
            productId: product.id,
            sizeId: size.id,
            stock,
            createdAt,
          });
        });
        // Update product to indicate it has sizes
        product.hasSizes = true;
        this.products.set(product.id, product);
      }
    });
  }

  async getAllSizes(): Promise<Size[]> {
    return Array.from(this.sizes.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createSize(insertSize: InsertSize): Promise<Size> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const size: Size = {
      ...insertSize,
      id,
      displayOrder: insertSize.displayOrder ?? 0,
      createdAt,
    };
    this.sizes.set(id, size);
    return size;
  }

  async deleteSize(id: string): Promise<void> {
    this.sizes.delete(id);
    // Also delete associated product sizes
    Array.from(this.productSizes.values())
      .filter((ps) => ps.sizeId === id)
      .forEach((ps) => this.productSizes.delete(ps.id));
  }

  async getProductSizes(productId: string): Promise<(ProductSize & { size: Size })[]> {
    const productSizesList = Array.from(this.productSizes.values())
      .filter((ps) => ps.productId === productId);

    return productSizesList.map((ps) => {
      const size = this.sizes.get(ps.sizeId);
      return {
        ...ps,
        size: size!,
      };
    }).filter((ps) => ps.size !== undefined);
  }

  async getProductWithSizes(productId: string): Promise<ProductWithSizes | undefined> {
    const product = await this.getProduct(productId);
    if (!product) return undefined;

    // Get sizes for the product (empty array if no sizes)
    const sizes = await this.getProductSizes(productId);
    
    // Always return the product, with empty sizes array if no sizes exist
    return {
      ...product,
      sizes: sizes.length > 0 ? sizes : undefined,
    };
  }

  async addProductSize(productId: string, sizeId: string, stock: number): Promise<ProductSize> {
    // Validate that size exists
    const size = this.sizes.get(sizeId);
    if (!size) {
      throw new Error(`Size with id ${sizeId} not found`);
    }

    // Validate that product exists
    const product = this.products.get(productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    // Check for duplicates
    const existingProductSize = Array.from(this.productSizes.values()).find(
      (ps) => ps.productId === productId && ps.sizeId === sizeId
    );
    if (existingProductSize) {
      throw new Error(`Size ${size.name} already added to this product`);
    }

    // Validate stock is non-negative
    if (stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const productSize: ProductSize = {
      id,
      productId,
      sizeId,
      stock,
      createdAt,
    };
    this.productSizes.set(id, productSize);

    // Update product.hasSizes to true if this is the first size
    if (!product.hasSizes) {
      product.hasSizes = true;
      this.products.set(productId, product);
    }

    return productSize;
  }

  async updateProductSizeStock(
    productId: string,
    sizeId: string,
    stock: number
  ): Promise<ProductSize | undefined> {
    // Validate stock is non-negative
    if (stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    // Validate that size exists
    const size = this.sizes.get(sizeId);
    if (!size) {
      throw new Error(`Size with id ${sizeId} not found`);
    }

    const productSize = Array.from(this.productSizes.values()).find(
      (ps) => ps.productId === productId && ps.sizeId === sizeId
    );
    if (!productSize) return undefined;

    productSize.stock = stock;
    this.productSizes.set(productSize.id, productSize);
    return productSize;
  }

  async deleteProductSize(productId: string, sizeId: string): Promise<boolean> {
    const productSize = Array.from(this.productSizes.values()).find(
      (ps) => ps.productId === productId && ps.sizeId === sizeId
    );
    if (!productSize) {
      return false; // Not found
    }

    this.productSizes.delete(productSize.id);

    // Check if this was the last size for this product
    const remainingSizes = Array.from(this.productSizes.values()).filter(
      (ps) => ps.productId === productId
    );
    
    // If no sizes remain, update product.hasSizes to false
    if (remainingSizes.length === 0) {
      const product = this.products.get(productId);
      if (product && product.hasSizes) {
        product.hasSizes = false;
        this.products.set(productId, product);
      }
    }

    return true; // Successfully deleted
  }
}

export const storage = new MemStorage();