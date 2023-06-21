import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AppService {
  private orders = [];
  private orderCount = 0;
  constructor(
    @Inject('ORDERTRACKER') private orderTrackingClient: ClientProxy,
    @Inject('ANALYTICS') private orderAnalyticsClient: ClientProxy
  ) {}
  createOrder(order: CreateOrderDto) {
    const newOrder = {
      orderNo: `${order.orderNo}-${this.orderCount++}`,
      orderDate: new Date(),
      uuid: uuidv4(),
    };
    this.orders.push(newOrder);
    this.emitOrderCreated(newOrder);
    return newOrder;
  }
  findAll() {
    return this.orders;
  }
  emitOrderCreated(orderCreated) {
    this.orderTrackingClient.emit('order_created', orderCreated);
    this.orderAnalyticsClient.emit('order_created', orderCreated);
  }
  getAnalytics() {
    return this.orderAnalyticsClient.send({ cmd: 'orders_analytics' }, {});
  }
}
