import { Task } from './task.entity';
import { appDatasource } from './app.datasource';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/auth.entity';

export const TaskRepository = appDatasource.getRepository(Task).extend({
  createTask: async function (
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  },
  async getTasks(filterDto: GetTaskFilterDto, user): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '((LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)))',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  },
});
