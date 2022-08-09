import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { ObjectID } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: ObjectID): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    return this.usersService.createUser(username, password);
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: ObjectID, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':useId')
  async deleteUse(@Param('useId') userId: Object): Promise<User | null>{
    return this.usersService.deleteUser(userId);
  }
}
