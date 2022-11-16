import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { configEnvPath } from './common/helper/env.helper';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmConfigSerivce } from './shared/typeorm/typeorm.service';
import { AbilityModule } from './ability/ability.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ProjectMemberUserModule } from './project_member_user/project_member_user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configEnvPath),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigSerivce }),
    UsersModule,
    CustomerModule,
    AbilityModule,
    AuthModule,
    TaskModule,
    ProjectModule,
    TimesheetModule,
    ProjectMemberUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
