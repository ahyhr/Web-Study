import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const respones = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error: any =
      typeof respones === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    respones.status(status).json({
      data: error,
      message: typeof error === 'object' ? error.message[0] : exception.message,
      state: status,
    });
  }
}
