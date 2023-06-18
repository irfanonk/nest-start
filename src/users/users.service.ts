import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 0,
      name: 'First',
      email: 'fiest@email.com',
    },
    {
      id: 1,
      name: 'Second',
      email: 'second@email.com',
    },
    {
      id: 3,
      name: 'First',
      email: 'third@email.com',
    },
  ];

  finAll(name?: string) {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(body: CreateUserDto) {
    const newUser = { id: Date.now(), ...body };

    this.users.push(newUser);

    return newUser;
  }
}
