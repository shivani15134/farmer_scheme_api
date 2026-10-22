
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SchemesService } from '../service/scheme.service.js';
import { AddSchemeDto } from '../dto/add-scheme.dto.js';
import { UpdateSchemeDto } from '../dto/update-scheme.dto.js';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Schemes')
@Controller('schemes')
export class SchemesController {
  constructor(
    private readonly schemesService: SchemesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all schemes',
    description: 'Retrieves all registered schemes.',
  })
  @ApiOkResponse({
    description: 'Schemes retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const schemes = await this.schemesService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: schemes,
    };
  }

  @Get('farmer-count')
  @ApiOperation({
    summary: 'Get farmer count per scheme',
    description: 'Retrieves the number of farmers associated with each scheme, optionally as of a specified date.',
  })
  @ApiQuery({
    name: 'asOnDate',
    required: false,
    type: String,
    example: '2026-10-21',
    description: 'Date used to calculate farmer counts',
  })
  @ApiOkResponse({
    description: 'Farmer counts retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid date supplied',
  })
  @HttpCode(HttpStatus.OK)
  async getFarmerCountPerScheme(
    @Query('asOnDate') asOnDate?: string,
  ) {
    const farmerCount =
      await this.schemesService.getFarmerCountPerScheme(asOnDate);

    return {
      statusCode: HttpStatus.OK,
      data: farmerCount,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get scheme by ID',
    description: 'Retrieves a scheme using its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the scheme',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @ApiBadRequestResponse({
    description: 'Invalid scheme ID format',
  })
  @ApiNotFoundResponse({
    description: 'Scheme not found',
  })
  @ApiOkResponse({
    description: 'Scheme retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const scheme = await this.schemesService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      data: scheme,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a scheme',
    description: 'Creates a new scheme using the provided details.',
  })
  @ApiCreatedResponse({
    description: 'Scheme created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid scheme data',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() addschemedto: AddSchemeDto) {
    const scheme = await this.schemesService.create(addschemedto);

    return {
      statusCode: HttpStatus.CREATED,
      data: scheme,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update a scheme',
    description: 'Updates scheme details using the provided data.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the scheme to update',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @ApiOkResponse({
    description: 'Scheme updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Scheme not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid scheme data',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSchemeDto,
  ) {
    const scheme = await this.schemesService.update(id, dto);

    return {
      statusCode: HttpStatus.OK,
      data: scheme,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a scheme',
    description: 'Replaces scheme details using the provided data.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the scheme to update',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @ApiOkResponse({
    description: 'Scheme replaced successfully',
  })
  @ApiNotFoundResponse({
    description: 'Scheme not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid scheme data',
  })
  @HttpCode(HttpStatus.OK)
  async updateScheme(
    @Param('id') id: string,
    @Body() dto: AddSchemeDto,
  ) {
    const scheme = await this.schemesService.updateScheme(id, dto);

    return {
      statusCode: HttpStatus.OK,
      data: scheme,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a scheme',
    description: 'Deletes a scheme using its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of the scheme to delete',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @ApiOkResponse({
    description: 'Scheme deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Scheme not found',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.schemesService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Scheme deleted successfully',
    };
  }
}
