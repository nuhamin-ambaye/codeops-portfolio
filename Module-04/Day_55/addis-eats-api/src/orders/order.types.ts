export type Area = "Bole" | "Arada" | "Kirkos" | "Yeka";

export type OrderStatus =
    | "PENDING"
    | "PAID"
    | "DECLINED"
    | "CANCELLED";

export interface Dish {
    id: number;
    name: string;
    priceSantim: number;
}

export interface Order {
    id: number;
    customer: string;
    area: Area;
    items: Dish[];
    status: OrderStatus;
    totalSantim: number;
}