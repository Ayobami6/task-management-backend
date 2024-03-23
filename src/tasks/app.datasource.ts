import { DataSource } from 'typeorm';

export const appDatasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ayo',
  password: 'haywon',
  database: 'nest_tmb',
  synchronize: true,
  migrationsRun: false,
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
});
