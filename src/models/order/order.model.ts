import { Schema, model } from "mongoose";
import { OrderInterface } from "./order.interface";

const orderSchema = new Schema<OrderInterface>({
  email: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const OrderModel = model<OrderInterface>("Order", orderSchema);

export default OrderModel;
