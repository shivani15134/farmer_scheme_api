import { IsDateString, IsOptional } from 'class-validator';

export class UpdateAssociatedUserDto {
  @IsOptional()
  @IsDateString()
  enrollment_start_date?: string;

  @IsOptional()
  @IsDateString()
  enrollment_end_date?: string | null;
}