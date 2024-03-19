import { Task } from './task.entity';
import { appDatasource } from './app.datasource';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

export const TaskRepository = appDatasource.getRepository(Task).extend({
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  },
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    return await query.getMany();
  },
});
