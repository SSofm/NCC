import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{name: "user", schema: UserSchema}])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // enable to access it in another module
})
export class UsersModule {}
