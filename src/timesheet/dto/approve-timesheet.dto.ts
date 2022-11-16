import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveTimesheetDto {
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
