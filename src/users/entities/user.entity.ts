import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  age?: number;
}
