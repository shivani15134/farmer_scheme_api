
import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { AssociatedUserService } from '../service/associated.user.service.js';
import { AssociateUserDto } from '../dto/associate-users.dto.js';
import { UpdateAssociatedUserDto } from '../dto/update-associated-user.dto.js';

@Controller('associateduser')
export class AssociatedUserController {
  constructor(
    private readonly associateduserservice: AssociatedUserService,
  ) { }

  @Get()
  findAll() {
    return this.associateduserservice.findAll();
  }

 @Post()
  create(@Body() associatedUserDto: AssociateUserDto) {
    return this.associateduserservice.create(associatedUserDto);
  } 

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociatedUserDto,
  ) {
    return this.associateduserservice.update(id, dto);
  }
}

