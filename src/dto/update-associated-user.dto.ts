
import {
  IsDateString,
  IsOptional,
} from 'class-validator';
import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateAssociatedUserDto {
  @ApiPropertyOptional({
    description: 'Updated enrollment start date',
    example: '2026-02-01',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  enrollment_start_date?: string;

  @ApiPropertyOptional({
    description: 'Updated enrollment end date, or null',
    example: '2027-12-31',
    format: 'date',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  enrollment_end_date?: string | null;
}
