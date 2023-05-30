import express, { Request, Response } from "express";
import { ProductBody, ProductStore } from "../models/product";
import { verifyAuthToken } from "../server";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const productsByCategory = async (req: Request, res: Response) => {
  const products = await store.productsByCategory(req.params.category);
  res.json(products);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: ProductBody = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const productRoutes = (app: express.Application) => {
  app.get("/products", verifyAuthToken, index);
  app.get("/products/:id", verifyAuthToken, show);
  app.get("/products/category/:category", verifyAuthToken, productsByCategory);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", verifyAuthToken, destroy);
};

export default productRoutes;
