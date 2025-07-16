import { Pool } from 'pg';

const pool = new Pool({
  user: 'Uzunu Khaira',
  host: 'localhost',
  database: 'chatbot_aikereta',
  password: '12345678',
  port: 5432,
});

export default pool;