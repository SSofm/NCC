// import { Inject } from '@nestjs/common';
// import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
// import { User } from './user.entity';
// import { UserService } from './users.service';
// import { ObjectID } from 'typeorm';

// @Resolver(of => User)
// export class UsersResolver {
//   constructor(
//     @Inject(UserService) private userService: UserService,
//   ) { }

//   @Query(returns => User)
//   async user(@Args('id', { type: () => String }) id: ObjectID): Promise<User> {
//     return await this.userService.getUserById(id);
//   }

//   @Query(returns => [User])
//   async users(): Promise<User[]> {
//     return await this.userService.getUsers();
//   } 


//   // @Mutation(returns => User)
//   // async createCustomer(
//   //   @Args('email') email: string,
//   //   @Args('fullName') fullName: string,
//   //   @Args('password', { nullable: true }) password: string,
//   //   @Args('roles', ) roles: [],
//   // ): Promise<User> {
//   //   return await this.userService.createUser({ email, fullName, password, roles })
//   // }


// }
