import { PartialType } from '@nestjs/mapped-types';
import { CreateRightDto } from './create-right.dto';
import { IsNumber, IsInt, IsString, IsNotEmpty, isNotEmpty } from 'class-validator';

export class UpdateRightDto extends PartialType(CreateRightDto) {

}
