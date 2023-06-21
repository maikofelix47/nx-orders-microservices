import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderEvent } from './create-order.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern('order_created')
  handleOrderCreatedEvent(data: CreateOrderEvent) {
    console.log('order_created', data);
  }
}
