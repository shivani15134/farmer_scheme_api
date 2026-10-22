import { AddSchemeDto } from './add-scheme.dto.js';
import { PartialType } from '@nestjs/swagger';


export class UpdateSchemeDto extends PartialType(AddSchemeDto) {}