import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RightsService } from './rights.service';
import { CreateRightDto } from './dto/create-right.dto';
import { UpdateRightDto } from './dto/update-right.dto';

@Controller('rights')
export class RightsController {
  constructor(private readonly rightsService: RightsService) {}

  @Post()
  create(@Body() createRightDto: CreateRightDto) {
    return this.rightsService.create(createRightDto);
  }

  @Get()
  findAll() {
    return this.rightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rightsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRightDto: UpdateRightDto,
  ) {
    return this.rightsService.update(id, updateRightDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rightsService.remove(id);
  }
}
