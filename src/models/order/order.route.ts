import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();
router.get("/revenue", orderController.getRevenue);

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.delete("/:orderId", orderController.deleteOrder);
router.get("/:orderId", orderController.getOrder);

export const orderRouter = router;
