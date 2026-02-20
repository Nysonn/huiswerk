import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import * as path from 'path';
import dotenv from 'dotenv';
import pool from './config/database';
import initDatabase from './config/init-db';
import authRoutes from './routes/auth';
import homeworkRoutes from './routes/homework';
import { findUserById } from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PgSession = connectPgSimple(session);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Session configuration
app.use(
  session({
    store: new PgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    },
  })
);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Load user into res.locals for all requests
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    try {
      const user = await findUserById(req.session.userId);
      res.locals.user = user;
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/', homeworkRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.redirect('/login');
});

// 404 handler
app.use((req: Request, res: Response) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).send(`Route not found: ${req.method} ${req.path}`);
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
