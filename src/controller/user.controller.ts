
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { FarmersService } from '../service/user.service.js';
import { AddUserDto } from '../dto/add-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';

@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly farmerService: FarmersService,
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll( @Query('page') page = '1',
  @Query('limit') limit = '100',) {
    const farmers = await this.farmerService.findAll(Number(page), Number(limit));

    return {
      statusCode: HttpStatus.OK,
      data: farmers,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const farmer = await this.farmerService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() addUserDto: AddUserDto) {
    const farmer = await this.farmerService.create(addUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: farmer,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() addUserDto: AddUserDto,
  ) {
    const farmer = await this.farmerService.update(id, addUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const farmer = await this.farmerService.updateUser(id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.farmerService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Farmer deleted successfully',
    };
  }

  @Get(':farmerId/schemes')
  @HttpCode(HttpStatus.OK)
  async findFarmerSchemes(@Param('farmerId') farmerId: string) {
    const schemes = await this.farmerService.findFarmerSchemes(farmerId);

    return {
      statusCode: HttpStatus.OK,
      data: schemes,
    };
  }
}
