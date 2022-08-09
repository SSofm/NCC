import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
