import { model, Schema } from "mongoose";

export interface Pizza {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
}

const PizzaSchema = new Schema<Pizza>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Catalog = model<Pizza>("catalog", PizzaSchema);
