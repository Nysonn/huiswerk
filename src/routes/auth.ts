import express from 'express';
import { showLoginPage, showRegisterPage, register, login, logout } from '../controllers/authController';

const router = express.Router();

router.get('/login', showLoginPage);
router.get('/register', showRegisterPage);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
