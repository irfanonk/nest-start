import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(name?: string): Promise<User[]> {
    // if (name) {
    //   return this.userRepository.filter((user) => user.name === name);
    // }
    const users = await this.userRepository.find({});
    console.log('UsersService  getAllUsers  users:', users);
    return users;
  }

  async findUserById(id: any): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      console.log('UsersService  findUserById  user:', user);
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(body);

    const result = await this.userRepository.save(newUser);
    console.log('UsersService  createUser  result:', result);
    return result;
  }
}
