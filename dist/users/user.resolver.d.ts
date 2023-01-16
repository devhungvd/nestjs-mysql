import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './create-user.input';
import { UpdateUserInput } from './update-user.input';
import { UserArgs } from './user.args';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(userArgs: UserArgs): Promise<User[]>;
    user(id: string): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    deleteUser(id: string): Promise<string>;
    updateUser(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    removeUser(id: string): Promise<User>;
}
