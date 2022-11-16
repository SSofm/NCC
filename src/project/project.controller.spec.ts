import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Account as AccountEntity } from '../auth/account.entity';
import { AbilityFactory } from '../ability/ability.factory';

describe('ProjectController Unit Tests', () => {
  let projectController: ProjectController;
  let spyService: ProjectService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: ProjectService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findAll: jest.fn(() => []),
        findByProjectId: jest.fn(() => {}),
        findOneByCustomerId: jest.fn(() => {}),
        update: jest.fn(() => {}),
        // AddCustomerToProject
        // AddTasksToProject
        remove: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, APIServiceProvider, AbilityFactory],
    }).compile();

    projectController = app.get<ProjectController>(ProjectController);
    spyService = app.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateProjectDto();
    const account = new AccountEntity();
    expect(projectController.create(dto, account)).not.toEqual(null);
  });

  it('calling findAll method', async () => {
    const projects = await projectController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
    expect(projects.length).not.toEqual(null);
  });


  it('calling findByProjectId method', () => {
    const projectId: string = 'something';
    expect(projectController.findByProjectId(projectId)).toBeUndefined();
  });

  it('calling findByProjectId method', () => {
    const projectId: string = 'c06d29aa-f86c-4ef6-a998-3fd8bcd7b179';
    expect(projectController.findByProjectId(projectId)).not.toEqual([]);
  });

  // it('calling findOneByCustomerId method', () => {
  //   const customerId: string = 'something';
  //   expect(projectController.findByCustomerId(customerId)).toEqual([]);
  // });


  // it('calling findOneByCustomerId method', () => {
  //   const customerId: string = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
  //   expect(projectController.findOneByCustomerId(customerId)).toEqual([]);
  // });

  it('calling update method', () => {
    const projectId: string = 'something';
    const dto: UpdateProjectDto = new UpdateProjectDto();
    expect(projectController.update(projectId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: UpdateProjectDto = new UpdateProjectDto();
    const projectId: string = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(projectId, dto);
  });
  

  
});
