import { Request, Response } from 'express';
import { createHomework, getHomeworkByClass } from '../models/Homework';
import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

const CLASSES = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Primary 7'];

export const showClasses = (req: Request, res: Response) => {
  res.render('classes', { classes: CLASSES, user: res.locals.user });
};

export const showClassHomework = async (req: Request, res: Response) => {
  try {
    const { className } = req.params;
    
    if (!CLASSES.includes(className)) {
      return res.status(404).send('Class not found');
    }

    const homework = await getHomeworkByClass(className);
    
    res.render('class-homework', { 
      className, 
      homework,
      user: res.locals.user 
    });
  } catch (error) {
    console.error('Error fetching homework:', error);
    res.status(500).send('Error loading homework');
  }
};

export const uploadHomework = async (req: Request, res: Response) => {
  try {
    const { className } = req.params;
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Upload to Cloudinary
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'homework',
          resource_type: 'auto'
        },
        (error: Error | undefined, result: UploadApiResponse | undefined) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );
      uploadStream.end(file.buffer);
    });

    // Save to database
    await createHomework(
      title,
      className,
      uploadResult.secure_url,
      uploadResult.public_id,
      res.locals.user.id
    );

    res.redirect(`/classes/${encodeURIComponent(className)}`);
  } catch (error) {
    console.error('Error uploading homework:', error);
    res.status(500).json({ error: 'Error uploading homework' });
  }
};
