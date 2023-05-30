import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://someotherdomain.com",
  optionSuccessStatus: 200,
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  cors(corsOptions);
  try {
    const authorizationHeader = req.headers.authorization;
    // @ts-ignore
    const token = authorizationHeader.split(" ")[1];
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
