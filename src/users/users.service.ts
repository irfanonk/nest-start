import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async clear() {
    await this.userRepository.clear();
    await this.taskRepository.clear();
    await this.meetingRepository.clear();
  }
  async seed() {
    const ceo = this.userRepository.create({ name: 'İrfan' });
    await this.userRepository.save(ceo);

    const ceoContact = this.contactInfoRepository.create({
      email: 'irfan@gmail.com',
    });
    ceoContact.user = ceo; // add userId
    await this.contactInfoRepository.save(ceoContact);

    const manager = this.userRepository.create({
      name: 'Arif',
      manager: ceo,
    });

    const task1 = this.taskRepository.create({ name: 'First task' });
    await this.taskRepository.save(task1);
    const task2 = this.taskRepository.create({ name: 'Second task' });
    await this.taskRepository.save(task2);

    manager.tasks = [task1, task2];

    const meeting = this.meetingRepository.create({ url: 'meeturl.com' });
    meeting.attendees = [ceo];
    await this.meetingRepository.save(meeting);

    manager.meetings = [meeting];

    await this.userRepository.save(manager);
  }

  async getAllUsers(name?: string): Promise<User[]> {
    const relations = [
      'contactInfo',
      'manager',
      'directReports',
      'tasks',
      'meetings',
    ];
    if (name) {
      return await this.userRepository.find({
        where: { name },
        relations,
      });
    }
    return await this.userRepository.find({ relations });
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
