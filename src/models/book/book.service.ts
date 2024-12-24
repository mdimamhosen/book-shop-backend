// services/book.service.ts
import { Response } from "express";
import sendErrorResponse, { isValidObjectId } from "../../utils/error.response";
import { BookInterface } from "./book.interface";
import BookModel from "./book.model";

const createBook = async (book: BookInterface): Promise<BookInterface> => {
  try {
    return await BookModel.create(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while creating the book: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while creating the book");
    }
  }
};

const getAllBooks = async (searchTerm?: string): Promise<BookInterface[]> => {
  try {
    const query = searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const books = await BookModel.find(query).exec();
    return books;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while retrieving books: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while retrieving books");
    }
  }
};

const getBookById = async (id: string): Promise<BookInterface | null> => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid book ID");
    }
    return await BookModel.findById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while retrieving the book: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while retrieving the book");
    }
  }
};

const updateBook = async (
  id: string,
  book: BookInterface,
  res: Response,
): Promise<BookInterface | null> => {
  try {
    if (!isValidObjectId(id)) {
      sendErrorResponse(res, "Invalid book ID", null, 400);
      return null;
    }
    return await BookModel.findByIdAndUpdate(id, book, { new: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while updating the book: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while updating the book");
    }
  }
};

const deleteBook = async (id: string): Promise<BookInterface | null> => {
  try {
    return await BookModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while deleting the book: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while deleting the book");
    }
  }
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
