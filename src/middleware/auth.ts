import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

export const isTeacher = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user && res.locals.user.role === 'teacher') {
    return next();
  }
  res.status(403).send('Access denied. Teachers only.');
};
