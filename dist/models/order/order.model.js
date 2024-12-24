"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const OrderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = OrderModel;
