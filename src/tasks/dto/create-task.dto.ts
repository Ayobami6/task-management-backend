import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  // lets decorate createTaskDto for value required
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

// to use the validation we need to tell nestjs to run validation pipe at the app level
