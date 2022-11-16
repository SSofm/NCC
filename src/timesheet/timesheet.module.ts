import { Module, forwardRef } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { Timesheet } from './entities/timesheet.entity';
import { AbilityModule } from '../ability/ability.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timesheet]),
    AbilityModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService],
})
export class TimesheetModule {}
