import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/db/entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
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
