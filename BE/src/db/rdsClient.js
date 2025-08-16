import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('Connecting to DB with params:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  // לא מדפיסים סיסמה
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// בדיקת חיבור בהתחלה
pool.query('SELECT 1')
  .then(() => console.log('Successfully connected to DB'))
  .catch(err => console.error('Failed to connect to DB:', err));

export const query = async (sql, params) => {
  try {
    console.log('Executing query:', sql, 'with params:', params);
    const [rows] = await pool.execute(sql, params);
    console.log('Query result:', rows);
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};