import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberUserController } from './project_member_user.controller';
import { ProjectMemberUserService } from './project_member_user.service';

describe('ProjectMemberUserController', () => {
  let controller: ProjectMemberUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMemberUserController],
      providers: [ProjectMemberUserService],
    }).compile();

    controller = module.get<ProjectMemberUserController>(ProjectMemberUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
