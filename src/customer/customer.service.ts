import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/users.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly custumerRepository: Repository<Customer>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(body: CreateCustomerDto, email: string): Promise<Customer> {
    const user_id = (await this.userService.getUserByEmail(email)).id;
    const customer: Customer = await this.custumerRepository.findOne({
      where: {
        firstName: body.firstName.toLowerCase(),
        lastName: body.lastName.toLowerCase(),
        phoneNumber: body.phoneNumber.toLowerCase(),
      },
    });
    if (customer) {
      throw new HttpException(
        'This customer already exists in the system',
        HttpStatus.CONFLICT,
      );
    }
    return this.custumerRepository.save({
      ...body,
      creator_id: user_id,
    });
  }

  findAll() {
    return this.custumerRepository.find();
  }

  async findOne(id: string) {
    const customer = await this.custumerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new HttpException('This customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.custumerRepository.update({ id }, updateCustomerDto);
    return await this.custumerRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.custumerRepository.delete(id);
    return;
  }
}
