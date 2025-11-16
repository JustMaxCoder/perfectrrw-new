
import type { Express } from "express";
import { storage } from "../services/storage.service";

export function registerReviewsRoutes(app: Express) {
  // Get product reviews
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // Create review
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

  // Delete review
  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      await storage.deleteReview(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
}
