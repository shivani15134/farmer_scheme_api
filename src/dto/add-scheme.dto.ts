import {
    IsString,
    IsNotEmpty,
    IsDateString,
} from 'class-validator';
import {
    ApiProperty,
} from '@nestjs/swagger';

export class AddSchemeDto {
    @ApiProperty({
        description: 'Name of the scheme',
        example: 'Kisan Credit Card',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of the scheme',
        example: 'Provides farmers with access to agricultural credit.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Scheme start date in YYYY-MM-DD format',
        example: '2026-01-01',
    })
    @IsDateString({}, { message: 'startDate must be a valid date string' })
    @IsNotEmpty({ message: 'startDate is required' })
    startDate: string;

    @ApiProperty({
        description: 'Scheme end date in YYYY-MM-DD format',
        example: '2027-12-31',
    })
    @IsNotEmpty({ message: 'endDate is required' })
    @IsDateString({}, { message: 'endDate must be a valid date string' })
    endDate: string;
}