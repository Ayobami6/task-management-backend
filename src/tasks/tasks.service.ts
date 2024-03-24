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

  async getTaskById(id: string): Promise<Task> {
    const task = await this.dataSource
      .getRepository(Task)
      .findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
  // create task handler
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return TaskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.dataSource.getRepository(Task).delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found`);
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await TaskRepository.save(task);
    return task;
  }

  getTasks(filterDto: GetTaskFilterDto, user): Promise<Task[]> {
    return TaskRepository.getTasks(filterDto, user);
  }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.status.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  // getTask(id: string): Task {
  //   // handle if task not found
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException();
  //   }
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const taskNew = this.getTask(id);
  //   // this is redundant
  //   this.tasks = this.tasks.filter((task) => task.id !== taskNew.id);
  // }
  //
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task: Task = this.getTask(id);
  //   task.status = status;
  //   return task;
  // }
}
