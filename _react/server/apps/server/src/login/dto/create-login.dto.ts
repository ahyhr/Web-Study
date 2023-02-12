import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty({ message: '请输入账号' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '请输入密码' })
  pass_word: string;
}
