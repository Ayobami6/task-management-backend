import { DataSource, DataSourceOptions } from 'typeorm';

const machine = process.env.MACHINE;

let options: DataSourceOptions;

if (machine === 'local') {
  options = {
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
  };
} else {
  options = {
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
  };
}

export const appDatasource = new DataSource(options);
