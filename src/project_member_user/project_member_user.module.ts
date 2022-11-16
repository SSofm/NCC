import { Module } from '@nestjs/common';
import { ProjectMemberUserService } from './project_member_user.service';
import { ProjectMemberUserController } from './project_member_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from '../ability/ability.module';
import { ProjectMemberUser } from './entities/project_member_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMemberUser]), AbilityModule],
  controllers: [ProjectMemberUserController],
  providers: [ProjectMemberUserService],
})
export class ProjectMemberUserModule {}
