import { PartialType } from '@nestjs/mapped-types';
import {  IsOptional, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsString()
    @IsOptional()
    firstName: string;


    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    
    @IsString()
    @IsOptional()
    email: string;


    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    bio: string;
}
