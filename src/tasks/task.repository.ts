import { Task } from './task.entity';
import { appDatasource } from './app.datasource';

export const TaskRepository = appDatasource.getRepository(Task);
