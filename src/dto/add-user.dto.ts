import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsDateString()
  date_of_birth: Date;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
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
  @IsUUID()
  state_id?: string;

}
