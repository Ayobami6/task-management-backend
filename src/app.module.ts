import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

/**
 * Main App Module, Entry point for all other modules
 * Module a Singleton which means they can be imported by other modules
 *  Modules Property: Providers, Controllers, Exports, Import
 */

// Providers: array of services to be provided to the module via dependency injection
// Controllers: arrays of controllers to be instantiated within the project
// Exports: arrays of service/providers to be exported to modules that import the particular module
// import: arrays of modules to be used by the modules

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
