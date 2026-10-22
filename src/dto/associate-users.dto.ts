
import {
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class AssociateUserDto {
  @ApiProperty({
    description: 'UUID of the farmer to associate with the scheme',
    example: 'ca346d70-2480-4643-90fa-d30c511434b2',
    format: 'uuid',
  })
  @IsUUID()
  farmer_id: string;

  @ApiProperty({
    description: 'UUID of the scheme to associate with the farmer',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
    format: 'uuid',
  })
  @IsUUID()
  scheme_id: string;

  @ApiProperty({
    description: 'Date when the farmer enrollment starts',
    example: '2026-01-01',
    format: 'date',
  })
  @IsDateString()
  enrollment_start_date: Date;

  @ApiPropertyOptional({
    description: 'Date when the farmer enrollment ends',
    example: '2027-12-31',
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  enrollment_end_date: Date;
}
