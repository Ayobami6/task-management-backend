import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ayo',
      password: 'haywon',
      database: 'nest_tmb',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
