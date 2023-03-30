import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/exceptions-filter';
import { Response } from './common/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
