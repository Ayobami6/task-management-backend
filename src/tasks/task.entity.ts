import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

@Entity() // Just like a django model for database table creation
export class Task {
//   columns
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;

  @Column()
  description: string

  @Column()
  status: TaskStatus;
}