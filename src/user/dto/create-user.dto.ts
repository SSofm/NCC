import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  bio: string;

  @IsString()
  dob: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  level: number;

  @IsNotEmpty()
  @IsInt()
  salary: number;

  @IsString()
  @IsOptional()
  managerId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  sex: number;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  isProjectManager: boolean;
}
