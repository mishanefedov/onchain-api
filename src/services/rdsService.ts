import { Pool } from 'pg';
import { config } from 'dotenv';
config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '5432'),
};

const pool = new Pool(dbConfig);

export const getAllItems = async () => {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
};
