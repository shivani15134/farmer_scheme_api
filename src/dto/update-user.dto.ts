import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'first_name is required' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'last_name is required' })
  last_name: string;

  @IsDateString({},{ message: 'date_of_birth must be a valid date string' })
  date_of_birth: string;

  @IsString()
  @IsNotEmpty({ message: 'address_1 is required' })
  address_1: string;

  @IsString()
  @IsNotEmpty({ message: 'middle_name is required' })
  middle_name: string;

  @IsString()
  @IsNotEmpty({ message: 'address_2 is required' })
  address_2: string;

  @IsString()
  @IsNotEmpty({ message: 'locality_name is required' })
  locality_name: string;

  @IsString()
  @IsNotEmpty({ message: 'gender is required' })
  gender: string;

  @IsUUID(undefined, { message: 'state_id must be a valid UUID' })
  state_id: string;
}