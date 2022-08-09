import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Repository, ObjectID, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';





@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private configService: ConfigService,
    ) { }

    async getUserById(userId): Promise<User> {
        return await this.usersRepository.findOne(userId);
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(username: string, password: string): Promise<User> {
        const salt = parseInt(this.configService.get('saltOrRounds'));
        const hashedPassword = await bcrypt.hash(password, salt);
        return this.usersRepository.save({
            userId: uuidv4(),
            username,
            password: hashedPassword,
        });
    }

    async updateUser(userId, userUpdates: UpdateUserDto): Promise<User> {
        await this.usersRepository.update(userId , userUpdates);
        return await this.usersRepository.findOne(userId);  
    }


    async deleteUser(userId): Promise<User>{
        await this.usersRepository.delete(userId);
        return;
    }
}
