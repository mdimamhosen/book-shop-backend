"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", book_controller_1.bookController.createBook);
router.get("/", book_controller_1.bookController.getAllBooks);
router.get("/:productId", book_controller_1.bookController.getBookById);
router.put("/:productId", book_controller_1.bookController.updateBook);
router.delete("/:productId", book_controller_1.bookController.deleteBook);
exports.bookRouter = router;
