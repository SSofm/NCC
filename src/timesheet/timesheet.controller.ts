import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Timesheet } from './entities/timesheet.entity';
import { ApproveTimesheetDto } from './dto/approve-timesheet.dto';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../common/decorator/user.decorator';

@Controller('timesheet')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post('create-new-timesheet')
  @CheckAbilities({ action: Action.CREATE_TIMESHEET, subject: Timesheet })
  create(
    @Body() createTimesheetDto: CreateTimesheetDto,
    @User() user: UserEntity,
  ) {
    return this.timesheetService.create(createTimesheetDto, user.id);
  }

  @Post('submit-timesheet-by-week')
  @CheckAbilities({ action: Action.SUBMIT_TIMESHEET, subject: Timesheet })
  async approveTimesheetsByWeek(@User() user: UserEntity) {
    const timesheets = await this.timesheetService.submitTimesheetByWeek(
      user.id,
    );
    return timesheets;
  }

  @Post('approval-timesheet-by-week')
  @CheckAbilities({ action: Action.APPROVAL_TIMESHEET, subject: Timesheet })
  async submitMyTimesheetByWeek(@Body() body: ApproveTimesheetDto) {
    const timesheets = await this.timesheetService.approveTimesheetByWeek(body);
    return timesheets;
  }

  @Get('list-my-timesheets')
  @CheckAbilities({ action: Action.READ, subject: Timesheet })
  getAllMyTimesheet(@User() user: UserEntity) {
    return this.timesheetService.getAllMyTimesheet(user.id);
  }

  @Get('timesheet-by-pending-status')
  @CheckAbilities({
    action: Action.GET_TIMESHEET_BY_PM_OPTIONS,
    subject: Timesheet,
  })
  getAllTimesheetWithPendingStatus() {
    return this.timesheetService.getAllTimesheetWithPendingStatus();
  }

  @Get('timesheet-by-day/:day')
  @CheckAbilities({
    action: Action.GET_TIMESHEET_BY_PM_OPTIONS,
    subject: Timesheet,
  })
  getMyTimesheetByDay(
    @Param() create_at: { day: string },
    @User() user: UserEntity,
  ) {
    return this.timesheetService.getMyTimesheetByDay(create_at.day, user.id);
  }

  @Get('timesheet-by-week')
  @CheckAbilities({
    action: Action.GET_TIMESHEET_BY_PM_OPTIONS,
    subject: Timesheet,
  })
  getMyTimesheetByWeek(@User() user: UserEntity) {
    return this.timesheetService.getMyTimesheetByWeek(user.id);
  }

  @Get('timesheet-by-project/:projectId')
  @CheckAbilities({
    action: Action.GET_TIMESHEET_BY_PM_OPTIONS,
    subject: Timesheet,
  })
  getAllTimesheetByProject(@Param('projectId') proId: string) {
    return this.timesheetService.findByProject(proId);
  }

  @Get('timesheet-by-people/:creatorId')
  @CheckAbilities({
    action: Action.GET_TIMESHEET_BY_PM_OPTIONS,
    subject: Timesheet,
  })
  getAllTimesheetByPeople(@Param('creatorId') peopleId: string) {
    return this.timesheetService.findByPeople(peopleId);
  }

  @Get(':id')
  @CheckAbilities({ action: Action.READ, subject: Timesheet })
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(id);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.UPDATE_TIMESHEET, subject: Timesheet })
  update(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.DELETE_TIMESHEET, subject: Timesheet })
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(id);
  }
}
