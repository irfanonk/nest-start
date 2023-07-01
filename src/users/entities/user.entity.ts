import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact.entity';
import { Task } from './task.entity';
import { Meeting } from './meeting.entity';
import { AbstractEntity } from 'src/entities/abstract.entitty';

@Entity('user')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.directReports, { onDelete: 'SET NULL' })
  manager: User;
  @OneToMany(() => User, (user) => user.manager)
  directReports: User[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.user)
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
