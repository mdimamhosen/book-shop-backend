"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const OrderValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email address",
        "any.required": "Email is required",
    }),
    product: joi_1.default.string()
        .custom((value, helpers) => {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
        .required()
        .messages({
        "any.required": "Product is required",
        "any.invalid": "Invalid product ID",
    }),
    quantity: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .custom((value, helpers) => {
        const coercedValue = Number(value);
        if (isNaN(coercedValue)) {
            return helpers.error("number.base");
        }
        return coercedValue;
    })
        .messages({
        "number.integer": "Quantity must be an integer",
        "number.positive": "Quantity must be a positive number",
        "any.required": "Quantity is required",
    }),
    totalPrice: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .custom((value, helpers) => {
        const coercedValue = Number(value);
        if (isNaN(coercedValue)) {
            return helpers.error("number.base");
        }
        return coercedValue;
    })
        .messages({
        "number.integer": "Total price must be an integer",
        "number.positive": "Total price must be a positive number",
        "any.required": "Total price is required",
    }),
    isDeleted: joi_1.default.boolean().optional(),
});
exports.default = OrderValidationSchema;
