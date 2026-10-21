import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({
    description: 'Farmer first name',
    example: 'Rahul',
  })
  @IsString()
  @IsNotEmpty({ message: 'first_name is required' })
  first_name: string;

  @ApiPropertyOptional({
    description: 'Farmer middle name',
    example: 'Kumar',
  })

  @ApiProperty({
    description: 'Farmer last name',
    example: 'Sharma',
  })
  @IsString()
  @IsNotEmpty({ message: 'last_name is required' })
  last_name: string;

  @ApiProperty({
    description: 'Farmer date of birth',
    example: '1995-05-12',
    format: 'date',
  })
  @IsDateString(
    {},
    { message: 'date_of_birth must be a valid date string' },
  )
  date_of_birth: string;

  @ApiProperty({
    description: 'Farmer primary address',
    example: '12 MG Road',
  })
  @IsString()
  @IsNotEmpty({ message: 'address_1 is required' })
  address_1: string;

  @ApiPropertyOptional({
    description: 'Farmer secondary address',
    example: 'Near City Park',
  })
  @IsOptional()
  @IsString()
  address_2?: string;

  @ApiPropertyOptional({
    description: 'Farmer village, town or locality',
    example: 'Indiranagar',
  })
  @IsOptional()
  @IsString()
  locality_name?: string;

  @ApiPropertyOptional({
    description: 'Farmer gender',
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'UUID of the farmer state',
    example: '205ef22b-bdd4-4d12-b659-b3f790180801',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(undefined, { message: 'state_id must be a valid UUID' })
  state_id?: string;
}