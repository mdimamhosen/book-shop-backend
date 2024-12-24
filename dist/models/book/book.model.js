"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the book"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Please provide an author for the book"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for the book"],
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: "Price must be a positive number",
        },
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the book"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity for the book"],
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: "Quantity must be a non-negative number",
        },
    },
    inStock: {
        type: Boolean,
        required: [true, "Please provide the availability of the book"],
    },
    category: {
        type: String,
        enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
        required: [true, "Please provide a category for the book"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
BookSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
BookSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
BookSchema.pre("aggregate", function (next) {
    const pipeline = this.pipeline();
    if (pipeline && Array.isArray(pipeline)) {
        pipeline.unshift({
            $match: {
                isDeleted: { $ne: true },
            },
        });
    }
    next();
});
const BookModel = (0, mongoose_1.model)("Book", BookSchema);
exports.default = BookModel;
