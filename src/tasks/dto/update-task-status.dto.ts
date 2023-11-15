import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
  // add isEnum validation
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
