import {
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class AddSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}