// src/services/tips.service.js
import { query } from '../db/rdsClient.js';

// Get all tips for a specific course
export const getTipsByCourse = async (courseName) => {
  try {
    console.log('Getting tips for course:', courseName);
    const sql = 'SELECT id, content FROM tips WHERE course = ?';
    console.log('SQL:', sql, 'Params:', [courseName]);
    const rows = await query(sql, [courseName]);
    console.log('Got rows:', rows);
    return rows;
  } catch (error) {
    console.error('Error in getTipsByCourse:', error);
    throw error;
  }
};

// Add a new tip for a course
export const addTip = async (courseName, content) => {
  try {
    console.log('Adding tip for course:', courseName, 'content:', content);
    const insertSql = 'INSERT INTO tips (course, content) VALUES (?, ?)';
    console.log('SQL:', insertSql, 'Params:', [courseName, content]);
    const result = await query(insertSql, [courseName, content]);
    console.log('Insert result:', result);
    const insertedId = result.insertId;
    const selectSql = 'SELECT id, content FROM tips WHERE id = ?';
    const rows = await query(selectSql, [insertedId]);
    console.log('Selected new tip:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Error in addTip:', error);
    throw error;
  }
};

// Delete a tip by ID
export const removeTip = async (tipId) => {
  try {
    console.log('Removing tip:', tipId);
    const sql = 'DELETE FROM tips WHERE id = ?';
    console.log('SQL:', sql, 'Params:', [tipId]);
    const result = await query(sql, [tipId]);
    console.log('Delete result:', result);
  } catch (error) {
    console.error('Error in removeTip:', error);
    throw error;
  }
};