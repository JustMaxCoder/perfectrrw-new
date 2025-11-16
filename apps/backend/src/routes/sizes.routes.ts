
import type { Express } from "express";
import { storage } from "../services/storage.service";

export function registerSizesRoutes(app: Express) {
  // Get all sizes
  app.get("/api/sizes", async (req, res) => {
    try {
      const sizes = await storage.getAllSizes();
      res.json(sizes);
    } catch {
      res.status(500).json({ error: "Failed to fetch sizes" });
    }
  });

  // Create size
  app.post("/api/sizes", async (req, res) => {
    try {
      const size = await storage.createSize(req.body);
      res.status(201).json(size);
    } catch (error) {
      res.status(400).json({ error: "Failed to create size" });
    }
  });

  // Delete size
  app.delete("/api/sizes/:id", async (req, res) => {
    try {
      await storage.deleteSize(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete size" });
    }
  });
}
