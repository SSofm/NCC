import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectMemberUserService } from './project_member_user.service';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '@/ability/abilities.decorator';
import { ProjectMemberUser } from './entities/project_member_user.entity';
import { Action } from '../ability/ability.factory';

@Controller('project-member-user')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_PROJECT, subject: ProjectMemberUser })
export class ProjectMemberUserController {
  constructor(
    private readonly projectMemberUserService: ProjectMemberUserService,
  ) {}

  @Post('add-user-to-project/:projectId')
  addUserToProject(
    @Param('projectId') id: string,
    @Body('userId') userId: string,
  ) {
    return this.projectMemberUserService.addUserToProject(id, userId);
  }

  @Get('list-all-member-in-project/:projectId')
  getAllUserInProject(@Param('projectId') projectId: string) {
    return this.projectMemberUserService.getAllUserInProject(projectId);
  }

  @Delete('remove-user-from-project/:projectId')
  removeUserFromProject(
    @Param('projectId') projectId: string,
    @Body('userId') userId: string,
  ) {
    return this.projectMemberUserService.removeUserFromProject(
      projectId,
      userId,
    );
  }
}
