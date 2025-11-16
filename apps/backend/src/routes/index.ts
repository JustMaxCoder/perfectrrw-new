import type { Express } from "express";
import { createServer, type Server } from "http";

// Import all route modules here in the future
// For now, we'll keep the main routes in this file for faster migration
// TODO: Split into separate files: products.routes.ts, orders.routes.ts, etc.

import { storage } from "../services/storage.service";
import {
  insertProductSchema,
  insertOrderSchema,
  insertGallerySchema,
  insertProductSizeSchema,
} from "../../../../packages/database/schema/index";
import { ZodError } from "zod";
import { upload, deleteFile, validateImageFile } from "../middleware/upload.middleware";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.trim() === '') {
        return res.json([]);
      }

      const allProducts = await storage.getAllProducts();
      const searchTerm = query.toLowerCase().trim();
      
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );

      res.json(filtered.slice(0, 8));
    } catch {
      res.status(500).json({ error: "Failed to search products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const productWithSizes = await storage.getProductWithSizes(req.params.id);
      if (!productWithSizes) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(productWithSizes);
    } catch {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", upload.array("images", 5), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const images = files ? files.map(f => `/uploads/${f.filename}`) : [];
      
      let mainImage = req.body.image;
      if (!mainImage || mainImage.trim() === '') {
        if (images.length > 0) {
          mainImage = images[0];
        } else {
          mainImage = 'https://via.placeholder.com/400x300?text=No+Image';
        }
      }
      
      const productData = {
        ...req.body,
        image: mainImage,
        price: req.body.price || "0",
        stock: Number(req.body.stock) || 0,
        available: req.body.available === "true" || req.body.available === true,
        shipping: req.body.shipping || "standard",
        images: images.length > 0 ? images : [],
      };
      
      const validatedData = insertProductSchema.parse(productData);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      const errorDetails = error instanceof Error ? error.message : String(error);
      res.status(400).json({ 
        error: "Invalid product data", 
        details: errorDetails,
        validationIssues: (error && typeof error === 'object' && 'issues' in error) ? (error as any).issues : undefined
      });
    }
  });

  app.put("/api/products/:id", upload.array("images", 5), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const newImages = files ? files.map(f => `/uploads/${f.filename}`) : [];
      
      const existingProduct = await storage.getProduct(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const images = [...(existingProduct.images || []), ...newImages];
      
      let mainImage = req.body.image;
      if (!mainImage || mainImage.trim() === '') {
        if (newImages.length > 0) {
          mainImage = newImages[0];
        } else if (existingProduct.image) {
          mainImage = existingProduct.image;
        } else {
          return res.status(400).json({ 
            error: "Invalid product data", 
            details: "Main image is required." 
          });
        }
      }
      
      const updateData = {
        ...req.body,
        image: mainImage,
        price: req.body.price !== undefined ? req.body.price : undefined,
        stock: req.body.stock !== undefined ? Number(req.body.stock) : undefined,
        available: req.body.available !== undefined ? (req.body.available === "true" || req.body.available === true) : undefined,
        shipping: req.body.shipping,
        images,
      };
      
      const product = await storage.updateProduct(req.params.id, updateData);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (product) {
        if (product.image && product.image.startsWith('/uploads/')) {
          deleteFile(product.image);
        }
        if (product.images && product.images.length > 0) {
          product.images.forEach(img => {
            if (img.startsWith('/uploads/')) {
              deleteFile(img);
            }
          });
        }
      }
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Size routes
  app.get("/api/sizes", async (req, res) => {
    try {
      const sizes = await storage.getAllSizes();
      res.json(sizes);
    } catch {
      res.status(500).json({ error: "Failed to fetch sizes" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder({
        ...validatedData,
        status: "pending",
      });

      console.log("\n=== ORDER CONFIRMATION EMAIL ===");
      console.log(`To: ${order.customerEmail}`);
      console.log(`Subject: Potwierdzenie zamówienia #${order.id.slice(0, 8)}`);
      console.log(`\nSzanowny/a ${order.customerName},`);
      console.log(`\nDziękujemy za złożenie zamówienia w BHP Perfect!`);
      console.log(`\nNumer zamówienia: ${order.id}`);
      console.log(`Kwota: ${order.total} zł`);
      console.log(`Adres dostawy: ${order.customerAddress}`);
      console.log(`Status: Oczekuje na realizację`);
      console.log("\nSkontaktujemy się z Tobą wkrótce.");
      console.log("================================\n");

      res.status(201).json(order);
    } catch {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", upload.single("image"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const galleryImage = await storage.createGalleryImage({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      });
      res.status(201).json(galleryImage);
    } catch (error) {
      res.status(400).json({ error: "Failed to upload image" });
    }
  });

  // Settings routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  // Reviews routes
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:productId/reviews", async (req, res) => {
    try {
      const review = await storage.createReview({
        productId: req.params.productId,
        userId: req.body.userId || null,
        customerName: req.body.customerName,
        rating: parseInt(req.body.rating),
        comment: req.body.comment,
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: "Failed to create review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
