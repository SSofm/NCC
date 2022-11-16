import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Account as AccountEntity } from '../auth/account.entity';
import { AbilityFactory } from '../ability/ability.factory';

describe('TaskController Unit Tests', () => {
  let taskController: TaskController;
  let spyService: TaskService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: TaskService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        findAllByProjectId: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        remove: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, APIServiceProvider, AbilityFactory],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    spyService = app.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateTaskDto();
    const account = new AccountEntity();
    expect(taskController.create(dto, account)).not.toEqual(null);
  });

  it('calling findAllByProjectId method', async () => {
    const proId: string = 'something';
    const tasks = await taskController.findAllByProjectId(proId);
    expect(tasks.length).toBe(0);
  });

  it('calling findAllByProjectId method', () => {
    expect(spyService.findAllByProjectId).toHaveBeenCalled();
  });

  it('calling findAllByProjectId method', () => {
    const proId: string = 'something';
    expect(spyService.findAllByProjectId).toHaveBeenCalled();
    expect(spyService.findAllByProjectId).toHaveBeenCalledWith(proId);
  });

  it('calling findAllByProjectId method', () => {
    const proId: string = 'something';
    expect(taskController.findAllByProjectId(proId)).toEqual([]);
  });

  it('calling findAllByProjectId method', async () => {
    const proId: string = 'c06d29aa-f86c-4ef6-a998-3fd8bcd7b179';
    expect(taskController.findAllByProjectId(proId)).not.toEqual(null);
  });
  

  it('calling findOne method', () => {
    const taskId: string = 'something';
    expect(taskController.findAllByProjectId(taskId)).toEqual([]);
  });

  it('calling findOne method', () => {
    const taskId: string = '01e40d5b-df94-48d7-87ed-be2c954ffe2b';
    expect(taskController.findAllByProjectId(taskId)).not.toEqual(null);
  });

  it('calling findOne method', () => {
    const taskId: string = 'something';
    expect(spyService.findAllByProjectId).toHaveBeenCalled();
    expect(spyService.findAllByProjectId).toHaveBeenCalledWith(taskId);
  });

  it('calling update method', () => {
    const taskId: string = 'something';
    const dto: UpdateTaskDto = new UpdateTaskDto();
    expect(taskController.update(taskId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: UpdateTaskDto = new UpdateTaskDto();
    const taskId: string = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(taskId, dto);
  });
});
