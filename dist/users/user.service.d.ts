import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { UpdateUserInput } from './update-user.input';
import { UserArgs } from './user.args';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(userArgs: UserArgs): Promise<User[]>;
    find(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    create(createUserInput: CreateUserInput): Promise<User>;
    update(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
}
