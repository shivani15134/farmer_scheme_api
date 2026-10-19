import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class ReplaceUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  address_2?: string;

  @IsOptional()
  @IsString()
  locality_name?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsUUID()
  state_id?: string;
}