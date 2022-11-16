import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly salary: number;

  @IsString()
  @IsOptional()
  readonly jobTitle: string;

  @IsNumber()
  @IsOptional()
  readonly level: number;
}
