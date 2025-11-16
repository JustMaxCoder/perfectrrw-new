
import type { Express } from "express";
import { storage } from "../services/storage.service";
import { insertOrderSchema } from "@database/schema";

export function registerOrdersRoutes(app: Express) {
  // Create order
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

  // Get all orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
}
