import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  //   migrations: ['dist/src/db/migration/*.js'],
  //   cli: {
  //     migrationDir: 'src/db/migrations',
  //   },
};

export default config;
