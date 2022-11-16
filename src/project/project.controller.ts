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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Project } from './entities/project.entity';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { User } from '../common/decorator/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('project')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_PROJECT, subject: Project })
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create-new-project')
  async create(@Body() body: CreateProjectDto, @User() user: UserEntity) {
    return await this.projectService.create(body, user.id);
  }

  @Get('get-all-projects')
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findByProjectId(@Param('id') id: string) {
    const result = this.projectService.findByProjectId(id);
    return result;
  }

  @Get('filter-by-customer-id/:customerId')
  findByCustomerId(@Param('customerId') customerId: string) {
    return this.projectService.findByCustomerId(customerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch('add-customer-to-project/:id')
  AddCustomerToProject(
    @Body() body: CreateCustomerDto,
    @Param('id') id: string,
    @User() user: UserEntity,
  ) {
    return this.projectService.addCustomerToProject(body, id, user.id);
  }

  @Patch('add-tasks-to-project/:id')
  AddTasksToProject(
    @Body() body: CreateTaskDto,
    @Param('id') id: string,
    @User() user: UserEntity,
  ) {
    return this.projectService.addTasksToProject(body, id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
