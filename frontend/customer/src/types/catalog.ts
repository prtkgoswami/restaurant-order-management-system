export type Pizza = {
    id: string;
    name: string;
    description: string;
    price: number;
    isAvailable?: boolean;
    imageUrl?: string;
}

export type Catalog = Pizza[];