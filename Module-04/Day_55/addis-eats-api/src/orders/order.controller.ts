import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrderService) {}

  @Get()
  findAll(@Query('area') area?: string) {
    return this.orders.findAll(area);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orders.find(Number(id));
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto);
  }
}
