import { Module } from "@nestjs/common";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { DishesModule } from "./dishes/dishes.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentsModule } from "./payments/payments.module";

@Module({
    imports: [
        RestaurantsModule,
        DishesModule,
        OrdersModule,
        PaymentsModule,
    ],
})
export class AppModule {}