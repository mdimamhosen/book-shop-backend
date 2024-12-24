"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BookDataValidation = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1)
        .max(100)
        .nonempty("Please provide a title for the book"),
    author: zod_1.z
        .string()
        .min(1)
        .max(100)
        .nonempty("Please provide an author for the book"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    description: zod_1.z
        .string()
        .min(1)
        .max(500)
        .nonempty("Please provide a description for the book"),
    quantity: zod_1.z.number().nonnegative("Quantity must be a non-negative number"),
    inStock: zod_1.z.boolean(),
    isDeleted: zod_1.z.boolean().optional(),
    category: zod_1.z
        .enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"])
        .refine(value => [
        "Fiction",
        "Science",
        "SelfDevelopment",
        "Poetry",
        "Religious",
    ].includes(value), { message: "Please provide a valid category for the book" }),
});
exports.default = BookDataValidation;
