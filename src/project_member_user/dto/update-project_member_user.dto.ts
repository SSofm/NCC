import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMemberUserDto } from './create-project_member_user.dto';

export class UpdateProjectMemberUserDto extends PartialType(
  CreateProjectMemberUserDto,
) {}
