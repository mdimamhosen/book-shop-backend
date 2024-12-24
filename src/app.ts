import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./models/book/book.route";
import { orderRouter } from "./models/order/order.route";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", bookRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the book store...");
});

export default app;
