import express, { Request, Response } from "express";
import { OrderBody, Order, OrderItem, OrderStore } from "../models/order";
import { verifyAuthToken } from "../server";

const store = new OrderStore();

const completedOrderByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrderByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrderByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: OrderBody = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      orderstatus: req.body.orderstatus,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/complete/:userId", verifyAuthToken, completedOrderByUser);
  app.get("/orders/:userId", verifyAuthToken, currentOrderByUser);
  app.post("/orders", verifyAuthToken, create);
};

export default orderRoutes;
