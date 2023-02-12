import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from 'libs/common/exceptions-filter';
import { Response } from 'libs/common/response';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
