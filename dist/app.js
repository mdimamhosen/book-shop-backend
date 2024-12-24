"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./models/book/book.route");
const order_route_1 = require("./models/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api/products", book_route_1.bookRouter);
app.use("/api/orders", order_route_1.orderRouter);
app.get("/", (req, res) => {
    res.send("Welcome to the book store...");
});
exports.default = app;
