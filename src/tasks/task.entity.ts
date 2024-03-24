import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './task.model';
import { User } from '../auth/auth.entity';
import { Exclude } from 'class-transformer';

@Entity() // Just like a django model for database table creation
export class Task {
  //   columns
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
