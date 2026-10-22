
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AssociatedUserService } from '../service/associated.user.service.js';
import { AssociateUserDto } from '../dto/associate-users.dto.js';
import { UpdateAssociatedUserDto } from '../dto/update-associated-user.dto.js';

@ApiTags('Associated Users')
@Controller('associateduser')
export class AssociatedUserController {
  constructor(
    private readonly associateduserservice: AssociatedUserService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all farmer-scheme associations',
    description: 'Returns the existing farmer-scheme associations.',
  })
  @ApiOkResponse({
    description: 'Associations retrieved successfully.',
  })
  findAll() {
    return this.associateduserservice.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a farmer-scheme association',
    description: 'Associates a farmer with a scheme.',
  })
  @ApiBody({ type: AssociateUserDto })
  @ApiCreatedResponse({
    description: 'Association created successfully.',
  })
  
@ApiBadRequestResponse({
  description:
    'Invalid request data. Farmer ID, scheme ID, and enrollment dates must satisfy the DTO validation rules.',
})

  create(@Body() associatedUserDto: AssociateUserDto) {
    return this.associateduserservice.create(associatedUserDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a farmer-scheme association',
    description: 'Updates the enrollment details of an existing association.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the association to update',
    example: 'ca346d70-2480-4643-90fa-d30c511434b2',
  })
  @ApiBody({ type: UpdateAssociatedUserDto })
  @ApiResponse({
    status: 200,
    description: 'Association updated successfully.',
  })
  
@ApiResponse({
  status: 404,
  description: 'Association not found.',
})

  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssociatedUserDto,
  ) {
    return this.associateduserservice.update(id, dto);
  }
}
