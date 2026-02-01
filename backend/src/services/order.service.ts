import { CustomerDetails, Order, OrderItem, OrderPricing } from "../models/Order";
import { OrderStatus } from "../models/order.types";


const TAX_RATE = 0.055;
const CONVENIENCE_FEE_RATE = 0.10;
const EPSILON = 0.01;

const round = (value: number) =>
  Math.round(value * 100) / 100;

export const createOrder = async (
  items: OrderItem[],
  customer: CustomerDetails,
  clientPricing: OrderPricing
) => {
  const totalMRP = round(
    items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
  );

  const taxAmount = round(totalMRP * TAX_RATE);
  const convenienceFeeAmount = round(
    totalMRP * CONVENIENCE_FEE_RATE
  );
  const finalAmount = round(
    totalMRP + taxAmount + convenienceFeeAmount
  );

  if (
    Math.abs(clientPricing.totalMRP - totalMRP) > EPSILON ||
    Math.abs(clientPricing.taxAmount - taxAmount) > EPSILON ||
    Math.abs(clientPricing.convenienceFeeAmount - convenienceFeeAmount) > EPSILON ||
    Math.abs(clientPricing.finalAmount - finalAmount) > EPSILON
  ) {
    throw new Error("Pricing mismatch");
  }

  const order = await Order.create({
    items,
    customer,
    pricing: {
      totalMRP,
      taxRate: TAX_RATE,
      taxAmount,
      convenienceFeeRate: CONVENIENCE_FEE_RATE,
      convenienceFeeAmount,
      finalAmount,
    },
    status: "PLACED",
  });

  return order;
};

export const getOrders = async () => {
  return Order.find({ status: { $ne: "COMPLETED" } }).sort({ createdAt: 1 });
};

export const getOrderById = async (id: string) => {
  return Order.findById(id);
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  return Order.findByIdAndUpdate(id, { status }, { new: true });
};
