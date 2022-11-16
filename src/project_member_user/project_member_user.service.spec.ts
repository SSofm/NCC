import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberUserService } from './project_member_user.service';

describe('ProjectMemberUserService', () => {
  let service: ProjectMemberUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMemberUserService],
    }).compile();

    service = module.get<ProjectMemberUserService>(ProjectMemberUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
