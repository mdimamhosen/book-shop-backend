"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const error_response_1 = __importDefault(require("../../utils/error.response"));
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        console.log(order);
        const { error, value } = order_validation_1.default.validate(order);
        if (error) {
            return (0, error_response_1.default)(res, "Invalid order data", error.details, 400);
        }
        const newOrder = yield order_service_1.OrderService.createOrder(value);
        res.status(201).json({
            message: "Order created successfully",
            success: true,
            data: newOrder,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while creating an order.", error, 500);
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getOrders();
        res.status(200).json({
            message: "Orders fetched successfully",
            success: true,
            data: orders,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while fetching orders.", error, 500);
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield order_service_1.OrderService.getOrder(orderId, res);
        if (!order) {
            (0, error_response_1.default)(res, "Order not found", null, 404);
        }
        res.status(200).json({
            message: "Order fetched successfully",
            success: true,
            data: order,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while fetching order.", error, 500);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield order_service_1.OrderService.deleteOrder(orderId);
        if (!order) {
            (0, error_response_1.default)(res, "Order not found", null, 404);
        }
        res.status(200).json({
            message: "Order deleted successfully",
            success: true,
            data: order,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while deleting order.", error, 500);
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.OrderService.getRevenue();
        res.status(200).json({
            message: "Revenue fetched successfully",
            success: true,
            data: {
                totalRevenue: revenue,
            },
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while fetching revenue.", error, 500);
    }
});
exports.orderController = {
    createOrder,
    getRevenue,
    getOrder,
    deleteOrder,
    getOrders,
};
