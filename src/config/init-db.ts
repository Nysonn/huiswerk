import pool from '../config/database';

const initDatabase = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student')),
        class VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create homework table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS homework (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        class VARCHAR(20) NOT NULL,
        file_url VARCHAR(500) NOT NULL,
        file_public_id VARCHAR(255) NOT NULL,
        uploaded_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_homework_class ON homework(class);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default initDatabase;
