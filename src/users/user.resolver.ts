import { UserInputError } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './create-user.input';
import { UpdateUserInput } from './update-user.input';
import { UserArgs } from './user.args';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async users(@Args() userArgs: UserArgs): Promise<User[]> {
    return this.userService.findAll(userArgs);
  }

  @Query(() => User)
  public async user(@Args('id') id:string ): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserInputError(id);
    }
    return user;
  }

  @Mutation(() => User)
  public async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => ID, { nullable: true })
  async deleteUser(@Args({ name: 'id', type: () => ID }) id: string) {
    return (await this.userService.delete(id)) ? id : null;
  }

  @Mutation(() => User)
  public async updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  public async removeUser(@Args('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}