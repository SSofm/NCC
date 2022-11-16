import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  bio: string;

  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  address: string;

  // select: false
  @Column({ nullable: false })
  password: string;

  @Column()
  jobTitle: string;

  @Column({ nullable: false })
  level: number;

  @Column({ nullable: false })
  salary: number;

  @Column({ nullable: false })
  sex: number;

  @Column({ type: 'varchar', nullable: true })
  managerId: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  lastLoginAt: Date | null;

  @Column({ nullable: false, type: 'varchar' })
  creator_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isProjectManager: boolean;
}
