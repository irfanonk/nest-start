import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('contact')
export class ContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  email: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  address: string;

  @Column()
  userId: number;

  @OneToOne(
    () => User,
    (user) => user.contactInfo,
    { onDelete: 'CASCADE' }, // delete contactInfo when user deleted
  )
  @JoinColumn() // add userId column to table if not specified
  user: User;
}
