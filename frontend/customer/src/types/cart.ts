export type CartItem = {
    id: string;
    pizzaId?: string;
    name: string;
    price: number;
    quantity: number;
}

export type Cart = Record<string, CartItem>;