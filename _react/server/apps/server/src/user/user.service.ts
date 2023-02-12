import { User } from '@libs/db/entities/user.entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from 'libs/result';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = this.user.create(createUserDto);
    return this.user.save(data);
  }

  findAll() {
    return this.user.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const user = await this.user.findOne({ where: { id } });
    // if (!user) return ResultData.fail(HttpStatus.NOT_FOUND, '无该用户');
    if (!user)
      throw new HttpException('无该用户', HttpStatus.INTERNAL_SERVER_ERROR);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
