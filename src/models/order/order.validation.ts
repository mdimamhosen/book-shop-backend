import Joi from "joi";
import { Types } from "mongoose";
import { OrderInterface } from "./order.interface";

const OrderValidationSchema: Joi.ObjectSchema<OrderInterface> = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),

  product: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.required": "Product is required",
      "any.invalid": "Invalid product ID",
    }),

  quantity: Joi.number()
    .integer()
    .positive()
    .required()
    .custom((value, helpers) => {
      const coercedValue = Number(value);
      if (isNaN(coercedValue)) {
        return helpers.error("number.base");
      }
      return coercedValue;
    })
    .messages({
      "number.integer": "Quantity must be an integer",
      "number.positive": "Quantity must be a positive number",
      "any.required": "Quantity is required",
    }),

  totalPrice: Joi.number()
    .integer()
    .positive()
    .required()
    .custom((value, helpers) => {
      const coercedValue = Number(value);
      if (isNaN(coercedValue)) {
        return helpers.error("number.base");
      }
      return coercedValue;
    })
    .messages({
      "number.integer": "Total price must be an integer",
      "number.positive": "Total price must be a positive number",
      "any.required": "Total price is required",
    }),

  isDeleted: Joi.boolean().optional(),
});

export default OrderValidationSchema;
