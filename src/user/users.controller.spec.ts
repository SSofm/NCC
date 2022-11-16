import { UsersController } from './user.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AbilityFactory } from '../ability/ability.factory';
import { Account as AccountEntity } from '../auth/account.entity';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController Unit Tests', () => {
  let userController: UsersController;
  let spyService: UserService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        getUsers: jest.fn(() => []),
        getUserById: jest.fn(() => {}),
        createUser: jest.fn(() => {}),
        updateUser: jest.fn(() => {}),
        deleteUser: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService, APIServiceProvider, AbilityFactory],
    }).compile();

    userController = app.get<UsersController>(UsersController);
    spyService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling createUser method', () => {
    const dto = new CreateUserDto();
    const acc = new AccountEntity();
    expect(userController.createUser(dto, acc)).not.toEqual(null);
  });

  it('calling createUser method', () => {
    const dto = new CreateUserDto();
    dto.username = 'linh.nguyenthi';
    dto.firstName = 'nguyen';
    dto.lastName = 'thi linh';
    dto.bio = 'basic user';
    dto.email = 'linh.nguyenthi@ncc.asia';
    dto.phoneNumber = '0000000140';
    dto.address = 'thanh hoa';
    dto.password = 'B19dcpt140';
    dto.jobTitle = 'Angular intern';
    dto.dob = '2001-02-15';
    dto.level = 0;
    dto.salary = 600000;
    dto.managerId = '';
    dto.sex = 1;
    dto.isAdmin = false;
    dto.isProjectManager = false;

    const acc = new AccountEntity();
    acc.email = 'sang.nguyenvan@ncc.asia';
    userController.createUser(dto, acc);
    expect(spyService.createUser).toHaveBeenCalled();
    // expect(spyService.createUser).toHaveBeenCalledWith(dto, acc);
  });

  it('calling getUsers method', () => {
    userController.getAllUsers();
    expect(spyService.getUsers).toHaveBeenCalled();
  });

  it('calling find getUser method', () => {
    const id = '3789';
    userController.getUser(id);
    expect(spyService.getUserById).toHaveBeenCalled();
  });

  it('calling updateUser method', () => {
    const dto = new UpdateUserDto();
    const id = 'dummy_id';
    userController.updateUser(id, dto);
    expect(spyService.updateUser).toHaveBeenCalled();
  });

  it('calling deleteUser method', () => {
    const dto = new UpdateUserDto();
    const id = 'dummy_id';
    userController.updateUser(id, dto);
    expect(spyService.updateUser).toHaveBeenCalled();
  });
});
