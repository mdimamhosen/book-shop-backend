"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.OrderService = void 0;
const error_response_1 = __importStar(require("../../utils/error.response"));
const book_model_1 = __importDefault(require("../book/book.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = order.product;
        const orderedQuantity = order.quantity;
        const product = yield book_model_1.default.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        if (product.quantity < orderedQuantity) {
            throw new Error("Not enough stock available");
        }
        yield book_model_1.default.findOneAndUpdate({ _id: productId }, {
            $inc: { quantity: -orderedQuantity },
            $set: { inStock: product.quantity - orderedQuantity > 0 },
        }, { new: true });
        const newOrder = yield order_model_1.default.create(order);
        return newOrder;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred while creating the order: ${error.message}`);
        }
        else {
            throw new Error("An unknown error occurred while creating the order");
        }
    }
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find();
        return orders;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred while retrieving orders: ${error.message}`);
        }
        else {
            throw new Error("An unknown error occurred while retrieving orders");
        }
    }
});
const getOrder = (orderId, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, error_response_1.isValidObjectId)(orderId)) {
            (0, error_response_1.default)(res, "Invalid order ID", null, 400);
            return null;
        }
        const order = yield order_model_1.default.findById({ _id: orderId });
        return order || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred while retrieving the order: ${error.message}`);
        }
        else {
            throw new Error("An unknown error occurred while retrieving the order");
        }
    }
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, error_response_1.isValidObjectId)(orderId)) {
            throw new Error("Invalid order ID");
        }
        const order = yield order_model_1.default.findByIdAndUpdate({ _id: orderId }, { isDeleted: true }, { new: true });
        return order || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred while deleting the order: ${error.message}`);
        }
        else {
            throw new Error("An unknown error occurred while deleting the order");
        }
    }
});
const getRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orders = yield order_model_1.default.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$product.price", "$quantity"],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        return ((_a = orders[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred while retrieving revenue: ${error.message}`);
        }
        else {
            throw new Error("An unknown error occurred while retrieving revenue");
        }
    }
});
exports.OrderService = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    getRevenue,
};
