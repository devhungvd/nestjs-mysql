import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { UpdateUserInput } from './update-user.input';
import { UserArgs } from './user.args';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(userArgs: UserArgs): Promise<User[]> 
  {
    const { limit, offset } = userArgs;
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async find() {
    return this.userRepository.find();
  }

  public async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id)
      }
    });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput) {
    createUserInput.password = bcrypt.hashSync(createUserInput.password, 8);
    const user = this.userRepository.create({ ...createUserInput});
    return this.userRepository.save(user);
  }

  public async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    updateUserInput.password = bcrypt.hashSync(updateUserInput.password, 8);

    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserInput,
    });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  public async delete(id: string): Promise<User> {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
}