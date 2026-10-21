import {
    IsDateString,
    IsOptional,
    IsUUID,
} from 'class-validator';

export class AssociateUserDto {
    @IsUUID()
    farmer_id: string;

    @IsUUID()
    scheme_id: string;

    @IsDateString()
    enrollment_start_date: Date;

    @IsDateString()
    @IsOptional()
    enrollment_end_date: Date;
}