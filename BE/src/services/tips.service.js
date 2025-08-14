// src/services/tips.service.js
import { query } from '../db/rdsClient.js';

// Get all tips for a specific course
export const getTipsByCourse = async (courseName) => {
  const sql = 'SELECT id, content FROM tips WHERE course = ?';
  const rows = await query(sql, [courseName]);
  return rows;
};

// Add a new tip for a course
export const addTip = async (courseName, content) => {
  const insertSql = 'INSERT INTO tips (course, content) VALUES (?, ?)';
  const result = await query(insertSql, [courseName, content]);
  const insertedId = result.insertId;
  const selectSql = 'SELECT id, content FROM tips WHERE id = ?';
  const rows = await query(selectSql, [insertedId]);
  return rows[0];
};

// Delete a tip by ID
export const removeTip = async (tipId) => {
  const sql = 'DELETE FROM tips WHERE id = ?';
  await query(sql, [tipId]);
};
