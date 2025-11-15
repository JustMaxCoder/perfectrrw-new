import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProductSchema,
  insertOrderSchema,
  insertGallerySchema,
} from "../shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { fileTypeFromBuffer } from "file-type";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "public", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${nanoid(6)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ 
  storage: storage_multer,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Helper function to delete a file from the filesystem
const deleteFile = (filePath: string): void => {
  try {
    const fullPath = path.join(uploadDir, path.basename(filePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error);
  }
};

// Helper function to validate image file type using file-type library
const validateImageFile = async (buffer: Buffer): Promise<boolean> => {
  try {
    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType) return false;
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedMimeTypes.includes(fileType.mime);
  } catch {
    return false;
  }
};

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
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", upload.array("images", 5), async (req, res) => {
    try {
      console.log("=== CREATE PRODUCT REQUEST ===");
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      console.log("Files:", req.files);
      
      const files = req.files as Express.Multer.File[];
      const images = files ? files.map(f => `/uploads/${f.filename}`) : [];
      
      // If main image is empty but files uploaded, use first uploaded file as main image
      // If no image at all, use a default placeholder
      let mainImage = req.body.image;
      if (!mainImage || mainImage.trim() === '') {
        if (images.length > 0) {
          mainImage = images[0];
        } else {
          mainImage = 'https://via.placeholder.com/400x300?text=No+Image';
        }
      }
      
      // Coerce form data strings to proper types
      const productData = {
        ...req.body,
        image: mainImage,
        price: req.body.price || "0",
        stock: Number(req.body.stock) || 0,
        available: req.body.available === "true" || req.body.available === true,
        shipping: req.body.shipping || "standard",
        images: images.length > 0 ? images : [],
      };
      
      console.log("Product data before validation:", JSON.stringify(productData, null, 2));
      
      const validatedData = insertProductSchema.parse(productData);
      console.log("Validation passed! Creating product...");
      
      const product = await storage.createProduct(validatedData);
      console.log("Product created successfully:", product.id);
      res.status(201).json(product);
    } catch (error) {
      console.error("=== CREATE PRODUCT ERROR ===");
      console.error("Error type:", error?.constructor?.name);
      console.error("Error message:", error instanceof Error ? error.message : String(error));
      if (error && typeof error === 'object' && 'issues' in error) {
        console.error("Zod validation issues:", JSON.stringify((error as any).issues, null, 2));
      }
      console.error("Full error:", error);
      
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
      
      // Handle main image: if empty or undefined, use first uploaded file or keep existing
      let mainImage = req.body.image;
      if (!mainImage || mainImage.trim() === '') {
        if (newImages.length > 0) {
          // Use first uploaded file as main image
          mainImage = newImages[0];
        } else if (existingProduct.image) {
          // Keep existing main image
          mainImage = existingProduct.image;
        } else {
          // No image available at all
          return res.status(400).json({ 
            error: "Invalid product data", 
            details: "Main image is required. Either provide an image URL or upload at least one image file." 
          });
        }
      }
      
      // Coerce form data strings to proper types
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
        // Delete main image file if it's a local upload
        if (product.image && product.image.startsWith('/uploads/')) {
          deleteFile(product.image);
        }
        // Delete all additional images
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

  // Protected photo upload route for products
  app.post("/api/products/:id/photo", upload.single("photo"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Additional MIME type validation using file-type
      const fileBuffer = fs.readFileSync(file.path);
      const isValidImage = await validateImageFile(fileBuffer);
      if (!isValidImage) {
        // Delete the uploaded file
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: "Invalid image file type" });
      }

      const product = await storage.getProduct(req.params.id);
      if (!product) {
        // Delete uploaded file
        fs.unlinkSync(file.path);
        return res.status(404).json({ error: "Product not found" });
      }

      const newPhotoPath = `/uploads/${file.filename}`;
      const isMainPhoto = req.query.main === "true";

      if (isMainPhoto) {
        // Replace main image
        const oldMainImage = product.image;
        
        // Delete old main image file if it was a local upload
        if (oldMainImage && oldMainImage.startsWith('/uploads/')) {
          deleteFile(oldMainImage);
        }

        // Update product with new main image
        await storage.updateProduct(req.params.id, { image: newPhotoPath });
        
        res.json({ 
          success: true, 
          photoUrl: newPhotoPath,
          type: 'main'
        });
      } else {
        // Add to images array
        const updatedImages = [...(product.images || []), newPhotoPath];
        await storage.updateProduct(req.params.id, { images: updatedImages });
        
        res.json({ 
          success: true, 
          photoUrl: newPhotoPath,
          type: 'additional',
          imageIndex: updatedImages.length - 1
        });
      }
    } catch (error) {
      console.error("Photo upload error:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  });

  // Delete specific photo from product
  app.delete("/api/products/:productId/photos/:photoIndex", async (req, res) => {
    try {
      const { productId, photoIndex } = req.params;
      const index = parseInt(photoIndex);

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (!product.images || index < 0 || index >= product.images.length) {
        return res.status(400).json({ error: "Invalid photo index" });
      }

      const photoToDelete = product.images[index];
      
      // Delete file from filesystem
      if (photoToDelete && photoToDelete.startsWith('/uploads/')) {
        deleteFile(photoToDelete);
      }

      // Remove from images array
      const updatedImages = product.images.filter((_, i) => i !== index);
      await storage.updateProduct(productId, { images: updatedImages });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete photo" });
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

      // Send email notification (log to console for now)
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

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const image = (await storage.getAllGalleryImages()).find(img => img.id === req.params.id);
      if (image) {
        // Delete file from filesystem
        const filePath = path.join(uploadDir, path.basename(image.path));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      await storage.deleteGalleryImage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
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

  app.put("/api/settings/:key", async (req, res) => {
    try {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: "Value is required" });
      }
      const setting = await storage.setSetting(req.params.key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Failed to update setting" });
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

  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      await storage.deleteReview(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
