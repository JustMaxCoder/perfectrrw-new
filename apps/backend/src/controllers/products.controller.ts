
import type { Request, Response } from 'express';
import { storage } from '../services/storage.service';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await storage.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await storage.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const images = files?.map(file => `/uploads/${file.filename}`) || [];
    
    const productData = {
      ...req.body,
      price: parseFloat(req.body.price),
      images: images
    };

    const newProduct = await storage.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const newImages = files?.map(file => `/uploads/${file.filename}`) || [];
    
    const productData = {
      ...req.body,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      images: newImages.length > 0 ? newImages : undefined
    };

    const updated = await storage.updateProduct(req.params.id, productData);
    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await storage.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
