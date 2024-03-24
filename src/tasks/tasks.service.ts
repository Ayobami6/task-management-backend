import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../auth/auth.entity';
@Injectable()
export class TasksService {
  // contains the business logic for the controller handler
  constructor(@Inject(DataSource) private dataSource: DataSource) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.dataSource
      .getRepository(Task)
      .findOne({ where: { id: id, user: user } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
  // create task handler
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return TaskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.dataSource
      .getRepository(Task)
      .delete({ id, user });
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found`);
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await TaskRepository.save(task);
    return task;
  }

  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return TaskRepository.getTasks(filterDto, user);
  }
}
