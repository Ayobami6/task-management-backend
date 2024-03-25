import { DataSource } from 'typeorm';

export const appDatasource = new DataSource({
  type: 'postgres',
  host: 'monorail.proxy.rlwy.net',
  port: 41821,
  username: 'postgres',
  password: 'JoRKEhNurDjMxrtmfKSahUeHHIFITgyT',
  database: 'railway',
  synchronize: true,
  migrationsRun: false,
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
});
