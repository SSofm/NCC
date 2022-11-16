import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { Between, Repository } from 'typeorm';
import { UserService } from '../user/users.service';
import { endOfDay, startOfDay, startOfWeek, endOfWeek } from 'date-fns';
import { TimesheetStatus } from './enums/status-timesheet.enum';
import { ApproveTimesheetDto } from './dto/approve-timesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private readonly timesheetRepo: Repository<Timesheet>,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create(body: CreateTimesheetDto, creator_id: string) {
    return this.timesheetRepo.save({
      ...body,
      creatorId: creator_id,
    });
  }

  async getMyTimesheetByDay(create_at: string, creator_id: string) {
    const _date = create_at ? new Date(create_at) : new Date();
    const timesheet = await this.timesheetRepo.find({
      where: {
        creatorId: creator_id,
        create_at: Between(startOfDay(_date), endOfDay(_date)),
      },
    });
    return timesheet;
  }

  async getMyTimesheetByWeek(creator_id: string) {
    const today = new Date();
    const timesheets = await this.timesheetRepo.find({
      where: {
        creatorId: creator_id,
        create_at: Between(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        ),
      },
    });
    return timesheets;
  }

  async getAllMyTimesheet(creator_id: string) {
    const timesheets = await this.timesheetRepo.find({
      where: {
        creatorId: creator_id,
      },
      relations: ['task', 'project'],
      select: {
        task: {
          name: true,
        },
        project: {
          name: true,
        },
      },
    });
    return timesheets;
  }

  async getAllTimesheetWithPendingStatus() {
    const timesheets = await this.timesheetRepo.find({
      where: {
        status: 'Pending',
      },
    });
    return timesheets;
  }

  findAll() {
    return this.timesheetRepo.find();
  }

  findByProject(proId: string) {
    return this.timesheetRepo.find({
      where: {
        projectId: proId,
      },
    });
  }

  findByPeople(creatorId: string) {
    return this.timesheetRepo.find({
      where: {
        creatorId: creatorId,
      },
    });
  }

  findOne(id: string) {
    return this.timesheetRepo.findOne({ where: { id } });
  }

  async update(id: string, updateTimesheetDto: UpdateTimesheetDto) {
    await this.timesheetRepo.update(id, updateTimesheetDto);
    return await this.timesheetRepo.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.timesheetRepo.delete(id);
  }

  async submitTimesheetByWeek(creator_id: string) {
    const today = new Date();
    const timesheetStatusNews = await this.timesheetRepo.find({
      where: {
        creatorId: creator_id,
        create_at: Between(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        ),
        status: TimesheetStatus.New,
      },
    });

    const timesheetStatusPendings = await Promise.all(
      timesheetStatusNews.map((timesheet) =>
        this.preloadStatusMyTimesheet(TimesheetStatus.Pending, timesheet.id),
      ),
    );
    return timesheetStatusPendings;
  }

  async approveTimesheetByWeek(body: ApproveTimesheetDto) {
    const { projectId, creatorId } = body;
    const today = new Date();
    const timesheetStatusPendings = await this.timesheetRepo.find({
      where: {
        create_at: Between(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        ),
        status: TimesheetStatus.Pending,
        creatorId,
        projectId,
      },
    });

    const timesheetStatusApproves = await Promise.all(
      timesheetStatusPendings.map((timesheet) =>
        this.preloadStatusMyTimesheet(TimesheetStatus.Approved, timesheet.id),
      ),
    );
    return timesheetStatusApproves;
  }

  async preloadStatusMyTimesheet(status: TimesheetStatus, id: string) {
    const timesheet = await this.timesheetRepo.preload({
      id,
      status,
    });
    return await this.timesheetRepo.save(timesheet);
  }
}
