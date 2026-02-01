export const ORDER_STATUSES = [
    "PLACED",
    "PREPARING",
    "READY",
    "COMPLETED"
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];