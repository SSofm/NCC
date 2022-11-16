import { Test, TestingModule } from '@nestjs/testing';
import { Account as AccountEntity } from '../auth/account.entity';
import { AbilityFactory } from '../ability/ability.factory';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { ApproveTimesheetDto } from './dto/approve-timesheet.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';

describe('TimesheetController Unit Tests', () => {
  let timesheetController: TimesheetController;
  let spyService: TimesheetService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: TimesheetService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        approveTimesheetsByWeek: jest.fn(() => []),
        submitMyTimesheetByWeek: jest.fn(() => []),
        getAllMyTimesheet: jest.fn(() => {}),
        getAllTimesheetWithPendingStatus: jest.fn(() => {}),
        getMyTimesheetByDay: jest.fn(() => {}),
        getMyTimesheetByWeek: jest.fn(() => {}),
        getAllTimesheetByProject: jest.fn(() => {}),
        getAllTimesheetByPeople: jest.fn(() => {}),
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
        // AddCustomerToProject
        // AddTasksToProject
        remove: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [TimesheetService, APIServiceProvider, AbilityFactory],
    }).compile();

    timesheetController = app.get<TimesheetController>(TimesheetController);
    spyService = app.get<TimesheetService>(TimesheetService);
  });

  it('should be defined', () => {
    expect(timesheetController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateTimesheetDto();
    const account = new AccountEntity();
    expect(timesheetController.create(dto, account)).not.toEqual(null);
  });

  it('calling create method', () => {
    const dto = new CreateTimesheetDto();
    const account = new AccountEntity();
    expect(timesheetController.create(dto, account)).not.toEqual(null);
  });

  it('calling findOne method', () => {
    const projectId: string = 'something';
    expect(timesheetController.findOne(projectId)).toBeUndefined();
  });

  it('calling findOne method', () => {
    const timeshetId: string = 'c06d29aa-f86c-4ef6-a998-3fd8bcd7b179';
    expect(timesheetController.findOne(timeshetId)).not.toEqual([]);
  });

  it('calling update method', () => {
    const timesheetId: string = 'something';
    const dto: UpdateTimesheetDto = new UpdateTimesheetDto();
    expect(timesheetController.update(timesheetId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: UpdateTimesheetDto = new UpdateTimesheetDto();
    const timesheetId: string = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(timesheetId, dto);
  });
});
