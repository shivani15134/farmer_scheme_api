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

@Controller('schemes')
export class SchemesController {
  constructor(
    private readonly schemesService: SchemesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const schemes = await this.schemesService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: schemes,
    };
  }

  @Get('farmer-count')
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
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const scheme = await this.schemesService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      data: scheme,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() addschemedto: AddSchemeDto) {
    const scheme = await this.schemesService.create(addschemedto);

    return {
      statusCode: HttpStatus.CREATED,
      data: scheme,
    };
  }

@Patch(':id')
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
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.schemesService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Scheme deleted successfully',
    };
  }
}