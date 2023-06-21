import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  private orders = [];
  constructor(@Inject('ORDERTRACKER') private analyticsClient: ClientProxy) {}
  createOrder(order: any) {
    const newOrder = { ...order, uuid: uuidv4() };
    this.orders.push(newOrder);
    this.analyticsClient.emit('order_created', newOrder);
    return newOrder;
  }
  findAll() {
    return this.orders;
  }
}
