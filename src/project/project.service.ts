import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { TaskService } from '../task/task.service';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateTaskDto } from '../task/dto/create-task.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,

    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
  ) {}

  async create(body: CreateProjectDto, creator_id: string): Promise<Project> {
    const project = new Project();
    project.name = body.name;
    project.creator_id = creator_id;
    return await this.projectRepository.save(project);
  }

  async addCustomerToProject(
    body: CreateCustomerDto,
    id: string,
    creator_id: string,
  ) {
    const customer = await this.customerService.create(body, creator_id);
    const project = await this.projectRepository.findOne({ where: { id: id } });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
    project.customer = customer;

    await this.projectRepository.save(project);
    return await this.projectRepository.findOne({ where: { id } });
  }

  async addTasksToProject(body: CreateTaskDto, id: string, creator_id: string) {
    body.projectId = id;
    // const task =
    await this.taskService.create(body, creator_id);

    const project = await this.projectRepository.findOne({ where: { id: id } });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
    // project.tasks = [task];
    project.creator_id = creator_id;
    await this.projectRepository.save(project);
    return await this.projectRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['customer', 'tasks'],
    });
  }

  async findByProjectId(id: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['customer', 'tasks'],
      select: {
        customer: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
        },
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
    return project;
  }

  async findByCustomerId(customerId: string) {
    const project = await this.projectRepository.findOne({
      where: {
        customerId,
      },
      relations: ['customer', 'tasks'],
    });
    if (!project) {
      throw new NotFoundException(
        `Project with customer ID: ${customerId} not found`,
      );
    }
    return project;
  }

  async update(id: string, body: any) {
    await this.projectRepository.update(id, body);
    return this.projectRepository.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.projectRepository.delete(id);
  }
}
