import express from 'express';
import multer from 'multer';
import { showClasses, showClassHomework, uploadHomework } from '../controllers/homeworkController';
import { isAuthenticated, isTeacher } from '../middleware/auth';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/classes', isAuthenticated, showClasses);
router.get('/classes/:className', isAuthenticated, showClassHomework);
router.post('/classes/:className/upload', isAuthenticated, isTeacher, upload.single('homework'), uploadHomework);

export default router;
