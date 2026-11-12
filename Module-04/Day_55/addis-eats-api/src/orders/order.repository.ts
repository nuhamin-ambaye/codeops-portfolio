import { Order } from "./order.types";

export interface OrderRepository {
    byId(id: number): Order | undefined;
    all(): Order[];
    save(order: Order): Order;
}

export class InMemoryOrderRepository implements OrderRepository {
    private readonly orders = new Map<number, Order>();

    constructor(orders: Order[] = []) {
        for (const order of orders) {
            this.orders.set(order.id, order);
        }
    }

    byId(id: number): Order | undefined {
        return this.orders.get(id);
    }

    all(): Order[] {
        return [...this.orders.values()];
    }

    save(order: Order): Order {
        this.orders.set(order.id, order);
        return order;
    }
}