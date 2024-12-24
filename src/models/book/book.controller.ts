import { Request, Response } from "express";
import BookDataValidation from "./book.validation";
import { BookService } from "./book.service";
import sendErrorResponse from "../../utils/error.response";

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = req.body;
    const ValidateData = BookDataValidation.safeParse(book);

    if (!ValidateData.success) {
      sendErrorResponse(res, "Validation Error", ValidateData.error, 422);
      return;
    }
    const validatedData = ValidateData.data;
    const newBook = await BookService.createBook(validatedData);
    res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: newBook,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while creating the book",
      error,
      500,
    );
  }
};

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    const books = await BookService.getAllBooks(searchTerm);
    res.status(200).json({
      message: "Books retrieved successfully",
      success: true,
      data: books,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while retrieving books",
      error,
      500,
    );
  }
};

const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const book = await BookService.getBookById(productId);

    if (!book) {
      sendErrorResponse(res, "Book not found", null, 404);
      return;
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      success: true,
      data: book,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while retrieving the book",
      error,
      500,
    );
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const book = req.body;
    const updatedBook = await BookService.updateBook(productId, book, res);

    if (!updatedBook) {
      sendErrorResponse(res, "Book not found", null, 404);
      return;
    }

    res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while updating the book",
      error,
      500,
    );
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const book = await BookService.deleteBook(productId);

    if (!book) {
      sendErrorResponse(res, "Book not found", null, 404);
      return;
    }

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      data: book,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while deleting the book",
      error,
      500,
    );
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
