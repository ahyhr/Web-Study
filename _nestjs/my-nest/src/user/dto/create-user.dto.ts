import { ParseIntPipe } from '@nestjs/common';
import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id?: number;
  @IsString()
  name: string;
  @IsString()
  desc: string;
}
