import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@libs/db/entities/user.entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private JwtService: JwtService,
  ) {}

  /** 登录  */
  async login(createLoginDto: CreateLoginDto) {
    const { name, pass_word } = createLoginDto;

    const user = await this.user.findOne({ where: { name } });

    if (!user) throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);

    if (pass_word !== user.pass_word)
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);

    const token = this.JwtService.sign(createLoginDto);
    console.log(token);

    return { user, token };
  }

  findAll() {
    return this.user.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
