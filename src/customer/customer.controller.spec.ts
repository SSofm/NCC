import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AbilityFactory } from '../ability/ability.factory';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from '../user/user.entity';

describe('CustomerController Unit Tests', () => {
  let customerController: CustomerController;
  let spyService: CustomerService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: CustomerService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        remove: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, APIServiceProvider, AbilityFactory],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    spyService = app.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateCustomerDto();
    const user = new User();
    expect(customerController.create(dto, user)).not.toEqual(null);
  });

  it('calling findAll method', async () => {
    const tasks = await customerController.findAll();
    expect(tasks.length).not.toBe(null);
  });

  it('calling findAll method', () => {
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('calling findOne method', () => {
    const customerId: string = 'something';
    expect(customerController.findOne(customerId)).toBeUndefined();
  });

  it('calling findOne method', () => {
    const customerId: string = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
    expect(customerController.findOne(customerId)).not.toBe(null);
  });

  it('calling update method', () => {
    const taskId: string = 'something';
    const dto: UpdateCustomerDto = new UpdateCustomerDto();
    expect(customerController.update(taskId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: UpdateCustomerDto = new UpdateCustomerDto();
    const customerId: string = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(customerId, dto);
  });
});
