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

    @IsDateString({}, { message: 'startDate must be a valid date string' })
    @IsNotEmpty({ message: 'startDate is required' })
    startDate: string;

    @IsNotEmpty({ message: 'endDate is required' })
    @IsDateString({}, { message: 'endDate must be a valid date string' })
    endDate: string;
}