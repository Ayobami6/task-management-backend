import { DataSource } from 'typeorm';
import { appDatasource } from './app.datasource';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          await appDatasource.initialize();
          console.log('Database connected successfully');
          return appDatasource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
