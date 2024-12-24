import { z } from "zod";

const BookDataValidation = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .nonempty("Please provide a title for the book"),
  author: z
    .string()
    .min(1)
    .max(100)
    .nonempty("Please provide an author for the book"),
  price: z.number().positive("Price must be a positive number"),
  description: z
    .string()
    .min(1)
    .max(500)
    .nonempty("Please provide a description for the book"),
  quantity: z.number().nonnegative("Quantity must be a non-negative number"),
  inStock: z.boolean(),
  isDeleted: z.boolean().optional(),
  category: z
    .enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"])
    .refine(
      value =>
        [
          "Fiction",
          "Science",
          "SelfDevelopment",
          "Poetry",
          "Religious",
        ].includes(value),
      { message: "Please provide a valid category for the book" },
    ),
});

export default BookDataValidation;
