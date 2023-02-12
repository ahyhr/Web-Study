import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rights } from '@libs/db/entities/rights.entities';
import { Repository } from 'typeorm';
import { CreateRightDto } from './dto/create-right.dto';
import { UpdateRightDto } from './dto/update-right.dto';

@Injectable()
export class RightsService {
  constructor(
    @InjectRepository(Rights)
    private readonly rights: Repository<Rights>,
  ) {}

  create(createRightDto: CreateRightDto) {
    const data = this.rights.create(createRightDto);
    return this.rights.save(data);
  }

  findAll() {
    return this.rights.find();
  }

  async findOne(id: number) {
    const right = await this.rights.findOne({ where: { id } });
    if (!right)
      throw new HttpException(`未查找到id${id}`, HttpStatus.BAD_REQUEST);
    return right;
  }

  async update(id: number, updateRightDto: UpdateRightDto) {
    const right = await this.rights.findOne({ where: { id } });
    if (!right) {
      throw new HttpException(`未查找到id${id}`, HttpStatus.BAD_REQUEST);
    }
    return this.rights.update(id, updateRightDto);
  }

  remove(id: number) {
    return this.rights.delete(id);
  }
}
