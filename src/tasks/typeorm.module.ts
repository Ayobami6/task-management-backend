import { DataSource } from 'typeorm';
import { appDatasource } from './app.datasource';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger();
        try {
          console.log(configService.get('DB_HOST'));
          await appDatasource.initialize();
          console.log('Database connected successfully');
          return appDatasource;
        } catch (error) {
          logger.error(error.message, error.stack);
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
