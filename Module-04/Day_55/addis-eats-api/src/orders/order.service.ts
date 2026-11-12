import { Inject, Injectable } from '@nestjs/common';
import { Order, Area } from './order.types';
import { OrderNotFoundError } from './order.errors';
import type { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly repo: OrderRepository,
  ) {}

  find(id: number): Order {
    const order = this.repo.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  findAll(area?: string): Order[] {
    const orders = this.repo.all();

    if (!area) {
      return orders;
    }

    return orders.filter((order) => order.area === area);
  }

  create(dto: CreateOrderDto): Order {
    const orders = this.repo.all();
    const id = orders.length
      ? Math.max(...orders.map((order) => order.id)) + 1
      : 1;

    return this.repo.save({
      id,
      customer: dto.customer,
      area: dto.area,
      items: [],
      status: 'PENDING',
      totalSantim: dto.totalSantim,
    });
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Arada: 5000,
      Kirkos: 4500,
      Yeka: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }
}
