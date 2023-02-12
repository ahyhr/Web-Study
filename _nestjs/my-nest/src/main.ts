import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import type { Request, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/respones';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';

const whiteList = ['/user', '/'];
// 全局中间件
function middleWareAll(req: Request, res: any, next: NextFunction) {
  // if (whiteList.includes(req.originalUrl)) {
  //   next();
  // } else {
  //   res.send('小黑子');
  // }

  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 跨域
  app.enableCors();
  // 公共资源目录
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/upload',
  });
  app.useStaticAssets(join(__dirname, 'cos'));
  // 响应拦截器
  app.useGlobalInterceptors(new Response());
  // 异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // DTO验证
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'yhr',
      rolling: true,
      name: 'yhr.sid',
      cookie: { maxAge: 99999, sameSite: 'none', secure: false },
    }),
  );
  app.use(middleWareAll);
  await app.listen(3000);
}
bootstrap();
