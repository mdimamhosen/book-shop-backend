import express from "express";
import { bookController } from "./book.controller";

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:productId", bookController.getBookById);
router.put("/:productId", bookController.updateBook);
router.delete("/:productId", bookController.deleteBook);

export const bookRouter = router;
