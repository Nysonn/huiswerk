import pool from '../config/database';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  class?: string;
  created_at: Date;
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'teacher' | 'student',
  classLevel?: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, class) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, name, email, role, class, created_at`,
    [name, email, hashedPassword, role, classLevel || null]
  );
  
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(
    'SELECT id, name, email, role, class, created_at FROM users WHERE id = $1',
    [id]
  );
  
  return result.rows[0] || null;
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
