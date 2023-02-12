import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 异常拦截器
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const respones = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof respones === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    respones.status(status).json({
      success: false,
      time: new Date(),
      data: error,
      message: exception.message,
      status,
      path: request.url,
    });
  }
}
