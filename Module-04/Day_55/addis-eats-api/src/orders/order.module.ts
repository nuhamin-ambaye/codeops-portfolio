import { Module } from "@nestjs/common";
import { OrdersController } from "./order.controller";
import { OrderService } from "./order.service";
import { InMemoryOrderRepository } from "./order.repository";

@Module({
    controllers: [OrdersController],
    providers: [
        OrderService,
        {
            provide: "ORDER_REPOSITORY",
            useClass: InMemoryOrderRepository,
        },
    ],
    exports: [OrderService],
})
export class OrdersModule {}