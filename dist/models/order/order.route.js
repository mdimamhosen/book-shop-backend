"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.get("/revenue", order_controller_1.orderController.getRevenue);
router.post("/", order_controller_1.orderController.createOrder);
router.get("/", order_controller_1.orderController.getOrders);
router.delete("/:orderId", order_controller_1.orderController.deleteOrder);
router.get("/:orderId", order_controller_1.orderController.getOrder);
exports.orderRouter = router;
