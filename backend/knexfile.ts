export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'postgres',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'app_db',
      port: 5432,
    },
    migrations: {
      directory: './migrations'
    }
  }
};
