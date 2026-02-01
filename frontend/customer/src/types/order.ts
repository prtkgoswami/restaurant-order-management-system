import type { CartItem } from "./cart";

export type Pricing = {
    totalMRP: number;
    convenienceFeeRate: number;
    convenienceFeeAmount: number;
    taxRate: number;
    taxAmount: number;
    finalAmount: number;
}

export type Customer = {
    name: string;
    contactNumber: string;
}

export const OrderStatus = [
 "PLACED", "PREPARING", "READY", "COMPLETED"
] as const;

export type Order = {
    customer: Customer;
    pricing: Pricing;
    items: CartItem[];
    id?: string;
    status?: typeof OrderStatus[number];
    createdAt?: Date;
    updatedAt?: Date;
}