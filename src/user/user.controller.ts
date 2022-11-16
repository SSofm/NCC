import { CheckAbilities } from './../ability/abilities.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Action } from '../ability/ability.factory';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { User } from '../common/decorator/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('get-all-users')
  async getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Post('create-new-user')
  async createUser(
    @Body() body: CreateUserDto,
    @User() user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersService.createUser(body, user.id);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
