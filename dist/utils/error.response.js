"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
const mongoose_1 = require("mongoose");
const isValidObjectId = (id) => {
    return mongoose_1.Types.ObjectId.isValid(id);
};
exports.isValidObjectId = isValidObjectId;
const sendErrorResponse = (res, message, error, statusCode = 500) => {
    let errorDetails;
    if (error instanceof Error) {
        if ("errors" in error &&
            typeof error.errors === "object") {
            errorDetails = {
                name: error.name,
                message: error.message,
                errors: error.errors,
                stack: error.stack,
            };
        }
        else {
            errorDetails = {
                name: error.name,
                message: error.message,
                stack: error.stack,
            };
        }
    }
    else {
        errorDetails = {
            name: "UnknownError",
            message: typeof error === "string" ? error : "An unknown error occurred",
        };
    }
    const errorResponse = {
        message,
        success: false,
        error: errorDetails,
        stack: process.env.NODE_ENV === "development" ? errorDetails.stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
};
exports.default = sendErrorResponse;
