import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ContactInfo } from './entities/contact.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ContactInfo, Meeting, Task])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
