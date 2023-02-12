import { IsNumber, IsInt, IsString, IsNotEmpty,Length } from 'class-validator';

export class CreateRightDto {
  @IsInt()
  id?: number

  @IsString()
  @IsNotEmpty({message: '请输入label'})
  label: string;

  @IsNotEmpty({message: '请输入key'})
  @IsString()
  key: string;

  @IsInt()
  parent_id?: number;

  @IsInt()
  pagepermisson?: number;
}
