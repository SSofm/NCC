import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/user.entity';
import { Customer } from '../../customer/entities/customer.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  tasks: string[];

  @IsArray()
  @IsOptional()
  users: User[];

  @IsObject()
  @IsOptional()
  customer: Customer;
}
