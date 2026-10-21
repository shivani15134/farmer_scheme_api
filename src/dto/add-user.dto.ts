import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty({ message: 'first_name is required' })
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'last_name is required' })
  last_name: string;

  @IsDateString(
    {},
    { message: 'date_of_birth must be a valid date string' },
  )
  date_of_birth: string;

  @IsString()
  @IsNotEmpty({ message: 'address_1 is required' })
  address_1: string;

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
  @IsUUID(undefined, { message: 'state_id must be a valid UUID' })
  state_id?: string;
}