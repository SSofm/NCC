import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TimesheetType } from '../enums/type-timesheet.enum';

export class CreateTimesheetDto {
  @IsString()
  @IsNotEmpty()
  note: string;

  @IsNumber()
  @IsNotEmpty()
  workingTime: number;

  @IsIn([TimesheetType.Normal, TimesheetType.Overtime])
  @IsNotEmpty()
  type: TimesheetType;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;
}
