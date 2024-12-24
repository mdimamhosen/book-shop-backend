import { Response } from "express";
import sendErrorResponse, { isValidObjectId } from "../../utils/error.response";
import BookModel from "../book/book.model";
import { OrderInterface } from "./order.interface";
import OrderModel from "./order.model";

const createOrder = async (order: OrderInterface): Promise<OrderInterface> => {
  try {
    const productId = order.product;
    const orderedQuantity = order.quantity;

    const product = await BookModel.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.quantity < orderedQuantity) {
      throw new Error("Not enough stock available");
    }

    await BookModel.findOneAndUpdate(
      { _id: productId },
      {
        $inc: { quantity: -orderedQuantity },
        $set: { inStock: product.quantity - orderedQuantity > 0 },
      },
      { new: true },
    );

    const newOrder = await OrderModel.create(order);

    return newOrder;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while creating the order: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while creating the order");
    }
  }
};

const getOrders = async (): Promise<OrderInterface[]> => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while retrieving orders: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while retrieving orders");
    }
  }
};

const getOrder = async (
  orderId: string,
  res: Response,
): Promise<OrderInterface | null> => {
  try {
    if (!isValidObjectId(orderId)) {
      sendErrorResponse(res, "Invalid order ID", null, 400);
      return null;
    }

    const order = await OrderModel.findById({ _id: orderId });

    return order || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while retrieving the order: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while retrieving the order");
    }
  }
};

const deleteOrder = async (orderId: string): Promise<OrderInterface | null> => {
  try {
    if (!isValidObjectId(orderId)) {
      throw new Error("Invalid order ID");
    }
    const order = await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { isDeleted: true },
      { new: true },
    );
    return order || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while deleting the order: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while deleting the order");
    }
  }
};

const getRevenue = async (): Promise<number> => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$product.price", "$quantity"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    return orders[0]?.totalRevenue || 0;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while retrieving revenue: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while retrieving revenue");
    }
  }
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  getRevenue,
};
