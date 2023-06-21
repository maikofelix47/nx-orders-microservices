import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.findAll();
  }
  @Post()
  createOrder(@Body() newOrder: CreateOrderDto) {
    return this.appService.createOrder(newOrder);
  }
}
