import { Injectable } from "@nestjs/common";
import { Dish } from "./dish.types";
import { SEED } from "./dishes.seed";

export interface DishRepository {
    all(): Dish[];
    byId(id: number): Dish | undefined;
    byRestaurantId(restaurantId: number): Dish[];
    save(dish: Dish): Dish;
}

@Injectable()
export class InMemoryDishRepository implements DishRepository {
    private readonly rows = new Map<number, Dish>(
        SEED.map((dish) => [dish.id, dish]),
    );

    all() {
        return [...this.rows.values()];
    }

    byId(id: number) {
        return this.rows.get(id);
    }

    byRestaurantId(restaurantId: number) {
        return [...this.rows.values()].filter(
            (dish) => dish.restaurantId === restaurantId,
        );
    }

    save(dish: Dish) {
        this.rows.set(dish.id, dish);
        return dish;
    }
}