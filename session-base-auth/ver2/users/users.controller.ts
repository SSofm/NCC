import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateUserDto } from '../dto/user/create-user.dto';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    

    // sign up
    @Post('create-new-user')
    async addUser(
        @Body() createUserDto:CreateUserDto
    ){
        const {username, password} = createUserDto;
        const saltOrRounds = 10;  // nen config qua env
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.insertUser(
            // userName,
            username,
            hashedPassword,
        );
        return {
            message: 'User successfully registered',
            userId: result.id,
            userName: result.username
        }
    }

    // login
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any{
        return {User: req.user,
        message: 'User logged in'};
    }

    // get /protected
    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    getHello(@Request() req):string{
        return req.user;
    }

    // get log out: destroy all session
    @Get('logout')
    logout(@Request() req):any{
        req.session.destroy();
        return {Message: 'The user session has ended'};
    }    
}
