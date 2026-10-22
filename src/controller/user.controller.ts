
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { FarmersService } from '../service/user.service.js';
import { AddUserDto } from '../dto/add-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import {
  ApiOperation, ApiTags, ApiQuery, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse,
  ApiConflictResponse,
  ApiParam
} from '@nestjs/swagger';

@ApiTags('Farmers')
@Controller('farmers')
export class FarmersController {
  constructor(
    private readonly farmerService: FarmersService,
  ) { }

  @Get()
  @ApiOperation({
    summary: 'Get all farmers',
    description: 'Retrieves a list of all registered farmers.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number to retrieve',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 100,
    description: 'Number of farmers per page',
  })
  @ApiOkResponse({
    description: 'Farmers retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page = '1',
    @Query('limit') limit = '100',) {
    const farmers = await this.farmerService.findAll(Number(page), Number(limit));

    return {
      statusCode: HttpStatus.OK,
      data: farmers,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get farmer by ID',
    description: 'Retrieves a farmer using their unique ID.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid farmer ID format',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the farmer',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const farmer = await this.farmerService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a farmer',
    description: 'Creates a new farmer using the provided details.',
  })
  @ApiCreatedResponse({
    description: 'Farmer created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid farmer data',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() addUserDto: AddUserDto) {
    const farmer = await this.farmerService.create(addUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: farmer,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update a farmer',
    description: 'Updates selected farmer details using the provided data.',
  })
  @ApiOkResponse({
    description: 'Farmer updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  // @ApiBadRequestResponse({
  //   description: 'Invalid farmer data',
  // })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the farmer to update',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const farmer = await this.farmerService.update(id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a farmer',
    description: 'Replaces the farmer details using the provided data.',
  })
  @ApiOkResponse({
    description: 'Farmer replaced successfully',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid farmer data',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the farmer to update',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body() AddUserDto: AddUserDto,
  ) {
    const farmer = await this.farmerService.updateUser(id, AddUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: farmer,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a farmer',
    description: 'Deletes a farmer using their unique ID.',
  })
  @ApiOkResponse({
    description: 'Farmer deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Farmer not found',
  })
  @ApiConflictResponse({
    description: 'Cannot delete farmer because they are associated with schemes.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the farmer to delete',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.farmerService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Farmer deleted successfully',
    };
  }

  @Get(':farmerId/schemes')
  @ApiOperation({
    summary: 'Get farmer schemes',
    description: 'Retrieves the schemes associated with a specific farmer.',
  })
  @ApiOkResponse({
    description: 'Farmer schemes retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid farmer ID format',
  })
  @ApiParam({
  name: 'farmerId',
  description: 'Unique ID of the farmer whose schemes are requested',
  example: '205ef22b-bdd4-4d12-b659-b3f790180801',
})
  @HttpCode(HttpStatus.OK)
  async findFarmerSchemes(@Param('farmerId') farmerId: string) {
    const schemes = await this.farmerService.findFarmerSchemes(farmerId);

    return {
      statusCode: HttpStatus.OK,
      data: schemes,
    };
  }
}



///CHECK PUT METHOD DESCRIPTION AS ITS USSES THE SAME DTO AS ADD