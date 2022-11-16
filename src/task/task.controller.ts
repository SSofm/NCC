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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { User } from '../common/decorator/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('task')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_TASK, subject: Task })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create-new-task')
  create(@Body() createTaskDto: CreateTaskDto, @User() user: UserEntity) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get('get-all-tasks')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('get-all-tasks-by-projectId/:projectId')
  findAllByProjectId(@Param('projectId') proId: string) {
    return this.taskService.findAllByProjectId(proId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
