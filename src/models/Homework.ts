import pool from '../config/database';

export interface Homework {
  id: number;
  title: string;
  class: string;
  file_url: string;
  file_public_id: string;
  uploaded_by: number;
  created_at: Date;
}

export const createHomework = async (
  title: string,
  classLevel: string,
  fileUrl: string,
  filePublicId: string,
  uploadedBy: number
): Promise<Homework> => {
  const result = await pool.query(
    `INSERT INTO homework (title, class, file_url, file_public_id, uploaded_by) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [title, classLevel, fileUrl, filePublicId, uploadedBy]
  );
  
  return result.rows[0];
};

export const getHomeworkByClass = async (classLevel: string): Promise<Homework[]> => {
  const result = await pool.query(
    `SELECT h.*, u.name as uploaded_by_name 
     FROM homework h 
     LEFT JOIN users u ON h.uploaded_by = u.id 
     WHERE h.class = $1 
     ORDER BY h.created_at DESC`,
    [classLevel]
  );
  
  return result.rows;
};

export const getAllHomework = async (): Promise<Homework[]> => {
  const result = await pool.query(
    `SELECT h.*, u.name as uploaded_by_name 
     FROM homework h 
     LEFT JOIN users u ON h.uploaded_by = u.id 
     ORDER BY h.created_at DESC`
  );
  
  return result.rows;
};

export const deleteHomework = async (id: number, publicId: string): Promise<void> => {
  await pool.query('DELETE FROM homework WHERE id = $1', [id]);
};
