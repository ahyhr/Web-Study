import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const { keyWord, page, pageSize } = query;

    const dataList = await this.user.find({
      where: {
        name: Like(`%${keyWord || ''}%`),
      },
      order: {id: 'DESC'},
      skip: (page - 1) * pageSize || 0,
      take: pageSize || 10,
    });
    const total = await this.user.count({
      where: { name: Like(`%${keyWord || ''}%`) },
    });
    return { dataList, total };
  }

  async findOne(id: number) {
    const user = await this.user.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`未查找到id${id}`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.user.update(id, updateUserDto);
    if (!user) {
      throw new HttpException(`未查找到id${id}`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
