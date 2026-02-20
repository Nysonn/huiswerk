import { Request, Response } from 'express';
import { createUser, findUserByEmail, verifyPassword, findUserById } from '../models/User';

export const showLoginPage = (req: Request, res: Response) => {
  if (req.session.userId) {
    return res.redirect('/classes');
  }
  res.render('login', { error: null });
};

export const showRegisterPage = (req: Request, res: Response) => {
  if (req.session.userId) {
    return res.redirect('/classes');
  }
  res.render('register', { error: null });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, class: classLevel } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.render('register', { error: 'All fields are required' });
    }

    if (role === 'student' && !classLevel) {
      return res.render('register', { error: 'Students must select a class' });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.render('register', { error: 'Email already registered' });
    }

    // Create user
    const user = await createUser(name, email, password, role, classLevel);
    
    // Log in the user
    req.session.userId = user.id;
    res.redirect('/classes');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { error: 'An error occurred during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.userId = user.id;
    res.redirect('/classes');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err: Error | null) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
};
