import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserBody, UserAuthenticate, UserStore } from "../models/user";
import { verifyAuthToken } from "../server";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: UserBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    // @ts-ignore
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user: UserAuthenticate = {
      userName: req.body.userName,
      password: req.body.password,
    };

    const userInformation = await store.authenticate(
      user.userName,
      user.password
    );
    // @ts-ignore
    var token = jwt.sign({ user: userInformation }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/users/logIn", authenticate);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default userRoutes;
