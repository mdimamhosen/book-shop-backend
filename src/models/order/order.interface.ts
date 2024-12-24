import mongoose from "mongoose";

export interface OrderInterface {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  isDeleted?: boolean;
}
