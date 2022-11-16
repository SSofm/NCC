import { IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    firstName: string;


    @IsString()
    lastName: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    @IsString()
    email: string;


    @IsString()
    address: string;

    @IsString()
    bio: string;
}


