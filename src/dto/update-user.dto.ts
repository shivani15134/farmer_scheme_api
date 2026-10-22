import { PartialType } from '@nestjs/swagger';
import { AddUserDto } from './add-user.dto.js';

export class UpdateUserDto extends PartialType(AddUserDto) {}