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

export type OrderItem ={
    pizzaId: string;
    name: string;
    price: number;
    quantity: number;
}

export const OrderStatus = [
 "PLACED", "PREPARING", "READY", "COMPLETED"
] as const;

export type Order = {
    customer: Customer;
    pricing: Pricing;
    items: OrderItem[];
    id?: string;
    status?: typeof OrderStatus[number];
    createdAt?: string;
    updatedAt?: string;
}