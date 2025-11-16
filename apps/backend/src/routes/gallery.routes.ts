
import type { Express } from "express";
import { storage } from "../services/storage.service";
import { upload } from "../middleware";

export function registerGalleryRoutes(app: Express) {
  // Get all gallery images
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Upload gallery image
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

  // Delete gallery image
  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGalleryImage(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });
}
