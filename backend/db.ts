import pkg from 'pg';
import dotenv from "dotenv"
const { Pool } = pkg;
dotenv.config();


export const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'app_db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});