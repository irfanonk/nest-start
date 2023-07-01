import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  expirationDate: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  user: User;
}
