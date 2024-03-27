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
        // can add the database config options here to use the config service
        const logger = new Logger();
        try {
          // const newDataSource = new DataSource({
          //   type: 'postgres',
          //   host: configService.get('DB_HOST'),
          //   port: configService.get('DB_PORT'),
          //   username: configService.get('DB_USERNAME'),
          //   password: configService.get('DB_PASSWORD'),
          //   database: configService.get('DB_DATABASE'),
          //   synchronize: true,
          //   migrationsRun: false,
          //   entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          //   migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
          // });
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
  exports: [DataSource, ConfigModule],
})
export class TypeOrmModule {}
