import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { CreateOrderEvent } from './create-order-event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  count(): number {
    return this.appService.count();
  }

  @EventPattern('order_created')
  handleOrderCreatedEvent(data: CreateOrderEvent) {
    console.log('ANALYTICS handleOrderCreatedEvent', data);
    this.appService.insertOne(data);
  }
  @MessagePattern({ cmd: 'orders_analytics' })
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
