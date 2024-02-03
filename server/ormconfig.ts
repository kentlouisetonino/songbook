import { DataSource } from 'typeorm'

// Hard code the values.
// Process ENV not working properly.
export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3310,
  username: 'root',
  password: 'root',
  database: 'songbook',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['dist/src/entities/*.js'],
  migrations: ['dist/src/migrations/*.js'],
  ssl: false,
})
