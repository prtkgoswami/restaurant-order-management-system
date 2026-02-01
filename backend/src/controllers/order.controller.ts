import { Request, Response } from "express";
import * as OrderService from "../services/order.service";
import { ORDER_STATUSES } from "../models/order.types";
import { getIO, printSockets } from "../socket";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, customer, pricing } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid Order Items" });
    }

    if (
      !customer ||
      typeof customer.name !== "string" ||
      typeof customer.contactNumber !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid customer details",
      });
    }

    if (
      !pricing ||
      typeof pricing.totalMRP !== "number" ||
      typeof pricing.finalAmount !== "number"
    ) {
      return res.status(400).json({
        message: "Invalid pricing details",
      });
    }

    const order = await OrderService.createOrder(items, customer, pricing);

    void printSockets();
    getIO().emit("order_created", {
      order,
    });

    res.status(201).json(order);
  } catch (err) {
    if ((err as Error).message === "Pricing mismatch") {
      return res.status(400).json({
        message: "Pricing mismatch. Please refresh and try again.",
      });
    }

    console.error("Create order failed:", err);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

export const getOrders = async (_: Request, res: Response) => {
  const orders = await OrderService.getOrders();
  res.status(200).json(orders);
};

export const getOrdersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Misisng Order ID" });
  }

  const order = await OrderService.getOrderById(id);
  res.status(200).json(order);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = await OrderService.updateOrderStatus(id, status);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  void printSockets();
  getIO().to(id).emit("order_status_updated", {
    orderId: id,
    status: order.status,
    updatedAt: order.updatedAt,
  });
  getIO().emit("order_status_updated", {
    orderId: id,
    status: order.status,
    updatedAt: order.updatedAt,
  });

  res.status(200).json(order);
};
