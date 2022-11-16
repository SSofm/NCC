import { TimesheetStatus } from './../enums/status-timesheet.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/user.entity';
import { TimesheetType } from '../enums/type-timesheet.enum';

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  note: string;

  @Column({ name: 'working_time' })
  workingTime: number;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @Column({ nullable: false })
  projectId: string;

  @ManyToOne(() => Task, (task) => task.id)
  task: Task;

  @Column({ nullable: false })
  taskId: string;

  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  @Column({ nullable: false })
  creatorId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({
    type: 'enum',
    default: TimesheetType.Normal,
    enum: TimesheetType,
  })
  type: TimesheetType;

  @Column({
    type: 'enum',
    default: TimesheetStatus.New,
    enum: TimesheetStatus,
  })
  status: string;
}
