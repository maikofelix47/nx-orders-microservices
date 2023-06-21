/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });
  app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `ANALYTICS Hybrid Service is running on: http://localhost:${port}/ and TCP ${port}`
  );
}

bootstrap();
