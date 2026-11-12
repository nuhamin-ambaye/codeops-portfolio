import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from "@nestjs/common";
import { DishesService } from "./dishes.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { Dish } from "./dish.types";

@Controller("dishes")
export class DishesController {
    constructor(private readonly dishes: DishesService) {}

    @Get()
    findAll(
        @Query("restaurantId", ParseIntPipe) restaurantId?: number,
    ): Dish[] {
        return this.dishes.findAll(restaurantId);
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number): Dish {
        return this.dishes.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateDishDto): Dish {
        return this.dishes.create(dto);
    }
}