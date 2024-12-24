import { Request, Response } from "express";
import sendErrorResponse from "../../utils/error.response";
import OrderValidationSchema from "./order.validation";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;
    console.log(order);
    const { error, value } = OrderValidationSchema.validate(order);

    if (error) {
      return sendErrorResponse(res, "Invalid order data", error.details, 400);
    }

    const newOrder = await OrderService.createOrder(value);
    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: newOrder,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while creating an order.",
      error,
      500,
    );
  }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.getOrders();
    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      data: orders,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while fetching orders.",
      error,
      500,
    );
  }
};

const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderService.getOrder(orderId, res);

    if (!order) {
      sendErrorResponse(res, "Order not found", null, 404);
    }

    res.status(200).json({
      message: "Order fetched successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while fetching order.",
      error,
      500,
    );
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderService.deleteOrder(orderId);

    if (!order) {
      sendErrorResponse(res, "Order not found", null, 404);
    }

    res.status(200).json({
      message: "Order deleted successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while deleting order.",
      error,
      500,
    );
  }
};

const getRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await OrderService.getRevenue();
    res.status(200).json({
      message: "Revenue fetched successfully",
      success: true,
      data: {
        totalRevenue: revenue,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      "An error occurred while fetching revenue.",
      error,
      500,
    );
  }
};

export const orderController = {
  createOrder,
  getRevenue,
  getOrder,
  deleteOrder,
  getOrders,
};
