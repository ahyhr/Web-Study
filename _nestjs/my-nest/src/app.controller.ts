import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Config') private readonly base: any,
  ) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
  @Get('about')
  getAbout(): string {
    return this.base.baseUrl;
  }
}
