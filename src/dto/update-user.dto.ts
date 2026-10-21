import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Farmer first name',
    example: 'Ramesh',
  })
  @IsString()
  @IsNotEmpty({ message: 'first_name is required' })
  first_name: string;

  @ApiProperty({
    description: 'Farmer last name',
    example: 'Kumar',
  })
  @IsString()
  @IsNotEmpty({ message: 'last_name is required' })
  last_name: string;

  @ApiProperty({
    description: 'Farmer date of birth',
    example: '1995-06-15',
  })
  @IsDateString({}, {
    message: 'date_of_birth must be a valid date string',
  })
  date_of_birth: string;

  @ApiProperty({
    description: 'Farmer primary address',
    example: '12 Main Road',
  })
  @IsString()
  @IsNotEmpty({ message: 'address_1 is required' })
  address_1: string;

  @ApiProperty({
    description: 'Farmer middle name',
    example: 'Raj',
  })
  @IsString()
  @IsNotEmpty({ message: 'middle_name is required' })
  middle_name: string;

  @ApiProperty({
    description: 'Farmer secondary address',
    example: 'Near Ananya Hospital',
  })
  @IsString()
  @IsNotEmpty({ message: 'address_2 is required' })
  address_2: string;

  @ApiProperty({
    description: 'Farmer city, town, or village',
    example: 'Mysuru',
  })
  @IsString()
  @IsNotEmpty({ message: 'locality_name is required' })
  locality_name: string;

  @ApiProperty({
    description: 'Farmer gender',
    example: 'Male',
  })
  @IsString()
  @IsNotEmpty({ message: 'gender is required' })
  gender: string;

  @ApiProperty({
    description: 'UUID of the farmer state',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
  })
  @IsUUID(undefined, {
    message: 'state_id must be a valid UUID',
  })
  state_id: string;
}