import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { appDatasource } from './app.datasource';
import { TypeOrmModule } from './typeorm.module';
import { TaskRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
