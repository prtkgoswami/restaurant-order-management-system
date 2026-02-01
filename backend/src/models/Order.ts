import mongoose, { Schema, Document } from "mongoose";
import { ORDER_STATUSES, OrderStatus } from "./order.types";

export interface OrderItem {
  pizzaId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerDetails {
  name: string;
  contactNumber: string;
}

export interface OrderPricing {
  totalMRP: number;
  taxRate: number;
  taxAmount: number;
  convenienceFeeRate: number;
  convenienceFeeAmount: number;
  finalAmount: number;
}

export interface OrderDocument extends Document {
  items: OrderItem[];
  customer: CustomerDetails;
  pricing: OrderPricing;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    pizzaId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const CustomerDetailsSchema = new Schema<CustomerDetails>(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { _id: false }
);

const OrderPricingSchema = new Schema<OrderPricing>(
  {
    totalMRP: { type: Number, required: true, min: 0 },
    taxRate: { type: Number, required: true, min: 0 },
    taxAmount: { type: Number, required: true, min: 0 },
    convenienceFeeRate: { type: Number, required: true, min: 0 },
    convenienceFeeAmount: { type: Number, required: true, min: 0 },
    finalAmount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
  {
    items: { type: [OrderItemSchema], required: true },
    customer: { type: CustomerDetailsSchema, required: true },
    pricing: { type: OrderPricingSchema, required: true },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "PLACED",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        const obj = ret as any;
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        return obj;
      },
    },
  }
);

OrderSchema.index({ status: 1, createdAt: -1 });

export const Order = mongoose.model<OrderDocument>("order", OrderSchema);
