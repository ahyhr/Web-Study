import { Module } from '@nestjs/common';
import { RightsService } from './rights.service';
import { RightsController } from './rights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rights } from '@libs/db/entities/rights.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Rights])],
  controllers: [RightsController],
  providers: [RightsService],
})
export class RightsModule {}
