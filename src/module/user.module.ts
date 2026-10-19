
import { Module } from '@nestjs/common';
import { FarmersController } from '../controller/user.controller.js';
import { FarmersService } from '../service/user.service.js';
import { Farmer } from '../entity/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schemes } from '../entity/scheme.entity.js';
import { AssociatedUser } from '../entity/associate.user.entity.js';
import { States } from '../entity/states.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Schemes, AssociatedUser, States])],
  controllers: [FarmersController],
  providers: [FarmersService],
})
export class FarmerModule {}
