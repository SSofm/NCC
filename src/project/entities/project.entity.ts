import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_start: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Timesheet, (timesheet) => timesheet.project)
  timesheets: Timesheet[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @OneToOne(() => Customer, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  customer: Customer;

  @Column({ nullable: true })
  customerId: string;

  @Column({ nullable: false, type: 'varchar' })
  creator_id: string;
}
