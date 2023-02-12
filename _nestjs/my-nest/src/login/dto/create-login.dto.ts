import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
