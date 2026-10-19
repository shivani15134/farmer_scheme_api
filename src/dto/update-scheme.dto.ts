import { PartialType } from '@nestjs/mapped-types';
import { AddSchemeDto } from './add-scheme.dto.js';

export class UpdateSchemeDto extends PartialType(AddSchemeDto) {}