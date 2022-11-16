import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(body: CreateTaskDto, creator_id: string): Promise<Task> {
    return await this.taskRepository.save({
      ...body,
      creator_id,
    });
  }

  findAll() {
    return this.taskRepository.find({
      relations: ['project'],
    });
  }

  findAllByProjectId(proId: string) {
    return this.taskRepository.find({
      where: {
        project: {
          id: proId,
        },
      },
      relations: ['project'],
    });
  }

  findOne(id: string) {
    return this.taskRepository.find({
      where: { id },
      relations: {
        project: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOne({
      where: {
        id,
      },
      relations: {
        project: true,
      },
    });
  }

  remove(id: string) {
    return this.taskRepository.delete(id);
  }
}
