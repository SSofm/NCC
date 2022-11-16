import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Customer } from '../customer/entities/customer.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../task/entities/task.entity';
import { Timesheet } from '../timesheet/entities/timesheet.entity';
import { User as UserEntity } from '../user/user.entity';
import { ProjectMemberUser } from '../project_member_user/entities/project_member_user.entity';

export enum Action {
  MANAGE = 'manage',
  READ = 'read',
  MANAGE_TIMESHEET = 'manage timesheet',
  MANAGE_USER = 'manage user',
  MANAGE_CUSTOMER = 'manage customer',
  MANAGE_PROJECT = 'manage project',
  MANAGE_TASK = 'manage task',
  CREATE_TIMESHEET = 'create new timesheet',
  GET_ALL_ITEMS = 'get all items',
  DELETE_TIMESHEET = 'delete your timesheet',
  GET_TIMESHEET_BY_PM_OPTIONS = 'get all timesheets that pending status',
  SUBMIT_TIMESHEET = 'submit timesheet',
  UPDATE_TIMESHEET = 'update timesheet',
  APPROVAL_TIMESHEET = 'approval timesheet',
}

export type Subjects = InferSubjects<
  | typeof User
  | typeof Customer
  | typeof Project
  | typeof Task
  | typeof Timesheet
  | typeof ProjectMemberUser
  | 'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.MANAGE, 'all');
    } else if (user.isProjectManager) {
      can(Action.GET_TIMESHEET_BY_PM_OPTIONS, Timesheet);
      can(Action.APPROVAL_TIMESHEET, Timesheet);

      cannot(Action.MANAGE_USER, User).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_CUSTOMER, Customer).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, Project).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, ProjectMemberUser).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, ProjectMemberUser).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_TASK, Task).because(
        'You are not authorized to do this',
      );
    } else {
      can(Action.READ, User);
      can(Action.SUBMIT_TIMESHEET, Timesheet);
      can(Action.READ, Customer);
      can(Action.CREATE_TIMESHEET, Timesheet);
      can(Action.UPDATE_TIMESHEET, Timesheet);
      can(Action.DELETE_TIMESHEET, Timesheet);

      cannot(Action.GET_ALL_ITEMS, Project).because(
        'Your special message: only admin can get all items!!!',
      );

      cannot(Action.MANAGE_USER, User).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_CUSTOMER, Project).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, Project).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, ProjectMemberUser).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_PROJECT, ProjectMemberUser).because(
        'You are not authorized to do this',
      );
      cannot(Action.MANAGE_TASK, Task).because(
        'You are not authorized to do this',
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
