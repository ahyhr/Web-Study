import { HttpCode, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello word';
  }
  getAbout(): string {
    return 'about';
  }
}
