import { Injectable } from '@nestjs/common';
import { ProjectMemberUser } from './entities/project_member_user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectMemberUserService {
  constructor(
    @InjectRepository(ProjectMemberUser)
    private readonly projectMemberRepository: Repository<ProjectMemberUser>,
  ) {}

  async getAllUserInProject(projectId: string): Promise<ProjectMemberUser[]> {
    const data = await this.projectMemberRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: ['project', 'user'],
    });
    return [...data];
  }

  removeUserFromProject(projectId: string, userId: string): Promise<any> {
    return this.projectMemberRepository.delete({
      projectId,
      userId,
    });
  }

  addUserToProject(projectId: string, userId: string): Promise<any> {
    return this.projectMemberRepository.save({
      projectId,
      userId,
    });
  }
}
