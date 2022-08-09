import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
export type UserDocument = User & Document;

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
