import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('meeting')
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  url: string;
  @Column({ nullable: true })
  date: string;

  @ManyToMany(() => User, (user) => user.meetings)
  attendees: User[];
}
