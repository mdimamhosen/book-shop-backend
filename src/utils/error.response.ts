import { Response } from "express";
import {
  ErrorDetails,
  ErrorResponse,
  ValidationErrorDetails,
} from "./error.interface";
import { Types } from "mongoose";

export const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};

const sendErrorResponse = (
  res: Response,
  message: string,
  error: unknown,
  statusCode: number = 500,
): void => {
  let errorDetails: ErrorDetails;

  if (error instanceof Error) {
    if (
      "errors" in error &&
      typeof (error as { errors?: unknown }).errors === "object"
    ) {
      errorDetails = {
        name: error.name,
        message: error.message,
        errors: (error as { errors: ValidationErrorDetails }).errors,
        stack: error.stack,
      };
    } else {
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }
  } else {
    errorDetails = {
      name: "UnknownError",
      message: typeof error === "string" ? error : "An unknown error occurred",
    };
  }

  const errorResponse: ErrorResponse = {
    message,
    success: false,
    error: errorDetails,

    stack:
      process.env.NODE_ENV === "development" ? errorDetails.stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
};

export default sendErrorResponse;
