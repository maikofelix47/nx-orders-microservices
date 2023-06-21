import { Injectable } from '@nestjs/common';
import { CreateOrderEvent } from './create-order-event';

@Injectable()
export class AppService {
  private orders = [];

  count() {
    return this.orders.length;
  }
  insertOne(order: CreateOrderEvent) {
    this.orders.push(order);
  }
  getAnalytics() {
    return this.orders;
  }
}
