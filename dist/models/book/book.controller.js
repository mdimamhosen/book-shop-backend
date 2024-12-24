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
exports.bookController = void 0;
const book_validation_1 = __importDefault(require("./book.validation"));
const book_service_1 = require("./book.service");
const error_response_1 = __importDefault(require("../../utils/error.response"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const ValidateData = book_validation_1.default.safeParse(book);
        if (!ValidateData.success) {
            (0, error_response_1.default)(res, "Validation Error", ValidateData.error, 422);
            return;
        }
        const validatedData = ValidateData.data;
        const newBook = yield book_service_1.BookService.createBook(validatedData);
        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data: newBook,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while creating the book", error, 500);
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const books = yield book_service_1.BookService.getAllBooks(searchTerm);
        res.status(200).json({
            message: "Books retrieved successfully",
            success: true,
            data: books,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while retrieving books", error, 500);
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const book = yield book_service_1.BookService.getBookById(productId);
        if (!book) {
            (0, error_response_1.default)(res, "Book not found", null, 404);
            return;
        }
        res.status(200).json({
            message: "Book retrieved successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while retrieving the book", error, 500);
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const book = req.body;
        const updatedBook = yield book_service_1.BookService.updateBook(productId, book, res);
        if (!updatedBook) {
            (0, error_response_1.default)(res, "Book not found", null, 404);
            return;
        }
        res.status(200).json({
            message: "Book updated successfully",
            success: true,
            data: updatedBook,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while updating the book", error, 500);
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const book = yield book_service_1.BookService.deleteBook(productId);
        if (!book) {
            (0, error_response_1.default)(res, "Book not found", null, 404);
            return;
        }
        res.status(200).json({
            message: "Book deleted successfully",
            success: true,
            data: book,
        });
    }
    catch (error) {
        (0, error_response_1.default)(res, "An error occurred while deleting the book", error, 500);
    }
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
