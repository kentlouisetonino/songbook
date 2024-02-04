export const config = () => ({
  port: Number(process.env.PORT),
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/entities/*.js'],
    migrations: ['dist/src/migrations/*.js'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
    cli: {
      migrationsDir: 'src/migrations'
    }
  }
});
