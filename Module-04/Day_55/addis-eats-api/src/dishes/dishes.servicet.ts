import { Dish } from "./dish.types";
import { DishNotFoundError, RestaurantNotFoundError } from "./dishes.errors";
import { DishRepository } from "./dishes.repository";
import { RestaurantRepository } from "../restaurants/restaurants.repository";
import { CreateDishDto } from "./dto/create-dish.dto";

export class DishesService {
    constructor(
        private readonly repo: DishRepository,
        private readonly restaurants: RestaurantRepository,
    ) {}

    findAll(restaurantId?: number): Dish[] {
        const rows = this.repo.all();

        return restaurantId
            ? rows.filter((dish) => dish.restaurantId === restaurantId)
            : rows;
    }

    findOne(id: number): Dish {
        const dish = this.repo.byId(id);

        if (!dish) {
            throw new DishNotFoundError(id);
        }

        return dish;
    }

    create(dto: CreateDishDto): Dish {
        const restaurant = this.restaurants.byId(dto.restaurantId);

        if (!restaurant) {
            throw new RestaurantNotFoundError(dto.restaurantId);
        }

        const id = Math.max(0, ...this.repo.all().map((dish) => dish.id)) + 1;

        return this.repo.save({
            ...dto,
            id,
        });
    }
}