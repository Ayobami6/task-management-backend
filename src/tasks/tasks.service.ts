import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // contains the business logic for the controller handler
  private tasks: Task[] = [];

  //handler method getting all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.status.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTask(id: string): Task {
    // handle if task not found
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  deleteTask(id: string): void {
    const taskNew = this.getTask(id);
    // this is redundant
    this.tasks = this.tasks.filter((task) => task.id !== taskNew.id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task: Task = this.getTask(id);
    task.status = status;
    return task;
  }
  //   create task handler
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
