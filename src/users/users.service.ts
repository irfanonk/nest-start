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
    if (name) {
      return await this.userRepository.find({ where: { name } });
    }
    return await this.userRepository.find({});
  }

  async findUserById(id: any): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(body);

    const result = await this.userRepository.save(newUser);

    return result;
  }
}
