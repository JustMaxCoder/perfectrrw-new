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
} from "@database/schema";
import { ZodError } from "zod";
import { upload, deleteFile, validateImageFile } from "../middleware/upload.middleware";
import path from "path";
import fs from "fs";
import * as productsController from "../controllers/products.controller";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", productsController.getProducts);
  app.get("/api/products/:id", productsController.getProductById);
  app.post("/api/products", upload.array('images', 5), productsController.createProduct);
  app.put("/api/products/:id", upload.array('images', 5), productsController.updateProduct);
  app.delete("/api/products/:id", productsController.deleteProduct);

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