import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AppService {
  private orders = [];
  private orderCount = 0;
  constructor(@Inject('ORDERTRACKER') private analyticsClient: ClientProxy) {}
  createOrder(order: CreateOrderDto) {
    const newOrder = {
      orderNo: `${order.orderNo}-${this.orderCount++}`,
      orderDate: new Date(),
      uuid: uuidv4(),
    };
    this.orders.push(newOrder);
    this.analyticsClient.emit('order_created', newOrder);
    return newOrder;
  }
  findAll() {
    return this.orders;
  }
}
