import { Action, Subjects } from './ability.factory';
import { SetMetadata } from '@nestjs/common';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequireRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
